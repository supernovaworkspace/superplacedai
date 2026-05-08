import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

function extractJSON(raw: string): string {
  let cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) cleaned = cleaned.slice(start, end + 1);
  return cleaned;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ success: false, error: "GROQ_API_KEY is not configured" }, { status: 500 });
    }
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const { target_job_title, industry, experience_level, current_skills, instructions } = await request.json();

    if (!target_job_title) return NextResponse.json({ error: "target_job_title is required" }, { status: 400 });

    const skillsList = Array.isArray(current_skills) ? current_skills.join(", ") : (current_skills || "None specified");

    const prompt = `You are an expert career coach and technical recruiter. Analyze the skill gap for this profile and return ONLY a raw JSON object, no markdown, no explanation.

Profile:
- Target Job Title: ${target_job_title}
- Industry: ${industry || "Technology"}
- Experience Level: ${experience_level || "Mid-Level"}
- Current Skills: ${skillsList}
${instructions ? `- Additional Context: ${instructions}` : ""}

Return this exact JSON structure:
{
  "summary": "<2-3 sentence overview of current skill match>",
  "current_match": <integer 0-100 representing % match to target role>,
  "missing_skills": [
    {
      "skill": "<skill name>",
      "priority": "<high|medium|low>",
      "description": "<why this skill matters and how to approach it>"
    }
  ],
  "roadmap": [
    {
      "week": <1-4>,
      "focus": "<focus area for this week>",
      "tasks": ["<specific task>", "<specific task>"],
      "resources": ["<resource name>", "<resource name>"]
    }
  ]
}

Be specific, honest, and actionable. Provide exactly 4 weeks in the roadmap. Identify 4-6 missing skills.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are an expert career coach. Respond ONLY with a valid JSON object starting with { and ending with }. No markdown. No extra text." },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 2048,
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    const skill_gap = JSON.parse(extractJSON(raw));

    return NextResponse.json({ success: true, skill_gap });
  } catch (error) {
    console.error("[skill-gap API] Error:", error);
    return NextResponse.json({ success: false, error: "Analysis failed" }, { status: 500 });
  }
}
