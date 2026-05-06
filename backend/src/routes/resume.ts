import { Router, Request } from "express";
import multer from "multer";
import * as pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { supabase } from "../lib/supabase";
import { callAI } from "../lib/gemini";
import { v4 as uuidv4 } from "uuid";

type FileRequest = Request & { file?: Express.Multer.File };

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const extractText = async (file: Express.Multer.File) => {
  if (file.mimetype === "application/pdf" || file.originalname.endsWith(".pdf")) {
    const data = await (pdfParse as any)(file.buffer);
    return data.text as string;
  }
  if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.originalname.endsWith(".docx")) {
    const { value } = await mammoth.extractRawText({ buffer: file.buffer });
    return value;
  }
  throw new Error("Unsupported file type");
};

router.post("/analyze", upload.single("file"), async (req, res) => {
  try {
    const request = req as FileRequest;
    const file = request.file;
    const user_id = req.body.user_id || null;
    if (!file) return res.status(400).json({ success: false, error: "Resume file is required" });

    const text = await extractText(file);
    const prompt = `Analyze this resume. Return JSON: { "ats_score": number (0-100), "strengths": string[], "weaknesses": string[], "skills": string[], "experience_level": string, "summary": string }. Resume text: ${text}`;
    const output = await callAI(prompt);

    const parsed = JSON.parse(output);
    const file_id = uuidv4();
    const filePath = `resumes/${file_id}-${file.originalname}`;
    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(filePath, file.buffer, { contentType: file.mimetype });

    if (uploadError) throw uploadError;

    const { data: fileUrlData, error: urlError } = await supabase.storage
      .from("resumes")
      .createSignedUrl(filePath, 60 * 60 * 24);

    if (urlError || !fileUrlData?.signedUrl) throw urlError || new Error("Failed to generate resume URL");

    const { data: insertData, error: insertError } = await supabase
      .from("resumes")
      .insert([{ user_id, file_url: fileUrlData.signedUrl, parsed_text: text, ats_score: parsed.ats_score, strengths: parsed.strengths, weaknesses: parsed.weaknesses, created_at: new Date().toISOString() }])
      .select("id");

    if (insertError || !insertData || insertData.length === 0) throw insertError || new Error("Failed to store resume");

    await supabase.from("activity_logs").insert([{ user_id, action: "resume_analyze", metadata: { file_name: file.originalname, ats_score: parsed.ats_score }, created_at: new Date().toISOString() }]);

    res.json({ success: true, analysis: parsed, resume_id: insertData[0].id });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message || "Failed to analyze resume" });
  }
});

export default router;
