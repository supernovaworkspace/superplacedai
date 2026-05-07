"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", padding: "120px 48px", fontFamily: "'DM Sans', sans-serif" }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}
      >
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: "#1a1c1e", marginBottom: 24 }}>About SuperPlaced AI</h1>
        <p style={{ fontSize: 18, color: "#687078", lineHeight: 1.6, marginBottom: 40 }}>
          We are on a mission to accelerate careers using advanced AI agents. Our platform provides everything you need from resume analysis to interview preparation.
        </p>
        <a href="/" style={{ padding: "12px 24px", background: "#111418", color: "#fff", textDecoration: "none", borderRadius: 8, fontWeight: 500 }}>
          Back to Home
        </a>
      </motion.div>
    </div>
  );
}
