import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ResumeAnalysis } from "@/lib/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeResume(resumeText: string): Promise<ResumeAnalysis> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are an expert resume analyst and ATS (Applicant Tracking System) specialist.
Analyze the provided resume and return ONLY a valid JSON object (no markdown, no code fences) with this exact structure:
{
  "ats_score": <number 0-100>,
  "strengths": ["<strength 1>", "<strength 2>", ...],
  "weaknesses": ["<weakness 1>", "<weakness 2>", ...],
  "extracted_skills": ["<skill 1>", "<skill 2>", ...],
  "experience_summary": "<1-2 sentence summary of work experience>",
  "education": [{"degree": "<degree>", "institution": "<school>", "year": "<year>"}],
  "recommendations": ["<recommendation 1>", "<recommendation 2>", ...]
}

ATS Score Criteria:
- 90-100: Excellent — well-formatted, keyword-rich, quantified achievements
- 70-89: Good — solid but missing some keywords or quantification
- 50-69: Average — needs improvement in formatting or content
- Below 50: Needs significant work

Be specific, actionable, and honest. Focus on Indian engineering student context.

Resume:
${resumeText}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Clean markdown fences if present
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned) as ResumeAnalysis;
  } catch (error) {
    console.error("Resume analysis error:", error);
    return {
      ats_score: 45,
      strengths: ["Resume was submitted for analysis"],
      weaknesses: ["AI analysis temporarily unavailable — please try again"],
      extracted_skills: [],
      experience_summary: "Analysis pending",
      education: [],
      recommendations: ["Please try analyzing again in a few moments"],
    };
  }
}
