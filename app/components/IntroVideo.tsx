"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";

export default function IntroVideo() {
  const [showIntro, setShowIntro] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasSeenIntro = sessionStorage.getItem("superplaced_intro_seen");
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleEnterSite = () => {
    sessionStorage.setItem("superplaced_intro_seen", "true");
    setShowIntro(false);
  };

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="intro-video"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#111418", // Dark gunmetal to match metallic theme
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}>
            <video 
              src="/intro-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          
          <div style={{ position: "absolute", bottom: 40, zIndex: 10, textAlign: "center", width: "100%" }}>
            <button 
              onClick={handleEnterSite}
              style={{
                padding: "14px 32px",
                borderRadius: 12,
                background: "#d4af37",
                color: "#1a1c1e",
                fontSize: 16,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: "0 8px 24px rgba(212,175,55,0.4)"
              }}
            >
              Enter Superplaced AI
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
