"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, UploadCloud, FileText, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ResumeAnalyzerPage() {
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
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: "inline-block", padding: "6px 14px", borderRadius: 20, background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", color: "#d4af37", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Analysis Agent</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 600, color: "#1a1c1e", letterSpacing: "-0.02em", marginBottom: 12 }}>Resume Analyzer</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#687078", maxWidth: 600, lineHeight: 1.6 }}>AI scans your resume against live industry benchmarks to provide a detailed strength and gap report.</p>
        </div>

        {/* Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {/* Upload Zone */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: "#ffffff", borderRadius: 24, padding: 40, border: "1px dashed #d3d7dc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}
          >
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(212,175,55,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#d4af37", marginBottom: 24 }}>
              <UploadCloud size={32} />
            </div>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 600, color: "#1a1c1e", marginBottom: 8 }}>Upload your Resume</h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#9ea5ad", marginBottom: 24 }}>PDF, DOCX up to 5MB</p>
            <Button>Select File</Button>
          </motion.div>

          {/* Report Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ background: "#ffffff", borderRadius: 24, padding: 32, border: "1px solid #d3d7dc", boxShadow: "0 12px 32px rgba(0,0,0,0.03)" }}
          >
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: "#1a1c1e", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}><FileText size={18} /> Sample Report</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { title: "ATS Compatibility", score: 92 },
                { title: "Impact Metrics", score: 65 },
                { title: "Skill Density", score: 84 },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#687078", marginBottom: 8 }}>
                    <span>{item.title}</span>
                    <span style={{ color: item.score > 80 ? "#d4af37" : "#b87333" }}>{item.score}%</span>
                  </div>
                  <div style={{ width: "100%", height: 6, background: "#f0f2f5", borderRadius: 3 }}>
                    <div style={{ width: `${item.score}%`, height: "100%", background: item.score > 80 ? "#d4af37" : "#b87333", borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, padding: 16, background: "rgba(184,115,51,0.05)", borderLeft: "3px solid #b87333", borderRadius: "0 8px 8px 0" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1a1c1e", lineHeight: 1.6 }}><strong>AI Insight:</strong> Your impact metrics are lower than the industry average for Senior roles. Consider adding specific quantifiable achievements to your recent experiences.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
