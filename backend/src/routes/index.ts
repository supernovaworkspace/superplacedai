import { Router } from "express";
import resumeRoutes from "./resume";
import skillGapRoutes from "./skillgap";
import interviewRoutes from "./interview";
import jobsRoutes from "./jobs";
import uploadCsvRoutes from "./uploadCsv";

export function createBackendRouter() {
  const router = Router();

  router.use("/agents/resume", resumeRoutes);
  router.use("/agents/skillgap", skillGapRoutes);
  router.use("/agents/interview", interviewRoutes);
  router.use("/agents/jobs", jobsRoutes);
  router.use("/jobs", uploadCsvRoutes);

  return router;
}
