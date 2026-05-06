"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callEmbeddings = exports.callAI = exports.genAI = void 0;
const generative_ai_1 = require("@google/generative-ai");
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey)
    throw new Error("GEMINI_API_KEY is required");
exports.genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
const callAI = async (prompt) => {
    const model = exports.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Clean markdown fences if present
    return text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
};
exports.callAI = callAI;
const callEmbeddings = async (text) => {
    const model = exports.genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
};
exports.callEmbeddings = callEmbeddings;
