"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ATSScore({ score, size = 140 }: { score: number; size?: number }) {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;
  const color = score >= 70 ? "#d4af37" : score >= 50 ? "#f59e0b" : "#ef4444";

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / 1500, 1);
      setDisplayScore(Math.round((1 - Math.pow(1 - progress, 3)) * score));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={radius} stroke="#e6e9ed" strokeWidth="8" fill="none" />
        <motion.circle cx={size/2} cy={size/2} r={radius} stroke={color} strokeWidth="8" fill="none"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.3s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: size * 0.3, fontWeight: 700, color: "#1a1c1e", lineHeight: 1 }}>{displayScore}</span>
        <span style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "#9ea5ad", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>ATS Score</span>
      </div>
    </div>
  );
}
