"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface OnboardingProps {
  onAnalysisStart: (file: File) => void;
}

export default function Onboarding({ onAnalysisStart }: OnboardingProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFile = useCallback((file: File) => {
    const name = file.name.toLowerCase();
    if (name.endsWith(".pdf") || name.endsWith(".docx")) setSelectedFile(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: "100%", maxWidth: 600, textAlign: "center" }}
      >
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            width: 72, height: 72, borderRadius: 20, margin: "0 auto 32px",
            background: "rgba(212,175,55,0.06)", border: "1px solid rgba(212,175,55,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        </motion.div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600,
          color: "#1a1c1e", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 16,
        }}>
          Upload your resume to activate your{" "}<span style={{ color: "#d4af37" }}>AI career agents</span>
        </h1>

        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#687078",
          lineHeight: 1.7, maxWidth: 480, margin: "0 auto 40px",
        }}>
          Our AI agents will analyze your profile, calculate ATS score, identify skill gaps, and prepare your placement roadmap.
        </p>

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => document.getElementById("onboard-file")?.click()}
          style={{
            border: `2px dashed ${dragOver ? "#d4af37" : selectedFile ? "rgba(212,175,55,0.4)" : "#d3d7dc"}`,
            borderRadius: 20, padding: "48px 32px",
            background: dragOver ? "rgba(212,175,55,0.03)" : selectedFile ? "rgba(212,175,55,0.02)" : "#fafbfc",
            cursor: "pointer", transition: "all 0.3s", marginBottom: 24,
          }}
        >
          <input id="onboard-file" type="file" accept=".pdf,.docx" style={{ display: "none" }}
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          {selectedFile ? (
            <div>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
              <p style={{ fontSize: 16, fontWeight: 600, color: "#d4af37", marginBottom: 4, fontFamily: "'DM Sans'" }}>{selectedFile.name}</p>
              <p style={{ fontSize: 13, color: "#9ea5ad", fontFamily: "'DM Sans'" }}>{(selectedFile.size / 1024).toFixed(0)} KB — Click to change</p>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
              <p style={{ fontSize: 16, fontWeight: 600, color: "#1a1c1e", marginBottom: 4, fontFamily: "'DM Sans'" }}>Drop your resume here or click to browse</p>
              <p style={{ fontSize: 13, color: "#9ea5ad", fontFamily: "'DM Sans'" }}>Supports PDF and DOCX files</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <motion.button
            whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
            onClick={() => { if (selectedFile) onAnalysisStart(selectedFile); }}
            disabled={!selectedFile}
            style={{
              padding: "14px 36px", borderRadius: 12, border: "none",
              background: selectedFile ? "#d4af37" : "#e6e9ed",
              color: selectedFile ? "#fff" : "#9ea5ad",
              fontSize: 14, fontWeight: 600, cursor: selectedFile ? "pointer" : "not-allowed",
              fontFamily: "'DM Sans'", boxShadow: selectedFile ? "0 4px 16px rgba(212,175,55,0.25)" : "none",
            }}
          >
            Upload Resume →
          </motion.button>

          <motion.button whileHover={{ scale: 1.02 }} style={{
            padding: "14px 28px", borderRadius: 12, background: "#f4f5f7",
            border: "1px solid #e6e9ed", color: "#687078", fontSize: 14, fontWeight: 500,
            cursor: "pointer", fontFamily: "'DM Sans'", display: "flex", alignItems: "center", gap: 8,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0077b5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            Continue with LinkedIn
          </motion.button>
        </div>

        <p style={{ marginTop: 32, fontSize: 12, color: "#9ea5ad", fontFamily: "'DM Sans'" }}>
          Want to explore first?{" "}
          <button onClick={() => onAnalysisStart(null as unknown as File)}
            style={{ background: "none", border: "none", color: "#687078", cursor: "pointer", textDecoration: "underline", fontFamily: "inherit", fontSize: "inherit" }}>
            Skip to dashboard →
          </button>
        </p>
      </motion.div>
    </div>
  );
}
