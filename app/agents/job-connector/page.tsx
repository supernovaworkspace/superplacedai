"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Radar, Briefcase, ExternalLink } from "lucide-react";
import Button from "@/components/ui/Button";

export default function JobConnectorPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", padding: "40px 20px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {/* Nav */}
        <button 
          onClick={() => router.back()}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", color: "#687078", cursor: "pointer", fontSize: 14, fontWeight: 500, marginBottom: 40 }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        {/* Header */}
        <div style={{ marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ display: "inline-block", padding: "6px 14px", borderRadius: 20, background: "rgba(184,115,51,0.1)", border: "1px solid rgba(184,115,51,0.2)", color: "#b87333", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Placement Agent</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 600, color: "#1a1c1e", letterSpacing: "-0.02em", marginBottom: 12 }}>Job Connector</h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#687078", maxWidth: 600, lineHeight: 1.6 }}>Matches your profile to live roles on Mercor, Scale AI & Outlier in real-time.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#d4af37", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600 }}>
             <Radar size={18} /> Scanning Networks...
          </div>
        </div>

        {/* Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
          {[
            { role: "Senior Frontend Engineer", company: "Mercor", match: 94, salary: "$120k - $160k" },
            { role: "React Developer", company: "Scale AI", match: 88, salary: "$110k - $140k" },
            { role: "UI Engineer", company: "Outlier", match: 82, salary: "Contract" },
          ].map((job, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              style={{ background: "#ffffff", borderRadius: 16, padding: "24px 32px", border: "1px solid #d3d7dc", boxShadow: "0 4px 12px rgba(0,0,0,0.02)", display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "#f8f9fa", border: "1px solid #e6e9ed", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a1c1e" }}>
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 600, color: "#1a1c1e", marginBottom: 4 }}>{job.role}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#687078" }}>{job.company} • {job.salary}</p>
                </div>
              </div>
              
              <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: job.match > 90 ? "#d4af37" : "#b87333" }}>{job.match}%</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9ea5ad" }}>Match Score</div>
                </div>
                <Button>Apply <ExternalLink size={14} style={{ marginLeft: 6 }} /></Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
