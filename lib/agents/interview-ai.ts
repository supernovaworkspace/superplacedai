import { GoogleGenerativeAI } from "@google/generative-ai";
import type { InterviewQuestion } from "@/lib/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// In-memory session store (use Redis in production)
const sessions = new Map<string, {
  role: string;
  questions: InterviewQuestion[];
  currentIndex: number;
  allQuestions: string[];
  categories: string[];
}>();

export async function startInterview(role: string, questionCount: number = 6): Promise<{
  session_id: string;
  question: string;
  question_number: number;
  total_questions: number;
  category: string;
}> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are an expert interviewer. Generate ${questionCount} interview questions for a ${role} position.
Mix of technical (40%), behavioral (40%), and situational (20%) questions.
Target: Indian engineering students/graduates.

Return ONLY a valid JSON object (no markdown, no code fences):
{
  "questions": [
    {"question": "<question text>", "category": "technical" | "behavioral" | "situational"}
  ]
}

Make questions realistic, challenging but fair. Start with an easy warm-up question.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);
    const questions = parsed.questions as { question: string; category: string }[];

    const sessionId = crypto.randomUUID();
    sessions.set(sessionId, {
      role,
      questions: [],
      currentIndex: 0,
      allQuestions: questions.map((q) => q.question),
      categories: questions.map((q) => q.category),
    });

    return {
      session_id: sessionId,
      question: questions[0].question,
      question_number: 1,
      total_questions: questions.length,
      category: questions[0].category,
    };
  } catch (error) {
    console.error("Interview start error:", error);
    const sessionId = crypto.randomUUID();
    const fallbackQuestions = [
      "Tell me about yourself and your background.",
      "What interests you about this role?",
      "Describe a challenging project you worked on.",
      "How do you handle tight deadlines?",
      "Where do you see yourself in 5 years?",
      "Do you have any questions for us?",
    ];
    const fallbackCategories = ["behavioral", "behavioral", "technical", "situational", "behavioral", "behavioral"];

    sessions.set(sessionId, {
      role,
      questions: [],
      currentIndex: 0,
      allQuestions: fallbackQuestions,
      categories: fallbackCategories,
    });

    return {
      session_id: sessionId,
      question: fallbackQuestions[0],
      question_number: 1,
      total_questions: fallbackQuestions.length,
      category: fallbackCategories[0],
    };
  }
}

export async function evaluateResponse(sessionId: string, userResponse: string): Promise<{
  score: number;
  feedback: string;
  ideal_answer: string;
  next_question: string | null;
  question_number: number;
  total_questions: number;
  category: string;
  is_complete: boolean;
}> {
  const session = sessions.get(sessionId);
  if (!session) throw new Error("Session not found");

  const currentQuestion = session.allQuestions[session.currentIndex];
  const currentCategory = session.categories[session.currentIndex];

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are an expert interviewer evaluating a candidate's response.
Role: ${session.role}
Question Category: ${currentCategory}

Evaluate the response and return ONLY a valid JSON object (no markdown, no code fences):
{
  "score": <number 0-100>,
  "feedback": "<2-3 sentences of constructive feedback>",
  "ideal_answer": "<what a strong answer would include>"
}

Scoring:
- 90-100: Exceptional — specific, well-structured, shows deep understanding
- 70-89: Good — solid response with room for improvement
- 50-69: Average — lacks specifics or structure
- Below 50: Needs improvement — vague, off-topic, or too brief

Question: ${currentQuestion}

Candidate's Response: ${userResponse}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const evaluation = JSON.parse(cleaned);

    session.questions.push({
      question: currentQuestion,
      user_response: userResponse,
      score: evaluation.score,
      feedback: evaluation.feedback,
      ideal_answer: evaluation.ideal_answer,
      category: currentCategory as "technical" | "behavioral" | "situational",
    });

    session.currentIndex++;
    const isComplete = session.currentIndex >= session.allQuestions.length;
    const nextQuestion = isComplete ? null : session.allQuestions[session.currentIndex];
    const nextCategory = isComplete ? currentCategory : session.categories[session.currentIndex];

    return {
      score: evaluation.score,
      feedback: evaluation.feedback,
      ideal_answer: evaluation.ideal_answer,
      next_question: nextQuestion,
      question_number: session.currentIndex + (isComplete ? 0 : 1),
      total_questions: session.allQuestions.length,
      category: nextCategory,
      is_complete: isComplete,
    };
  } catch (error) {
    console.error("Evaluation error:", error);
    session.questions.push({
      question: currentQuestion,
      user_response: userResponse,
      score: 60,
      feedback: "Evaluation temporarily unavailable. Your response has been recorded.",
      ideal_answer: "Please retry for detailed feedback.",
      category: currentCategory as "technical" | "behavioral" | "situational",
    });
    session.currentIndex++;
    const isComplete = session.currentIndex >= session.allQuestions.length;

    return {
      score: 60,
      feedback: "Evaluation temporarily unavailable.",
      ideal_answer: "Please retry.",
      next_question: isComplete ? null : session.allQuestions[session.currentIndex],
      question_number: session.currentIndex + (isComplete ? 0 : 1),
      total_questions: session.allQuestions.length,
      category: isComplete ? currentCategory : session.categories[session.currentIndex],
      is_complete: isComplete,
    };
  }
}

export function completeInterview(sessionId: string) {
  const session = sessions.get(sessionId);
  if (!session) throw new Error("Session not found");

  const questions = session.questions;
  const overallScore = Math.round(questions.reduce((sum, q) => sum + q.score, 0) / questions.length);

  const technicalQs = questions.filter((q) => q.category === "technical");
  const behavioralQs = questions.filter((q) => q.category === "behavioral");
  const situationalQs = questions.filter((q) => q.category === "situational");

  const avgScore = (qs: InterviewQuestion[]) =>
    qs.length ? Math.round(qs.reduce((s, q) => s + q.score, 0) / qs.length) : 0;

  const categoryScores = {
    technical: avgScore(technicalQs),
    behavioral: avgScore(behavioralQs),
    communication: avgScore(situationalQs),
  };

  const improvementAreas = questions
    .filter((q) => q.score < 70)
    .map((q) => `${q.category}: ${q.feedback.split(".")[0]}`);

  sessions.delete(sessionId);

  return {
    role: session.role,
    overall_score: overallScore,
    questions,
    category_scores: categoryScores,
    improvement_areas: improvementAreas.length > 0 ? improvementAreas : ["Strong performance across all areas!"],
  };
}
