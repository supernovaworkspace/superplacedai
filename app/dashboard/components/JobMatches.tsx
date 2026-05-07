"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const mockJobs = [
  { company: "Mercor", role: "AI Engineer", type: "Remote", match: 92, salary: "$80k – $120k" },
  { company: "Scale AI", role: "Data Annotator Lead", type: "Remote", match: 85, salary: "$60k – $90k" },
  { company: "Outlier", role: "AI Trainer", type: "Remote", match: 78, salary: "$40k – $70k" },
  { company: "Turing", role: "Full Stack Developer", type: "Remote", match: 74, salary: "$70k – $110k" },
];

export default function JobMatches() {
  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 600, color: "#9ea5ad", letterSpacing: "0.14em", textTransform: "uppercase" }}>Recommended Jobs</span>
        <div style={{ flex: 1, height: 1, background: "#e6e9ed" }} />
        <a href="/agents/job-connector" style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#d4af37", textDecoration: "none", fontWeight: 500 }}>View all →</a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }} className="jobs-grid">
        {mockJobs.map((job, i) => <JobCard key={job.company + job.role} job={job} index={i} />)}
      </div>
      <style>{`@media (max-width: 768px) { .jobs-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function JobCard({ job, index }: { job: typeof mockJobs[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + index * 0.08, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: "18px 20px", borderRadius: 14, background: "#ffffff",
        border: `1px solid ${hovered ? "rgba(251,146,60,0.3)" : "#e6e9ed"}`,
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.06)" : "0 2px 6px rgba(0,0,0,0.03)",
        cursor: "pointer", transition: "all 0.25s",
      }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <h4 style={{ fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: "#1a1c1e", marginBottom: 2 }}>{job.role}</h4>
          <span style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#9ea5ad" }}>{job.company}</span>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: `conic-gradient(#fb923c ${job.match * 3.6}deg, #e6e9ed 0deg)`,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'DM Sans'", fontSize: 9, fontWeight: 700, color: "#fb923c",
          }}>{job.match}%</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ padding: "3px 8px", borderRadius: 6, background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.15)", fontFamily: "'DM Sans'", fontSize: 10, fontWeight: 500, color: "#38bdf8" }}>{job.type}</span>
        <span style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "#9ea5ad" }}>{job.salary}</span>
      </div>
    </motion.div>
  );
}
