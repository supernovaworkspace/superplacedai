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
        backgroundColor: "#0a0a0a",
        backgroundImage: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
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
            color: "#fff",
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            lineHeight: 1.1,
            textShadow: "0 4px 24px rgba(0,0,0,0.5)",
          }}
        >
          Get Started With
          <br />
          <span style={{ color: "transparent", WebkitTextStroke: "1.5px #fff" }}>
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
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Local Video Embed */}
        <video 
          src="/Video Project 1 (4).mp4"
          autoPlay
          muted
          loop
          playsInline
          controls
          style={{ 
            width: "100%", 
            height: "100%", 
            position: "absolute", 
            top: 0, 
            left: 0, 
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
            backgroundColor: "#000"
          }}
        />
      </motion.div>
    </section>
  );
}
