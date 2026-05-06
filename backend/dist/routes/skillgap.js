"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_1 = require("../lib/supabase");
const gemini_1 = require("../lib/gemini");
const router = (0, express_1.Router)();
router.post("/analyze", async (req, res) => {
    try {
        const { user_id, resume_id, target_job_title } = req.body;
        if (!resume_id || !target_job_title)
            return res.status(400).json({ success: false, error: "resume_id and target_job_title are required" });
        const { data: resumeData, error: resumeError } = await supabase_1.supabase.from("resumes").select("skills").eq("id", resume_id).single();
        if (resumeError || !resumeData)
            throw resumeError || new Error("Resume not found");
        const { data: jobData, error: jobError } = await supabase_1.supabase.from("jobs").select("required_skills").ilike("job_title", `%${target_job_title}%`).limit(1).single();
        if (jobError)
            throw jobError;
        const prompt = `Given skills: ${JSON.stringify(resumeData.skills)} and job requirements: ${JSON.stringify(jobData.required_skills)}, return JSON: { "missing_skills": string[], "existing_skills": string[], "priority_learning": string[], "roadmap": [{"skill":string, "resource_url":string, "estimated_days":number}] }`;
        const output = await (0, gemini_1.callAI)(prompt);
        const analysis = JSON.parse(output);
        const { data: insertData, error: insertError } = await supabase_1.supabase.from("skill_gaps").insert([{ user_id, resume_id, existing_skills: analysis.existing_skills, missing_skills: analysis.missing_skills, roadmap: analysis.roadmap, created_at: new Date().toISOString() }]).select("id");
        if (insertError || !insertData || insertData.length === 0)
            throw insertError || new Error("Failed to store skill gap");
        await supabase_1.supabase.from("activity_logs").insert([{ user_id, action: "skillgap_analyze", metadata: { resume_id, target_job_title }, created_at: new Date().toISOString() }]);
        res.json({ success: true, skill_gap: analysis, skill_gap_id: insertData[0].id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message || "Failed to analyze skill gap" });
    }
});
exports.default = router;
