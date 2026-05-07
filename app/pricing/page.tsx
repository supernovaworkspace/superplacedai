"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", padding: "120px 48px", fontFamily: "'DM Sans', sans-serif" }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}
      >
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, color: "#1a1c1e", marginBottom: 24 }}>Pricing</h1>
        <p style={{ fontSize: 18, color: "#687078", lineHeight: 1.6, marginBottom: 40 }}>
          Simple, transparent pricing. Invest in your career growth today.
        </p>
        <div style={{ padding: 40, background: "#fff", borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", marginBottom: 40 }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>Pro Plan</h2>
          <div style={{ fontSize: 40, fontWeight: 700, marginBottom: 24 }}>$29<span style={{ fontSize: 16, color: "#687078", fontWeight: 400 }}>/month</span></div>
          <p style={{ color: "#687078", marginBottom: 24 }}>Full access to all 5 AI Agents.</p>
        </div>
        <a href="/" style={{ padding: "12px 24px", background: "#111418", color: "#fff", textDecoration: "none", borderRadius: 8, fontWeight: 500 }}>
          Back to Home
        </a>
      </motion.div>
    </div>
  );
}
