"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FAQPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", padding: "120px 48px", fontFamily: "'DM Sans', sans-serif" }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}
      >
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: "#1a1c1e", marginBottom: 24 }}>Frequently Asked Questions</h1>
        <p style={{ fontSize: 18, color: "#687078", lineHeight: 1.6, marginBottom: 40 }}>
          Got questions? We've got answers.
        </p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 24, textAlign: "left", marginBottom: 40 }}>
          <div style={{ padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>How does the AI Resume Analyzer work?</h3>
            <p style={{ color: "#687078", lineHeight: 1.5 }}>Our AI analyzes your resume against industry standards and specific job descriptions to provide actionable feedback and beautiful templates.</p>
          </div>
          <div style={{ padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Is SuperPlaced AI free?</h3>
            <p style={{ color: "#687078", lineHeight: 1.5 }}>We offer a generous free tier for early access users, along with premium features for advanced career acceleration.</p>
          </div>
        </div>

        <a href="/" style={{ padding: "12px 24px", background: "#111418", color: "#fff", textDecoration: "none", borderRadius: 8, fontWeight: 500 }}>
          Back to Home
        </a>
      </motion.div>
    </div>
  );
}
