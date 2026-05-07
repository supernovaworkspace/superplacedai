"use client";
import { motion } from "framer-motion";
import StatsBar from "./StatsBar";
import AgentCards from "./AgentCards";
import JobMatches from "./JobMatches";
import ActivityTimeline from "./ActivityTimeline";

interface DashboardHomeProps { analysis: Record<string, unknown> | null; }

export default function DashboardHome({ analysis }: DashboardHomeProps) {
  const atsScore = (analysis?.ats_score as number) || 65;
  const skillCoverage = (analysis?.skill_coverage as number) || 55;
  const interviewReadiness = (analysis?.interview_readiness as number) || 50;

  return (
    <div style={{ padding: "40px 40px 80px" }}>
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: 32 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "5px 14px", borderRadius: 20,
          background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.12)",
          marginBottom: 16,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.4)" }} />
          <span style={{ fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 600, color: "#9ea5ad", letterSpacing: "0.1em", textTransform: "uppercase" }}>All agents online</span>
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 38px)",
          fontWeight: 600, color: "#1a1c1e", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 8,
        }}>Welcome back</h1>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#687078", maxWidth: 450 }}>
          Your AI agents are actively optimizing your placement journey.
        </p>
      </motion.div>

      <StatsBar atsScore={atsScore} skillCoverage={skillCoverage} interviewReadiness={interviewReadiness} />
      <AgentCards analysis={analysis as Record<string, unknown>} />
      <JobMatches />
      <ActivityTimeline />
    </div>
  );
}
