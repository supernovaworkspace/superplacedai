"use client";
import { motion } from "framer-motion";

const agents = ["Resume Agent", "Skill Gap", "Job Matcher", "Career Intel", "Interview AI"];

export default function WelcomeWindow({ onBegin }: { onBegin: () => void }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%", maxWidth: 640,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 28, padding: "64px 56px",
          textAlign: "center",
          boxShadow: "0 24px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
        }}
      >
        {/* Gold pill label */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "7px 18px", borderRadius: 100, marginBottom: 32,
            background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.25)",
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#d4af37", boxShadow: "0 0 8px rgba(212,175,55,0.6)" }} />
          <span style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, color: "#b8860b", letterSpacing: "0.18em", textTransform: "uppercase" }}>Superplaced AI</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 5vw, 54px)", fontWeight: 600,
            color: "#000000", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20,
          }}
        >
          Your AI placement system<br />
          <span style={{ color: "#d4af37" }}>is ready.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          style={{ fontFamily: "'DM Sans'", fontSize: 16, color: "#111418", lineHeight: 1.7, marginBottom: 44 }}
        >
          Five intelligent agents will analyze, optimize, and accelerate your career — starting now.
        </motion.p>

        {/* Agent pills */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 44 }}
        >
          {agents.map((a, i) => (
            <motion.span key={a}
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75 + i * 0.07 }}
              style={{
                padding: "6px 14px", borderRadius: 100,
                background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)",
                fontFamily: "'DM Sans'", fontSize: 11, color: "#111418", letterSpacing: "0.04em",
              }}
            >{a}</motion.span>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.85 }}
          onClick={onBegin} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
          style={{
            padding: "17px 56px", borderRadius: 100, border: "none",
            background: "linear-gradient(135deg, #d4af37 0%, #b8860b 100%)",
            color: "#000", fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans'", cursor: "pointer",
            boxShadow: "0 4px 24px rgba(212,175,55,0.35)", letterSpacing: "0.06em", textTransform: "uppercase",
          }}
        >
          Begin Setup →
        </motion.button>
      </motion.div>
    </div>
  );
}
