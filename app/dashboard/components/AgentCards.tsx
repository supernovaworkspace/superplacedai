"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface AnalysisData { ats_score?: number; missing_keywords?: string[]; extracted_skills?: string[]; recommended_roles?: string[]; interview_readiness?: number; skill_coverage?: number; }

const agents = [
  { name: "Improve Your Resume", description: "Get ATS score, missing keywords, weak bullet points, and formatting suggestions.", href: "/agents/resume-analyzer", tag: "Analysis", accent: "#d4af37", cta: "Launch Agent", metricKey: "ats_score" as const, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
  { name: "Skill Gap Analysis", description: "Identify missing technologies and get a recommended learning roadmap.", href: "/agents/skill-gap", tag: "Learning", accent: "#818cf8", cta: "Analyze Skills", metricKey: "skill_coverage" as const, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
  { name: "Find Jobs", description: "AI-powered job matching across Mercor, Scale AI, Outlier, and more.", href: "/agents/job-connector", tag: "Placement", accent: "#fb923c", cta: "Find Matching Jobs", metricKey: null, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg> },
  { name: "Career Analysis", description: "Career paths, salary projections, market demand, and role compatibility.", href: "/agents/career-intelligence", tag: "Insights", accent: "#a78bfa", cta: "View Insights", metricKey: null, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { name: "Interview AI", description: "Mock interviews with AI — technical, HR, and communication scoring.", href: "/agents/interview-ai", tag: "Practice", accent: "#38bdf8", cta: "Start Interview", metricKey: "interview_readiness" as const, icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg> },
];

export default function AgentCards({ analysis }: { analysis: AnalysisData | null }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 600, color: "#9ea5ad", letterSpacing: "0.14em", textTransform: "uppercase" }}>AI Agents</span>
        <div style={{ flex: 1, height: 1, background: "#e6e9ed" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }} className="agent-cards-grid">
        {agents.map((agent, i) => <AgentCard key={agent.name} agent={agent} index={i} analysis={analysis} />)}
      </div>
      <style>{`@media (max-width: 768px) { .agent-cards-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function AgentCard({ agent, index, analysis }: { agent: typeof agents[0]; index: number; analysis: AnalysisData | null }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const metricValue = agent.metricKey && analysis ? (analysis as Record<string, unknown>)[agent.metricKey] : null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.08, duration: 0.45 }}>
      <div
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onClick={() => router.push(agent.href)}
        style={{
          borderRadius: 18, padding: 24,
          background: "#ffffff",
          border: `1px solid ${hovered ? agent.accent + "40" : "#e6e9ed"}`,
          boxShadow: hovered ? `0 12px 32px rgba(0,0,0,0.08), 0 0 0 1px ${agent.accent}15` : "0 2px 8px rgba(0,0,0,0.04)",
          cursor: "pointer", transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
          position: "relative", overflow: "hidden",
        }}
      >
        {hovered && <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${agent.accent}10, transparent 70%)`, pointerEvents: "none" }} />}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${agent.accent}10`, border: `1px solid ${agent.accent}20`, display: "flex", alignItems: "center", justifyContent: "center", color: agent.accent }}>{agent.icon}</div>
            <div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 8, fontWeight: 700, color: agent.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>{agent.tag}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: "#1a1c1e", lineHeight: 1.2 }}>{agent.name}</h3>
            </div>
          </div>
          {metricValue != null && (
            <div style={{ padding: "4px 10px", borderRadius: 8, background: `${agent.accent}08`, border: `1px solid ${agent.accent}18`, fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, color: agent.accent }}>
              {String(metricValue)}{typeof metricValue === "number" && agent.metricKey !== "ats_score" ? "%" : ""}
            </div>
          )}
        </div>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#687078", lineHeight: 1.6, marginBottom: 16, position: "relative", zIndex: 1 }}>{agent.description}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 500, color: hovered ? agent.accent : "#9ea5ad", transition: "color 0.2s", position: "relative", zIndex: 1 }}>
          {agent.cta}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform: hovered ? "translateX(4px)" : "translateX(0)", transition: "transform 0.25s" }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
      </div>
    </motion.div>
  );
}
