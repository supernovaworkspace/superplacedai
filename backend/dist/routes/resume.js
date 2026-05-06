"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const pdfParse = __importStar(require("pdf-parse"));
const mammoth_1 = __importDefault(require("mammoth"));
const supabase_1 = require("../lib/supabase");
const gemini_1 = require("../lib/gemini");
const uuid_1 = require("uuid");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const extractText = async (file) => {
    if (file.mimetype === "application/pdf" || file.originalname.endsWith(".pdf")) {
        const data = await pdfParse(file.buffer);
        return data.text;
    }
    if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.originalname.endsWith(".docx")) {
        const { value } = await mammoth_1.default.extractRawText({ buffer: file.buffer });
        return value;
    }
    throw new Error("Unsupported file type");
};
router.post("/analyze", upload.single("file"), async (req, res) => {
    try {
        const request = req;
        const file = request.file;
        const user_id = req.body.user_id || null;
        if (!file)
            return res.status(400).json({ success: false, error: "Resume file is required" });
        const text = await extractText(file);
        const prompt = `Analyze this resume. Return JSON: { "ats_score": number (0-100), "strengths": string[], "weaknesses": string[], "skills": string[], "experience_level": string, "summary": string }. Resume text: ${text}`;
        const output = await (0, gemini_1.callAI)(prompt);
        const parsed = JSON.parse(output);
        const file_id = (0, uuid_1.v4)();
        const filePath = `resumes/${file_id}-${file.originalname}`;
        const { error: uploadError } = await supabase_1.supabase.storage
            .from("resumes")
            .upload(filePath, file.buffer, { contentType: file.mimetype });
        if (uploadError)
            throw uploadError;
        const { data: fileUrlData, error: urlError } = await supabase_1.supabase.storage
            .from("resumes")
            .createSignedUrl(filePath, 60 * 60 * 24);
        if (urlError || !fileUrlData?.signedUrl)
            throw urlError || new Error("Failed to generate resume URL");
        const { data: insertData, error: insertError } = await supabase_1.supabase
            .from("resumes")
            .insert([{ user_id, file_url: fileUrlData.signedUrl, parsed_text: text, ats_score: parsed.ats_score, strengths: parsed.strengths, weaknesses: parsed.weaknesses, created_at: new Date().toISOString() }])
            .select("id");
        if (insertError || !insertData || insertData.length === 0)
            throw insertError || new Error("Failed to store resume");
        await supabase_1.supabase.from("activity_logs").insert([{ user_id, action: "resume_analyze", metadata: { file_name: file.originalname, ats_score: parsed.ats_score }, created_at: new Date().toISOString() }]);
        res.json({ success: true, analysis: parsed, resume_id: insertData[0].id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message || "Failed to analyze resume" });
    }
});
exports.default = router;
