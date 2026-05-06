"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const router = useRouter();
  const [hoveredGoogle, setHoveredGoogle] = useState(false);
  const [hoveredLinkedin, setHoveredLinkedin] = useState(false);
  const [hoveredLogin, setHoveredLogin] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const supabase = createClient();

  const handleOAuth = async (provider: "google" | "linkedin_oidc") => {
    setLoading(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        console.error("OAuth error:", error);
        setLoading(null);
        setTimeout(() => router.push("/dashboard"), 800);
      }
    } catch {
      setLoading(null);
      setTimeout(() => router.push("/dashboard"), 800);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading("email");
    setTimeout(() => {
      setLoading(null);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#0d0d0d",
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          zIndex: 0,
        }}
      />
      {/* Centered Content Container */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: "40px",
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "16px" }}
        >
          <img
            src="/logo.png"
            alt="SuperPlaced AI"
            style={{ height: "225px", filter: "brightness(0) invert(1)" }}
          />
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          style={{
            background: "linear-gradient(145deg, #ffffff, #f3f4f6)",
            borderRadius: "20px",
            padding: "48px 40px",
            width: "100%",
            maxWidth: "420px",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "26px",
                fontWeight: 600,
                color: "#1a1c1e",
                marginBottom: "8px",
              }}
            >
              Welcome Back!
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: "#687078",
              }}
            >
              Please login to your account
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1a1c1e",
                  marginBottom: "8px",
                }}
              >
                Email
              </label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#9ea5ad" }}>
                  <MailIcon />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 42px",
                    borderRadius: "8px",
                    border: "1px solid #d3d7dc",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#1a1c1e")}
                  onBlur={(e) => (e.target.style.borderColor = "#d3d7dc")}
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#1a1c1e",
                  marginBottom: "8px",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#9ea5ad" }}>
                  <LockIcon />
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                  style={{
                    width: "100%",
                    padding: "12px 42px 12px 42px",
                    borderRadius: "8px",
                    border: "1px solid #d3d7dc",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#1a1c1e")}
                  onBlur={(e) => (e.target.style.borderColor = "#d3d7dc")}
                />
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#9ea5ad",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <EyeIcon />
                </button>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
              <a
                href="#"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "#687078",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1a1c1e")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#687078")}
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={!!loading}
              onMouseEnter={() => setHoveredLogin(true)}
              onMouseLeave={() => setHoveredLogin(false)}
              style={{
                width: "100%",
                padding: "14px",
                background: hoveredLogin ? "#333" : "#111418",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                fontWeight: 500,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {loading === "email" ? <Spinner color="#fff" /> : null}
              Log In
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "#e6e9ed" }} />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#9ea5ad" }}>
              or continue with
            </span>
            <div style={{ flex: 1, height: "1px", background: "#e6e9ed" }} />
          </div>

          {/* OAuth Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => handleOAuth("google")}
              disabled={!!loading}
              onMouseEnter={() => setHoveredGoogle(true)}
              onMouseLeave={() => setHoveredGoogle(false)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                background: "#fff",
                border: `1px solid ${hoveredGoogle ? "#1a1c1e" : "#d3d7dc"}`,
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "border-color 0.2s",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#1a1c1e",
              }}
            >
              {loading === "google" ? <Spinner /> : <GoogleIcon />}
              Google
            </button>
            <button
              onClick={() => handleOAuth("linkedin_oidc")}
              disabled={!!loading}
              onMouseEnter={() => setHoveredLinkedin(true)}
              onMouseLeave={() => setHoveredLinkedin(false)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                background: "#fff",
                border: `1px solid ${hoveredLinkedin ? "#1a1c1e" : "#d3d7dc"}`,
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "border-color 0.2s",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#1a1c1e",
              }}
            >
              {loading === "linkedin_oidc" ? <Spinner /> : <LinkedInIcon />}
              LinkedIn
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#687078" }}>
              Don't have an account?{" "}
              <a href="#" style={{ color: "#1a1c1e", fontWeight: 700, textDecoration: "none" }}>
                Register now
              </a>
            </p>
          </div>
        </motion.div>
      </div>


    </div>
  );
}

/* ── Components ── */

function FeatureItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{ color: "#d4af37", display: "flex" }}>{icon}</div>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 500, color: "#fff" }}>
        {text}
      </span>
    </div>
  );
}

/* ── Icons ── */

function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

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

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0077b5">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function Dots({ fill = "#d1d5db" }: { fill?: string }) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <pattern id={`dots-${fill}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle fill={fill} cx="3" cy="3" r="3" />
      </pattern>
      <rect x="0" y="0" width="80" height="80" fill={`url(#dots-${fill})`} />
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
