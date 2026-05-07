"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadWindowProps {
  onUploaded: (file: File | null) => void;
  onSkip: () => void;
  onBack: () => void;
}

export default function UploadWindow({ onUploaded, onSkip, onBack }: UploadWindowProps) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFile = useCallback((f: File) => {
    const name = f.name.toLowerCase();
    if (name.endsWith(".pdf") || name.endsWith(".docx")) {
      setFile(f);
      setSuccess(true);
      setTimeout(() => onUploaded(f), 1000);
    }
  }, [onUploaded]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative" }}>
      {/* Back button */}
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        onClick={onBack}
        style={{ position: "fixed", top: 32, left: 32, background: "rgba(255,255,255,0.8)", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 100, padding: "8px 18px", color: "#687078", cursor: "pointer", fontFamily: "'DM Sans'", fontSize: 12, display: "flex", alignItems: "center", gap: 6, backdropFilter: "blur(10px)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
        Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%", maxWidth: 560,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 28, padding: "52px 52px",
          boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
        }}
      >
        {/* Step indicator */}
        <div style={{ display: "flex", gap: 6, marginBottom: 36 }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} style={{ flex: i === 1 ? 2 : 1, height: 4, borderRadius: 2, background: i === 1 ? "#000000" : i < 1 ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.08)" }} />
          ))}
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, color: "#000000", letterSpacing: "-0.02em", marginBottom: 10 }}>
          Upload Your Resume
        </h2>
        <p style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "#000000", marginBottom: 32, lineHeight: 1.6 }}>
          Our AI agents will build your personalized placement roadmap in seconds.
        </p>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div key="success"
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              style={{ border: "2px solid rgba(34,197,94,0.3)", borderRadius: 20, padding: "44px 32px", background: "rgba(34,197,94,0.04)", marginBottom: 28, textAlign: "center" }}
            >
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400 }}
                style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              </motion.div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 600, color: "#16a34a", marginBottom: 4 }}>Resume uploaded successfully</p>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#9ea5ad" }}>{file?.name} · Analyzing now...</p>
            </motion.div>
          ) : (
            <motion.div key="drop"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onClick={() => document.getElementById("sp-upload")?.click()}
              style={{
                border: `2px dashed ${dragOver ? "#d4af37" : "rgba(0,0,0,0.1)"}`,
                borderRadius: 20, padding: "48px 32px", cursor: "pointer", textAlign: "center",
                background: dragOver ? "rgba(212,175,55,0.04)" : "rgba(0,0,0,0.01)",
                transition: "all 0.25s", marginBottom: 28,
                boxShadow: dragOver ? "0 0 0 4px rgba(212,175,55,0.08)" : "none",
              }}
            >
              <input id="sp-upload" type="file" accept=".pdf,.docx" style={{ display: "none" }}
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
              <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              </div>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 600, color: dragOver ? "#b8860b" : "#000000", marginBottom: 6 }}>
                Drop your resume here or click to browse
              </p>
              <p style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#111418" }}>PDF or DOCX · Max 10MB</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button style={{ flex: 1, padding: "13px 0", borderRadius: 12, background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)", color: "#111418", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans'", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#0077b5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            Import LinkedIn
          </button>
          <button onClick={onSkip} style={{ padding: "13px 20px", background: "none", border: "none", color: "#111418", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans'" }}>
            Skip →
          </button>
        </div>
      </motion.div>
    </div>
  );
}
