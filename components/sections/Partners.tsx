"use client";

import { motion } from "framer-motion";

import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import CountUp from "@/components/ui/CountUp";
import { drawLine } from "@/lib/animations";

const partners = [
  {
    name: "Mercor",
    mark: "M",
    tag: "AI Talent Platform",
    description:
      "Remote AI roles averaging $102/hr. SuperPlaced AI-verified candidates get priority matching.",
    badge: "181k+ Roles Created",
    color: "#4F46E5",
  },
  {
    name: "Scale AI",
    mark: "S",
    tag: "AI Data & Evaluation",
    description:
      "Data labeling, RLHF, and enterprise AI projects. High-skill work for trained candidates.",
    badge: "Fortune 500 Clients",
    color: "#7C3AED",
  },
  {
    name: "Outlier",
    mark: "O",
    tag: "Expert AI Training",
    description:
      "Work with frontier AI models as a domain expert. Flexible, well-paid, resume-building.",
    badge: "1M+ Experts Globally",
    color: "#059669",
  },
  {
    name: "More coming",
    mark: "+",
    tag: "Expanding Network",
    description:
      "We're actively onboarding 10+ more platforms. The network grows as you do.",
    badge: "Q2 2025",
    color: "#9ea5ad",
    isDashed: true,
  },
] as const;

const CONNECTION_PATHS = [
  "M 550 60 L 190 16",
  "M 550 60 L 390 12",
  "M 550 60 L 710 12",
  "M 550 60 L 910 16",
] as const;

function PartnerCard({
  partner,
  index,
}: {
  partner: (typeof partners)[number];
  index: number;
}) {
  const isDashed = Boolean(partner.isDashed);

  return (
    <AnimateOnScroll variant="fadeInUp" delay={index * 0.12}>
      <motion.article
        whileHover={{
          y: -6,
          boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
        }}
        style={{
          background: isDashed ? "#f8f9fa" : "#faf9f5",
          border: isDashed ? "1px dashed #e6e9ed" : "1px solid #f0eee6",
          borderRadius: 16,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          minHeight: 278,
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: isDashed ? "#e6e9ed" : `${partner.color}1A`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 20,
              fontWeight: 600,
              color: isDashed ? "#9ea5ad" : partner.color,
              flexShrink: 0,
            }}
          >
            {partner.mark}
          </div>

          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#687078",
              background: "#e6e9ed",
              borderRadius: 20,
              padding: "4px 12px",
              whiteSpace: "nowrap",
            }}
          >
            {partner.tag}
          </span>
        </div>

        <h3
          style={{
            marginTop: 20,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 28,
            fontWeight: 500,
            lineHeight: 1.2,
            color: "#111418",
          }}
        >
          {partner.name}
        </h3>

        <p
          style={{
            marginTop: 8,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            lineHeight: 1.6,
            color: "#687078",
            flex: 1,
          }}
        >
          {partner.description}
        </p>

        <div style={{ marginTop: 20 }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#9ea5ad",
              background: "#f8f9fa",
              border: "1px solid #e6e9ed",
              borderRadius: 999,
              padding: "6px 12px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {partner.badge}
          </span>
        </div>
      </motion.article>
    </AnimateOnScroll>
  );
}

export default function Partners() {
  return (
    <section
      className="partners-section"
      style={{
        background: "#f8f9fa",
        padding: "110px 0 90px",
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        <AnimateOnScroll variant="fadeInUp">
          <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: "#9ea5ad",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              WHERE YOU&apos;LL LAND
            </p>

            <h2
              style={{
                marginTop: 14,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 4.7vw, 48px)",
                fontWeight: 500,
                lineHeight: 1.15,
                color: "#111418",
              }}
            >
              Your path to real opportunities
            </h2>

            <p
              style={{
                marginTop: 14,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 18,
                lineHeight: 1.6,
                color: "#687078",
                maxWidth: 560,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              SuperPlaced AI connects job-ready candidates directly to AI-native hiring ecosystems trusted by thousands.
            </p>
          </div>
        </AnimateOnScroll>

        <div style={{ marginTop: 36, marginBottom: 20 }}>
          <svg
            width="100%"
            height="120"
            viewBox="0 0 1100 120"
            preserveAspectRatio="none"
            aria-hidden
          >
            {CONNECTION_PATHS.map((d, index) => (
              <motion.path
                key={d}
                d={d}
                variants={drawLine}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={index}
                stroke="rgba(212,175,55, 0.2)"
                strokeWidth="1"
                strokeDasharray="8 8"
                fill="none"
              />
            ))}

            <circle cx="550" cy="60" r="16" fill="#111418" />
            <text
              x="550"
              y="64"
              textAnchor="middle"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "8px",
                letterSpacing: "0.08em",
                fill: "#faf9f5",
                textTransform: "uppercase",
              }}
            >
              SUPERNOVA
            </text>
          </svg>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 20,
          }}
          className="partners-grid"
        >
          {partners.map((partner, index) => (
            <PartnerCard key={partner.name} partner={partner} index={index} />
          ))}
        </div>

        <AnimateOnScroll variant="fadeInUp" delay={0.35}>
          <p
            style={{
              marginTop: 48,
              textAlign: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: "#9ea5ad",
            }}
          >
            Already connected with <CountUp end={400} suffix="+" /> students across Bangalore, Hyderabad, and Chennai.
          </p>
        </AnimateOnScroll>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .partners-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .partners-section {
            padding: 88px 0 70px !important;
          }

          .partners-section > * {
            padding: 0 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
