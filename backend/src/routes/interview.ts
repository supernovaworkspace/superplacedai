import { Router } from "express";
import { supabase } from "../lib/supabase";
import { callAI } from "../lib/gemini";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.post("/start", async (req, res) => {
  try {
    const { user_id, interview_type, target_role } = req.body;
    if (!interview_type || !target_role) return res.status(400).json({ success: false, error: "interview_type and target_role are required" });

    const prompt = `Generate 6 interview questions for a ${interview_type} interview for a ${target_role}. Return JSON: { "questions": string[] }`;
    const output = await callAI(prompt);
    const data = JSON.parse(output);
    const sessionId = uuidv4();

    const { data: insertData, error } = await supabase.from("interview_results").insert([{ user_id, interview_type, questions: data.questions, responses: [], scores: [], feedback: [], overall_score: 0, created_at: new Date().toISOString() }]).select("id");
    if (error || !insertData || insertData.length === 0) throw error || new Error("Failed to create interview session");

    await supabase.from("activity_logs").insert([{ user_id, action: "interview_start", metadata: { interview_type, target_role }, created_at: new Date().toISOString() }]);

    res.json({ success: true, interview_id: insertData[0].id, questions: data.questions });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message || "Failed to start interview" });
  }
});

router.post("/respond", async (req, res) => {
  try {
    const { interview_id, answer } = req.body;
    if (!interview_id || !answer) return res.status(400).json({ success: false, error: "interview_id and answer are required" });

    const { data: interviewData, error } = await supabase.from("interview_results").select("questions,responses,scores,feedback").eq("id", interview_id).single();
    if (error || !interviewData) throw error || new Error("Interview session not found");

    const updatedResponses = [...interviewData.responses, answer];
    const { error: updateError } = await supabase.from("interview_results").update({ responses: updatedResponses }).eq("id", interview_id);
    if (updateError) throw updateError;

    await supabase.from("activity_logs").insert([{ user_id: req.body.user_id || null, action: "interview_respond", metadata: { interview_id }, created_at: new Date().toISOString() }]);

    res.json({ success: true, responses: updatedResponses });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message || "Failed to send interview response" });
  }
});

router.get("/results/:id", async (req, res) => {
  try {
    const interview_id = req.params.id;
    const { data: interviewData, error } = await supabase.from("interview_results").select("questions,responses,scores,feedback,overall_score").eq("id", interview_id).single();
    if (error || !interviewData) throw error || new Error("Interview session not found");
    if (interviewData.responses.length !== interviewData.questions.length) {
      return res.json({ success: true, status: "pending", interview: interviewData });
    }

    const prompt = `Evaluate these answers in JSON: { "scores":number[], "feedback":string[], "overall_score":number, "improvement_tips":string[] }. Questions: ${JSON.stringify(interviewData.questions)} Answers: ${JSON.stringify(interviewData.responses)}`;
    const output = await callAI(prompt);
    const evaluation = JSON.parse(output);

    const { error: updateError } = await supabase.from("interview_results").update({ scores: evaluation.scores, feedback: evaluation.feedback, overall_score: evaluation.overall_score }).eq("id", interview_id);
    if (updateError) throw updateError;

    await supabase.from("activity_logs").insert([{ user_id: req.body.user_id || null, action: "interview_results", metadata: { interview_id }, created_at: new Date().toISOString() }]);

    res.json({ success: true, results: evaluation });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message || "Failed to get interview results" });
  }
});

export default router;
