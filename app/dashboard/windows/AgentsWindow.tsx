"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { AnalysisResult } from "../page";

const AGENTS = [
  {
    id: "resume",
    badge: "ANALYZE",
    name: "Resume Analyzer",
    desc: "Assess your resume and get a detailed strength report via AI.",
    href: "/agents/resume-analyzer",
    accent: "#c9a84c",
    cardBg: "linear-gradient(135deg, #fdf6e3 0%, #faecd0 100%)",
    cta: "Launch agent",
    metricKey: "ats_score" as const,
    status: "Ready",
    statusColor: "#2a9d5c",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    id: "skills",
    badge: "LEARNING",
    name: "Skill Gap Agent",
    desc: "Identifies missing skills and recommends targeted learning paths.",
    href: "/agents/skill-gap",
    accent: "#818cf8",
    cardBg: "linear-gradient(135deg, #f0f0ff 0%, #e5e5fc 100%)",
    cta: "Launch agent",
    metricKey: null,
    status: "AI-powered",
    statusColor: "#818cf8",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
  },
  {
    id: "interview",
    badge: "PRACTICE",
    name: "Interview AI",
    desc: "Simulates real hiring manager interviews with live feedback.",
    href: "/agents/interview-ai",
    accent: "#38bdf8",
    cardBg: "linear-gradient(135deg, #e8f6fd 0%, #d4eefa 100%)",
    cta: "Launch agent",
    metricKey: null,
    status: "Ready",
    statusColor: "#2a9d5c",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
      </svg>
    ),
  },
  {
    id: "jobs",
    badge: "PLACEMENT",
    name: "Job Connector",
    desc: "Matches your profile to live roles on Mercor, Scale AI & Outlier.",
    href: "/agents/job-connector",
    accent: "#fb923c",
    cardBg: "linear-gradient(135deg, #fff3eb 0%, #ffe8d4 100%)",
    cta: "Launch agent",
    metricKey: null,
    status: "Scanning...",
    statusColor: "#fb923c",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
  },
  {
    id: "career",
    badge: "INSIGHTS",
    name: "Career Intelligence",
    desc: "Discover optimal career paths, salary benchmarks, and market demand.",
    href: "/agents/career-intelligence",
    accent: "#a78bfa",
    cardBg: "linear-gradient(135deg, #f3f0ff 0%, #ebe5fc 100%)",
    cta: "Launch agent",
    metricKey: null,
    status: "AI-powered",
    statusColor: "#a78bfa",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
];

function AgentCard({ agent, index, analysis }: { agent: typeof AGENTS[0]; index: number; analysis: AnalysisResult | null }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const metricVal = agent.metricKey && analysis ? analysis[agent.metricKey] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(agent.href)}
      style={{
        borderRadius: 20,
        border: `1px solid ${hovered ? agent.accent + "55" : "#e8e8e4"}`,
        background: agent.cardBg,
        padding: "0",
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
        boxShadow: hovered
          ? `0 8px 32px ${agent.accent}22, 0 2px 8px rgba(0,0,0,0.06)`
          : "0 1px 4px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
    >
      {/* Graphic area */}
      <div style={{
        height: 120, padding: "20px 24px",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        position: "relative", overflow: "hidden",
      }}>
        {/* Badge top-left */}
        <span style={{
          background: "rgba(255,255,255,0.7)",
          border: `1px solid ${agent.accent}33`,
          borderRadius: 999, padding: "3px 10px",
          fontFamily: "'DM Sans', sans-serif", fontSize: 10,
          fontWeight: 700, color: agent.accent,
          textTransform: "uppercase", letterSpacing: "0.08em",
          backdropFilter: "blur(8px)",
        }}>
          {agent.badge}
        </span>

        {/* Status badge top-right */}
        <span style={{
          background: "rgba(255,255,255,0.8)",
          border: "1px solid #e8e8e4",
          borderRadius: 999, padding: "3px 10px",
          fontFamily: "'DM Sans', sans-serif", fontSize: 10,
          color: agent.statusColor, fontWeight: 600,
          backdropFilter: "blur(8px)",
        }}>
          {agent.status}
        </span>

        {/* Decorative icon center */}
        <div style={{
          position: "absolute", bottom: 12, left: "50%",
          transform: "translateX(-50%)",
          width: 44, height: 44, borderRadius: 13,
          background: `${agent.accent}15`,
          border: `1px solid ${agent.accent}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: agent.accent,
        }}>
          {agent.icon}
        </div>

        {/* ATS score badge if available */}
        {metricVal != null && (
          <span style={{
            position: "absolute", top: 20, right: 24,
            padding: "4px 10px", borderRadius: 8,
            background: `${agent.accent}15`,
            border: `1px solid ${agent.accent}30`,
            fontFamily: "'DM Sans', sans-serif", fontSize: 11,
            fontWeight: 700, color: agent.accent,
          }}>
            ATS {String(metricVal)}
          </span>
        )}
      </div>

      {/* Text area */}
      <div style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(10px)",
        padding: "18px 24px 20px",
        borderTop: `1px solid ${agent.accent}18`,
      }}>
        <h3 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: 19, fontWeight: 400, color: "#1a1a1a",
          marginBottom: 6, lineHeight: 1.25,
        }}>
          {agent.name}
        </h3>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13, color: "#888888",
          lineHeight: 1.6, marginBottom: 16,
        }}>
          {agent.desc}
        </p>
        <div style={{
          display: "flex", alignItems: "center", gap: 5,
          fontFamily: "'DM Sans', sans-serif", fontSize: 12,
          fontWeight: 600, color: hovered ? agent.accent : "#aaaaaa",
          textTransform: "uppercase", letterSpacing: "0.06em",
          transition: "color 0.2s",
        }}>
          {agent.cta}
          <motion.svg
            width="12" height="12" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.15 }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </motion.svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function AgentsWindow({ analysis, onReset }: { analysis: AnalysisResult | null; onReset: () => void }) {
  return (
    <div style={{
      minHeight: "100vh", padding: "0 40px 64px",
      maxWidth: 1100, margin: "0 auto", width: "100%",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');`}</style>

      {/* ── Top bar ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "28px 0 0",
      }}>
        {/* Left: logo + badge */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <span style={{
            fontFamily: "'DM Serif Display', serif", fontSize: 16, color: "#1a1a1a",
          }}>
            Superplaced<span style={{ color: "#c9a84c" }}>.</span>
          </span>
          <span style={{
            background: "#fdf6e3", border: "1px solid #c9a84c",
            borderRadius: 999, padding: "3px 10px",
            fontSize: 10, fontWeight: 700, color: "#c9a84c",
            textTransform: "uppercase", letterSpacing: "0.08em",
          }}>
            AI Career Assistant
          </span>
        </motion.div>

        {/* Right: sign out */}
        <motion.button
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          onClick={onReset}
          style={{
            background: "#fff", border: "1px solid #e8e8e4", borderRadius: 999,
            padding: "8px 18px", color: "#555555",
            fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          Sign Out
        </motion.button>
      </div>

      {/* ── Page header ── */}
      <div style={{ marginTop: 36, marginBottom: 8 }}>
        {/* Overline */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }}
          style={{
            fontSize: 11, fontWeight: 600, color: "#c9a84c",
            textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10,
          }}
        >
          —— Superplaced AI Career Assistant
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(32px, 4vw, 50px)", fontWeight: 400,
            color: "#1a1a1a", lineHeight: 1.1, marginBottom: 12,
          }}
        >
          Your AI Career{" "}
          <span style={{ color: "#c9a84c" }}>Dashboard</span>
        </motion.h1>

        {/* Subtitle row */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}
        >
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15, color: "#888888", margin: 0, maxWidth: 420,
          }}>
            Four intelligent agents, one goal — getting you hired faster than ever.
          </p>
          {/* ATS badge if available */}
          {analysis && (
            <div style={{
              background: "#fff", border: "1px solid #e8e8e4",
              borderRadius: 12, padding: "8px 18px",
              display: "flex", alignItems: "center", gap: 10,
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <span style={{ fontSize: 11, color: "#aaaaaa", textTransform: "uppercase", letterSpacing: "0.08em" }}>ATS Score</span>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1a1a1a" }}>
                {analysis.ats_score}<span style={{ fontSize: 13, color: "#aaaaaa" }}>/100</span>
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* ── Active agents label ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}
        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}
      >
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#2a9d5c", boxShadow: "0 0 8px rgba(42,157,92,0.5)" }} />
        <span style={{ fontSize: 11, fontWeight: 700, color: "#555555", textTransform: "uppercase", letterSpacing: "0.12em" }}>
          Active Agents
        </span>
      </motion.div>

      {/* ── Agent card grid ── */}
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}
        className="agents-grid"
      >
        {AGENTS.slice(0, 4).map((a, i) => (
          <AgentCard key={a.id} agent={a} index={i} analysis={analysis} />
        ))}
      </div>

      {/* 5th card full width */}
      <div style={{ marginTop: 16 }}>
        <AgentCard agent={AGENTS[4]} index={4} analysis={analysis} />
      </div>

      <style>{`
        @media (max-width: 700px) { .agents-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
