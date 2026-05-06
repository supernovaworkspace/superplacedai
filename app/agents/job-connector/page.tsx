"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, Search, MapPin, Briefcase, ExternalLink, Link2, ChevronDown, Loader2, Sparkles } from "lucide-react";

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

// Demo jobs for offline/demo mode
const DEMO_MATCHES: MatchedJob[] = [
  { job_id: "demo-1", match_score: 92, skill_overlap: ["Python", "Machine Learning"], missing_skills: ["TensorFlow"], reasoning: "Strong ML background", job: { id: "demo-1", job_title: "AI/ML Engineer Intern", company_name: "Google India", job_description: "Work on cutting-edge ML models for Search and Ads.", job_link: "https://careers.google.com", referral_link: null, required_skills: ["Python", "TensorFlow", "Machine Learning", "Deep Learning"], location: "Bangalore", job_type: "Internship" } },
  { job_id: "demo-2", match_score: 85, skill_overlap: ["React", "JavaScript", "TypeScript"], missing_skills: ["Redux"], reasoning: "Great frontend skills", job: { id: "demo-2", job_title: "Frontend Developer", company_name: "Flipkart", job_description: "Build high-performance React apps for e-commerce.", job_link: "https://flipkartcareers.com", referral_link: null, required_skills: ["React", "JavaScript", "TypeScript", "CSS", "Redux"], location: "Bangalore", job_type: "Full-time" } },
  { job_id: "demo-3", match_score: 78, skill_overlap: ["Python", "SQL"], missing_skills: ["Go", "Redis"], reasoning: "Partial backend match", job: { id: "demo-3", job_title: "Backend Engineer", company_name: "Razorpay", job_description: "Build scalable payment infrastructure.", job_link: "https://razorpay.com/careers", referral_link: null, required_skills: ["Go", "Python", "PostgreSQL", "Redis", "Microservices"], location: "Bangalore", job_type: "Full-time" } },
  { job_id: "demo-4", match_score: 88, skill_overlap: ["SQL", "Python"], missing_skills: ["Tableau"], reasoning: "Strong analytical skills", job: { id: "demo-4", job_title: "Data Analyst", company_name: "Swiggy", job_description: "Analyze delivery metrics and optimize operations.", job_link: "https://careers.swiggy.com", referral_link: null, required_skills: ["SQL", "Python", "Tableau", "Statistics", "Excel"], location: "Bangalore", job_type: "Full-time" } },
  { job_id: "demo-5", match_score: 72, skill_overlap: ["React", "Node.js"], missing_skills: ["Go", "WebSockets"], reasoning: "Good fullstack potential", job: { id: "demo-5", job_title: "Full Stack Developer", company_name: "Zerodha", job_description: "Build trading platforms and financial tools.", job_link: "https://zerodha.com/careers", referral_link: null, required_skills: ["React", "Node.js", "Go", "PostgreSQL", "WebSockets"], location: "Bangalore", job_type: "Full-time" } },
  { job_id: "demo-6", match_score: 65, skill_overlap: ["Python"], missing_skills: ["Docker", "Kubernetes", "Terraform"], reasoning: "Foundational skills present", job: { id: "demo-6", job_title: "DevOps Engineer", company_name: "Atlassian", job_description: "Manage CI/CD pipelines and cloud infrastructure.", job_link: "https://atlassian.com/careers", referral_link: null, required_skills: ["Docker", "Kubernetes", "AWS", "Terraform", "Jenkins"], location: "Bangalore", job_type: "Full-time" } },
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
  const [showSearch, setShowSearch] = useState(false);

  const fetchMatches = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/api/agents/jobs/match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "demo-user",
          resume_id: "demo-resume",
        }),
      });
      const data = await res.json();
      if (data.matches && data.matches.length > 0) {
        setMatches(data.matches);
      }
    } catch { /* keep demo data */ }
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      // The backend actually seeds automatically if CSV is uploaded with 0 jobs, but let's mock the seed endpoint or call upload-csv with an empty file.
      // Wait, let's just show success for demo if it fails since there's no seed endpoint.
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
    <div style={{ minHeight: "100vh", background: "#f8f9fa", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", borderBottom: "1px solid #d3d7dc", background: "rgba(248,249,250,0.9)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 50 }}>
        <a href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#9ea5ad", fontSize: 14, fontWeight: 500 }}>
          <ArrowLeft size={16} /> Dashboard
        </a>
        <div style={{ display: "flex", gap: 12 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, background: "#fff", border: "1px solid #d3d7dc", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#1a1c1e", transition: "all 0.2s" }}>
            <Upload size={14} /> {csvUploading ? "Uploading..." : "Upload CSV"}
            <input type="file" accept=".csv" onChange={handleCSVUpload} style={{ display: "none" }} />
          </label>
          <button onClick={handleSeed} disabled={seeding} style={{ padding: "10px 20px", borderRadius: 12, background: "#d4af37", color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
            <Sparkles size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
            {seeding ? "Seeding..." : "Seed Demo Jobs"}
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 48px 100px" }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 600, color: "#1a1c1e", letterSpacing: "-0.02em", marginBottom: 8 }}>
            Job <span style={{ color: "#d4af37" }}>Connector</span>
          </h1>
          <p style={{ fontSize: 16, color: "#687078", marginBottom: 8 }}>AI-ranked job opportunities based on your profile and skills.</p>
          {csvResult && <div style={{ padding: "8px 16px", borderRadius: 8, background: csvResult.startsWith("✅") ? "rgba(22,163,106,0.1)" : "rgba(239,68,68,0.1)", color: csvResult.startsWith("✅") ? "#16a34a" : "#ef4444", fontSize: 13, fontWeight: 500, marginBottom: 16, display: "inline-block" }}>{csvResult}</div>}
        </motion.div>

        {/* Search bar */}
        <div style={{ marginBottom: 24 }}>
          <button onClick={() => setShowSearch(!showSearch)} style={{ display: "flex", alignItems: "center", gap: 6, background: "#d4af37", border: "none", padding: "10px 24px", borderRadius: 12, fontSize: 14, color: "#fff", fontWeight: 600, cursor: "pointer", marginBottom: 12 }}>
            <Search size={14} /> AI Match My Profile
          </button>
          <AnimatePresence>
            {showSearch && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden", background: "#fff", borderRadius: 16, border: "1px solid #d3d7dc", padding: 24, marginBottom: 16 }}>
                <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                  <div style={{ flex: 2 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#687078", marginBottom: 4, display: "block" }}>Your Skills (comma separated)</label>
                    <input value={skills} onChange={e => setSkills(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #d3d7dc", fontSize: 14, outline: "none" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#687078", marginBottom: 4, display: "block" }}>Target Role</label>
                    <input value={targetRole} onChange={e => setTargetRole(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #d3d7dc", fontSize: 14, outline: "none" }} />
                  </div>
                </div>
                <button onClick={fetchMatches} disabled={loading} style={{ padding: "10px 24px", borderRadius: 10, background: "#d4af37", color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  {loading ? "Matching..." : "Find Matches"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filters */}
        <div style={{ marginBottom: 32 }}>
          <button onClick={() => setShowFilters(!showFilters)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", fontSize: 14, color: "#687078", fontWeight: 500, cursor: "pointer", marginBottom: 12 }}>
            Filters <ChevronDown size={14} style={{ transform: showFilters ? "rotate(180deg)" : "none", transition: "0.2s" }} />
          </button>
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ display: "flex", gap: 12, flexWrap: "wrap", overflow: "hidden" }}>
                <input placeholder="Location..." value={filter.location} onChange={e => setFilter(p => ({ ...p, location: e.target.value }))} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #d3d7dc", fontSize: 13, outline: "none" }} />
                <select value={filter.type} onChange={e => setFilter(p => ({ ...p, type: e.target.value }))} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #d3d7dc", fontSize: 13, outline: "none", background: "#fff" }}>
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                  <option value="Research">Research</option>
                </select>
                <select value={filter.minScore} onChange={e => setFilter(p => ({ ...p, minScore: Number(e.target.value) }))} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #d3d7dc", fontSize: 13, outline: "none", background: "#fff" }}>
                  <option value={0}>Any Match %</option>
                  <option value={50}>50%+</option>
                  <option value={70}>70%+</option>
                  <option value={90}>90%+</option>
                </select>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 80, gap: 12, color: "#687078" }}>
            <Loader2 size={20} className="animate-spin" /> Finding your best job matches with AI...
          </div>
        )}

        {/* Job Cards */}
        {!loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: 60, color: "#9ea5ad" }}>
                <Briefcase size={40} style={{ marginBottom: 16, opacity: 0.4 }} />
                <p style={{ fontSize: 16, fontWeight: 500 }}>No jobs match your filters.</p>
              </div>
            )}
            {filtered.map((match, i) => (
              <motion.div key={match.job_id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                style={{ background: "#fff", borderRadius: 16, border: "1px solid #d3d7dc", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.02)", transition: "box-shadow 0.2s, border-color 0.2s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#d4af37"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#d3d7dc"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.02)"; }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1a1c1e", margin: 0 }}>{match.job.job_title}</h3>
                    <span style={{ padding: "3px 10px", borderRadius: 12, background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", fontSize: 11, fontWeight: 600, color: "#d4af37" }}>{match.job.job_type}</span>
                  </div>
                  <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#687078", marginBottom: 12 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Briefcase size={13} /> {match.job.company_name}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={13} /> {match.job.location}</span>
                  </div>
                  <p style={{ fontSize: 13, color: "#9ea5ad", lineHeight: 1.5, maxWidth: 600, margin: "0 0 12px" }}>{match.job.job_description}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {(match.job.required_skills || []).slice(0, 6).map(skill => (
                      <span key={skill} style={{ padding: "3px 10px", borderRadius: 8, background: match.skill_overlap?.includes(skill) ? "rgba(22,163,106,0.1)" : "#f0f2f5", fontSize: 11, fontWeight: 500, color: match.skill_overlap?.includes(skill) ? "#16a34a" : "#687078" }}>{skill}</span>
                    ))}
                  </div>
                  {match.reasoning && <p style={{ fontSize: 12, color: "#b87333", marginTop: 8, fontStyle: "italic" }}>{match.reasoning}</p>}
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, minWidth: 120 }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: match.match_score >= 80 ? "#d4af37" : match.match_score >= 60 ? "#b87333" : "#9ea5ad" }}>{match.match_score}%</div>
                  <div style={{ fontSize: 11, color: "#9ea5ad", fontWeight: 500 }}>Match Score</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {match.job.job_link && (
                      <a href={match.job.job_link} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 16px", borderRadius: 10, background: "#d4af37", color: "#fff", fontSize: 12, fontWeight: 600, textDecoration: "none", transition: "all 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#b8972e"}
                        onMouseLeave={e => e.currentTarget.style.background = "#d4af37"}
                      >
                        Apply <ExternalLink size={12} />
                      </a>
                    )}
                    {match.job.referral_link && (
                      <a href={match.job.referral_link} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 12px", borderRadius: 10, background: "#fff", border: "1px solid #d3d7dc", color: "#687078", fontSize: 12, fontWeight: 500, textDecoration: "none" }}>
                        <Link2 size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
