"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { AnalysisResult } from "../page";

const AGENTS = [
  { id: "resume", name: "Improve Your Resume", desc: "Optimize ATS score, rewrite bullet points, and improve formatting for maximum impact.", href: "/agents/resume-analyzer", accent: "#d4af37", cta: "Launch Agent", metricKey: "ats_score" as const, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
  { id: "skills", name: "Run Skill Gap Analysis", desc: "Identify missing skills for your target role and get a curated learning roadmap.", href: "/agents/skill-gap", accent: "#818cf8", cta: "Analyze Skills", metricKey: null, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
  { id: "jobs", name: "Find Jobs", desc: "Match your profile with real AI-native and remote opportunities globally.", href: "/agents/job-connector", accent: "#fb923c", cta: "Find Matching Jobs", metricKey: null, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
  { id: "career", name: "Run Career Analysis", desc: "Discover optimal career paths, salary benchmarks, and market demand for your profile.", href: "/agents/career-intelligence", accent: "#a78bfa", cta: "View Insights", metricKey: null, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { id: "interview", name: "Prepare with Interview AI", desc: "Practice technical, HR, and behavioral interviews with real-time AI feedback and scoring.", href: "/agents/interview-ai", accent: "#38bdf8", cta: "Start Interview", metricKey: null, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg> },
];

function AgentCard({ agent, index, analysis }: { agent: typeof AGENTS[0]; index: number; analysis: AnalysisResult | null }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const metricVal = agent.metricKey && analysis ? analysis[agent.metricKey] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(agent.href)}
      style={{
        border: `1px solid ${hovered ? agent.accent + "40" : "rgba(0,0,0,0.08)"}`,
        borderRadius: 20, padding: "28px", cursor: "pointer",
        background: hovered ? `rgba(255,255,255,0.98)` : "rgba(255,255,255,0.75)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        transition: "all 0.28s cubic-bezier(0.22,1,0.36,1)",
        position: "relative", overflow: "hidden",
        boxShadow: hovered ? `0 0 40px ${agent.accent}18, 0 12px 32px rgba(0,0,0,0.1)` : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-3px)" : "none",
      }}
    >
      {hovered && (
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${agent.accent}10, transparent 70%)`, pointerEvents: "none" }} />
      )}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 13, background: `${agent.accent}10`, border: `1px solid ${agent.accent}25`, display: "flex", alignItems: "center", justifyContent: "center", color: agent.accent }}>
          {agent.icon}
        </div>
        {metricVal != null && (
          <span style={{ padding: "5px 11px", borderRadius: 8, background: `${agent.accent}10`, border: `1px solid ${agent.accent}20`, fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, color: "#000000" }}>
            ATS {String(metricVal)}
          </span>
        )}
      </div>

      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "#000000", marginBottom: 8, lineHeight: 1.2 }}>
        {agent.name}
      </h3>
      <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#687078", lineHeight: 1.65, marginBottom: 20 }}>
        {agent.desc}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, color: hovered ? agent.accent : "#9ea5ad", transition: "color 0.2s", letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {agent.cta}
        <motion.svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          animate={{ x: hovered ? 5 : 0 }} transition={{ duration: 0.18 }}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </motion.svg>
      </div>
    </motion.div>
  );
}

export default function AgentsWindow({ analysis, onReset }: { analysis: AnalysisResult | null; onReset: () => void }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: "0 32px 64px", maxWidth: 1100, margin: "0 auto", width: "100%" }}>

      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "32px 0 0", marginBottom: 40 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 8px rgba(22,163,74,0.5)" }} />
          <span style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, color: "#111418", letterSpacing: "0.14em", textTransform: "uppercase" }}>All agents active</span>
        </motion.div>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          onClick={onReset}
          style={{ background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: 100, padding: "8px 18px", color: "#111418", fontFamily: "'DM Sans'", fontSize: 12, cursor: "pointer", backdropFilter: "blur(10px)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          ↩ Start over
        </motion.button>
      </div>

      {/* Heading */}
      <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 600, color: "#000000", letterSpacing: "-0.025em", marginBottom: 8 }}>
        Welcome back.
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }}
        style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#687078", marginBottom: 28 }}>
        Your AI agents are ready — choose where to begin.
      </motion.p>

      {/* ATS Score badge */}
      {analysis && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
          <div style={{ padding: "10px 20px", borderRadius: 14, border: "1px solid rgba(0,0,0,0.08)", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)", display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "#687078", textTransform: "uppercase", letterSpacing: "0.1em" }}>ATS Score</span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#000000" }}>{analysis.ats_score}/100</span>
          </div>
        </motion.div>
      )}

      {/* Agent grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }} className="agents-grid">
        {AGENTS.slice(0, 4).map((a, i) => <AgentCard key={a.id} agent={a} index={i} analysis={analysis} />)}
      </div>
      <div style={{ marginTop: 14 }}>
        <AgentCard agent={AGENTS[4]} index={4} analysis={analysis} />
      </div>

      <style>{`@media (max-width: 700px) { .agents-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
