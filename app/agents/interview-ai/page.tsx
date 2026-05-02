"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, XCircle, CheckCircle, Video, Mic, Settings, Play } from "lucide-react";
import { useRouter } from "next/navigation";

const ROLES = [
  "My Job Description", "Business Analyst", "Product Manager",
  "Software Engineer", "Marketing Specialist", "Data Analyst",
  "Customer Service Representative", "Sales Representative", "Human Resources"
];

const TESTIMONIALS = [
  { name: "Henry Tran", role: "Marketing Operations", quote: "I used your product for an interview I had yesterday, and sure enough ", highlight: "one of the generated questions came up" },
  { name: "Jenny Jiang", role: "Software Engineer", quote: "Great tool for anyone who's preparing for an interview in tech, ", highlight: "helped me ace my interviews!" },
  { name: "Charles Burr", role: "UX Designer", quote: "Love interviews by AI, it has saved me so ", highlight: "much", quoteEnd: " prepping time." }
];

export default function InterviewAIPage() {
  const router = useRouter();
  const [activeInterview, setActiveInterview] = useState<string | null>(null);

  // Smooth scroll to top when mounting
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (activeInterview) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#fff", display: "flex", flexDirection: "column", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 18, fontWeight: 600 }}>Mock Interview: {activeInterview}</span>
            <span style={{ padding: "4px 12px", background: "rgba(45,212,191,0.2)", color: "#2dd4bf", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>LIVE</span>
          </div>
          <button onClick={() => setActiveInterview(null)} style={{ background: "#334155", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 500 }}>
            End Session
          </button>
        </div>
        
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
          <div style={{ position: "relative", width: "100%", maxWidth: 1000, aspectRatio: "16/9", background: "#1e293b", borderRadius: 24, overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 24px 48px rgba(0,0,0,0.5)" }}>
            <div style={{ width: 120, height: 120, borderRadius: "50%", background: "#334155", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <span style={{ fontSize: 48 }}>🤖</span>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 500, color: "#cbd5e1" }}>AI Hiring Manager is waiting...</h2>
            
            <div style={{ position: "absolute", bottom: 32, display: "flex", gap: 16, background: "rgba(15,23,42,0.8)", padding: "12px 24px", borderRadius: 40, backdropFilter: "blur(10px)" }}>
              <button style={{ width: 48, height: 48, borderRadius: "50%", background: "#ef4444", border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Mic size={20} /></button>
              <button style={{ width: 48, height: 48, borderRadius: "50%", background: "#ef4444", border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Video size={20} /></button>
              <button style={{ width: 48, height: 48, borderRadius: "50%", background: "#334155", border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Settings size={20} /></button>
              <div style={{ width: 1, height: 48, background: "#475569", margin: "0 8px" }} />
              <button style={{ height: 48, padding: "0 24px", borderRadius: 24, background: "#2dd4bf", color: "#0f172a", border: "none", fontSize: 16, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <Play fill="currentColor" size={16} /> Start Recording
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "'DM Sans', sans-serif", color: "#0f172a", paddingBottom: 100 }}>
      {/* Top Navigation */}
      <div style={{ padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9" }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/logo.png" alt="Logo" style={{ height: 60, filter: "invert(1) brightness(0)" }} />
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" }}>Interview AI</span>
        </a>
        <button onClick={() => router.push("/dashboard")} style={{ background: "transparent", border: "none", color: "#64748b", fontWeight: 600, cursor: "pointer" }}>
          Back to Dashboard
        </button>
      </div>

      {/* Hero Section */}
      <div style={{ background: "#f8fafc", padding: "100px 20px", textAlign: "center", marginBottom: 60 }}>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, margin: "0 auto 32px", maxWidth: 800 }}>
          Ready to start<br/>
          <span style={{ background: "rgba(45, 212, 191, 0.15)", padding: "4px 12px" }}>mastering your interview skills?</span>
        </h1>
        <button 
          onClick={() => setActiveInterview("General Interview")}
          style={{ background: "#334155", color: "#fff", border: "none", borderRadius: 30, padding: "16px 36px", fontSize: 18, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", transition: "transform 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
        >
          Try now for free <ArrowRight size={20} />
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        
        {/* Roles Grid */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div style={{ display: "inline-block", background: "rgba(45,212,191,0.1)", color: "#0d9488", padding: "4px 16px", borderRadius: 20, fontSize: 14, fontWeight: 500, marginBottom: 24 }}>
            Quick start
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>Works for every type of job interview and role</h2>
          <p style={{ color: "#64748b", fontSize: 18, marginBottom: 48 }}>Provide your own job description or choose from our sample roles.</p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, textAlign: "left" }}>
            {ROLES.map((role) => (
              <button 
                key={role} 
                onClick={() => setActiveInterview(role)}
                style={{ background: "#ffffff", border: "1px solid #e2e8f0", padding: "24px", borderRadius: 12, fontSize: 18, fontWeight: 500, color: "#0f172a", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)"; e.currentTarget.style.transform = "none"; }}
              >
                {role} <ArrowRight size={18} color="#94a3b8" />
              </button>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div style={{ textAlign: "center", marginBottom: 100 }}>
          <div style={{ display: "inline-block", background: "rgba(45,212,191,0.1)", color: "#0d9488", padding: "4px 16px", borderRadius: 20, fontSize: 14, fontWeight: 500, marginBottom: 24 }}>
            Success stories
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>
            Interviews by AI helped these job seekers and <span style={{ color: "#0d9488" }}>50,000+</span> more
          </h2>
          <p style={{ color: "#64748b", fontSize: 18, marginBottom: 48 }}>You&apos;re a mock interview away from your dream job.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "#f8fafc", padding: "40px 32px", borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#e2e8f0", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>👤</div>
                <div style={{ fontSize: 15, color: "#64748b", marginBottom: 24 }}>{t.name} &bull; {t.role}</div>
                <p style={{ fontSize: 18, fontStyle: "italic", lineHeight: 1.6, marginBottom: 32, color: "#334155" }}>
                  &quot;{t.quote}
                  <span style={{ color: "#0d9488" }}>{t.highlight}</span>
                  {t.quoteEnd}&quot;
                </p>
                <div style={{ display: "flex", gap: 4, color: "#2dd4bf", marginTop: "auto" }}>
                  {[1,2,3,4,5].map(n => <Star key={n} fill="currentColor" size={24} />)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <div style={{ background: "#f8fafc", borderRadius: 24, padding: "80px 60px", display: "flex", alignItems: "center", gap: 60, marginBottom: 100, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px" }}>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              Make your next job interview<br/>
              <span style={{ background: "rgba(45, 212, 191, 0.15)", padding: "0 8px" }}>stress-free thanks to AI</span>
            </h2>
          </div>
          
          <div style={{ flex: "1 1 400px", display: "flex", gap: 24 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", textAlign: "center", marginBottom: 8 }}>Without Interviews by AI</div>
              {["Unprepared", "Nervous", "Ghosted"].map((text) => (
                <div key={text} style={{ background: "#fee2e2", color: "#b91c1c", padding: "16px", borderRadius: 8, display: "flex", alignItems: "center", gap: 12, fontWeight: 500, fontSize: 18 }}>
                  <XCircle size={20} /> {text}
                </div>
              ))}
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 44, color: "#94a3b8", paddingTop: 40 }}>
              <ArrowRight size={20} />
              <ArrowRight size={20} />
              <ArrowRight size={20} />
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", textAlign: "center", marginBottom: 8 }}>With Interviews by AI</div>
              {["Organized and ready", "Confident answers", "Hired!"].map((text) => (
                <div key={text} style={{ background: "#2dd4bf", color: "#ffffff", padding: "16px", borderRadius: 8, display: "flex", alignItems: "center", gap: 12, fontWeight: 600, fontSize: 18 }}>
                  <CheckCircle size={20} /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Floating CTA */}
      <motion.div 
        initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.5, type: "spring" }}
        style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 50 }}
      >
        <button 
          onClick={() => setActiveInterview("Custom Role")}
          style={{ background: "#334155", color: "#fff", border: "none", borderRadius: 30, padding: "16px 36px", fontSize: 18, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", boxShadow: "0 12px 24px rgba(15,23,42,0.25)", transition: "transform 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
        >
          Start an interview <ArrowRight size={20} />
        </button>
      </motion.div>
    </motion.div>
  );
}
