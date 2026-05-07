"use client";
import { motion } from "framer-motion";
import ATSScore from "./ATSScore";

interface StatsBarProps { atsScore: number; skillCoverage: number; interviewReadiness: number; }

function MiniStat({ label, value, suffix, color, delay }: { label: string; value: string; suffix?: string; color: string; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4 }}
      style={{
        flex: 1, padding: "18px 20px", borderRadius: 16,
        background: "#ffffff", border: "1px solid #e6e9ed",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}>
      <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#9ea5ad", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color, lineHeight: 1 }}>
        {value}{suffix && <span style={{ fontSize: 16, color: "#d3d7dc" }}>{suffix}</span>}
      </div>
    </motion.div>
  );
}

export default function StatsBar({ atsScore, skillCoverage, interviewReadiness }: StatsBarProps) {
  const resumeStrength = atsScore >= 80 ? "Strong" : atsScore >= 60 ? "Good" : atsScore >= 40 ? "Fair" : "Weak";
  const strengthColor = atsScore >= 80 ? "#22c55e" : atsScore >= 60 ? "#d4af37" : atsScore >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
      style={{ display: "flex", gap: 16, marginBottom: 40, flexWrap: "wrap" }}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        style={{
          padding: "20px 28px", borderRadius: 16, background: "#ffffff",
          border: "1px solid #e6e9ed", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          display: "flex", alignItems: "center", gap: 20, minWidth: 220,
        }}>
        <ATSScore score={atsScore} size={80} />
        <div>
          <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#9ea5ad", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Resume ATS</div>
          <a href="/agents/resume-analyzer" style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#d4af37", textDecoration: "none", fontWeight: 500 }}>View report →</a>
        </div>
      </motion.div>
      <MiniStat label="Skill Coverage" value={`${skillCoverage}`} suffix="%" color="#818cf8" delay={0.2} />
      <MiniStat label="Interview Ready" value={`${interviewReadiness}`} suffix="%" color="#38bdf8" delay={0.3} />
      <MiniStat label="Resume Strength" value={resumeStrength} color={strengthColor} delay={0.4} />
    </motion.div>
  );
}
