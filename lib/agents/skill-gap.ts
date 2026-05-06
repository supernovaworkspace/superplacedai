import { GoogleGenerativeAI } from "@google/generative-ai";
import type { MissingSkill, RoadmapWeek } from "@/lib/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface SkillGapAnalysis {
  missing_skills: MissingSkill[];
  roadmap: RoadmapWeek[];
  current_match: number;
  summary: string;
}

export async function analyzeSkillGap(
  currentSkills: string[],
  targetRole: string,
  industry: string,
  experienceLevel: string,
  instructions?: string
): Promise<SkillGapAnalysis> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a career advisor specializing in skill gap analysis for Indian engineering students.
Analyze the gap between current skills and target role requirements.

Return ONLY a valid JSON object (no markdown, no code fences) with this exact structure:
{
  "current_match": <number 0-100 representing current readiness>,
  "summary": "<2-3 sentence summary of the analysis>",
  "missing_skills": [
    {
      "skill": "<skill name>",
      "priority": "high" | "medium" | "low",
      "category": "<category like Technical, Soft Skills, Tools, Domain>",
      "description": "<why this skill matters for the role>"
    }
  ],
  "roadmap": [
    {
      "week": <week number 1-4>,
      "focus": "<main focus area>",
      "tasks": ["<task 1>", "<task 2>", "<task 3>"],
      "resources": ["<resource/course/link 1>", "<resource 2>"]
    }
  ]
}

Provide 5-8 missing skills and a 4-week roadmap. Be specific with resource recommendations (Coursera, YouTube channels, GitHub repos, books).

Current Skills: ${currentSkills.join(", ") || "Not specified"}
Target Role: ${targetRole}
Industry: ${industry}
Experience Level: ${experienceLevel}
${instructions ? `Additional Context: ${instructions}` : ""}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned) as SkillGapAnalysis;
  } catch (error) {
    console.error("Skill gap analysis error:", error);
    return {
      current_match: 40,
      summary: "AI analysis temporarily unavailable. Please try again.",
      missing_skills: [
        { skill: "Analysis pending", priority: "high", category: "General", description: "Please retry the analysis" },
      ],
      roadmap: [
        { week: 1, focus: "Retry analysis", tasks: ["Try again"], resources: ["Refresh the page"] },
      ],
    };
  }
}
