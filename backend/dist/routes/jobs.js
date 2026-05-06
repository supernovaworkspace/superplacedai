"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabase_1 = require("../lib/supabase");
const gemini_1 = require("../lib/gemini");
const router = (0, express_1.Router)();
router.post("/match", async (req, res) => {
    try {
        const { user_id, resume_id } = req.body;
        if (!user_id || !resume_id)
            return res.status(400).json({ success: false, error: "user_id and resume_id are required" });
        const { data: resumeData, error: resumeError } = await supabase_1.supabase.from("resumes").select("skills").eq("id", resume_id).single();
        if (resumeError || !resumeData)
            throw resumeError || new Error("Resume not found");
        const { data: jobs, error: jobError } = await supabase_1.supabase.from("jobs").select("*");
        if (jobError)
            throw jobError;
        const resumeSkills = resumeData.skills || [];
        const resumeEmbedding = await (0, gemini_1.callEmbeddings)(JSON.stringify(resumeSkills));
        const matchRecords = [];
        for (const job of jobs) {
            const overlap = job.required_skills.filter((skill) => resumeSkills.includes(skill)).length;
            const keywordScore = Math.round((overlap / Math.max(job.required_skills.length, 1)) * 100);
            const jobEmbedding = await (0, gemini_1.callEmbeddings)(job.job_description || "");
            const semanticScore = Math.round((resumeEmbedding.reduce((sum, value, index) => sum + Math.min(value, jobEmbedding[index]), 0) / resumeEmbedding.length) * 100);
            const matchScore = Math.round((keywordScore * 0.4) + (semanticScore * 0.4) + 20);
            matchRecords.push({ job, match_score: Math.min(100, matchScore), match_reason: `Keyword ${keywordScore}% + semantic ${semanticScore}%` });
        }
        const sorted = matchRecords.sort((a, b) => b.match_score - a.match_score).slice(0, 20);
        const insertData = sorted.map((item) => ({ user_id, job_id: item.job.id, match_score: item.match_score, match_reason: item.match_reason, status: "new", created_at: new Date().toISOString() }));
        const { error: insertError } = await supabase_1.supabase.from("job_matches").insert(insertData);
        if (insertError)
            throw insertError;
        await supabase_1.supabase.from("activity_logs").insert([{ user_id, action: "job_match", metadata: { resume_id }, created_at: new Date().toISOString() }]);
        res.json({ success: true, matches: sorted });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message || "Failed to match jobs" });
    }
});
exports.default = router;
