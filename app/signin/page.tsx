"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const router = useRouter();
  const [hoveredGuest, setHoveredGuest] = useState(false);
  const [hoveredGoogle, setHoveredGoogle] = useState(false);
  const [hoveredGithub, setHoveredGithub] = useState(false);
  const [hoveredEmail, setHoveredEmail] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const supabase = createClient();

  const handleGuest = () => {
    setLoading("guest");
    sessionStorage.setItem("superplaced_guest", "true");
    setTimeout(() => router.push("/dashboard"), 600);
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setLoading(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        console.error("OAuth error:", error);
        setLoading(null);
        // Fallback: go to dashboard anyway for demo
        setTimeout(() => router.push("/dashboard"), 800);
      }
    } catch {
      setLoading(null);
      setTimeout(() => router.push("/dashboard"), 800);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Noise texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Decorative warm orb */}
      <div style={{ position: "absolute", top: "-120px", right: "-80px", width: "480px", height: "480px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "-100px", left: "-60px", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Back to home */}
      <motion.a
        href="/"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ position: "absolute", top: 28, left: 40, display: "flex", alignItems: "center", gap: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#9ea5ad", textDecoration: "none", zIndex: 10, transition: "color 0.2s" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#1a1c1e")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#9ea5ad")}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        Back
      </motion.a>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", zIndex: 1, background: "#ffffff", border: "1px solid #d3d7dc", borderRadius: 24, padding: "48px 44px", width: "100%", maxWidth: 440, boxShadow: "0 4px 24px rgba(28,27,24,0.06), 0 1px 4px rgba(28,27,24,0.04)" }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
          <img src="/logo.png" alt="SuperPlaced AI Logo" style={{ height: 240, filter: "invert(1) brightness(0)" }} />
        </div>

        {/* Heading */}
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 500, color: "#1a1c1e", letterSpacing: "-0.02em", lineHeight: 1.15, marginBottom: 8 }}>Welcome back</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#9ea5ad", marginBottom: 32, lineHeight: 1.5 }}>Sign in to continue your career journey.</p>

        {/* OAuth buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {/* Google */}
          <button
            id="btn-signin-google"
            onClick={() => handleOAuth("google")}
            disabled={!!loading}
            onMouseEnter={() => setHoveredGoogle(true)}
            onMouseLeave={() => setHoveredGoogle(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "13px 20px", borderRadius: 12, border: "1px solid #d3d7dc", background: hoveredGoogle ? "#f8f9fa" : "#ffffff", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#1a1c1e", transition: "all 0.2s ease", opacity: loading && loading !== "google" ? 0.5 : 1 }}
          >
            {loading === "google" ? <Spinner /> : <GoogleIcon />}
            Continue with Google
          </button>

          {/* GitHub */}
          <button
            id="btn-signin-github"
            onClick={() => handleOAuth("github")}
            disabled={!!loading}
            onMouseEnter={() => setHoveredGithub(true)}
            onMouseLeave={() => setHoveredGithub(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "13px 20px", borderRadius: 12, border: "1px solid #d3d7dc", background: hoveredGithub ? "#f8f9fa" : "#ffffff", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#1a1c1e", transition: "all 0.2s ease", opacity: loading && loading !== "github" ? 0.5 : 1 }}
          >
            {loading === "github" ? <Spinner /> : <GitHubIcon />}
            Continue with GitHub
          </button>

          {/* Email */}
          <button
            id="btn-signin-email"
            onClick={() => {
              setLoading("email");
              alert("Email login component integration required.");
              setLoading(null);
            }}
            disabled={!!loading}
            onMouseEnter={() => setHoveredEmail(true)}
            onMouseLeave={() => setHoveredEmail(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "13px 20px", borderRadius: 12, border: "1px solid #d3d7dc", background: hoveredEmail ? "#f8f9fa" : "#ffffff", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#1a1c1e", transition: "all 0.2s ease", opacity: loading && loading !== "email" ? 0.5 : 1 }}
          >
            {loading === "email" ? <Spinner /> : <MailIcon />}
            Continue with Email
          </button>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
          <div style={{ flex: 1, height: 1, background: "#e6e9ed" }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#b3b1a8", flexShrink: 0 }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#e6e9ed" }} />
        </div>

        {/* Guest login */}
        <button
          id="btn-signin-guest"
          onClick={handleGuest}
          disabled={!!loading}
          onMouseEnter={() => setHoveredGuest(true)}
          onMouseLeave={() => setHoveredGuest(false)}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px 20px", borderRadius: 12, border: "1.5px dashed #d4af37", background: hoveredGuest ? "rgba(212,175,55,0.06)" : "rgba(212,175,55,0.03)", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#d4af37", transition: "all 0.22s ease", transform: hoveredGuest ? "translateY(-1px)" : "translateY(0)", boxShadow: hoveredGuest ? "0 6px 18px rgba(212,175,55,0.15)" : "none", opacity: loading && loading !== "guest" ? 0.5 : 1 }}
        >
          {loading === "guest" ? <Spinner color="#d4af37" /> : <GuestIcon />}
          Continue as Guest
        </button>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#b3b1a8", textAlign: "center", marginTop: 12, lineHeight: 1.5 }}>
          Guest mode gives full access without an account.<br />Progress won&apos;t be saved.
        </p>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#b3b1a8", textAlign: "center", marginTop: 24 }}>
          By continuing, you agree to our{" "}
          <a href="#" style={{ color: "#9ea5ad", textDecoration: "underline" }}>Terms</a>{" "}&amp;{" "}
          <a href="#" style={{ color: "#9ea5ad", textDecoration: "underline" }}>Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
}

/* ── Icons ── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1a1c1e">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function GuestIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function Spinner({ color = "#9ea5ad" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 0.7s linear infinite" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
