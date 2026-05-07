"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WelcomeWindow from "./windows/WelcomeWindow";
import UploadWindow from "./windows/UploadWindow";
import AnalysisWindow from "./windows/AnalysisWindow";
import ATSRevealWindow from "./windows/ATSRevealWindow";
import AgentsWindow from "./windows/AgentsWindow";

export type DashboardWindow = "welcome" | "upload" | "analysis" | "ats" | "agents";

export interface AnalysisResult {
  ats_score: number;
  strengths: string[];
  weaknesses: string[];
  missing_keywords: string[];
  extracted_skills: string[];
  technical_skills: string[];
  soft_skills: string[];
  experience_summary: string;
  career_summary: string;
  recommended_roles: string[];
  interview_readiness: number;
  skill_coverage: number;
  improvement_suggestions: string[];
  recommendations: string[];
}

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 28 : -28, scale: 0.98 }),
  center: { opacity: 1, y: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -28 : 28, scale: 0.98 }),
};

export default function DashboardPage() {
  const [currentWindow, setCurrentWindow] = useState<DashboardWindow>("welcome");
  const [direction, setDirection] = useState(1);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analysisReady, setAnalysisReady] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("sp_analysis");
      if (stored) {
        setAnalysis(JSON.parse(stored));
        setCurrentWindow("agents");
      }
    } catch { /* ignore */ }
  }, []);

  const goTo = useCallback((next: DashboardWindow, dir = 1) => {
    setDirection(dir);
    setCurrentWindow(next);
  }, []);

  const handleFileUploaded = useCallback(async (file: File | null) => {
    goTo("analysis");
    if (!file) { setAnalysisReady(true); return; }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/resume/analyze", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
        sessionStorage.setItem("sp_analysis", JSON.stringify(data.analysis));
        console.log("[dashboard] Gemini analysis complete, ATS:", data.analysis.ats_score);
      } else {
        console.error("[dashboard] Analysis returned error:", data.error, data.debug);
      }
    } catch (err) {
      console.error("[dashboard] Network error during analysis:", err);
    } finally {
      setAnalysisReady(true);
    }
  }, [goTo]);

  const handleAnalysisDone = useCallback(() => goTo("ats"), [goTo]);
  const handleSkipUpload = useCallback(() => { setAnalysisReady(true); goTo("analysis"); }, [goTo]);

  return (
    <div style={{
      minHeight: "100vh", width: "100%",
      background: "#f0f0ec",
      fontFamily: "'DM Sans', sans-serif",
      overflow: "hidden", position: "relative",
    }}>

      <AnimatePresence mode="wait" custom={direction}>
        {currentWindow === "welcome" && (
          <motion.div key="welcome" custom={direction}
            variants={slideVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", zIndex: 10, minHeight: "100vh" }}>
            <WelcomeWindow onBegin={() => goTo("upload")} />
          </motion.div>
        )}
        {currentWindow === "upload" && (
          <motion.div key="upload" custom={direction}
            variants={slideVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", zIndex: 10, minHeight: "100vh" }}>
            <UploadWindow onUploaded={handleFileUploaded} onSkip={handleSkipUpload} onBack={() => goTo("welcome", -1)} />
          </motion.div>
        )}
        {currentWindow === "analysis" && (
          <motion.div key="analysis" custom={direction}
            variants={slideVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", zIndex: 10, minHeight: "100vh" }}>
            <AnalysisWindow onComplete={handleAnalysisDone} />
          </motion.div>
        )}
        {currentWindow === "ats" && (
          <motion.div key="ats" custom={direction}
            variants={slideVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", zIndex: 10, minHeight: "100vh" }}>
            <ATSRevealWindow analysis={analysis} onContinue={() => goTo("agents")} />
          </motion.div>
        )}
        {currentWindow === "agents" && (
          <motion.div key="agents" custom={direction}
            variants={slideVariants} initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", zIndex: 10, minHeight: "100vh" }}>
            <AgentsWindow analysis={analysis} onReset={() => { sessionStorage.removeItem("sp_analysis"); goTo("welcome", -1); }} />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
      `}</style>
    </div>
  );
}
