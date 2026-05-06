"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const AGENTS = [
  {
    id: "resume",
    name: "Resume Analyzer",
    status: "Analyzing your profile...",
    radius: 220,
    speed: 12,
    startAngle: -90,
    dotColor: "#d4af37",
    statusColor: "#d4af37",
  },
  {
    id: "skillgap",
    name: "Skill Gap Analyzer",
    status: "8 gaps identified",
    radius: 262,
    speed: 17,
    startAngle: 15,
    dotColor: "#f59e0b",
    statusColor: "#f59e0b",
  },
  {
    id: "interview",
    name: "Interview AI Agent",
    status: "Ready to simulate",
    radius: 232,
    speed: 14,
    startAngle: 130,
    dotColor: "#b87333",
    statusColor: "#b87333",
  },
  {
    id: "jobmatch",
    name: "Job Matching Agent",
    status: "12 openings found",
    radius: 252,
    speed: 19,
    startAngle: -160,
    dotColor: "#9ea5ad",
    statusColor: "#9ea5ad",
  },
  {
    id: "career",
    name: "Career Intelligence",
    status: "Generating insights",
    radius: 242,
    speed: 15,
    startAngle: -45,
    dotColor: "#d4af37",
    statusColor: "#d4af37",
  },
];

const COMPANIES: any[] = [
];

/* ─────────────────────────────────────────────
   Build keyframes string
───────────────────────────────────────────── */
function buildKeyframes() {
  const agentKF = AGENTS.map(
    (a) => `
    @keyframes orbit-${a.id} {
      from { transform: rotate(${a.startAngle}deg) translateX(${a.radius}px) rotate(${-a.startAngle}deg); }
      to   { transform: rotate(${a.startAngle + 360}deg) translateX(${a.radius}px) rotate(${-(a.startAngle + 360)}deg); }
    }
    @keyframes orbit-line-${a.id} {
      from { transform: rotate(${a.startAngle}deg); }
      to   { transform: rotate(${a.startAngle + 360}deg); }
    }`
  ).join("\n");

  const companyKF = COMPANIES.map((c) => {
    return `
    @keyframes orbit-line-${c.id} {
      from { opacity: 0.12; }
      to   { opacity: 0.12; }
    }`;
  }).join("\n");

  return `
    @keyframes ring-cw  { from { transform: rotate(0deg); }    to { transform: rotate(360deg); } }
    @keyframes ring-ccw { from { transform: rotate(0deg); }    to { transform: rotate(-360deg); } }
    @keyframes core-pulse {
      0%,100% { box-shadow: 0 0 0 1px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.15), 0 0 80px rgba(212,175,55,0.08); }
      50%     { box-shadow: 0 0 0 1px rgba(212,175,55,0.5), 0 0 60px rgba(212,175,55,0.25), 0 0 120px rgba(212,175,55,0.12); }
    }
    @keyframes dash-draw {
      from { stroke-dashoffset: 600; }
      to   { stroke-dashoffset: 0; }
    }
    ${agentKF}
    ${companyKF}
  `;
}

/* ─────────────────────────────────────────────
   Agent Pill Card
───────────────────────────────────────────── */
function AgentPill({
  agent,
  onHover,
  isHovered,
}: {
  agent: (typeof AGENTS)[0];
  onHover: (id: string | null) => void;
  isHovered: boolean;
}) {
  return (
    <div
      onMouseEnter={() => onHover(agent.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        background: "#202428",
        border: `1px solid rgba(240,238,230,${isHovered ? 0.35 : 0.18})`,
        borderRadius: 24,
        padding: "10px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        cursor: "default",
        whiteSpace: "nowrap",
        transition: "all 0.25s ease",
        transform: isHovered ? "scale(1.06)" : "scale(1)",
        boxShadow: isHovered
          ? `0 0 24px rgba(212,175,55,0.22), 0 4px 20px rgba(0,0,0,0.4)`
          : `0 2px 12px rgba(0,0,0,0.3)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: agent.dotColor,
            flexShrink: 0,
            boxShadow: `0 0 6px ${agent.dotColor}`,
          }}
        />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: "#b4bac0",
          }}
        >
          {agent.name}
        </span>
      </div>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          color: "#687078",
          paddingLeft: 13,
        }}
      >
        {agent.status}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Company Node
───────────────────────────────────────────── */
function companyPosition(angle: number, dist: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: Math.cos(rad) * dist, y: Math.sin(rad) * dist };
}

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
export default function IntelligenceCore() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  const companiesRef = useRef<HTMLDivElement>(null);
  const companiesInView = useInView(companiesRef, { once: true, margin: "-60px" });

  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  const keyframes = buildKeyframes();

  /* Container is 720×720, center at (360,360).
     SVG viewBox is "-360 -360 720 720" so origin = center. */
  const SVG_HALF = 330;

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#111418",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{keyframes}</style>

      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%), " +
            "linear-gradient(rgba(48,48,46,0.3) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(48,48,46,0.3) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 60px 60px, 60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Section headline */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: "center", marginBottom: 48, position: "relative", zIndex: 2 }}
      >
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            fontWeight: 500,
            color: "#687078",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <span style={{ display: "inline-block", width: 20, height: 1, background: "#687078" }} />
          Core Architecture
          <span style={{ display: "inline-block", width: 20, height: 1, background: "#687078" }} />
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 4vw, 52px)",
            fontWeight: 500,
            color: "#f0eee6",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 14,
          }}
        >
          The Intelligence Core
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 18,
            color: "#9ea5ad",
            fontWeight: 300,
          }}
        >
          Five specialized agents, working in concert.
        </p>
      </motion.div>

      {/* ─── Orbital System Container ─── */}
      <div
        style={{
          position: "relative",
          width: 660,
          height: 660,
          maxWidth: "100vw",
          flexShrink: 0,
        }}
      >
        {/* SVG: orbital rings + connection lines + company lines */}
        <svg
          viewBox={`${-SVG_HALF} ${-SVG_HALF} ${SVG_HALF * 2} ${SVG_HALF * 2}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          {/* Faint orbital path circles */}
          {AGENTS.map((a) => (
            <circle
              key={`path-${a.id}`}
              cx="0"
              cy="0"
              r={a.radius}
              fill="none"
              stroke="rgba(240,238,230,0.04)"
              strokeWidth="1"
            />
          ))}

          {/* Rotating connection lines — each line rotates at same speed as its agent */}
          {AGENTS.map((a) => (
            <g
              key={`line-${a.id}`}
              style={{
                transformOrigin: "0 0",
                animationName: `orbit-line-${a.id}`,
                animationDuration: `${a.speed}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationPlayState:
                  hoveredAgent === a.id ? "paused" : "running",
              }}
            >
              <line
                x1={80}
                y1={0}
                x2={a.radius - 90}
                y2={0}
                stroke="#d4af37"
                strokeOpacity={0.18}
                strokeWidth="1"
                strokeDasharray="4 8"
              />
            </g>
          ))}

          {/* Company dashed connection lines (shown when companiesInView) */}
          {COMPANIES.map((c, i) => {
            const rad = (c.angle * Math.PI) / 180;
            const x2 = Math.cos(rad) * (c.dist - 30);
            const y2 = Math.sin(rad) * (c.dist - 30);
            return (
              <motion.line
                key={`cline-${c.id}`}
                x1={0}
                y1={0}
                x2={x2}
                y2={y2}
                stroke={c.accent}
                strokeOpacity={0}
                strokeWidth="1"
                strokeDasharray="6 8"
                animate={companiesInView ? { strokeOpacity: 0.25 } : { strokeOpacity: 0 }}
                transition={{ delay: 0.8 + i * 0.12, duration: 0.6 }}
              />
            );
          })}

          {/* Close-in dashed rotating rings (inside SVG for clean centering) */}
          <circle
            cx="0"
            cy="0"
            r={88}
            fill="none"
            stroke="rgba(212,175,55,0.18)"
            strokeWidth="1"
            strokeDasharray="6 10"
            style={{ animation: "ring-cw 20s linear infinite" }}
          />
          <circle
            cx="0"
            cy="0"
            r={104}
            fill="none"
            stroke="rgba(212,175,55,0.09)"
            strokeWidth="1"
            strokeDasharray="3 14"
            style={{ animation: "ring-ccw 28s linear infinite" }}
          />
        </svg>

        {/* ─── Central Core ─── */}
        {/* Outer div: plain CSS centering. Inner motion.div: Framer scale entrance */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "radial-gradient(circle at 40% 35%, #b87333 0%, #d4af37 35%, #2a3038 100%)",
              animation: "core-pulse 3s ease-in-out infinite",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Inner ring */}
            <div
              style={{
                position: "absolute",
                inset: -8,
                borderRadius: "50%",
                border: "1px solid rgba(212,175,55,0.25)",
                pointerEvents: "none",
              }}
            />
            <img 
              src="/core-logo.png" 
              alt="Core Logo" 
              style={{
                width: 140,
                height: 140,
                objectFit: "contain",
                userSelect: "none"
              }}
            />
          </motion.div>
        </div>

        {/* ─── Orbiting Agent Nodes ─── */}
        {AGENTS.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.18, duration: 0.7 }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: 20,
            }}
          >
            {/* CSS orbit lives here — does NOT conflict since parent only animates opacity */}
            <div
              style={{
                animationName: `orbit-${agent.id}`,
                animationDuration: `${agent.speed}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationPlayState:
                  hoveredAgent === agent.id ? "paused" : "running",
              }}
            >
              {/* Center the pill on the orbit point */}
              <div style={{ transform: "translate(-50%, -50%)" }}>
                <AgentPill
                  agent={agent}
                  onHover={setHoveredAgent}
                  isHovered={hoveredAgent === agent.id}
                />
              </div>
            </div>
          </motion.div>
        ))}

        {/* ─── External Company Nodes ─── */}
        <div ref={companiesRef}>
          {COMPANIES.map((company, i) => {
            const pos = companyPosition(company.angle, company.dist);
            return (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={
                  companiesInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.6 }
                }
                transition={{
                  delay: 0.8 + i * 0.12,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 50%))`,
                  zIndex: 15,
                }}
              >
                <div
                  style={{
                    background: "#1a1a18",
                    border: `1px solid ${company.accent}55`,
                    borderRadius: 16,
                    padding: "7px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    boxShadow: `0 0 16px ${company.accent}22`,
                    whiteSpace: "nowrap",
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: company.accent,
                      boxShadow: `0 0 8px ${company.accent}`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      color: "#9ea5ad",
                    }}
                  >
                    {company.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.7 }}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: "#333940",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginTop: 32,
          position: "relative",
          zIndex: 2,
        }}
      >
        Live agent network · Always on
      </motion.p>

      {/* Bottom warm divider */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
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
