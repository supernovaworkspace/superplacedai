"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ─────────────────────────────────────────────
   Agent Data
───────────────────────────────────────────── */
const AGENTS = [
  {
    id: "resume",
    num: "01",
    name: "Resume Analyzer",
    tagline: "Evaluates your resume with ATS-grade intelligence. Every word is scored, every gap is found.",
    bullets: [
      "Assigns ATS compatibility score across 40+ criteria",
      "Rewrites weak bullet points for impact",
      "Flags formatting issues before recruiter sees them",
    ],
    outputLabel: "What you get:",
    outputBadge: "ATS Report",
    outputLines: [
      { label: "Resume Score", value: "87 / 100", highlight: true },
      { label: "Critical Issues", value: "3 found", highlight: false },
      { label: "Keywords Missing", value: "Python, CI/CD", highlight: false },
      { label: "Status", value: "Improvement Ready", highlight: false },
    ],
    dotColor: "#d4af37",
  },
  {
    id: "skillgap",
    num: "02",
    name: "Skill Gap Analyzer",
    tagline: "Compares your current skills against target roles. Tells you exactly what to learn next.",
    bullets: [
      "Maps your skills to live job requirements",
      "Ranks skill gaps by career impact priority",
      "Generates a personalised learning roadmap",
    ],
    outputLabel: "What you get:",
    outputBadge: "Gap Report",
    outputLines: [
      { label: "Gaps Found", value: "8 skill gaps", highlight: true },
      { label: "Top Priority", value: "Python · SQL · System Design", highlight: false },
      { label: "Roadmap ETA", value: "~6 weeks", highlight: false },
      { label: "Courses Linked", value: "14 resources", highlight: false },
    ],
    dotColor: "#f59e0b",
  },
  {
    id: "interview",
    num: "03",
    name: "Interview AI Agent",
    tagline: "Runs realistic interview simulations. Evaluates your answers and coaches you to improve.",
    bullets: [
      "Simulates HR, behavioural, and technical rounds",
      "Scores communication and answer structure",
      "Gives real-time coaching feedback per answer",
    ],
    outputLabel: "What you get:",
    outputBadge: "Interview Report",
    outputLines: [
      { label: "Communication Score", value: "78%", highlight: true },
      { label: "Weak Area", value: "STAR structure", highlight: false },
      { label: "Best Answer", value: "Q3 — Leadership", highlight: false },
      { label: "Next Session", value: "Technical Mock", highlight: false },
    ],
    dotColor: "#b87333",
  },
  {
    id: "jobmatch",
    num: "04",
    name: "Job Matching Agent",
    tagline: "Matches your profile to live opportunities across AI hiring platforms you can actually get.",
    bullets: [
      "Scans Mercor, Scale AI, Outlier in real time",
      "Ranks jobs by your current profile readiness",
      "Auto-generates tailored intro paragraphs per role",
    ],
    outputLabel: "What you get:",
    outputBadge: "Match Report",
    outputLines: [
      { label: "Matching Roles", value: "12 found", highlight: true },
      { label: "High Match (85%+)", value: "3 roles", highlight: false },
      { label: "Best Fit", value: "AI Data Annotator", highlight: false },
      { label: "Apply Intro", value: "Generated ✓", highlight: false },
    ],
    dotColor: "#3b82f6",
  },
  {
    id: "career",
    num: "05",
    name: "Career Intelligence",
    tagline: "Your long-term strategist. Tracks your growth, adjusts your path, and never lets you plateau.",
    bullets: [
      "Tracks 30-day progress across all skill areas",
      "Recommends strategic pivots at the right moment",
      "Celebrates milestones and keeps momentum alive",
    ],
    outputLabel: "What you get:",
    outputBadge: "Progress Report",
    outputLines: [
      { label: "Monthly Improvement", value: "+34%", highlight: true },
      { label: "Current Sprint", value: "System Design", highlight: false },
      { label: "Streak", value: "12 days active", highlight: false },
      { label: "Next Milestone", value: "First Application", highlight: false },
    ],
    dotColor: "#d4af37",
  },
];

/* ─────────────────────────────────────────────
   Mock Output Card
───────────────────────────────────────────── */
function MockOutputCard({ agent }: { agent: (typeof AGENTS)[0] }) {
  return (
    <div
      style={{
        background: "#111418",
        border: "1px solid #2a2a28",
        borderRadius: 16,
        padding: "20px 24px",
        marginTop: 8,
      }}
    >
      {/* Card header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          paddingBottom: 14,
          borderBottom: "1px solid #2a2a28",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: agent.dotColor,
              boxShadow: `0 0 8px ${agent.dotColor}`,
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              color: "#6b6b65",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {agent.name}
          </span>
        </div>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            fontWeight: 500,
            color: "#d4af37",
            background: "rgba(212,175,55,0.1)",
            border: "1px solid rgba(212,175,55,0.2)",
            borderRadius: 8,
            padding: "2px 9px",
            letterSpacing: "0.04em",
          }}
        >
          {agent.outputBadge}
        </span>
      </div>

      {/* Output rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {agent.outputLines.map((line, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: line.highlight
                ? "rgba(212,175,55,0.07)"
                : "rgba(255,255,255,0.02)",
              border: line.highlight
                ? "1px solid rgba(212,175,55,0.15)"
                : "1px solid rgba(255,255,255,0.04)",
              borderRadius: 8,
              padding: "9px 14px",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "#6b6b65",
              }}
            >
              {line.label}
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: line.highlight ? "#d4af37" : "#b4bac0",
              }}
            >
              {line.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Content Panel (right side)
───────────────────────────────────────────── */
function ContentPanel({ agent }: { agent: (typeof AGENTS)[0] }) {
  return (
    <motion.div
      key={agent.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative" }}
    >
      {/* Watermark number */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -32,
          left: -12,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(72px, 9vw, 120px)",
          fontWeight: 500,
          color: "#f0eee6",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        {agent.num}
      </div>

      {/* Content sits above watermark */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Agent name */}
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(28px, 3vw, 38px)",
            fontWeight: 500,
            color: "#1a1c1e",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: 16,
            marginTop: 32,
          }}
        >
          {agent.name}
        </h3>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17,
            color: "#687078",
            lineHeight: 1.65,
            maxWidth: 520,
            marginBottom: 32,
            fontWeight: 300,
          }}
        >
          {agent.tagline}
        </p>

        {/* What it does — bullets */}
        <div
          style={{
            background: "#faf9f5",
            border: "1px solid #e6e9ed",
            borderRadius: 14,
            padding: "20px 24px",
            marginBottom: 28,
            display: "flex",
            flexDirection: "column",
            gap: 13,
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              color: "#9ea5ad",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            What it does
          </div>
          {agent.bullets.map((bullet, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#d4af37",
                  flexShrink: 0,
                  marginTop: 6,
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  color: "#3a3936",
                  lineHeight: 1.55,
                  fontWeight: 400,
                }}
              >
                {bullet}
              </span>
            </div>
          ))}
        </div>

        {/* Output label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: "#9ea5ad",
            }}
          >
            {agent.outputLabel}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: "#3a3936",
              background: "#e6e9ed",
              borderRadius: 6,
              padding: "3px 10px",
              letterSpacing: "0.04em",
            }}
          >
            Sample Output
          </span>
        </div>

        {/* Mock output card */}
        <MockOutputCard agent={agent} />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Mobile Accordion Card
───────────────────────────────────────────── */
function MobileCard({ agent, index }: { agent: (typeof AGENTS)[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        border: "1px solid #e6e9ed",
        borderRadius: 16,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 20px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          borderLeft: open ? "3px solid #d4af37" : "3px solid transparent",
          transition: "border-color 0.2s",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              color: "#9ea5ad",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            {agent.num}
          </div>
          <div
            style={{
              fontFamily: open ? "'Cormorant Garamond', serif" : "'DM Sans', sans-serif",
              fontSize: open ? 20 : 16,
              fontWeight: 500,
              color: open ? "#1a1c1e" : "#9ea5ad",
              transition: "all 0.2s",
            }}
          >
            {agent.name}
          </div>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9ea5ad"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
            flexShrink: 0,
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Body */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 20px 20px" }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  color: "#687078",
                  lineHeight: 1.65,
                  marginBottom: 20,
                  fontWeight: 300,
                }}
              >
                {agent.tagline}
              </p>
              <div
                style={{
                  background: "#faf9f5",
                  border: "1px solid #e6e9ed",
                  borderRadius: 12,
                  padding: "16px 18px",
                  marginBottom: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 11,
                }}
              >
                {agent.bullets.map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#d4af37",
                        flexShrink: 0,
                        marginTop: 6,
                      }}
                    />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#3a3936", lineHeight: 1.5 }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>
              <MockOutputCard agent={agent} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function AgentBreakdown() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const active = AGENTS[activeIndex];

  return (
    <section
      id="agents"
      ref={sectionRef}
      style={{
        background: "#f8f9fa",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: 1200,
          margin: "0 auto 72px",
          padding: "0 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            color: "#9ea5ad",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 20, height: 1, background: "#9ea5ad", opacity: 0.6 }} />
          The Agent Suite
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 52px)",
            fontWeight: 500,
            color: "#1a1c1e",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 560,
          }}
        >
          Five agents. One unified system.
        </h2>
      </motion.div>

      {/* ─── DESKTOP: Left nav + Right panel ─── */}
      <div
        className="breakdown-desktop"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 48px",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        {/* LEFT: Sticky nav */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "sticky", top: 100 }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {AGENTS.map((agent, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={agent.id}
                  onClick={() => setActiveIndex(i)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "18px 20px 18px 20px",
                    background: "none",
                    border: "none",
                    borderLeft: isActive
                      ? "3px solid #d4af37"
                      : "3px solid transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.22s ease",
                    borderRadius: "0 8px 8px 0",
                    marginBottom: 2,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderLeftColor = "rgba(212,175,55,0.35)";
                      (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".nav-name")!.style.color = "#1a1c1e";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
                      (e.currentTarget as HTMLElement).querySelector<HTMLElement>(".nav-name")!.style.color = "#9ea5ad";
                    }
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 10,
                      fontWeight: 500,
                      color: "#9ea5ad",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 5,
                      opacity: isActive ? 1 : 0.6,
                    }}
                  >
                    {agent.num}
                  </span>
                  <span
                    className="nav-name"
                    style={{
                      fontFamily: isActive ? "'Cormorant Garamond', serif" : "'DM Sans', sans-serif",
                      fontSize: isActive ? 20 : 15,
                      fontWeight: isActive ? 500 : 400,
                      color: isActive ? "#1a1c1e" : "#9ea5ad",
                      lineHeight: 1.2,
                      transition: "all 0.22s ease",
                    }}
                  >
                    {agent.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Progress bar */}
          <div
            style={{
              marginTop: 32,
              marginLeft: 20,
              display: "flex",
              gap: 4,
            }}
          >
            {AGENTS.map((_, i) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  height: 3,
                  flex: 1,
                  borderRadius: 2,
                  background: i === activeIndex ? "#d4af37" : "#d3d7dc",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* RIGHT: Content panel */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ minHeight: 520, position: "relative" }}
        >
          <AnimatePresence mode="wait">
            <ContentPanel key={active.id} agent={active} />
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ─── MOBILE: Stacked accordion cards ─── */}
      <div
        className="breakdown-mobile"
        style={{
          maxWidth: 640,
          margin: "0 auto",
          padding: "0 20px",
          display: "none",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {AGENTS.map((agent, i) => (
          <MobileCard key={agent.id} agent={agent} index={i} />
        ))}
      </div>

      {/* Responsive style */}
      <style>{`
        @media (max-width: 860px) {
          .breakdown-desktop { display: none !important; }
          .breakdown-mobile  { display: flex !important; }
        }
        @media (max-width: 640px) {
          .breakdown-mobile { padding: 0 16px !important; }
        }
      `}</style>

      {/* Bottom warm divider */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 48,
          right: 48,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, #d3d7dc 30%, #d3d7dc 70%, transparent 100%)",
        }}
      />
    </section>
  );
}
