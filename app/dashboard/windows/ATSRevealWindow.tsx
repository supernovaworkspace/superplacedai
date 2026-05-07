"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { AnalysisResult } from "../page";

const FALLBACK: AnalysisResult = {
  ats_score: 68, strengths: ["Clear section structure", "Relevant work history", "Quantified achievements"],
  weaknesses: ["Missing action verbs", "Low keyword density", "No portfolio link"],
  missing_keywords: ["CI/CD", "Agile", "TypeScript", "REST API", "System Design"],
  extracted_skills: [], technical_skills: [], soft_skills: [],
  experience_summary: "Solid experience.", career_summary: "Your resume needs ATS optimization and stronger keyword alignment.",
  recommended_roles: ["Software Engineer", "Full Stack Developer"], interview_readiness: 58, skill_coverage: 52,
  improvement_suggestions: [], recommendations: [],
};

function AnimatedRing({ score, color }: { score: number; color: string }) {
  const [display, setDisplay] = useState(0);
  const size = 200, r = 84, circ = 2 * Math.PI * r;
  const offset = circ - (display / 100) * circ;
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const run = (now: number) => { const p = Math.min((now - start) / 2000, 1); setDisplay(Math.round((1 - Math.pow(1-p,4)) * score)); if (p < 1) frame = requestAnimationFrame(run); };
    const t = setTimeout(() => { frame = requestAnimationFrame(run); }, 400);
    return () => { clearTimeout(t); cancelAnimationFrame(frame); };
  }, [score]);
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} stroke="rgba(0,0,0,0.08)" strokeWidth="10" fill="none" />
        <motion.circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{ filter: `drop-shadow(0 0 12px ${color}40)`, transition: "stroke-dashoffset 0.04s linear" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, fontWeight: 700, color: "#000000", lineHeight: 1 }}>{display}</span>
        <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "#000000", letterSpacing: "0.1em", textTransform: "uppercase" }}>ATS Score</span>
      </div>
    </div>
  );
}

export default function ATSRevealWindow({ analysis, onContinue }: { analysis: AnalysisResult | null; onContinue: () => void }) {
  const data = analysis || FALLBACK;
  const score = data.ats_score;
  const color = score >= 75 ? "#16a34a" : score >= 50 ? "#d4af37" : "#ef4444";
  const label = score >= 75 ? "Strong" : score >= 50 ? "Needs Optimization" : "Needs Work";

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 24px 48px", overflowY: "auto" }}>
      <motion.div initial={{ opacity: 0, y: 28, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", maxWidth: 760, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 28, padding: "52px", boxShadow: "0 24px 60px rgba(0,0,0,0.08)", textAlign: "center" }}>

        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 40 }}>
          {[0,1,2,3,4].map(i => <div key={i} style={{ width: i===3?28:8, height: 4, borderRadius: 2, background: i===3?color:i<3?"rgba(0,0,0,0.2)":"rgba(0,0,0,0.08)" }} />)}
        </div>

        <p style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 700, color: "#000000", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 36 }}>ATS SCORE REVEAL</p>

        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 180, damping: 20 }}
          style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <AnimatedRing score={score} color={color} />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 100, border: `1px solid ${color}30`, background: `${color}10`, marginBottom: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
          <span style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, color: "#000000", letterSpacing: "0.06em" }}>{label}</span>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#111418", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px" }}>
          {data.career_summary}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 40, textAlign: "left" }}>
          {[
            { title: "Strengths", items: data.strengths.slice(0,3), c: "#16a34a", bg: "rgba(22,163,74,0.04)", bd: "rgba(22,163,74,0.15)" },
            { title: "To Improve", items: data.weaknesses.slice(0,3), c: "#ef4444", bg: "rgba(239,68,68,0.04)", bd: "rgba(239,68,68,0.15)" },
          ].map(col => (
            <div key={col.title} style={{ border: `1px solid ${col.bd}`, borderRadius: 16, padding: "18px", background: col.bg }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 9, fontWeight: 700, color: "#000000", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>{col.title}</div>
              {col.items.map((s,i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: col.c, marginTop: 5, flexShrink: 0 }} />
                  <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#111418", lineHeight: 1.5 }}>{s}</span>
                </div>
              ))}
            </div>
          ))}
          <div style={{ border: "1px solid rgba(212,175,55,0.2)", borderRadius: 16, padding: "18px", background: "rgba(212,175,55,0.04)" }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 9, fontWeight: 700, color: "#000000", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>Missing Keywords</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {data.missing_keywords.slice(0,7).map((k,i) => (
                <span key={i} style={{ padding: "3px 9px", borderRadius: 6, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.18)", fontFamily: "'DM Sans'", fontSize: 10, color: "#111418" }}>{k}</span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          onClick={onContinue} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
          style={{ padding: "16px 56px", borderRadius: 100, border: "none", background: "linear-gradient(135deg, #d4af37, #b8860b)", color: "#000", fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans'", cursor: "pointer", boxShadow: "0 4px 24px rgba(212,175,55,0.3)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Continue to AI Agents →
        </motion.button>
      </motion.div>
    </div>
  );
}
