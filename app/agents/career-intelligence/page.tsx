"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronDown, CheckCircle, Download, Square, CheckSquare, Sparkles, Loader2, Copy, Check, TrendingUp } from "lucide-react";

// Dropdown Options
const INDUSTRY_OPTIONS = ["Generic", "Technology", "Finance", "Healthcare", "Marketing", "Design", "Operations"];
const EXPERIENCE_OPTIONS = ["Beginner", "Junior", "Mid-Level", "Professional", "Senior", "Executive"];
const REGION_OPTIONS = ["Global", "North America", "Europe", "Asia", "Remote"];

// Reusable Dropdown Component
function Dropdown({ options, value, onChange, placeholder }: { options: string[], value: string, onChange: (v: string) => void, placeholder: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          padding: "8px 16px", background: isOpen ? "#ddd6fe" : "#ede9fe", border: "none", 
          borderRadius: 24, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", 
          color: "#8b5cf6", fontSize: 14, fontWeight: 500, transition: "background 0.2s" 
        }}
      >
        {value || placeholder} <ChevronDown size={16} style={{ transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            style={{
              position: "absolute", top: "100%", left: 0, marginTop: 8, background: "#fff", 
              borderRadius: 16, border: "1px solid #ede9fe", boxShadow: "0 12px 32px rgba(139, 92, 246, 0.15)", 
              zIndex: 50, minWidth: 160, overflow: "hidden"
            }}
          >
            {options.map((opt) => (
              <div 
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                style={{ 
                  padding: "10px 16px", cursor: "pointer", fontSize: 14, color: value === opt ? "#8b5cf6" : "#5d6571", 
                  background: value === opt ? "#f5f3ff" : "#fff", fontWeight: value === opt ? 600 : 400
                }}
                onMouseEnter={(e) => { if(value !== opt) e.currentTarget.style.background = "#fafafa"; }}
                onMouseLeave={(e) => { if(value !== opt) e.currentTarget.style.background = "#fff"; }}
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CareerIntelligencePage() {
  const router = useRouter();

  // Form State
  const [industry, setIndustry] = useState(INDUSTRY_OPTIONS[0]);
  const [experience, setExperience] = useState(EXPERIENCE_OPTIONS[3]);
  const [region, setRegion] = useState(REGION_OPTIONS[0]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [instructions, setInstructions] = useState("");
  
  const [targetRole, setTargetRole] = useState("");

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!targetRole) return;
    setIsGenerating(true);
    
    // Simulate API delay for mock data
    setTimeout(() => {
      setAnalysisResult({
        role: targetRole,
        salaryRange: "$110k - $160k",
        marketDemand: "High Growth (+14% YoY)",
        topCompanies: ["OpenAI", "Google", "Scale AI", "Anthropic", "Mercor"],
        futureOutlook: "The demand for " + targetRole + " professionals is rapidly expanding due to the mainstream adoption of generative models. Key focus areas are transitioning from pure research to applied product engineering.",
        keySkills: ["Large Language Models (LLMs)", "Prompt Engineering", "Python", "Cloud Architecture"],
      });
      setShowResults(true);
      setIsGenerating(false);
      setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
    }, 1500);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(180deg, #faf5ff 0%, #ffffff 20%)", 
      fontFamily: "'DM Sans', sans-serif",
      position: "relative"
    }}>
      {/* Top Navigation */}
      <div style={{ padding: "24px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <img src="/logo.png" alt="SuperPlaced AI Logo" style={{ height: 160, filter: "invert(1) brightness(0)" }} />
        </a>
        <button 
          onClick={() => router.push("/dashboard")}
          style={{ background: "transparent", border: "none", color: "#8b5cf6", fontSize: 15, fontWeight: 600, cursor: "pointer", padding: "8px 16px", borderRadius: 20, transition: "background 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#ede9fe"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        >
          Back to Dashboard
        </button>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", padding: "20px 20px 120px" }}>
        
        {/* Header Title Area */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <h1 style={{ fontSize: "44px", fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
              <span style={{ background: "linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Career Intelligence
              </span>
              {" "}
              <span style={{ background: "linear-gradient(90deg, #c4b5fd 0%, #ddd6fe 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Agent
              </span>
            </h1>
            <span style={{ padding: "6px 16px", background: "#f5f3ff", color: "#8b5cf6", borderRadius: 20, fontSize: 14, fontWeight: 500 }}>
              Market Insights
            </span>
          </div>
          <p style={{ color: "#7a828a", fontSize: 18, margin: 0 }}>
            Unlock real-time market trends, salary data, and growth paths for your next role.
          </p>
        </div>

        {/* Input Form Area */}
        <div style={{ maxWidth: 840, margin: "0 auto", marginBottom: 80 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", justifyContent: "center" }}>
            
            <Dropdown options={INDUSTRY_OPTIONS} value={industry} onChange={setIndustry} placeholder="Generic" />
            <Dropdown options={EXPERIENCE_OPTIONS} value={experience} onChange={setExperience} placeholder="Professional" />
            <Dropdown options={REGION_OPTIONS} value={region} onChange={setRegion} placeholder="Global" />
            
            <button 
              onClick={() => setShowInstructions(!showInstructions)}
              style={{ 
                padding: "8px 16px", background: showInstructions ? "#ddd6fe" : "#ede9fe", border: "none", 
                borderRadius: 24, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", 
                color: "#8b5cf6", fontSize: 14, fontWeight: 500, transition: "background 0.2s" 
              }}
            >
              {showInstructions ? <CheckSquare size={16} strokeWidth={2.5} /> : <Square size={16} strokeWidth={2.5} />} 
              Specific parameters (optional)
            </button>
          </div>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                style={{ overflow: "hidden" }}
              >
                <textarea 
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="E.g., Focus on FAANG companies and base compensation only..."
                  style={{
                    width: "100%", padding: 16, borderRadius: 16, border: "1px solid #ede9fe", 
                    outline: "none", fontSize: 15, fontFamily: "inherit", color: "#1a1c1e",
                    background: "#ffffff", minHeight: 80, resize: "vertical", boxShadow: "0 4px 12px rgba(139, 92, 246, 0.05)"
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Input Pill */}
          <div style={{ 
            display: "flex", alignItems: "center", background: "#ffffff", border: "1px solid #8b5cf6", 
            borderRadius: 40, padding: "8px 8px 8px 32px", boxShadow: "0 8px 24px rgba(139, 92, 246, 0.08)",
            opacity: isGenerating ? 0.7 : 1, pointerEvents: isGenerating ? "none" : "auto", transition: "all 0.3s"
          }}>
            <input 
              type="text" 
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="Target Role (e.g. AI Product Manager)" 
              style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#1a1c1e", background: "transparent" }}
            />
            <button 
              onClick={handleGenerate}
              disabled={!targetRole || isGenerating}
              style={{
                background: (!targetRole && !isGenerating) ? "#e1e5e9" : "linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)",
                color: (!targetRole && !isGenerating) ? "#a0aab2" : "#fff",
                border: "none", borderRadius: 30, padding: "12px 32px", fontSize: 16, fontWeight: 600, 
                cursor: (!targetRole && !isGenerating) ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: 8, 
                boxShadow: (!targetRole && !isGenerating) ? "none" : "0 4px 12px rgba(139, 92, 246, 0.3)",
                transition: "all 0.3s"
              }}
            >
              {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} fill={targetRole ? "#ffffff" : "transparent"} />} 
              {isGenerating ? "Analyzing..." : "Generate Insights"}
            </button>
          </div>
        </div>

        {/* Benefits text */}
        <AnimatePresence>
          {!showResults && (
            <motion.div exit={{ opacity: 0, height: 0, overflow: "hidden" }} style={{ textAlign: "center", marginBottom: 80 }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 32, flexWrap: "wrap" }}>
                {[ "Compensation Benchmarks", "Industry Trajectory", "Top Hiring Employers" ].map((text, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "#8b5cf6", fontSize: 18, fontWeight: 500 }}>
                    <TrendingUp size={24} strokeWidth={2.5} /> {text}
                  </div>
                ))}
              </div>
              <p style={{ color: "#5d6571", fontSize: 18, maxWidth: 900, margin: "0 auto", lineHeight: 1.6 }}>
                Stop guessing your worth. Our Career Intelligence agent pulls real-time data to give you the upper hand in your next job hunt.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && analysisResult && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ maxWidth: 900, margin: "0 auto" }}
            >
              {/* Results Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={{ fontSize: 24, fontWeight: 500, color: "#1a1c1e", margin: 0 }}>Market Intelligence Report</h2>
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={handleCopy} style={{ padding: "8px 20px", background: "#f5f3ff", border: "none", borderRadius: 20, color: "#8b5cf6", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.2s" }} onMouseEnter={(e)=>e.currentTarget.style.background="#ede9fe"} onMouseLeave={(e)=>e.currentTarget.style.background="#f5f3ff"}>
                    {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                  </button>
                  <button style={{ padding: "8px 20px", background: "#f5f3ff", border: "none", borderRadius: 20, color: "#8b5cf6", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.2s" }} onMouseEnter={(e)=>e.currentTarget.style.background="#ede9fe"} onMouseLeave={(e)=>e.currentTarget.style.background="#f5f3ff"}>
                    Download <Download size={14} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Results Card */}
              <div style={{ background: "#fcfcff", borderRadius: 16, padding: "40px", color: "#333", fontSize: 15, lineHeight: 1.6, border: "1px solid rgba(139, 92, 246, 0.1)" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
                  <div style={{ padding: 20, borderRadius: 12, border: "1px solid rgba(139,92,246,0.1)", background: "#fff" }}>
                     <div style={{ fontSize: 13, color: "#9ea5ad", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: 8 }}>Target Role</div>
                     <div style={{ fontSize: 20, fontWeight: 600, color: "#1a1c1e" }}>{analysisResult.role}</div>
                  </div>
                  <div style={{ padding: 20, borderRadius: 12, border: "1px solid rgba(139,92,246,0.1)", background: "#fff" }}>
                     <div style={{ fontSize: 13, color: "#9ea5ad", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, marginBottom: 8 }}>Estimated Comp Range</div>
                     <div style={{ fontSize: 20, fontWeight: 600, color: "#8b5cf6" }}>{analysisResult.salaryRange}</div>
                  </div>
                </div>

                <p style={{ fontWeight: 600, color: "#1a1c1e", marginBottom: 12, fontSize: 16 }}>Market Demand & Outlook:</p>
                <div style={{ marginBottom: 24 }}>
                  <span style={{ padding: "4px 12px", background: "rgba(34,197,94,0.1)", color: "#22c55e", borderRadius: 12, fontWeight: 600, fontSize: 13, marginRight: 12 }}>
                    {analysisResult.marketDemand}
                  </span>
                  <span style={{ color: "#5d6571" }}>{analysisResult.futureOutlook}</span>
                </div>

                <p style={{ fontWeight: 600, color: "#1a1c1e", marginBottom: 12, fontSize: 16 }}>Top Hiring Companies:</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
                  {analysisResult.topCompanies.map((company: string) => (
                    <span key={company} style={{ padding: "6px 16px", background: "#f5f3ff", color: "#6d28d9", borderRadius: 20, fontSize: 14, fontWeight: 500, border: "1px solid #ede9fe" }}>
                      {company}
                    </span>
                  ))}
                </div>

                <p style={{ fontWeight: 600, color: "#1a1c1e", marginBottom: 12, fontSize: 16 }}>Key Skills Driving Premium Pay:</p>
                <ul style={{ margin: "0 0 0 16px", color: "#5d6571" }}>
                  {analysisResult.keySkills.map((skill: string) => (
                    <li key={skill} style={{ marginBottom: 8 }}>{skill}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
