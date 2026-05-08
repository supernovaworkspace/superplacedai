import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import * as mammoth from "mammoth";

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

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith(".pdf") && !fileName.endsWith(".docx")) {
      return NextResponse.json({ error: "Only PDF and DOCX files are supported" }, { status: 400 });
    }

    // ── Extract text ──────────────────────────────────────────────────────────
    const buffer = Buffer.from(await file.arrayBuffer());
    let rawText = "";

    if (fileName.endsWith(".pdf")) {
      try {
        // unpdf is Next.js/Edge compatible — handles workers internally
        const { extractText, getDocumentProxy } = await import("unpdf");
        const pdf = await getDocumentProxy(new Uint8Array(buffer));
        const { text } = await extractText(pdf, { mergePages: true });
        rawText = text;
        console.log("[analyze] unpdf success, chars:", rawText.length);
      } catch (e) {
        console.error("[analyze] unpdf failed:", String(e).slice(0, 120));
        return NextResponse.json({ error: "Could not extract text from PDF. Please ensure it is a text-based (not scanned) PDF." }, { status: 400 });
      }
    } else {
      rawText = (await mammoth.extractRawText({ buffer })).value;
      console.log("[analyze] mammoth success, chars:", rawText.length);
    }

    if (!rawText || rawText.trim().length < 30) {
      return NextResponse.json({ error: "Could not extract readable text. Please use a text-based PDF or DOCX." }, { status: 400 });
    }

    const resumeText = rawText.trim().slice(0, 6000);
    console.log("[analyze] Resume ready, chars:", resumeText.length);

    // ── Groq prompt ───────────────────────────────────────────────────────────
    const prompt = `You are an expert ATS analyst and career advisor. Analyze the resume and return ONLY a raw JSON object. No markdown. No explanation. Start with { end with }.

{
  "ats_score": <integer 0-100>,
  "strengths": ["<strength>"],
  "weaknesses": ["<weakness>"],
  "extracted_skills": ["<skill>"],
  "technical_skills": ["<skill>"],
  "soft_skills": ["<skill>"],
  "missing_keywords": ["<keyword>"],
  "experience_summary": "<1-2 sentences>",
  "career_summary": "<2-3 sentence honest assessment>",
  "education": [{"degree": "", "institution": "", "year": ""}],
  "recommendations": ["<recommendation>"],
  "recommended_roles": ["<role>", "<role>", "<role>"],
  "interview_readiness": <integer 0-100>,
  "skill_coverage": <integer 0-100>,
  "improvement_suggestions": ["<suggestion>"]
}

Scoring: 85-100=Excellent, 65-84=Good, 45-64=Average, <45=Needs work.
Base ALL scores strictly on what is in the resume.

RESUME:
${resumeText}`;

    const models = [
      "llama-3.3-70b-versatile",
      "llama3-70b-8192",
      "llama-3.1-8b-instant",
      "gemma2-9b-it",
    ];

    let analysis = null;

    for (const model of models) {
      try {
        console.log("[analyze] Trying:", model);
        const completion = await groq.chat.completions.create({
          model,
          messages: [
            { role: "system", content: "You are an expert resume analyst. Respond ONLY with a valid JSON object starting with { and ending with }. No markdown. No extra text." },
            { role: "user", content: prompt },
          ],
          temperature: 0.2,
          max_tokens: 2048,
        });

        const raw = completion.choices[0]?.message?.content ?? "";
        console.log("[analyze] Response:", raw.slice(0, 200));

        const parsed = JSON.parse(extractJSON(raw));
        if (typeof parsed.ats_score !== "number") throw new Error("Missing ats_score");

        analysis = parsed;
        console.log("[analyze] ✓ Success:", model, "| ATS:", analysis.ats_score);
        break;
      } catch (e) {
        console.error("[analyze]", model, "failed:", String(e).slice(0, 120));
      }
    }

    if (!analysis) {
      return NextResponse.json({ success: false, error: "Analysis failed — please try again" }, { status: 500 });
    }

    return NextResponse.json({ success: true, analysis });

  } catch (error) {
    console.error("[analyze] Unhandled error:", error);
    return NextResponse.json({ error: "Failed to process resume" }, { status: 500 });
  }
}
