"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────
   Step Visuals (defined first, used in STEPS array)
───────────────────────────────────────────── */
function UploadMock() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          border: "1px dashed rgba(212,175,55,0.4)",
          borderRadius: 10,
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 6,
          background: "rgba(212,175,55,0.04)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#d4af37" }}>Drop resume here</span>
      </div>
      {["resume_final_v3.pdf", "linkedin_profile.pdf"].map((f, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "7px 10px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 7,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ea5ad" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9ea5ad", flex: 1 }}>{f}</span>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? "#b87333" : "#d4af37" }} />
        </div>
      ))}
    </div>
  );
}

function AgentsMock() {
  const agents = [
    { name: "Resume Analyzer", color: "#d4af37" },
    { name: "Skill Gap", color: "#f59e0b" },
    { name: "Interview AI", color: "#b87333" },
    { name: "Job Match", color: "#3b82f6" },
    { name: "Career Intel", color: "#d4af37" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {agents.map((a, i) => (
        <motion.div
          key={a.name}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ delay: i * 0.2, duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 10px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 7,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: a.color }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#6b6b65", flex: 1 }}>{a.name}</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: a.color }}>Active</span>
        </motion.div>
      ))}
    </div>
  );
}

function ProgressMock() {
  const bars = [
    { label: "Resume Score", pct: 87, color: "#d4af37" },
    { label: "Interview Readiness", pct: 64, color: "#f59e0b" },
    { label: "Skill Coverage", pct: 72, color: "#b87333" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {bars.map((bar) => (
        <div key={bar.label}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#6b6b65" }}>{bar.label}</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: bar.color }}>{bar.pct}%</span>
          </div>
          <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${bar.pct}%` }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              style={{ height: "100%", background: bar.color, borderRadius: 4 }}
            />
          </div>
        </div>
      ))}
      <div style={{ padding: "7px 10px", background: "rgba(212,175,55,0.07)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 8 }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#d4af37" }}>↑ 34% improvement this month</span>
      </div>
    </div>
  );
}

function ConnectMock() {
  const companies = [
    { name: "Mercor",   color: "#3b82f6" },
    { name: "Scale AI", color: "#8b5cf6" },
    { name: "Outlier",  color: "#b87333" },
    { name: "Remox",    color: "#d4af37" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <div style={{ padding: "4px 12px", background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)", borderRadius: 20, fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#d4af37", fontWeight: 500 }}>
          Your Profile · 91% Ready
        </div>
      </div>
      {companies.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ delay: i * 0.2, duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "rgba(255,255,255,0.03)", border: `1px solid ${c.color}22`, borderRadius: 7 }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: c.color, boxShadow: `0 0 6px ${c.color}` }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9ea5ad", flex: 1 }}>{c.name}</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: c.color }}>Connected →</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Icons
───────────────────────────────────────────── */
const ICONS = [
  // Enter — download arrow
  <svg key="enter" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>,
  // Analyze — search+scan
  <svg key="analyze" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M8 11h6M11 8v6" />
  </svg>,
  // Improve — trend up
  <svg key="improve" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>,
  // Connect — network
  <svg key="connect" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>,
];

/* ─────────────────────────────────────────────
   Step Data (uses components defined above)
───────────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    label: "Enter",
    title: "Drop your profile",
    body: "Upload your resume or LinkedIn. Our agents start analyzing immediately.",
    visual: <UploadMock />,
  },
  {
    num: "02",
    label: "Analyze",
    title: "Agents activate",
    body: "Five specialized AI agents scan your profile, find gaps, and build your improvement plan.",
    visual: <AgentsMock />,
  },
  {
    num: "03",
    label: "Improve",
    title: "Train and optimize",
    body: "Mock interviews, skill sprints, resume rewrites. The system adapts to your pace.",
    visual: <ProgressMock />,
  },
  {
    num: "04",
    label: "Connect",
    title: "Get connected",
    body: "When you're ready, SuperPlaced AI routes your profile to Mercor, Scale AI, Outlier, and more.",
    visual: <ConnectMock />,
  },
];

/* ─────────────────────────────────────────────
   Desktop Step Card
───────────────────────────────────────────── */
function StepCard({
  step,
  icon,
  index,
  active,
}: {
  step: (typeof STEPS)[0];
  icon: React.ReactNode;
  index: number;
  active: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}
    >
      {/* Icon circle */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24, position: "relative", zIndex: 2 }}>
        <motion.div
          animate={
            active
              ? {
                  boxShadow: [
                    "0 0 0px rgba(212,175,55,0)",
                    "0 0 20px rgba(212,175,55,0.45)",
                    "0 0 10px rgba(212,175,55,0.2)",
                  ],
                }
              : {}
          }
          transition={{ duration: 0.5 }}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: active ? "#d4af37" : "#22262a",
            border: active ? "2px solid #d4af37" : "2px solid #333940",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: active ? "#f8f9fa" : "#687078",
            transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {icon}
        </motion.div>
      </div>

      {/* Step label + title + body */}
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: active ? "#d4af37" : "#687078",
            transition: "color 0.4s",
          }}
        >
          Step {step.num}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 22,
          fontWeight: 500,
          color: active ? "#f0eee6" : "#6b6b65",
          textAlign: "center",
          marginBottom: 10,
          lineHeight: 1.2,
          transition: "color 0.4s",
        }}
      >
        {step.title}
      </h3>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: "#9ea5ad",
          textAlign: "center",
          lineHeight: 1.65,
          marginBottom: 20,
          fontWeight: 300,
          flex: 1,
        }}
      >
        {step.body}
      </p>

      {/* Visual card */}
      <div
        style={{
          background: "#1a1a18",
          border: `1px solid ${active ? "rgba(212,175,55,0.22)" : "#262b30"}`,
          borderRadius: 14,
          padding: "16px",
          transition: "border-color 0.4s",
        }}
      >
        {step.visual}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeStep, setActiveStep] = useState(-1);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    // Animate line width from 0 to 100% over 1.5s
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setLineWidth(eased * 100);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Activate steps sequentially
    STEPS.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), 300 + i * 320);
    });
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      id="how"
      style={{
        background: "#111418",
        padding: "100px 0 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top radial glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 280,
          background:
            "radial-gradient(ellipse at top, rgba(212,175,55,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="how-inner" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
        {/* ── Headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: 20,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              color: "#687078",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ display: "inline-block", width: 20, height: 1, background: "#687078" }} />
            The Process
            <span style={{ display: "inline-block", width: 20, height: 1, background: "#687078" }} />
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(38px, 4.5vw, 56px)",
              fontWeight: 500,
              color: "#f0eee6",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            From raw potential to hired.
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 20,
              color: "#9ea5ad",
              fontWeight: 300,
            }}
          >
            In four steps.
          </p>
        </motion.div>

        {/* ── DESKTOP: Horizontal Timeline ── */}
        <div className="hiw-desktop">
          <div style={{ position: "relative" }}>
            {/* Track line — background */}
            <div
              style={{
                position: "absolute",
                top: 28,
                left: "calc(12.5% + 28px)",
                right: "calc(12.5% + 28px)",
                height: 1,
                background: "#2a2a28",
                zIndex: 1,
              }}
            />
            {/* Animated fill line */}
            <div
              style={{
                position: "absolute",
                top: 28,
                left: "calc(12.5% + 28px)",
                height: 1,
                width: `calc((75% - 56px) * ${lineWidth / 100})`,
                background: "linear-gradient(90deg, #d4af37, #b87333)",
                zIndex: 2,
                boxShadow: lineWidth > 5 ? "0 0 8px rgba(212,175,55,0.5)" : "none",
                transition: "box-shadow 0.3s",
              }}
            />

            {/* Step cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 24,
                position: "relative",
                zIndex: 3,
              }}
            >
              {STEPS.map((step, i) => (
                <StepCard
                  key={step.num}
                  step={step}
                  icon={ICONS[i]}
                  index={i}
                  active={activeStep >= i}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── MOBILE: Vertical Stack ── */}
        <div
          className="hiw-mobile"
          style={{ display: "none", flexDirection: "column", gap: 0 }}
        >
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              style={{
                display: "flex",
                gap: 20,
                paddingBottom: i < STEPS.length - 1 ? 32 : 0,
              }}
            >
              {/* Left connector */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.18, duration: 0.5 }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: activeStep >= i ? "#d4af37" : "#22262a",
                    border: `2px solid ${activeStep >= i ? "#d4af37" : "#333940"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: activeStep >= i ? "#f8f9fa" : "#687078",
                    transition: "all 0.5s ease",
                    flexShrink: 0,
                  }}
                >
                  {ICONS[i]}
                </motion.div>
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      width: 1,
                      flex: 1,
                      minHeight: 32,
                      marginTop: 8,
                      background:
                        activeStep > i
                          ? "linear-gradient(180deg, #d4af37, #2a2a28)"
                          : "#2a2a28",
                      transition: "background 0.5s",
                    }}
                  />
                )}
              </div>

              {/* Right content */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.18, duration: 0.55 }}
                style={{ paddingTop: 8, flex: 1, minWidth: 0 }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    fontWeight: 500,
                    color: "#687078",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Step {step.num}
                </span>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 22,
                    fontWeight: 500,
                    color: "#f0eee6",
                    marginBottom: 8,
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "#9ea5ad",
                    lineHeight: 1.65,
                    marginBottom: 16,
                    fontWeight: 300,
                  }}
                >
                  {step.body}
                </p>
                <div
                  style={{
                    background: "#1a1a18",
                    border: "1px solid #262b30",
                    borderRadius: 12,
                    padding: "14px",
                  }}
                >
                  {step.visual}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* ── Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginTop: 80 }}
        >
          <div
            style={{
              width: 40,
              height: 1,
              background: "#333940",
              margin: "0 auto 32px",
            }}
          />
          <blockquote
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(18px, 2.2vw, 26px)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#f0eee6",
              lineHeight: 1.55,
              maxWidth: 680,
              margin: "0 auto",
              letterSpacing: "-0.01em",
            }}
          >
            &ldquo;Most platforms give you information.
            <br />
            SuperPlaced AI gives you{" "}
            <em style={{ color: "#d4af37" }}>transformation.</em>&rdquo;
          </blockquote>
        </motion.div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 860px) {
          .hiw-desktop { display: none !important; }
          .hiw-mobile  { display: flex !important; }
        }
        @media (max-width: 640px) {
          #how { padding: 72px 0 60px !important; }
          #how .how-inner { padding: 0 20px !important; }
        }
      `}</style>

      {/* Top divider */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, #2a3038 30%, #2a3038 70%, transparent 100%)",
        }}
      />
    </section>
  );
}
