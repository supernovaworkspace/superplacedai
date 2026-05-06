"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, User, Shield, Bell, Trash2, LogOut, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    sessionStorage.removeItem("superplaced_guest");
    router.push("/");
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", fontFamily: "'DM Sans', sans-serif" }}>
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", borderBottom: "1px solid #d3d7dc", background: "rgba(248,249,250,0.9)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 50 }}>
        <a href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#9ea5ad", fontSize: 14, fontWeight: 500 }}>
          <ArrowLeft size={16} /> Dashboard
        </a>
      </nav>

      <main style={{ maxWidth: 700, margin: "0 auto", padding: "48px 48px 100px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 600, color: "#1a1c1e", letterSpacing: "-0.02em", marginBottom: 48 }}>Settings</h1>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Account */}
          <SettingsCard icon={<User size={20} />} title="Account" description="Manage your account details">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: "#687078", marginBottom: 4, display: "block" }}>Display Name</label>
                <input type="text" placeholder="Your name" style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #d3d7dc", fontSize: 14, outline: "none" }} />
              </div>
              <div><label style={{ fontSize: 12, fontWeight: 600, color: "#687078", marginBottom: 4, display: "block" }}>Email</label>
                <input type="email" placeholder="you@email.com" disabled style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #e6e9ed", fontSize: 14, outline: "none", background: "#f8f9fa", color: "#9ea5ad" }} />
              </div>
            </div>
          </SettingsCard>

          {/* Security */}
          <SettingsCard icon={<Shield size={20} />} title="Connected Accounts" description="Manage your OAuth connections">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 10, border: "1px solid #d3d7dc" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>Google</span>
                </div>
                <span style={{ fontSize: 12, color: "#9ea5ad" }}>Not connected</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderRadius: 10, border: "1px solid #d3d7dc" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1a1c1e"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>GitHub</span>
                </div>
                <span style={{ fontSize: 12, color: "#9ea5ad" }}>Not connected</span>
              </div>
            </div>
          </SettingsCard>

          {/* Notifications */}
          <SettingsCard icon={<Bell size={20} />} title="Notifications" description="Manage email and push notifications">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["Job match alerts", "Interview reminders", "Skill gap updates"].map(item => (
                <label key={item} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                  <span style={{ fontSize: 14, color: "#1a1c1e" }}>{item}</span>
                  <input type="checkbox" defaultChecked style={{ width: 18, height: 18, accentColor: "#d4af37" }} />
                </label>
              ))}
            </div>
          </SettingsCard>

          {/* Save */}
          <button onClick={handleSave} style={{ padding: "14px 32px", borderRadius: 12, background: saved ? "#16a34a" : "#d4af37", color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, justifyContent: "center", transition: "all 0.2s" }}>
            {saved ? <><CheckCircle size={16} /> Saved!</> : "Save Settings"}
          </button>

          {/* Danger Zone */}
          <div style={{ marginTop: 32, padding: 24, borderRadius: 16, border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.03)" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#ef4444", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}><Trash2 size={16} /> Danger Zone</h3>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={handleSignOut} style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, border: "1px solid #d3d7dc", background: "#fff", fontSize: 13, fontWeight: 500, color: "#687078", cursor: "pointer" }}>
                <LogOut size={14} /> Sign Out
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10, border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.05)", fontSize: 13, fontWeight: 500, color: "#ef4444", cursor: "pointer" }}>
                <Trash2 size={14} /> Delete Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SettingsCard({ icon, title, description, children }: { icon: React.ReactNode; title: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #d3d7dc", padding: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{ color: "#d4af37" }}>{icon}</div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1c1e" }}>{title}</h3>
          <p style={{ fontSize: 12, color: "#9ea5ad" }}>{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
