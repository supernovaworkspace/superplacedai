"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Briefcase, MapPin, Search, Upload, ExternalLink, Link2, ChevronDown, Loader2, Sparkles, User, Building, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

interface JobData {
  id: string;
  job_title: string;
  company_name: string;
  job_description: string;
  job_link: string;
  referral_link: string | null;
  required_skills: string[];
  location: string;
  job_type: string;
}

interface MatchedJob {
  job_id: string;
  match_score: number;
  skill_overlap: string[];
  missing_skills: string[];
  reasoning: string;
  job: JobData;
}

const DEMO_MATCHES: MatchedJob[] = [
  { job_id: "demo-1", match_score: 92, skill_overlap: ["Python", "Machine Learning"], missing_skills: ["TensorFlow"], reasoning: "Strong ML background", job: { id: "demo-1", job_title: "AI/ML Engineer Intern", company_name: "Google India", job_description: "Work on cutting-edge ML models for Search and Ads.", job_link: "https://careers.google.com", referral_link: null, required_skills: ["Python", "TensorFlow", "Machine Learning", "Deep Learning"], location: "Bangalore", job_type: "Internship" } },
  { job_id: "demo-2", match_score: 85, skill_overlap: ["React", "JavaScript", "TypeScript"], missing_skills: ["Redux"], reasoning: "Great frontend skills", job: { id: "demo-2", job_title: "Frontend Developer", company_name: "Flipkart", job_description: "Build high-performance React apps for e-commerce.", job_link: "https://flipkartcareers.com", referral_link: null, required_skills: ["React", "JavaScript", "TypeScript", "CSS", "Redux"], location: "Bangalore", job_type: "Full-time" } },
  { job_id: "demo-3", match_score: 78, skill_overlap: ["Python", "SQL"], missing_skills: ["Go", "Redis"], reasoning: "Partial backend match", job: { id: "demo-3", job_title: "Backend Engineer", company_name: "Razorpay", job_description: "Build scalable payment infrastructure.", job_link: "https://razorpay.com/careers", referral_link: null, required_skills: ["Go", "Python", "PostgreSQL", "Redis", "Microservices"], location: "Bangalore", job_type: "Full-time" } },
];

export default function JobConnectorPage() {
  const [matches, setMatches] = useState<MatchedJob[]>(DEMO_MATCHES);
  const [loading, setLoading] = useState(false);
  const [csvUploading, setCsvUploading] = useState(false);
  const [csvResult, setCsvResult] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [filter, setFilter] = useState({ location: "", type: "", minScore: 0 });
  const [showFilters, setShowFilters] = useState(false);
  const [skills, setSkills] = useState("Python, React, JavaScript, SQL, Machine Learning");
  const [targetRole, setTargetRole] = useState("Software Engineer");
  
  // Controls scrolling to the app section
  const scrollToApp = () => {
    document.getElementById("job-search-app")?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMatches = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/api/agents/jobs/match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "demo-user", resume_id: "demo-resume" }),
      });
      const data = await res.json();
      if (data.matches && data.matches.length > 0) setMatches(data.matches);
    } catch { /* use demo data */ }
    setLoading(false);
  }, [skills, targetRole]);

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvUploading(true);
    setCsvResult(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/api/jobs/upload-csv`, { method: "POST", body: formData });
      const data = await res.json();
      setCsvResult(data.success ? `✅ ${data.inserted} jobs added` : `❌ ${data.error}`);
      if (data.success) fetchMatches();
    } catch { setCsvResult("❌ Upload failed"); }
    setCsvUploading(false);
  };

  const handleSeed = async () => {
    setSeeding(true);
    try {
      setCsvResult("✅ Demo jobs seeded");
      fetchMatches();
    } catch { setCsvResult("❌ Seed failed"); }
    setSeeding(false);
  };

  const filtered = matches.filter(m => {
    if (filter.location && !m.job.location.toLowerCase().includes(filter.location.toLowerCase())) return false;
    if (filter.type && m.job.job_type !== filter.type) return false;
    if (m.match_score < filter.minScore) return false;
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "'Inter', sans-serif" }}>
      {/* ── Navigation ── */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 40px", borderBottom: "1px solid #ebeaeb", background: "#fff", position: "sticky", top: 0, zIndex: 100 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#111827", letterSpacing: "-0.03em" }}>
            superplaced<span style={{ color: "#d4af37" }}>:</span>
          </h1>
        </Link>
        
        {/* Center Links */}
        <div style={{ display: "flex", gap: 32, fontSize: 14, fontWeight: 500, color: "#4b5563" }}>
          <button onClick={scrollToApp} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontWeight: "inherit" }}>Discover</button>
          <button onClick={scrollToApp} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontWeight: "inherit" }}>For job seekers</button>
          <button onClick={scrollToApp} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontWeight: "inherit" }}>For companies</button>
        </div>

        {/* Auth Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/signin" style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #e5e7eb", color: "#111827", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Log In</Link>
          <Link href="/signin" style={{ padding: "8px 16px", borderRadius: 8, background: "#111827", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Sign Up</Link>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section style={{ padding: "100px 20px 80px", textAlign: "center", background: "#ffffff" }}>
        <h2 style={{ fontSize: 48, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em", marginBottom: 32 }}>
          Where startups and job seekers connect
        </h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <button onClick={scrollToApp} style={{ padding: "16px 24px", borderRadius: 12, background: "#111827", color: "#fff", border: "none", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform="scale(1.02)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
            Find your next hire
          </button>
          <button onClick={scrollToApp} style={{ padding: "16px 24px", borderRadius: 12, background: "#fff", color: "#111827", border: "1px solid #e5e7eb", fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform="scale(1.02)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
            Find your next job
          </button>
        </div>
        
        {/* Scroll Down Arrow */}
        <div style={{ marginTop: 80, display: "flex", justifyContent: "center" }}>
          <button onClick={scrollToApp} style={{ width: 48, height: 48, borderRadius: "50%", background: "#211a23", color: "#fff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ArrowDown size={20} />
          </button>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section style={{ background: "#211a23", color: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", justifyContent: "space-between", textAlign: "center" }}>
          <div>
            <h3 style={{ fontSize: 64, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.02em" }}>8M+</h3>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#e5e7eb", margin: 0 }}>Matches Made</p>
          </div>
          <div>
            <h3 style={{ fontSize: 64, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.02em" }}>150K+</h3>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#e5e7eb", margin: 0 }}>Tech Jobs</p>
          </div>
          <div>
            <h3 style={{ fontSize: 64, fontWeight: 800, margin: "0 0 8px", letterSpacing: "-0.02em" }}>10M+</h3>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#e5e7eb", margin: 0 }}>Startup Ready Candidates</p>
          </div>
        </div>
        
        <div style={{ maxWidth: 1000, margin: "60px auto 0", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center", opacity: 0.7 }}>
           {/* Faux Company Logos */}
           <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: -1 }}>DOORDASH</div>
           <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: -1 }}>ROBLOX</div>
           <div style={{ fontWeight: 600, fontSize: 24, fontStyle: "italic" }}>honey</div>
           <div style={{ fontWeight: 800, fontSize: 20 }}>PELOTON</div>
        </div>
      </section>

      {/* ── Application / Search Engine ── */}
      <section id="job-search-app" style={{ padding: "80px 20px", background: "#f8f9fa", borderTop: "1px solid #ebeaeb" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em", marginBottom: 8 }}>Find what's next</h2>
              <p style={{ color: "#6b7280" }}>AI-ranked opportunities tailored to your unique profile.</p>
            </div>
            
            <div style={{ display: "flex", gap: 12 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderRadius: 8, background: "#fff", border: "1px solid #e5e7eb", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#374151" }}>
                <Upload size={16} /> {csvUploading ? "Uploading..." : "Upload Jobs CSV"}
                <input type="file" accept=".csv" onChange={handleCSVUpload} style={{ display: "none" }} />
              </label>
              <button onClick={handleSeed} disabled={seeding} style={{ padding: "10px 16px", borderRadius: 8, background: "#d4af37", color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                <Sparkles size={16} /> {seeding ? "Seeding..." : "Seed Demo DB"}
              </button>
            </div>
          </div>

          {csvResult && <div style={{ padding: "12px 16px", borderRadius: 8, background: csvResult.startsWith("✅") ? "#dcfce7" : "#fee2e2", color: csvResult.startsWith("✅") ? "#166534" : "#991b1b", fontSize: 14, fontWeight: 600, marginBottom: 24 }}>{csvResult}</div>}

          {/* Search Controls */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24, marginBottom: 24, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" }}>
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 2 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>Your Skills</label>
                <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="e.g. React, Python, UI Design" style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 15, outline: "none", transition: "border-color 0.2s" }} onFocus={e=>e.currentTarget.style.borderColor="#d4af37"} onBlur={e=>e.currentTarget.style.borderColor="#d1d5db"} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block" }}>Target Role</label>
                <input value={targetRole} onChange={e => setTargetRole(e.target.value)} placeholder="e.g. Frontend Engineer" style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 15, outline: "none", transition: "border-color 0.2s" }} onFocus={e=>e.currentTarget.style.borderColor="#d4af37"} onBlur={e=>e.currentTarget.style.borderColor="#d1d5db"} />
              </div>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 12 }}>
                <input placeholder="Filter Location..." value={filter.location} onChange={e => setFilter(p => ({ ...p, location: e.target.value }))} style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 14, outline: "none" }} />
                <select value={filter.type} onChange={e => setFilter(p => ({ ...p, type: e.target.value }))} style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 14, outline: "none", background: "#fff" }}>
                  <option value="">All Job Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                </select>
                <select value={filter.minScore} onChange={e => setFilter(p => ({ ...p, minScore: Number(e.target.value) }))} style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid #e5e7eb", fontSize: 14, outline: "none", background: "#fff" }}>
                  <option value={0}>Any Match Score</option>
                  <option value={50}>50% +</option>
                  <option value={70}>70% +</option>
                  <option value={90}>90% +</option>
                </select>
              </div>
              
              <button onClick={fetchMatches} disabled={loading} style={{ padding: "12px 32px", borderRadius: 8, background: "#111827", color: "#fff", border: "none", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />} 
                {loading ? "Analyzing..." : "Generate Matches"}
              </button>
            </div>
          </div>

          {/* Results */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.length === 0 && !loading && (
              <div style={{ textAlign: "center", padding: 80, background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb" }}>
                <Briefcase size={48} style={{ margin: "0 auto 16px", color: "#9ca3af" }} />
                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#374151" }}>No jobs found</h3>
                <p style={{ color: "#6b7280" }}>Try adjusting your filters or generating new matches.</p>
              </div>
            )}
            
            {filtered.map((match, i) => (
              <motion.div key={match.job_id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24, transition: "box-shadow 0.2s, border-color 0.2s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#111827"; e.currentTarget.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>{match.job.job_title}</h3>
                    <span style={{ padding: "4px 12px", borderRadius: 16, background: "#f3f4f6", fontSize: 12, fontWeight: 600, color: "#4b5563" }}>{match.job.job_type}</span>
                  </div>
                  
                  <div style={{ display: "flex", gap: 20, fontSize: 14, color: "#6b7280", fontWeight: 500, marginBottom: 16 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Building size={16} /> {match.job.company_name}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={16} /> {match.job.location}</span>
                  </div>
                  
                  <p style={{ fontSize: 15, color: "#4b5563", lineHeight: 1.6, margin: "0 0 20px" }}>{match.job.job_description}</p>
                  
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: match.reasoning ? 16 : 0 }}>
                    {(match.job.required_skills || []).slice(0, 6).map(skill => {
                      const isMatch = match.skill_overlap?.includes(skill);
                      return (
                        <span key={skill} style={{ padding: "6px 12px", borderRadius: 6, background: isMatch ? "#dcfce7" : "#f3f4f6", fontSize: 13, fontWeight: 600, color: isMatch ? "#166534" : "#4b5563" }}>
                          {skill}
                        </span>
                      );
                    })}
                  </div>
                  
                  {match.reasoning && (
                    <div style={{ padding: 12, borderRadius: 8, background: "rgba(212,175,55,0.1)", borderLeft: "4px solid #d4af37", fontSize: 14, color: "#927825", fontWeight: 500 }}>
                      <Sparkles size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "text-bottom" }} />
                      {match.reasoning}
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 16, minWidth: 140 }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 36, fontWeight: 800, color: match.match_score >= 80 ? "#16a34a" : match.match_score >= 60 ? "#d97706" : "#6b7280", letterSpacing: "-0.02em" }}>{match.match_score}%</div>
                    <div style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Match Score</div>
                  </div>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                    {match.job.job_link && (
                      <a href={match.job.job_link} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 16px", borderRadius: 8, background: "#111827", color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none", width: "100%", transition: "background 0.2s" }} onMouseEnter={e=>e.currentTarget.style.background="#374151"} onMouseLeave={e=>e.currentTarget.style.background="#111827"}>
                        Apply <ExternalLink size={14} />
                      </a>
                    )}
                    {match.job.referral_link && (
                      <a href={match.job.referral_link} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 16px", borderRadius: 8, background: "#fff", border: "1px solid #d1d5db", color: "#374151", fontSize: 14, fontWeight: 600, textDecoration: "none", width: "100%", transition: "background 0.2s" }} onMouseEnter={e=>e.currentTarget.style.background="#f3f4f6"} onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                        Get Referral <Link2 size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
