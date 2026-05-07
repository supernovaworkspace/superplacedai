"use client";
import { motion } from "framer-motion";

const activities = [
  { action: "Resume analyzed", detail: "ATS evaluation complete", time: "just now", icon: "📄" },
  { action: "ATS score generated", detail: "Score calculated successfully", time: "1 min ago", icon: "🎯" },
  { action: "Skill gaps detected", detail: "Analysis completed", time: "2 min ago", icon: "🔍" },
  { action: "Jobs matched", detail: "4 matching roles found", time: "3 min ago", icon: "💼" },
  { action: "AI agents activated", detail: "All systems online", time: "3 min ago", icon: "🤖" },
];

export default function ActivityTimeline() {
  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 600, color: "#9ea5ad", letterSpacing: "0.14em", textTransform: "uppercase" }}>Recent Activity</span>
        <div style={{ flex: 1, height: 1, background: "#e6e9ed" }} />
      </div>
      <div style={{ padding: "20px 24px", borderRadius: 16, background: "#ffffff", border: "1px solid #e6e9ed", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        {activities.map((item, i) => (
          <motion.div key={item.action} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1, duration: 0.35 }}
            style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "12px 0", borderBottom: i < activities.length - 1 ? "1px solid #f0f2f5" : "none" }}>
            <div style={{ minWidth: 24, textAlign: "center", paddingTop: 2 }}><span style={{ fontSize: 16 }}>{item.icon}</span></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 500, color: "#1a1c1e", marginBottom: 2 }}>{item.action}</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#9ea5ad" }}>{item.detail}</div>
            </div>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#d3d7dc", whiteSpace: "nowrap", paddingTop: 2 }}>{item.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
