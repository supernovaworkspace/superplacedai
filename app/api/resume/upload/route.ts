import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { analyzeResume } from "@/lib/agents/resume-analyzer";
import * as mammoth from "mammoth";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith(".pdf") && !fileName.endsWith(".docx")) {
      return NextResponse.json({ error: "Only PDF and DOCX files are supported" }, { status: 400 });
    }

    // Extract text from file
    const buffer = Buffer.from(await file.arrayBuffer());
    let rawText = "";

    if (fileName.endsWith(".pdf")) {
      const { PDFParse } = await import("pdf-parse");
      const parser = new PDFParse({ data: new Uint8Array(buffer) });
      const textResult = await parser.getText();
      rawText = typeof textResult === "string" ? textResult : (textResult as { text: string }).text || String(textResult);
    } else {
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value;
    }

    if (!rawText || rawText.trim().length < 50) {
      return NextResponse.json({ error: "Could not extract enough text from the file" }, { status: 400 });
    }

    // Analyze with AI
    const analysis = await analyzeResume(rawText);

    // Try to store in Supabase (graceful fallback for guest users)
    let resumeId = crypto.randomUUID();
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("resumes")
          .insert({
            user_id: user.id,
            file_name: file.name,
            raw_text: rawText,
            parsed_data: analysis,
            ats_score: analysis.ats_score,
          })
          .select("id")
          .single();

        if (data) resumeId = data.id;

        // Log activity
        await supabase.from("activity_logs").insert({
          user_id: user.id,
          action: "resume_analyzed",
          metadata: { file_name: file.name, ats_score: analysis.ats_score },
        });

        // Update readiness score
        await supabase.from("users").update({
          readiness_score: Math.min(100, Math.round(analysis.ats_score * 0.3)),
          skills: analysis.extracted_skills,
        }).eq("id", user.id);
      }
    } catch {
      // Guest user or Supabase not configured — continue without storing
    }

    return NextResponse.json({
      success: true,
      resume_id: resumeId,
      analysis,
    });
  } catch (error) {
    console.error("Resume upload error:", error);
    return NextResponse.json({ error: "Failed to process resume" }, { status: 500 });
  }
}
