"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", padding: "120px 48px", fontFamily: "'DM Sans', sans-serif" }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}
      >
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: "#1a1c1e", marginBottom: 24 }}>SuperPlaced Blog</h1>
        <p style={{ fontSize: 18, color: "#687078", lineHeight: 1.6, marginBottom: 40 }}>
          Insights, tips, and strategies for accelerating your career.
        </p>
        <div style={{ padding: 40, background: "#fff", borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", marginBottom: 40, textAlign: "left" }}>
          <h2 style={{ fontSize: 24, marginBottom: 12 }}>How to ace your next technical interview</h2>
          <p style={{ color: "#9ea5ad", fontSize: 14, marginBottom: 16 }}>May 7, 2026</p>
          <p style={{ color: "#687078" }}>A comprehensive guide on what hiring managers look for in top candidates, and how our Interview AI Agent can help you prepare effectively.</p>
        </div>
        <a href="/" style={{ padding: "12px 24px", background: "#111418", color: "#fff", textDecoration: "none", borderRadius: 8, fontWeight: 500 }}>
          Back to Home
        </a>
      </motion.div>
    </div>
  );
}
