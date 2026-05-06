"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronDown, CheckCircle, Download, Square, CheckSquare, Sparkles, Loader2, Copy, Check } from "lucide-react";

// Dropdown Options
const INDUSTRY_OPTIONS = ["Generic", "Technology", "Finance", "Healthcare", "Marketing", "Design", "Operations"];
const EXPERIENCE_OPTIONS = ["Beginner", "Junior", "Mid-Level", "Professional", "Senior", "Executive"];
const LANGUAGE_OPTIONS = ["English (En)", "Spanish (Es)", "French (Fr)", "German (De)", "Hindi (Hi)"];

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
          padding: "8px 16px", background: isOpen ? "#ffe0cc" : "#ffede4", border: "none", 
          borderRadius: 24, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", 
          color: "#f05a28", fontSize: 14, fontWeight: 500, transition: "background 0.2s" 
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
              borderRadius: 16, border: "1px solid #ffede4", boxShadow: "0 12px 32px rgba(240, 90, 40, 0.15)", 
              zIndex: 50, minWidth: 160, overflow: "hidden"
            }}
          >
            {options.map((opt) => (
              <div 
                key={opt}
                onClick={() => { onChange(opt); setIsOpen(false); }}
                style={{ 
                  padding: "10px 16px", cursor: "pointer", fontSize: 14, color: value === opt ? "#f05a28" : "#5d6571", 
                  background: value === opt ? "#fff5f0" : "#fff", fontWeight: value === opt ? 600 : 400
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

export default function SkillGapPage() {
  const router = useRouter();

  // Form State
  const [industry, setIndustry] = useState(INDUSTRY_OPTIONS[0]);
  const [experience, setExperience] = useState(EXPERIENCE_OPTIONS[3]);
  const [language, setLanguage] = useState(LANGUAGE_OPTIONS[0]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [instructions, setInstructions] = useState("");
  
  const [jobTitle, setJobTitle] = useState("");
  const [currentSkill, setCurrentSkill] = useState("");

  // Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ summary: string; missing_skills: { skill: string; priority: string; description: string }[]; roadmap: { week: number; focus: string; tasks: string[]; resources: string[] }[]; current_match: number } | null>(null);

  const handleGenerate = async () => {
    if (!jobTitle) return;
    setIsGenerating(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/api/agents/skillgap/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target_job_title: jobTitle,
          industry: industry,
          experience_level: experience,
          current_skills: currentSkill ? currentSkill.split(",").map((s: string) => s.trim()) : [],
          instructions: instructions || undefined,
          resume_id: "demo", // Pass a demo resume ID for testing since we aren't uploading here
        }),
      });
      const data = await res.json();
      if (data.success && data.skill_gap) {
        setAnalysisResult(data.skill_gap);
      }
      setShowResults(true);
      setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100);
    } catch (error) {
      console.error("Analysis error:", error);
      setShowResults(true);
    }
    setIsGenerating(false);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(180deg, #fff2e8 0%, #ffffff 20%)", 
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
          style={{ background: "transparent", border: "none", color: "#f05a28", fontSize: 15, fontWeight: 600, cursor: "pointer", padding: "8px 16px", borderRadius: 20, transition: "background 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "#ffede4"}
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
              <span style={{ background: "linear-gradient(90deg, #f05a28 0%, #fa8c66 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                AI Skill Gap
              </span>
              {" "}
              <span style={{ background: "linear-gradient(90deg, #ffb399 0%, #ffcba3 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Analysis
              </span>
            </h1>
            <span style={{ padding: "6px 16px", background: "#ffece1", color: "#f05a28", borderRadius: 20, fontSize: 14, fontWeight: 500 }}>
              AI Powered
            </span>
          </div>
          <p style={{ color: "#7a828a", fontSize: 18, margin: 0 }}>
            Identify your skill gaps and get personalized learning path
          </p>
        </div>

        {/* Input Form Area */}
        <div style={{ maxWidth: 840, margin: "0 auto", marginBottom: 80 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", justifyContent: "center" }}>
            
            <Dropdown options={INDUSTRY_OPTIONS} value={industry} onChange={setIndustry} placeholder="Generic" />
            <Dropdown options={EXPERIENCE_OPTIONS} value={experience} onChange={setExperience} placeholder="Professional" />
            <Dropdown options={LANGUAGE_OPTIONS} value={language} onChange={setLanguage} placeholder="English (En)" />
            
            <button 
              onClick={() => setShowInstructions(!showInstructions)}
              style={{ 
                padding: "8px 16px", background: showInstructions ? "#ffe0cc" : "#ffede4", border: "none", 
                borderRadius: 24, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", 
                color: "#f05a28", fontSize: 14, fontWeight: 500, transition: "background 0.2s" 
              }}
            >
              {showInstructions ? <CheckSquare size={16} strokeWidth={2.5} /> : <Square size={16} strokeWidth={2.5} />} 
              Additional instructions (optional)
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
                  placeholder="E.g., I want to transition into a startup environment focusing on GenAI..."
                  style={{
                    width: "100%", padding: 16, borderRadius: 16, border: "1px solid #ffede4", 
                    outline: "none", fontSize: 15, fontFamily: "inherit", color: "#1a1c1e",
                    background: "#ffffff", minHeight: 80, resize: "vertical", boxShadow: "0 4px 12px rgba(240, 90, 40, 0.05)"
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Input Pill */}
          <div style={{ 
            display: "flex", alignItems: "center", background: "#ffffff", border: "1px solid #f05a28", 
            borderRadius: 40, padding: "8px 8px 8px 32px", boxShadow: "0 8px 24px rgba(240, 90, 40, 0.08)",
            opacity: isGenerating ? 0.7 : 1, pointerEvents: isGenerating ? "none" : "auto", transition: "all 0.3s"
          }}>
            <input 
              type="text" 
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Job Title (e.g. AI Intern)" 
              style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#1a1c1e", background: "transparent" }}
            />
            <div style={{ width: 1, height: 24, background: "#e1e5e9", margin: "0 24px" }} />
            <input 
              type="text" 
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              placeholder="Current Skill (e.g. Python)" 
              style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: "#1a1c1e", background: "transparent" }}
            />
            <button 
              onClick={handleGenerate}
              disabled={!jobTitle || isGenerating}
              style={{
                background: (!jobTitle && !isGenerating) ? "#e1e5e9" : "linear-gradient(90deg, #ff6b35 0%, #ff8a5a 100%)",
                color: (!jobTitle && !isGenerating) ? "#a0aab2" : "#fff",
                border: "none", borderRadius: 30, padding: "12px 32px", fontSize: 16, fontWeight: 600, 
                cursor: (!jobTitle && !isGenerating) ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: 8, 
                boxShadow: (!jobTitle && !isGenerating) ? "none" : "0 4px 12px rgba(255, 107, 53, 0.3)",
                transition: "all 0.3s"
              }}
            >
              {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} fill={jobTitle ? "#ffffff" : "transparent"} />} 
              {isGenerating ? "Analyzing..." : "Generate"}
            </button>
          </div>
        </div>

        {/* Benefits text */}
        <AnimatePresence>
          {!showResults && (
            <motion.div exit={{ opacity: 0, height: 0, overflow: "hidden" }} style={{ textAlign: "center", marginBottom: 80 }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 40, marginBottom: 32, flexWrap: "wrap" }}>
                {[ "Real-Time Insights", "60-Second Skill Review", "Adaptive Skill-Building Paths" ].map((text, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "#fc8a63", fontSize: 18, fontWeight: 500 }}>
                    <CheckCircle size={24} strokeWidth={2.5} /> {text}
                  </div>
                ))}
              </div>
              <p style={{ color: "#5d6571", fontSize: 18, maxWidth: 900, margin: "0 auto", lineHeight: 1.6 }}>
                Get smarter insights to unlock learning paths, close hidden skill gaps, and boost your career moves, all with just an AI-driven skill Gap Analysis.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {showResults && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ maxWidth: 900, margin: "0 auto" }}
            >
              {/* Results Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={{ fontSize: 24, fontWeight: 500, color: "#1a1c1e", margin: 0 }}>AI Skill Gap Result</h2>
                <div style={{ display: "flex", gap: 12 }}>
                  <button style={{ padding: "8px 20px", background: "#ffede4", border: "none", borderRadius: 20, color: "#f05a28", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={(e)=>e.currentTarget.style.background="#ffe0cc"} onMouseLeave={(e)=>e.currentTarget.style.background="#ffede4"}>Edit</button>
                  <button onClick={handleCopy} style={{ padding: "8px 20px", background: "#ffede4", border: "none", borderRadius: 20, color: "#f05a28", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.2s" }} onMouseEnter={(e)=>e.currentTarget.style.background="#ffe0cc"} onMouseLeave={(e)=>e.currentTarget.style.background="#ffede4"}>
                    {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                  </button>
                  <button style={{ padding: "8px 20px", background: "#ffede4", border: "none", borderRadius: 20, color: "#f05a28", fontSize: 14, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "background 0.2s" }} onMouseEnter={(e)=>e.currentTarget.style.background="#ffe0cc"} onMouseLeave={(e)=>e.currentTarget.style.background="#ffede4"}>
                    Download <Download size={14} strokeWidth={2.5} />
                  </button>
                  <button style={{ padding: "8px 20px", background: "#ffede4", border: "none", borderRadius: 20, color: "#f05a28", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={(e)=>e.currentTarget.style.background="#ffe0cc"} onMouseLeave={(e)=>e.currentTarget.style.background="#ffede4"}>Share</button>
                </div>
              </div>

              {/* Results Card */}
              <div style={{ background: "#fff9f5", borderRadius: 16, padding: "40px", color: "#333", fontSize: 15, lineHeight: 1.6, border: "1px solid rgba(240, 90, 40, 0.1)" }}>
                {analysisResult ? (
                  <>
                    <p style={{ fontWeight: 600, color: "#1a1c1e", marginBottom: 12, fontSize: 16 }}>Summary ({analysisResult.current_match}% current match):</p>
                    <p style={{ marginBottom: 24 }}>{analysisResult.summary}</p>

                    <p style={{ fontWeight: 600, color: "#1a1c1e", marginBottom: 16, fontSize: 16 }}>Skill Gaps ({analysisResult.missing_skills.length} identified):</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
                      {analysisResult.missing_skills.map((skill, i) => (
                        <div key={i} style={{ display: "flex", gap: 8 }}>
                          <span style={{ fontWeight: 600, color: "#1a1c1e" }}>{i + 1}.</span>
                          <span>
                            <span style={{ fontWeight: 600, color: "#1a1c1e" }}>{skill.skill}</span>
                            <span style={{ padding: "2px 8px", borderRadius: 8, fontSize: 11, fontWeight: 600, marginLeft: 8, background: skill.priority === "high" ? "rgba(239,68,68,0.1)" : skill.priority === "medium" ? "rgba(245,158,11,0.1)" : "rgba(34,197,94,0.1)", color: skill.priority === "high" ? "#ef4444" : skill.priority === "medium" ? "#f59e0b" : "#22c55e" }}>{skill.priority}</span>
                            <br />{skill.description}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p style={{ fontWeight: 600, color: "#1a1c1e", marginBottom: 16, fontSize: 16 }}>30-Day Learning Roadmap:</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      {analysisResult.roadmap.map((week) => (
                        <div key={week.week} style={{ padding: 20, borderRadius: 12, border: "1px solid rgba(240,90,40,0.1)", background: "#fff" }}>
                          <div style={{ fontWeight: 600, color: "#f05a28", fontSize: 14, marginBottom: 8 }}>Week {week.week}: {week.focus}</div>
                          <ul style={{ margin: "0 0 8px 16px", fontSize: 14 }}>
                            {week.tasks.map((task, i) => <li key={i}>{task}</li>)}
                          </ul>
                          <div style={{ fontSize: 12, color: "#9ea5ad" }}>Resources: {week.resources.join(" • ")}</div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p style={{ fontWeight: 600, color: "#1a1c1e", marginBottom: 12, fontSize: 16 }}>Summary of Current Skills:</p>
                    <p style={{ marginBottom: 24 }}>
                      As a {experience} professional with expertise in {currentSkill || "Python"}, you have a solid foundation. Your proficiency sets a strong base for transitioning into {jobTitle || "AI"} roles.
                    </p>
                    <p style={{ fontWeight: 600, color: "#1a1c1e", marginBottom: 12, fontSize: 16 }}>Analysis:</p>
                    <p>Connect your OpenAI API key in .env.local for AI-powered analysis results.</p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
