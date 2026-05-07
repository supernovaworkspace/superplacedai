"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { label: "Analyzing Resume...", icon: "📄", color: "#d4af37" },
  { label: "Running ATS Evaluation...", icon: "🎯", color: "#f59e0b" },
  { label: "Finding Skill Gaps...", icon: "🔍", color: "#818cf8" },
  { label: "Matching Job Roles...", icon: "💼", color: "#fb923c" },
  { label: "Preparing AI Agents...", icon: "🤖", color: "#38bdf8" },
];

export default function AnalysisLoader({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) { clearInterval(timer); setTimeout(onComplete, 800); return prev; }
        return prev + 1;
      });
    }, 900);
    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const target = ((currentStep + 1) / steps.length) * 100;
    const timer = setInterval(() => {
      setProgress(prev => { if (prev >= target) { clearInterval(timer); return target; } return prev + 2; });
    }, 30);
    return () => clearInterval(timer);
  }, [currentStep]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      {/* Scanning line */}
      <motion.div
        animate={{ y: ["-100vh", "100vh"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute", left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent, #d4af37 30%, #d4af37 70%, transparent)",
          opacity: 0.15, pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: 480, textAlign: "center" }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            width: 80, height: 80, borderRadius: "50%", margin: "0 auto 40px",
            background: `radial-gradient(circle, ${steps[currentStep].color}20, transparent 70%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 36 }}>{steps[currentStep].icon}</span>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.h2
            key={currentStep}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: "#1a1c1e", marginBottom: 12 }}
          >
            {steps[currentStep].label}
          </motion.h2>
        </AnimatePresence>

        <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#9ea5ad", marginBottom: 40 }}>
          Step {currentStep + 1} of {steps.length}
        </p>

        <div style={{ height: 4, borderRadius: 2, background: "#e6e9ed", overflow: "hidden", marginBottom: 24 }}>
          <div style={{
            height: "100%", borderRadius: 2,
            background: `linear-gradient(90deg, #d4af37, ${steps[currentStep].color})`,
            width: `${progress}%`, transition: "width 0.3s ease",
          }} />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: i <= currentStep ? step.color : "#e6e9ed",
              transition: "background 0.3s",
              boxShadow: i === currentStep ? `0 0 8px ${step.color}40` : "none",
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
