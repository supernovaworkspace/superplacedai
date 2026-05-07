"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Briefcase, Search, Upload, Loader2, Sparkles } from "lucide-react";
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
  { job_id: "demo-1", match_score: 96, skill_overlap: ["Python", "Machine Learning"], missing_skills: ["TensorFlow"], reasoning: "Strong ML background", job: { id: "demo-1", job_title: "AI/ML Engineer Intern", company_name: "Mercor", job_description: "Work on cutting-edge ML models for Search and Ads.", job_link: "https://careers.google.com", referral_link: null, required_skills: ["Python", "TensorFlow", "Machine Learning"], location: "Remote", job_type: "Internship" } },
  { job_id: "demo-2", match_score: 88, skill_overlap: ["React", "JavaScript", "TypeScript"], missing_skills: ["Redux"], reasoning: "Great frontend skills", job: { id: "demo-2", job_title: "Frontend Architect", company_name: "Scale AI", job_description: "Build high-performance React apps.", job_link: "https://scale.com/careers", referral_link: null, required_skills: ["React", "JavaScript", "TypeScript"], location: "Remote", job_type: "Full-time" } },
  { job_id: "demo-3", match_score: 82, skill_overlap: ["Python", "SQL"], missing_skills: ["Go", "Redis"], reasoning: "Partial backend match", job: { id: "demo-3", job_title: "Backend Engineer", company_name: "Outlier", job_description: "Build scalable payment infrastructure.", job_link: "https://outlier.ai/careers", referral_link: null, required_skills: ["Go", "Python", "PostgreSQL"], location: "Remote", job_type: "Full-time" } },
  { job_id: "demo-4", match_score: 75, skill_overlap: ["React", "Node.js"], missing_skills: ["GraphQL"], reasoning: "Good full-stack match", job: { id: "demo-4", job_title: "Full Stack Developer", company_name: "Mercor", job_description: "Build and maintain full-stack product features.", job_link: "https://mercor.com/careers", referral_link: null, required_skills: ["React", "Node.js", "GraphQL"], location: "Remote", job_type: "Contract" } },
  { job_id: "demo-5", match_score: 91, skill_overlap: ["Python", "Data Analysis"], missing_skills: ["Spark"], reasoning: "Strong data background", job: { id: "demo-5", job_title: "Data Scientist", company_name: "Scale AI", job_description: "Analyze large datasets to drive product decisions.", job_link: "https://scale.com/careers", referral_link: null, required_skills: ["Python", "Spark", "SQL"], location: "Remote", job_type: "Full-time" } },
  { job_id: "demo-6", match_score: 79, skill_overlap: ["JavaScript", "CSS"], missing_skills: ["Vue"], reasoning: "Good frontend experience", job: { id: "demo-6", job_title: "UI Engineer", company_name: "Outlier", job_description: "Craft pixel-perfect UI components at scale.", job_link: "https://outlier.ai/careers", referral_link: null, required_skills: ["JavaScript", "CSS", "Vue"], location: "Remote", job_type: "Full-time" } },
  { job_id: "demo-7", match_score: 85, skill_overlap: ["TypeScript", "React"], missing_skills: ["AWS"], reasoning: "Strong product engineering skills", job: { id: "demo-7", job_title: "Product Engineer", company_name: "Mercor", job_description: "Own features end-to-end from design to deployment.", job_link: "https://mercor.com/careers", referral_link: null, required_skills: ["TypeScript", "React", "AWS"], location: "Remote", job_type: "Full-time" } },
  { job_id: "demo-8", match_score: 70, skill_overlap: ["SQL", "Python"], missing_skills: ["dbt", "Airflow"], reasoning: "Solid analytics foundation", job: { id: "demo-8", job_title: "Analytics Engineer", company_name: "Scale AI", job_description: "Build analytics pipelines and data models.", job_link: "https://scale.com/careers", referral_link: null, required_skills: ["SQL", "Python", "dbt"], location: "Remote", job_type: "Contract" } },
];

const AVATAR_COLORS = ["#c9a84c", "#2a9d5c", "#e07b54", "#5c7ec9", "#9b59b6"];
const SALARY_MAP: Record<string, string> = {
  "demo-1": "$120k – $150k", "demo-2": "$140k – $180k", "demo-3": "$130k – $160k",
  "demo-4": "$110k – $140k", "demo-5": "$125k – $155k", "demo-6": "$100k – $130k",
  "demo-7": "$135k – $165k", "demo-8": "$105k – $135k",
};
const EARNINGS_MAP: Record<string, string> = {
  "demo-1": "$6,200/mo", "demo-2": "$7,100/mo", "demo-3": "$6,500/mo",
  "demo-4": "$5,800/mo", "demo-5": "$6,800/mo", "demo-6": "$5,400/mo",
  "demo-7": "$6,900/mo", "demo-8": "$5,600/mo",
};
const HIRED_MAP: Record<string, number> = {
  "demo-1": 24, "demo-2": 18, "demo-3": 31, "demo-4": 12,
  "demo-5": 27, "demo-6": 9, "demo-7": 20, "demo-8": 15,
};

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
  const [activeTab, setActiveTab] = useState("Project-based");
  const [searchQuery, setSearchQuery] = useState("");

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
    if (searchQuery && !m.job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) && !m.job.company_name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const tabs = ["Project-based", "One-time", "Full-time", "Talent Network"];

  return (
    <div style={{ minHeight: "100vh", background: "#f0f0ec", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #aaaaaa; }
      `}</style>

      {/* ── Top Nav ── */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 40px", background: "transparent",
      }}>
        <Link href="/dashboard" style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 14,
          color: "#555555", textDecoration: "none",
        }}>
          ← Back to Dashboard
        </Link>
        <div style={{
          background: "#ffffff", border: "1px solid #e0e0e0", borderRadius: 999,
          padding: "6px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 13,
          color: "#1a1a1a", display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{ color: "#c9a84c" }}>●</span> SUPERPLACED AI
        </div>
      </nav>

      {/* ── Page Header Block ── */}
      <div style={{ padding: "8px 40px 0 40px" }}>
        {/* Line 1: Badge */}
        <span style={{
          display: "inline-block", background: "#fdf6e3",
          border: "1px solid #c9a84c", borderRadius: 999,
          padding: "5px 14px", fontSize: 11, textTransform: "uppercase",
          letterSpacing: "0.08em", color: "#c9a84c", fontWeight: 600,
        }}>
          Placement Agent
        </span>

        {/* Line 2: Title */}
        <h1 style={{
          fontFamily: "'DM Serif Display', serif", fontSize: 42,
          color: "#1a1a1a", fontWeight: 400, margin: "8px 0",
        }}>
          Job Connector
        </h1>

        {/* Line 3: Subtitle + scanning badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 15,
            color: "#888888", margin: 0,
          }}>
            Matches your profile to live roles on Mercor, Scale AI &amp; Outlier in real-time.
          </p>
          <span style={{
            background: "#fdf6e3", border: "1px solid #e8d9b0",
            borderRadius: 999, padding: "6px 16px",
            fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#c9a84c",
            whiteSpace: "nowrap", marginLeft: 24,
          }}>
            ⚙ Scanning Networks...
          </span>
        </div>
      </div>

      {/* ── Tabs Row ── */}
      <div style={{
        marginTop: 24, padding: "0 40px",
        borderBottom: "1px solid #e8e8e4", background: "transparent",
        display: "flex", alignItems: "center",
      }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15,
              background: "none", border: "none", cursor: "pointer",
              padding: "12px 0", marginRight: 32,
              color: activeTab === tab ? "#1a1a1a" : "#888888",
              fontWeight: activeTab === tab ? 600 : 400,
              borderBottom: activeTab === tab ? "2px solid #c9a84c" : "2px solid transparent",
              transition: "color 0.15s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Search Bar ── */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "20px 40px" }}>
        {/* Search input */}
        <div style={{
          flex: 1, background: "#fff", border: "1px solid #e8e8e4",
          borderRadius: 10, padding: "12px 20px",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <svg width="16" height="16" fill="none" stroke="#aaaaaa" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Type to search..."
            style={{
              border: "none", outline: "none",
              fontFamily: "'DM Sans', sans-serif", fontSize: 15,
              color: "#1a1a1a", flex: 1, background: "transparent",
            }}
          />
        </div>

        {/* Best Match dropdown */}
        <select style={{
          background: "#fff", border: "1px solid #e0e0e0",
          borderRadius: 8, padding: "10px 16px",
          fontFamily: "'DM Sans', sans-serif", fontSize: 14,
          color: "#1a1a1a", outline: "none", cursor: "pointer",
        }}>
          <option>Best Match</option>
          <option>Most Recent</option>
          <option>Highest Salary</option>
        </select>

        {/* Filter button */}
        <button
          onClick={() => setShowFilters(f => !f)}
          style={{
            background: "#fff", border: "1px solid #e0e0e0",
            borderRadius: 8, padding: "10px 16px",
            fontFamily: "'DM Sans', sans-serif", fontSize: 14,
            color: "#1a1a1a", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
          }}
        >
          ≡ Filter
        </button>
      </div>

      {/* ── Results Count ── */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 14,
        color: "#555555", margin: "0 40px 16px",
      }}>
        {filtered.length} roles found in{" "}
        <span style={{ color: "#c9a84c", fontWeight: 600 }}>{activeTab}</span>
      </p>

      {/* ── Job Cards Grid ── */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16, padding: "0 40px 60px",
      }}>
        {filtered.length === 0 && !loading && (
          <div style={{
            gridColumn: "1/-1", textAlign: "center", padding: 80,
            background: "#fff", borderRadius: 14, border: "1px solid #ebebeb",
          }}>
            <Briefcase size={40} style={{ margin: "0 auto 16px", color: "#aaaaaa" }} />
            <h3 style={{ fontSize: 17, fontWeight: 600, color: "#374151", marginBottom: 6 }}>No roles found</h3>
            <p style={{ color: "#888888", margin: 0, fontSize: 14 }}>Try adjusting your search or filters.</p>
          </div>
        )}

        {filtered.map((match, i) => {
          const initials = match.job.company_name.slice(0, 2).toUpperCase();
          const salary = SALARY_MAP[match.job_id] ?? "$110k – $140k";
          const earnings = EARNINGS_MAP[match.job_id] ?? "$5,800/mo";
          const hired = HIRED_MAP[match.job_id] ?? 12;

          return (
            <motion.div
              key={match.job_id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{
                background: "#fff", border: "1px solid #ebebeb",
                borderRadius: 14, padding: 20,
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "box-shadow 0.2s ease, border-color 0.2s ease",
                cursor: "pointer", display: "flex", flexDirection: "column",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
                e.currentTarget.style.borderColor = "#c9a84c";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                e.currentTarget.style.borderColor = "#ebebeb";
              }}
            >
              {/* Row 1: Badge + Company */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{
                  background: "#fdf6e3", border: "1px solid #c9a84c",
                  borderRadius: 999, padding: "3px 10px",
                  fontSize: 12, fontWeight: 600, color: "#c9a84c",
                }}>
                  {match.match_score}% Match
                </span>
                <span style={{ fontSize: 13, color: "#aaaaaa" }}>
                  {match.job.company_name}
                </span>
              </div>

              {/* Row 2: Job Title */}
              <h3 style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 17,
                fontWeight: 600, color: "#1a1a1a",
                marginTop: 10, marginBottom: 0, lineHeight: 1.3,
              }}>
                {match.job.job_title}
              </h3>

              {/* Row 3: Salary */}
              <p style={{
                fontSize: 14, color: "#777777",
                marginTop: 4, marginBottom: 0, flex: 1,
              }}>
                {salary}
              </p>

              {/* Row 4: Avatars + Earnings */}
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginTop: 16,
              }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {[0, 1, 2].map(idx => (
                    <div key={idx} style={{
                      width: 26, height: 26, borderRadius: "50%",
                      background: AVATAR_COLORS[idx % AVATAR_COLORS.length],
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, fontWeight: 700, color: "#fff",
                      marginLeft: idx === 0 ? 0 : -6,
                      border: "2px solid #fff", flexShrink: 0,
                    }}>
                      {initials[idx % initials.length]}
                    </div>
                  ))}
                  <span style={{ fontSize: 13, color: "#aaaaaa", marginLeft: 8 }}>
                    +{hired} hired
                  </span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#2a9d5c" }}>
                  {earnings}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Bottom text section ── */}
      <div style={{
        padding: "48px 40px 56px 40px",
        borderTop: "1px solid #dedad2",
        marginTop: 32,
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 18, color: "#555555",
          lineHeight: 1.65, margin: "0 auto",
          maxWidth: 520,
        }}>
          AI-ranked opportunities tailored to your unique profile — matched, filtered, and ready to apply.
        </p>
      </div>
    </div>
  );
}
