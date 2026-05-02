"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import CountUp from "@/components/ui/CountUp";
import { pulseAnimation } from "@/lib/animations";

const steps = [
  {
    number: "01",
    icon: "↓",
    title: "Drop your profile",
    body: "Upload your resume or LinkedIn. Our agents start analyzing immediately — no setup, no forms.",
  },
  {
    number: "02",
    icon: "⟡",
    title: "Agents activate",
    body: "Five specialized AI agents scan your profile, find gaps, and build your personalized improvement plan.",
  },
  {
    number: "03",
    icon: "↑",
    title: "Train and optimize",
    body: "Mock interviews, skill sprints, resume rewrites. The system adapts to your pace and learning style.",
  },
  {
    number: "04",
    icon: "⇢",
    title: "Get connected",
    body: "When you're ready, SuperPlaced AI routes your verified profile directly to Mercor, Scale AI, Outlier, and more.",
  },
] as const;

const activationThresholds = [0.06, 0.35, 0.65, 0.94] as const;

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div
        style={{
          background: "#111418",
          border: "1px solid #2a3038",
          borderRadius: 10,
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <div
          style={{
            border: "1px dashed rgba(212,175,55, 0.55)",
            borderRadius: 8,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            color: "#d4af37",
          }}
        >
          Upload resume
        </div>
        <div
          style={{
            height: 8,
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "72%",
              height: "100%",
              background: "#d4af37",
            }}
          />
        </div>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div
        style={{
          background: "#111418",
          border: "1px solid #2a3038",
          borderRadius: 10,
          padding: 12,
          display: "flex",
          justifyContent: "center",
          gap: 10,
          minHeight: 80,
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            variants={pulseAnimation}
            animate="animate"
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dot * 0.2,
            }}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#d4af37",
              boxShadow: "0 0 10px rgba(212,175,55,0.45)",
            }}
          />
        ))}
      </div>
    );
  }

  if (index === 2) {
    return (
      <div
        style={{
          background: "#111418",
          border: "1px solid #2a3038",
          borderRadius: 10,
          padding: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            color: "#9ea5ad",
          }}
        >
          <span>Training Progress</span>
          <span style={{ color: "#d4af37" }}><CountUp end={73} suffix="%" /></span>
        </div>
        <div
          style={{
            height: 8,
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "73%" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: "100%",
              background: "#d4af37",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#111418",
        border: "1px solid #2a3038",
        borderRadius: 10,
        padding: 12,
        minHeight: 80,
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 10,
      }}
    >
      {["Mercor", "Scale AI", "Outlier", "More"].map((company) => (
        <div
          key={company}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 8px",
            borderRadius: 7,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(212,175,55,0.16)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            color: "#9ea5ad",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#d4af37",
              flexShrink: 0,
            }}
          />
          {company}
        </div>
      ))}
    </div>
  );
}

function StepCard({
  step,
  index,
  isActive,
}: {
  step: (typeof steps)[number];
  index: number;
  isActive: boolean;
}) {
  return (
    <AnimateOnScroll variant="fadeInUp" delay={index * 0.15}>
      <article
        style={{
          position: "relative",
          background: "#1a1a18",
          border: "1px solid #2a3038",
          borderRadius: 16,
          padding: 32,
          minHeight: 380,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: 10,
            right: 18,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 72,
            lineHeight: 1,
            color: "#2a3038",
            fontWeight: 500,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {step.number}
        </span>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: isActive ? "#d4af37" : "rgba(212,175,55, 0.2)",
              border: isActive ? "1px solid #d4af37" : "1px solid rgba(212,175,55, 0.35)",
              color: "#faf9f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 20,
              transition: "all 0.35s ease",
            }}
          >
            {step.icon}
          </div>
        </div>

        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 26,
            color: "#faf9f5",
            fontWeight: 500,
            lineHeight: 1.2,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          {step.title}
        </h3>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            color: "#9ea5ad",
            lineHeight: 1.65,
            marginTop: 10,
            textAlign: "center",
            flex: 1,
          }}
        >
          {step.body}
        </p>

        <div style={{ marginTop: 24 }}>
          <StepVisual index={index} />
        </div>
      </article>
    </AnimateOnScroll>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<SVGPathElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    if (!isInView || !timelineRef.current) return;

    const pathLength = timelineRef.current.getTotalLength();

    controls.set({
      strokeDasharray: `${pathLength}`,
      strokeDashoffset: pathLength,
    });

    controls.start({
      strokeDashoffset: 0,
      transition: {
        duration: 1.4,
        ease: [0.22, 1, 0.36, 1],
      },
    });

    const duration = 1400;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      let nextActiveCount = 0;
      for (let i = 0; i < activationThresholds.length; i += 1) {
        if (eased >= activationThresholds[i]) {
          nextActiveCount = i + 1;
        }
      }
      setActiveCount(nextActiveCount);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [controls, isInView]);

  return (
    <section
      id="how"
      ref={sectionRef}
      className="how-it-works-section"
      style={{
        background: "#111418",
        padding: "112px 0 92px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        <AnimateOnScroll variant="fadeInUp">
          <div
            style={{
              textAlign: "center",
              margin: "0 auto 64px",
              maxWidth: 760,
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(40px, 5vw, 52px)",
                fontWeight: 500,
                lineHeight: 1.1,
                color: "#faf9f5",
                letterSpacing: "-0.015em",
              }}
            >
              From raw potential to hired.
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 18,
                color: "#9ea5ad",
                marginTop: 12,
              }}
            >
              Four steps. One intelligent system.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="how-it-works-desktop" style={{ position: "relative" }}>
          <svg
            width="100%"
            height="36"
            viewBox="0 0 1200 36"
            preserveAspectRatio="none"
            aria-hidden
            style={{
              position: "absolute",
              top: -18,
              left: 0,
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <motion.path
              ref={timelineRef}
              d="M 90 18 L 1110 18"
              stroke="#d4af37"
              strokeWidth="1"
              strokeDasharray="8 8"
              strokeLinecap="round"
              fill="none"
              initial={false}
              animate={controls}
            />
          </svg>

          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 20,
            }}
          >
            {steps.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                index={index}
                isActive={activeCount > index}
              />
            ))}
          </div>
        </div>

        <div className="how-it-works-mobile" style={{ display: "none" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            {steps.map((step, index) => (
              <StepCard
                key={`mobile-${step.number}`}
                step={step}
                index={index}
                isActive={activeCount > index}
              />
            ))}
          </div>
        </div>

        <AnimateOnScroll variant="fadeInUp" delay={0.8}>
          <blockquote
            style={{
              marginTop: 64,
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: 26,
              color: "#9ea5ad",
              lineHeight: 1.35,
            }}
          >
            &ldquo;Most platforms give you information. SuperPlaced AI gives you transformation.&rdquo;
          </blockquote>
        </AnimateOnScroll>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .how-it-works-desktop {
            display: none !important;
          }

          .how-it-works-mobile {
            display: block !important;
          }
        }

        @media (max-width: 640px) {
          .how-it-works-section {
            padding: 84px 0 68px !important;
          }

          .how-it-works-section > * {
            padding: 0 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
