import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { json, urlencoded } from "express";
import { createBackendRouter } from "./routes";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || process.env.BACKEND_PORT || 3001);

app.use(cors({ origin: true, credentials: true }));
app.use(json({ limit: "25mb" }));
app.use(urlencoded({ extended: true }));

const aiRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { success: false, error: "Rate limit exceeded. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api", aiRateLimiter, createBackendRouter());

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, error: err.message || "Internal server error" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
