"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function IntelligenceCore() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  return (
    <section
      ref={sectionRef}
      style={{
        background: "transparent",
        padding: "120px 24px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", marginBottom: 64 }}
      >
        <h2
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 900,
            color: "#111",
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            lineHeight: 1.1,
            textShadow: "0 4px 24px rgba(255,255,255,0.5)",
          }}
        >
          Get Started With
          <br />
          <span style={{ color: "transparent", WebkitTextStroke: "1.5px #111" }}>
            Superplaced AI
          </span>
        </h2>
      </motion.div>

      {/* Video Placeholder Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: "100%",
          maxWidth: "1000px",
          aspectRatio: "16/9",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.3)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 32px 64px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget.querySelector(".play-btn") as HTMLElement).style.transform = "scale(1.1)";
          (e.currentTarget.querySelector(".play-btn") as HTMLElement).style.background = "#111";
          (e.currentTarget.querySelector(".play-btn") as HTMLElement).style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget.querySelector(".play-btn") as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget.querySelector(".play-btn") as HTMLElement).style.background = "rgba(255,255,255,0.8)";
          (e.currentTarget.querySelector(".play-btn") as HTMLElement).style.color = "#111";
        }}
      >
        {/* Play Button */}
        <div
          className="play-btn"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.8)",
            color: "#111",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
            zIndex: 2,
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ marginLeft: "4px" }}
          >
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
        </div>

        {/* Placeholder Text */}
        <p
          style={{
            marginTop: "24px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            color: "#111",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            zIndex: 2,
          }}
        >
          Video Placeholder
        </p>

        {/* Decorative Grid inside placeholder */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.5,
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </section>
  );
}
