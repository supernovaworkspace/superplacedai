"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const papaparse_1 = __importDefault(require("papaparse"));
const supabase_1 = require("../lib/supabase");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.post("/upload-csv", upload.single("file"), async (req, res) => {
    try {
        const mode = req.query.mode === "replace" ? "replace" : "append";
        const file = req.file;
        if (!file)
            return res.status(400).json({ success: false, error: "CSV file is required" });
        const text = file.buffer.toString("utf-8");
        const parsed = papaparse_1.default.parse(text, { header: true, skipEmptyLines: true });
        const errors = [];
        let inserted = 0;
        let skipped = 0;
        if (parsed.errors.length) {
            return res.status(400).json({ success: false, error: "CSV parse failed", details: parsed.errors });
        }
        const rows = parsed.data;
        const jobsToInsert = [];
        for (const row of rows) {
            const requiredColumns = ["job_title", "company_name", "job_description", "job_link", "required_skills", "location", "job_type"];
            if (!requiredColumns.every((col) => row[col])) {
                skipped += 1;
                continue;
            }
            const skills = String(row.required_skills).split(/[,;]+/).map((s) => s.trim()).filter(Boolean);
            jobsToInsert.push({
                job_title: row.job_title,
                company_name: row.company_name,
                job_description: row.job_description,
                job_link: row.job_link,
                referral_link: row.referral_link || null,
                required_skills: skills,
                location: row.location,
                job_type: row.job_type,
                source: "csv",
                created_at: new Date().toISOString(),
            });
        }
        if (mode === "replace") {
            await supabase_1.supabase.from("jobs").delete();
        }
        const uniqueJobs = Array.from(new Map(jobsToInsert.map((job) => [`${job.job_title}:${job.company_name}`, job])).values());
        const { error } = await supabase_1.supabase.from("jobs").insert(uniqueJobs);
        if (error)
            throw error;
        inserted = uniqueJobs.length;
        if (inserted === 0) {
            const demoJobs = [
                {
                    job_title: "Product Marketing Manager",
                    company_name: "Mercor",
                    job_description: "Lead product marketing strategy for AI career acceleration platform.",
                    job_link: "https://mercor.example.com/apply",
                    referral_link: "",
                    required_skills: ["product marketing", "AI", "go-to-market"],
                    location: "Remote",
                    job_type: "Full-time",
                    source: "demo",
                    created_at: new Date().toISOString(),
                },
            ];
            await supabase_1.supabase.from("jobs").insert(demoJobs);
            inserted = demoJobs.length;
        }
        await supabase_1.supabase.from("activity_logs").insert([{ user_id: req.body.user_id || null, action: "jobs_upload_csv", metadata: { mode, inserted, skipped }, created_at: new Date().toISOString() }]);
        res.json({ success: true, inserted, skipped, total: rows.length, errors });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message || "Failed to upload CSV" });
    }
});
exports.default = router;
