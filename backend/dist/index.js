"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_2 = require("express");
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.BACKEND_PORT || 3001);
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use((0, express_2.json)({ limit: "25mb" }));
app.use((0, express_2.urlencoded)({ extended: true }));
const aiRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: { success: false, error: "Rate limit exceeded. Try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});
app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
app.use("/api", aiRateLimiter, (0, routes_1.createBackendRouter)());
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ success: false, error: err.message || "Internal server error" });
});
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
