"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const agents = [
  {
    name: "Resume Analyzer",
    description: "AI scans your resume and provides a detailed strength/gap report.",
    status: "Ready",
    statusColor: "#b8860b",
    statusBg: "rgba(184,134,11,0.1)",
    statusBorder: "rgba(184,134,11,0.2)",
    tag: "Analysis",
    href: "/agents/resume-analyzer",
    tagColor: "#d4af37",
    accentColor: "#d4af37",
    glowColor: "rgba(212,175,55,0.15)",
  },
  {
    name: "Skill Gap Agent",
    description: "Identifies missing skills and recommends targeted learning paths.",
    status: "8 gaps found",
    statusColor: "#d97706",
    statusBg: "rgba(217,119,6,0.1)",
    statusBorder: "rgba(217,119,6,0.2)",
    tag: "Learning",
    href: "/agents/skill-gap",
    tagColor: "#4f46e5",
    accentColor: "#4f46e5",
    glowColor: "rgba(79,70,229,0.15)",
  },
  {
    name: "Interview AI",
    description: "Simulates real hiring manager interviews with live feedback.",
    status: "Ready",
    statusColor: "#b8860b",
    statusBg: "rgba(184,134,11,0.1)",
    statusBorder: "rgba(184,134,11,0.2)",
    tag: "Practice",
    href: "/agents/interview-ai",
    tagColor: "#0284c7",
    accentColor: "#0284c7",
    glowColor: "rgba(2,132,199,0.15)",
  },
  {
    name: "Job Connector",
    description: "Matches your profile to live roles on Mercor, Scale AI & Outlier.",
    status: "Scanning...",
    statusColor: "#64748b",
    statusBg: "rgba(100,116,139,0.1)",
    statusBorder: "rgba(100,116,139,0.2)",
    tag: "Placement",
    href: "/agents/job-connector",
    tagColor: "#ea580c",
    accentColor: "#ea580c",
    glowColor: "rgba(234,88,12,0.15)",
  },
  {
    name: "Career Intelligence",
    description: "Real-time insights on market trends, salary data, and emerging career paths.",
    status: "Beta",
    statusColor: "#7c3aed",
    statusBg: "rgba(124,58,237,0.1)",
    statusBorder: "rgba(124,58,237,0.2)",
    tag: "Insights",
    href: "/agents/career-intelligence",
    tagColor: "#8b5cf6",
    accentColor: "#8b5cf6",
    glowColor: "rgba(139,92,246,0.15)",
  },
];





function AgentCard({ agent, index }: { agent: typeof agents[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => router.push(agent.href)}
        style={{
          borderRadius: 20,
          background: "#ffffff",
          border: `1px solid ${hovered ? agent.accentColor + "40" : "#d3d7dc"}`,
          boxShadow: hovered
            ? `0 24px 48px rgba(0,0,0,0.06), 0 0 0 1px ${agent.accentColor}25`
            : `0 4px 12px rgba(0,0,0,0.03)`,
          transition: "border 0.3s, box-shadow 0.3s",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {/* Top Header Area */}
        <div style={{ position: "relative", width: "100%", height: 120, overflow: "hidden", background: "#f8f9fa" }}>
          {/* Tag */}
          <div style={{
            position: "absolute", top: 12, left: 12, zIndex: 3,
            padding: "5px 12px", borderRadius: 20,
            background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)",
            border: `1px solid ${agent.accentColor}30`,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, fontWeight: 700, color: agent.tagColor,
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}>{agent.tag}</div>
          {/* Status */}
          <div style={{
            position: "absolute", top: 12, right: 12, zIndex: 3,
            padding: "5px 12px", borderRadius: 20,
            background: agent.statusBg, backdropFilter: "blur(10px)",
            border: `1px solid ${agent.statusBorder}`,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10, fontWeight: 600, color: agent.statusColor,
          }}>{agent.status}</div>
        </div>

        {/* Card content */}
        <div style={{ padding: "20px 24px" }}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 22, fontWeight: 600, color: "#1a1c1e",
            letterSpacing: "-0.01em", marginBottom: 6,
          }}>{agent.name}</h3>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13.5, color: "#687078",
            lineHeight: 1.6, marginBottom: 20, fontWeight: 400,
          }}>{agent.description}</p>

          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 500,
              color: hovered ? agent.accentColor : "#9ea5ad",
              transition: "color 0.25s",
            }}>
              Launch agent
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.25s" }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: `radial-gradient(circle at 35% 35%, ${agent.accentColor}, ${agent.accentColor}80)`,
              boxShadow: hovered ? `0 0 12px ${agent.glowColor}` : "none",
              opacity: hovered ? 1 : 0.6,
              transition: "box-shadow 0.3s, opacity 0.3s",
            }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const guest = sessionStorage.getItem("superplaced_guest");
    if (guest === "true") setIsGuest(true);
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem("superplaced_guest");
    router.push("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden" }}>
      {/* Subtle noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 48px",
          borderBottom: "1px solid #d3d7dc",
          background: "rgba(245,244,237,0.85)", backdropFilter: "blur(20px)",
          position: "sticky", top: 0, zIndex: 50,
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#1a1c1e" }}>
          <img src="/logo.png" alt="SuperPlaced AI Logo" style={{ height: 240, filter: "invert(1) brightness(0)" }} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a href="/profile" style={{ fontSize: 13, color: "#687078", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#d4af37"} onMouseLeave={e => e.currentTarget.style.color = "#687078"}>Profile</a>
          <a href="/jobs" style={{ fontSize: 13, color: "#687078", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#d4af37"} onMouseLeave={e => e.currentTarget.style.color = "#687078"}>Jobs</a>
          <a href="/settings" style={{ fontSize: 13, color: "#687078", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#d4af37"} onMouseLeave={e => e.currentTarget.style.color = "#687078"}>Settings</a>
          <div style={{ width: 1, height: 20, background: "#d3d7dc" }} />
          {isGuest && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 20, background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", fontSize: 12, fontWeight: 500, color: "#d4af37" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              Guest Mode
            </motion.div>
          )}
          {isGuest ? (
            <a href="/signin" style={{ padding: "9px 22px", borderRadius: 10, background: "#d4af37", color: "#f8f9fa", fontSize: 13, fontWeight: 500, textDecoration: "none", boxShadow: "0 4px 12px rgba(212,175,55,0.2)" }}>
              Sign In to Save Progress
            </a>
          ) : (
            <button onClick={handleSignOut} style={{ padding: "9px 22px", borderRadius: 10, background: "transparent", border: "1px solid #d3d7dc", color: "#687078", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#d4af37"; (e.currentTarget as HTMLButtonElement).style.color = "#1a1c1e"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#d3d7dc"; (e.currentTarget as HTMLButtonElement).style.color = "#687078"; }}>
              Sign Out
            </button>
          )}
        </div>
      </motion.nav>

      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 48px 100px", position: "relative", zIndex: 1 }}>
        {/* Guest notice */}
        {isGuest && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 12, marginBottom: 28, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}>
            <span style={{ fontSize: 14 }}>👤</span>
            <span style={{ fontSize: 13, color: "#d4af37", fontWeight: 500 }}>You&apos;re exploring as a Guest — progress won&apos;t be saved</span>
            <a href="/signin" style={{ fontSize: 12, color: "#1a1c1e", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3, marginLeft: 4 }}>Sign in →</a>
          </motion.div>
        )}

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} style={{ marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 20, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)", marginBottom: 20 }}>
            <span style={{ fontSize: 10, color: "#d4af37", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Superplaced gets u a job superfast</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px,5vw,52px)", fontWeight: 600, color: "#1a1c1e", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 16 }}>
            Super{" "}
            <span style={{ color: "#d4af37", textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "6px" }}>Agents</span>
          </h1>
          <p style={{ fontSize: 16, color: "#687078", fontWeight: 400, maxWidth: 500, lineHeight: 1.6 }}>
            Five intelligent agents, one goal — getting you hired faster than ever.
          </p>
        </motion.div>



        {/* Section label */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#9ea5ad", letterSpacing: "0.12em", textTransform: "uppercase" }}>Active Agents</span>
          <div style={{ flex: 1, height: 1, background: "#d3d7dc" }} />
        </motion.div>

        {/* Agent Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }} className="agents-grid">
          {agents.map((agent, i) => <AgentCard key={agent.name} agent={agent} index={i} />)}
        </div>

        {/* Guest CTA */}
        {isGuest && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            style={{ marginTop: 56, borderRadius: 20, padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", background: "#ffffff", border: "1px solid #d3d7dc", boxShadow: "0 8px 24px rgba(0,0,0,0.03)" }}>
            <div style={{ position: "relative" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600, color: "#1a1c1e", marginBottom: 8 }}>Save your progress. Unlock your full profile.</div>
              <p style={{ fontSize: 15, color: "#687078", fontWeight: 400 }}>Sign in to persist your resume analysis, skill gaps, and interview history.</p>
            </div>
            <a href="/signin" style={{ padding: "14px 32px", borderRadius: 12, flexShrink: 0, background: "#d4af37", color: "#f8f9fa", fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 12px rgba(212,175,55,0.25)", transition: "transform 0.2s, background 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLAnchorElement).style.background = "#b8860b"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.background = "#d4af37"; }}>
              Create Free Account →
            </a>
          </motion.div>
        )}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr !important; } .agents-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { nav { padding: 14px 20px !important; } main { padding: 36px 20px 60px !important; } }
      `}</style>
    </div>
  );
}
