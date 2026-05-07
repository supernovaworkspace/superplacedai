"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { label: "Parsing Resume...", sub: "Extracting text, structure & metadata", color: "#d4af37" },
  { label: "Running ATS Analysis...", sub: "Evaluating keyword density & formatting", color: "#b8860b" },
  { label: "Detecting Skill Gaps...", sub: "Comparing against industry requirements", color: "#818cf8" },
  { label: "Matching Career Paths...", sub: "Analyzing 50,000+ roles", color: "#7c3aed" },
  { label: "Preparing Interview Intelligence...", sub: "Building personalized question bank", color: "#0ea5e9" },
  { label: "Activating AI Agents...", sub: "All five agents standing by", color: "#16a34a" },
];

const TERMINAL = [
  "> Initializing Gemini AI pipeline...",
  "> Tokenizing resume content...",
  "> Running ATS pattern matching...",
  "> Cross-referencing skill database...",
  "> Calculating interview readiness score...",
  "> Generating career recommendations...",
  "> All agents activated. Analysis complete.",
];

export default function AnalysisWindow({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const doneRef = useRef(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setStep(prev => {
        if (prev >= STEPS.length - 1) {
          clearInterval(iv);
          if (!doneRef.current) { doneRef.current = true; setTimeout(onComplete, 900); }
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [onComplete]);

  useEffect(() => {
    const target = ((step + 1) / STEPS.length) * 100;
    let val = progress;
    const anim = setInterval(() => { val = Math.min(val + 2, target); setProgress(val); if (val >= target) clearInterval(anim); }, 20);
    return () => clearInterval(anim);
  }, [step]);

  useEffect(() => {
    const msg = TERMINAL[Math.min(step, TERMINAL.length - 1)];
    setLines(prev => prev.includes(msg) ? prev : [...prev, msg].slice(-6));
  }, [step]);

  const current = STEPS[step];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%", maxWidth: 580, position: "relative",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 28, overflow: "hidden",
          boxShadow: `0 24px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)`,
          marginBottom: 28,
        }}
      >
        {/* Scanning line */}
        <motion.div
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${current.color}50, ${current.color}, ${current.color}50, transparent)`, zIndex: 2, pointerEvents: "none" }}
        />

        {/* Terminal header */}
        <div style={{ padding: "14px 20px", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.02)" }}>
          {["#ef4444", "#f59e0b", "#22c55e"].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.5 }} />)}
          <span style={{ marginLeft: 8, fontFamily: "monospace", fontSize: 11, color: "#9ea5ad", letterSpacing: "0.06em" }}>superplaced.ai — analysis.engine</span>
        </div>

        {/* Terminal body */}
        <div style={{ padding: "24px 28px 20px", minHeight: 160, fontFamily: "monospace", fontSize: 12, background: "#fafafa" }}>
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.div key={line} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}
                style={{ color: i === lines.length - 1 ? current.color : "#9ea5ad", marginBottom: 7, display: "flex", alignItems: "center", gap: 8 }}>
                {line}
                {i === lines.length - 1 && (
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.7, repeat: Infinity }} style={{ color: current.color }}>▊</motion.span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Node row */}
        <div style={{ padding: "14px 28px 20px", display: "flex", gap: 8, alignItems: "center", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          {STEPS.map((s, i) => (
            <motion.div key={i}
              animate={{ scale: i === step ? [1, 1.4, 1] : 1, opacity: i <= step ? 1 : 0.2 }}
              transition={{ duration: 1, repeat: i === step ? Infinity : 0 }}
              style={{ width: 8, height: 8, borderRadius: "50%", background: i <= step ? s.color : "#d3d7dc", boxShadow: i === step ? `0 0 8px ${s.color}` : "none", transition: "background 0.3s" }} />
          ))}
          <div style={{ flex: 1 }} />
          <span style={{ fontFamily: "monospace", fontSize: 11, color: current.color, fontWeight: 600 }}>{Math.round(progress)}%</span>
        </div>
      </motion.div>

      {/* Step label */}
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: "#111418", marginBottom: 6 }}>{current.label}</p>
          <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#9ea5ad" }}>{current.sub}</p>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div style={{ width: "100%", maxWidth: 480, marginTop: 32 }}>
        <div style={{ height: 3, background: "rgba(0,0,0,0.06)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 2, background: `linear-gradient(90deg, #d4af37, ${current.color})`, width: `${progress}%`, transition: "width 0.05s linear", boxShadow: `0 0 8px ${current.color}40` }} />
        </div>
      </div>
    </div>
  );
}
