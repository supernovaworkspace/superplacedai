"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Target, Sparkles, BookOpen, ArrowLeft, Save, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [experience, setExperience] = useState("Junior");
  const [skills, setSkills] = useState("");
  const [readiness, setReadiness] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/user/profile").then(r => r.json()).then(d => {
      if (d.user) {
        setName(d.user.name || "");
        setTargetRole(d.user.target_role || "");
        setExperience(d.user.experience_level || "Junior");
        setSkills((d.user.skills || []).join(", "));
        setReadiness(d.user.readiness_score || 0);
      }
    }).catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          target_role: targetRole,
          experience_level: experience,
          skills: skills.split(",").map(s => s.trim()).filter(Boolean),
          profile_complete: true,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { /* ignore */ }
    setSaving(false);
  };

  const circumference = 2 * Math.PI * 54;
  const strokeDash = circumference - (readiness / 100) * circumference;

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", borderBottom: "1px solid #d3d7dc", background: "rgba(248,249,250,0.9)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 50 }}>
        <a href="/agents/dashboard" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#9ea5ad", fontSize: 14, fontWeight: 500 }}>
          <ArrowLeft size={16} /> Back to Dashboard
        </a>
        <button onClick={handleSave} disabled={saving} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 24px", borderRadius: 12, background: saved ? "#16a34a" : "#d4af37", color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
          {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> {saving ? "Saving..." : "Save Profile"}</>}
        </button>
      </nav>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "48px 48px 100px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 600, color: "#1a1c1e", letterSpacing: "-0.02em", marginBottom: 8 }}>
            Your <span style={{ color: "#d4af37" }}>Profile</span>
          </h1>
          <p style={{ fontSize: 16, color: "#687078", marginBottom: 48 }}>Complete your profile to get better AI-powered recommendations.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 48 }}>
          {/* Left — Form */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <InputField icon={<User size={18} />} label="Full Name" value={name} onChange={setName} placeholder="John Doe" />
            <InputField icon={<Target size={18} />} label="Target Role" value={targetRole} onChange={setTargetRole} placeholder="e.g. ML Engineer, Frontend Developer" />

            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#1a1c1e", marginBottom: 8 }}>
                <BookOpen size={18} color="#d4af37" /> Experience Level
              </label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Beginner", "Junior", "Mid-Level", "Senior", "Executive"].map(lvl => (
                  <button key={lvl} onClick={() => setExperience(lvl)} style={{ padding: "8px 20px", borderRadius: 20, border: experience === lvl ? "2px solid #d4af37" : "1px solid #d3d7dc", background: experience === lvl ? "rgba(212,175,55,0.08)" : "#fff", color: experience === lvl ? "#d4af37" : "#687078", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#1a1c1e", marginBottom: 8 }}>
                <Sparkles size={18} color="#d4af37" /> Skills
              </label>
              <textarea value={skills} onChange={e => setSkills(e.target.value)} placeholder="Python, React, Machine Learning, SQL..." style={{ width: "100%", padding: 16, borderRadius: 12, border: "1px solid #d3d7dc", fontSize: 14, fontFamily: "inherit", minHeight: 100, resize: "vertical", outline: "none" }} />
              <p style={{ fontSize: 12, color: "#9ea5ad", marginTop: 4 }}>Comma-separated list of your skills</p>
            </div>
          </div>

          {/* Right — Readiness Score */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} style={{ background: "#fff", borderRadius: 20, padding: 32, border: "1px solid #d3d7dc", textAlign: "center", height: "fit-content", position: "sticky", top: 100 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#1a1c1e", marginBottom: 24 }}>Readiness Score</h3>
            <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 20px" }}>
              <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e9ed" strokeWidth="8" />
                <circle cx="60" cy="60" r="54" fill="none" stroke="#d4af37" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={strokeDash} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 600, color: "#1a1c1e" }}>
                {readiness}%
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#687078", lineHeight: 1.5 }}>Complete all agent steps to increase your score</p>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8, textAlign: "left" }}>
              {["Resume Analyzed", "Skill Gaps Found", "Interview Done", "Jobs Matched"].map((item, i) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: readiness > i * 25 ? "#16a34a" : "#9ea5ad" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: readiness > i * 25 ? "#16a34a" : "#d3d7dc" }} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function InputField({ icon, label, value, onChange, placeholder }: { icon: React.ReactNode; label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div>
      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#1a1c1e", marginBottom: 8 }}>
        <span style={{ color: "#d4af37" }}>{icon}</span> {label}
      </label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #d3d7dc", fontSize: 14, fontFamily: "inherit", outline: "none", transition: "border 0.2s" }} onFocus={e => e.target.style.borderColor = "#d4af37"} onBlur={e => e.target.style.borderColor = "#d3d7dc"} />
    </div>
  );
}
