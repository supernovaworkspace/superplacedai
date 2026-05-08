"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Job {
  id: string;
  job_title: string;
  company_name: string;
  location: string;
  job_type: string;
  salary_range: string;
  monthly_earnings: string;
  required_skills: string[];
  match_score: number;
  skill_overlap: string[];
  missing_skills: string[];
  hired_count: number;
  job_link: string;
  is_featured?: boolean;
  pay_label?: string;
}

const AVATAR_COLORS = ["#c9a84c", "#2a9d5c", "#e07b54", "#5c7ec9", "#9b59b6"];

const LOCATION_LABELS: Record<string, string> = {
  Remote: "Remote",
  "Remote (US)": "Remote (US)",
  CA: "California",
  NY: "New York",
  TX: "Texas",
  WA: "Washington",
  FL: "Florida",
  MA: "Massachusetts",
  VA: "Virginia",
  IL: "Illinois",
  NJ: "New Jersey",
  MD: "Maryland",
  DC: "Washington D.C.",
  CT: "Connecticut",
  MN: "Minnesota",
  OH: "Ohio",
  OK: "Oklahoma",
};

function resolveLocation(loc: string) {
  return LOCATION_LABELS[loc] ?? loc;
}

export default function JobConnectorPage() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [filter, setFilter] = useState({ location: "", minScore: 0 });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("Featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Best Match");

  // Load both datasets and merge: Mercor first (featured), then Kaggle
  useEffect(() => {
    Promise.all([
      fetch("/mercor_jobs.json").then((r) => r.json()),
      fetch("/kaggle_jobs.json").then((r) => r.json()),
    ])
      .then(([mercor, kaggle]: [Job[], Job[]]) => {
        setAllJobs([...mercor, ...kaggle]);
        setLoadingData(false);
      })
      .catch(() => setLoadingData(false));
  }, []);

  const tabs = ["Featured", "All", "Hourly Contract", "Full-time"];

  // Filter logic
  const filtered = allJobs
    .filter((j) => {
      if (activeTab === "Featured") return !!j.is_featured;
      if (activeTab === "Hourly Contract") return j.job_type === "Hourly Contract";
      if (activeTab === "Full-time") return j.job_type === "Full-time";
      // "All" — no type filter
      if (
        filter.location &&
        !resolveLocation(j.location).toLowerCase().includes(filter.location.toLowerCase())
      )
        return false;
      if (j.match_score < filter.minScore) return false;
      if (
        searchQuery &&
        !j.job_title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !j.company_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    })
    .filter((j) => {
      // Apply search + location + score to all tabs
      if (activeTab === "Featured") return true; // featured cards always shown as-is
      if (
        filter.location &&
        !resolveLocation(j.location).toLowerCase().includes(filter.location.toLowerCase())
      )
        return false;
      if (j.match_score < filter.minScore) return false;
      if (
        searchQuery &&
        !j.job_title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !j.company_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "Best Match") return b.match_score - a.match_score;
      if (sortBy === "Highest Salary") {
        const extract = (s: string) => {
          const nums = s.match(/\d+/g);
          return nums ? Math.max(...nums.map(Number)) : 0;
        };
        return extract(b.salary_range) - extract(a.salary_range);
      }
      return 0;
    });

  const featuredCount = allJobs.filter((j) => j.is_featured).length;

  return (
    <div style={{ minHeight: "100vh", background: "#f0f0ec", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #aaaaaa; }
        @keyframes shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        .skeleton {
          background: linear-gradient(90deg,#ebebeb 25%,#f5f5f5 50%,#ebebeb 75%);
          background-size: 800px 100%; animation: shimmer 1.4s infinite linear; border-radius: 8px;
        }
        .job-card { transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.15s ease; }
        .job-card:hover { transform: translateY(-2px); }
        .featured-badge { animation: pulse-gold 2s ease-in-out infinite; }
        @keyframes pulse-gold {
          0%,100%{ box-shadow: 0 0 0 0 rgba(201,168,76,0.25); }
          50%{ box-shadow: 0 0 0 6px rgba(201,168,76,0); }
        }
      `}</style>

      {/* ── Top Nav ── */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px" }}>
        <Link href="/dashboard" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#555555", textDecoration: "none" }}>
          ← Back to Dashboard
        </Link>
        <div style={{ background: "#ffffff", border: "1px solid #e0e0e0", borderRadius: 999, padding: "6px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1a1a1a", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "#c9a84c" }}>●</span> SUPERPLACED AI
        </div>
      </nav>

      {/* ── Page Header ── */}
      <div style={{ padding: "8px 40px 0 40px" }}>
        <span style={{ display: "inline-block", background: "#fdf6e3", border: "1px solid #c9a84c", borderRadius: 999, padding: "5px 14px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#c9a84c", fontWeight: 600 }}>
          Placement Agent
        </span>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, color: "#1a1a1a", fontWeight: 400, margin: "8px 0" }}>
          Job Connector
        </h1>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#888888", margin: 0 }}>
            Curated roles from Mercor &amp; AI/ML dataset — matched to your profile with direct referral links.
          </p>
          <span style={{ background: "#fdf6e3", border: "1px solid #e8d9b0", borderRadius: 999, padding: "6px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#c9a84c", whiteSpace: "nowrap", marginLeft: 24 }}>
            {loadingData ? "⚙ Loading..." : `⚙ ${allJobs.length} Roles Indexed`}
          </span>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ marginTop: 24, padding: "0 40px", borderBottom: "1px solid #e8e8e4", display: "flex", alignItems: "center" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 15, background: "none", border: "none",
              cursor: "pointer", padding: "12px 0", marginRight: 32,
              color: activeTab === tab ? "#1a1a1a" : "#888888",
              fontWeight: activeTab === tab ? 600 : 400,
              borderBottom: activeTab === tab ? "2px solid #c9a84c" : "2px solid transparent",
              transition: "color 0.15s", display: "flex", alignItems: "center", gap: 6,
            }}
          >
            {tab}
            {tab === "Featured" && (
              <span style={{ background: "#c9a84c", color: "#fff", borderRadius: 999, fontSize: 10, padding: "1px 7px", fontWeight: 700 }}>
                {featuredCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Search + Sort + Filter ── */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "20px 40px" }}>
        <div style={{ flex: 1, background: "#fff", border: "1px solid #e8e8e4", borderRadius: 10, padding: "12px 20px", display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="16" height="16" fill="none" stroke="#aaaaaa" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search job title or company..."
            style={{ border: "none", outline: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#1a1a1a", flex: 1, background: "transparent" }}
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: "10px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#1a1a1a", outline: "none", cursor: "pointer" }}
        >
          <option>Best Match</option>
          <option>Highest Salary</option>
        </select>
        <button
          onClick={() => setShowFilters((f) => !f)}
          style={{ background: showFilters ? "#fdf6e3" : "#fff", border: `1px solid ${showFilters ? "#c9a84c" : "#e0e0e0"}`, borderRadius: 8, padding: "10px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: showFilters ? "#c9a84c" : "#1a1a1a", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
        >
          ≡ Filter
        </button>
      </div>

      {/* ── Filter Panel ── */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          style={{ margin: "0 40px 16px", background: "#fff", border: "1px solid #e8e8e4", borderRadius: 12, padding: "16px 20px", display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 12, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Location</label>
            <input
              value={filter.location}
              onChange={(e) => setFilter((f) => ({ ...f, location: e.target.value }))}
              placeholder="e.g. California, Remote"
              style={{ border: "1px solid #e0e0e0", borderRadius: 6, padding: "8px 12px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", color: "#1a1a1a", width: 200 }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label style={{ fontSize: 12, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Min Match Score</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="range" min={0} max={99} value={filter.minScore}
                onChange={(e) => setFilter((f) => ({ ...f, minScore: Number(e.target.value) }))}
                style={{ accentColor: "#c9a84c", width: 140 }}
              />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#c9a84c" }}>{filter.minScore}%</span>
            </div>
          </div>
          <button
            onClick={() => setFilter({ location: "", minScore: 0 })}
            style={{ marginLeft: "auto", background: "none", border: "1px solid #e0e0e0", borderRadius: 6, padding: "8px 14px", fontSize: 13, color: "#888", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            Clear
          </button>
        </motion.div>
      )}

      {/* ── Featured Mercor Banner (only on Featured tab) ── */}
      {activeTab === "Featured" && !loadingData && (
        <div style={{ margin: "0 40px 20px", background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)", borderRadius: 14, padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "#c9a84c", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: "#1a1a1a", flexShrink: 0 }}>
              M
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>
                Mercor — Verified Partner Roles
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#aaaaaa", marginTop: 2 }}>
                Real referral links · Hourly contracts · Apply directly
              </div>
            </div>
          </div>
          <span style={{ background: "#c9a84c", color: "#1a1a1a", borderRadius: 999, padding: "5px 14px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
            {featuredCount} Live Roles
          </span>
        </div>
      )}

      {/* ── Results Count ── */}
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#555555", margin: "0 40px 16px" }}>
        {loadingData ? "Loading roles..." : (
          <>{filtered.length} roles in <span style={{ color: "#c9a84c", fontWeight: 600 }}>{activeTab}</span></>
        )}
      </p>

      {/* ── Cards Grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, padding: "0 40px 60px" }}>
        {/* Skeletons */}
        {loadingData && Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 14, padding: 20, minHeight: 180 }}>
            <div className="skeleton" style={{ height: 18, width: "60%", marginBottom: 12 }} />
            <div className="skeleton" style={{ height: 22, width: "80%", marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 14, width: "40%", marginBottom: 20 }} />
            <div className="skeleton" style={{ height: 26, width: "100%" }} />
          </div>
        ))}

        {/* Empty state */}
        {!loadingData && filtered.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 80, background: "#fff", borderRadius: 14, border: "1px solid #ebebeb" }}>
            <Briefcase size={40} style={{ margin: "0 auto 16px", color: "#aaaaaa" }} />
            <h3 style={{ fontSize: 17, fontWeight: 600, color: "#374151", marginBottom: 6 }}>No roles found</h3>
            <p style={{ color: "#888888", margin: 0, fontSize: 14 }}>Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Job Cards */}
        {!loadingData && filtered.map((job, i) => {
          const initials = job.company_name.slice(0, 2).toUpperCase();
          const isFeatured = !!job.is_featured;

          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="job-card"
              style={{
                background: isFeatured ? "#fff" : "#fff",
                border: isFeatured ? "1.5px solid #c9a84c" : "1px solid #ebebeb",
                borderRadius: 14, padding: 20,
                boxShadow: isFeatured
                  ? "0 2px 12px rgba(201,168,76,0.12)"
                  : "0 1px 4px rgba(0,0,0,0.04)",
                cursor: "pointer", display: "flex", flexDirection: "column",
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = isFeatured
                  ? "0 6px 24px rgba(201,168,76,0.22)"
                  : "0 4px 16px rgba(0,0,0,0.08)";
                e.currentTarget.style.borderColor = "#c9a84c";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = isFeatured
                  ? "0 2px 12px rgba(201,168,76,0.12)"
                  : "0 1px 4px rgba(0,0,0,0.04)";
                e.currentTarget.style.borderColor = isFeatured ? "#c9a84c" : "#ebebeb";
              }}
              onClick={() => window.open(job.job_link, "_blank")}
            >
              {/* Featured ribbon */}
              {isFeatured && (
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  background: "#c9a84c", color: "#fff",
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
                  padding: "3px 10px", borderBottomLeftRadius: 8,
                  textTransform: "uppercase",
                }}>
                  Mercor ✦
                </div>
              )}

              {/* Row 1: Match badge + Company */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ background: "#fdf6e3", border: "1px solid #c9a84c", borderRadius: 999, padding: "3px 10px", fontSize: 12, fontWeight: 600, color: "#c9a84c" }}>
                  {job.match_score}% Match
                </span>
                <span style={{ fontSize: 12, color: "#aaaaaa", maxWidth: 110, textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {job.company_name}
                </span>
              </div>

              {/* Row 2: Job Title */}
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: "#1a1a1a", marginTop: 10, marginBottom: 4, lineHeight: 1.3 }}>
                {job.job_title}
              </h3>

              {/* Row 3: Location + Type pill */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: "#777" }}>📍 {resolveLocation(job.location)}</span>
                <span style={{
                  background: isFeatured ? "#fdf6e3" : "#f0f0ec",
                  border: isFeatured ? "1px solid #e8d9b0" : "none",
                  borderRadius: 999, padding: "2px 8px", fontSize: 11,
                  color: isFeatured ? "#c9a84c" : "#555", fontWeight: 500,
                }}>
                  {job.job_type}
                </span>
              </div>

              {/* Row 4: Skills chips */}
              {job.required_skills.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                  {job.required_skills.slice(0, 4).map((sk) => (
                    <span key={sk} style={{ background: "#f5f5f2", border: "1px solid #e0e0da", borderRadius: 999, padding: "2px 8px", fontSize: 11, color: "#555" }}>
                      {sk}
                    </span>
                  ))}
                  {job.required_skills.length > 4 && (
                    <span style={{ background: "#f5f5f2", border: "1px solid #e0e0da", borderRadius: 999, padding: "2px 8px", fontSize: 11, color: "#888" }}>
                      +{job.required_skills.length - 4} more
                    </span>
                  )}
                </div>
              )}

              {/* Row 5: Salary */}
              <p style={{ fontSize: 14, color: "#777777", marginTop: 2, marginBottom: 0, flex: 1 }}>
                {job.pay_label ?? job.salary_range}
              </p>

              {/* Row 6: Avatars + Earnings + Apply CTA */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {[0, 1, 2].map((idx) => (
                    <div key={idx} style={{ width: 24, height: 24, borderRadius: "50%", background: AVATAR_COLORS[idx % AVATAR_COLORS.length], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "#fff", marginLeft: idx === 0 ? 0 : -6, border: "2px solid #fff", flexShrink: 0 }}>
                      {initials[idx % initials.length]}
                    </div>
                  ))}
                  <span style={{ fontSize: 12, color: "#aaaaaa", marginLeft: 8 }}>+{job.hired_count} hired</span>
                </div>

                {isFeatured ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: "#c9a84c" }}>
                    Apply <ExternalLink size={11} />
                  </span>
                ) : (
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#2a9d5c" }}>{job.monthly_earnings}</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div style={{ padding: "48px 40px 56px 40px", borderTop: "1px solid #dedad2", marginTop: 32, textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#555555", lineHeight: 1.65, margin: "0 auto", maxWidth: 520 }}>
          Curated AI & ML roles and Mercor partner positions — ranked by match score, ready to apply.
        </p>
      </div>
    </div>
  );
}
