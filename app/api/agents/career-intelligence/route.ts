import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function extractJSON(raw: string): string {
  let cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) cleaned = cleaned.slice(start, end + 1);
  return cleaned;
}

export async function POST(request: NextRequest) {
  try {
    const { target_role, industry, experience, region, instructions } = await request.json();

    if (!target_role) return NextResponse.json({ error: "target_role is required" }, { status: 400 });

    const prompt = `You are a senior career intelligence analyst with deep knowledge of global job markets, compensation data, and industry trends. Analyze the market for this role and return ONLY a raw JSON object, no markdown, no explanation.

Query:
- Target Role: ${target_role}
- Industry: ${industry || "Technology"}
- Experience Level: ${experience || "Mid-Level"}
- Region: ${region || "Global"}
${instructions ? `- Specific Focus: ${instructions}` : ""}

Return this exact JSON structure:
{
  "role": "${target_role}",
  "salaryRange": "<e.g. $90k - $140k or ₹12L - ₹25L based on region>",
  "marketDemand": "<e.g. High Growth (+18% YoY)>",
  "demandLevel": "<high|medium|low>",
  "futureOutlook": "<2-3 sentences on market trajectory and future prospects>",
  "topCompanies": ["<company>", "<company>", "<company>", "<company>", "<company>"],
  "keySkills": ["<skill>", "<skill>", "<skill>", "<skill>"],
  "careerPaths": [
    { "title": "<next role>", "timeline": "<e.g. 2-3 years>", "salaryIncrease": "<e.g. +30%>" }
  ],
  "marketInsights": ["<insight>", "<insight>", "<insight>"],
  "certifications": ["<cert>", "<cert>"],
  "remoteOpportunities": "<percentage or description of remote availability>"
}

Be realistic and data-driven. Use real salary ranges, real companies, real certifications.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a career market intelligence analyst. Respond ONLY with a valid JSON object starting with { and ending with }. No markdown. No extra text." },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 2048,
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    const report = JSON.parse(extractJSON(raw));

    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error("[career-intel API] Error:", error);
    return NextResponse.json({ success: false, error: "Analysis failed" }, { status: 500 });
  }
}
