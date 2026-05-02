"use client";

import { motion } from "framer-motion";

import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

const testimonials = [
  {
    quote:
      "I uploaded my resume and within minutes had a clear improvement roadmap. Got my first freelance AI role on Mercor within 3 weeks.",
    name: "Priya K.",
    role: "AIML Student, Bangalore",
    initials: "PK",
  },
  {
    quote:
      "The interview simulator is unsettlingly accurate. It found my exact weak points before the real thing. I was actually prepared.",
    name: "Rahul M.",
    role: "CS Graduate, Hyderabad",
    initials: "RM",
  },
  {
    quote:
      "Never expected a platform to actually connect me to Scale AI opportunities. SuperPlaced AI's referral system is real and it works.",
    name: "Sanjana T.",
    role: "Early Access User",
    initials: "ST",
  },
] as const;

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
}) {
  return (
    <AnimateOnScroll variant="fadeInUp" delay={index * 0.15}>
      <motion.article
        whileHover={{ borderColor: "rgba(212,175,55, 0.4)" }}
        style={{
          position: "relative",
          background: "#1a1a18",
          border: "1px solid #2a3038",
          borderRadius: 16,
          padding: 32,
          minHeight: 320,
          display: "flex",
          flexDirection: "column",
          transition: "border-color 0.3s ease",
        }}
      >
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.22 }}
          style={{
            position: "absolute",
            top: 16,
            left: 20,
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 80,
            lineHeight: 0.8,
            color: "rgba(212,175,55, 0.2)",
            zIndex: 0,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {'"'}
        </motion.span>

        <div style={{ display: "flex", gap: 8, marginBottom: 20, position: "relative", zIndex: 2 }}>
          {Array.from({ length: 5 }).map((_, dot) => (
            <span
              key={dot}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#d4af37",
                display: "inline-block",
              }}
            />
          ))}
        </div>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 20,
            fontWeight: 400,
            lineHeight: 1.65,
            color: "#faf9f5",
            position: "relative",
            zIndex: 2,
          }}
        >
          {testimonial.quote}
        </p>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            gap: 12,
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#2a3038",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "#b4bac0",
            }}
          >
            {testimonial.initials}
          </div>

          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: "#b4bac0",
                lineHeight: 1.35,
              }}
            >
              {testimonial.name}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "#687078",
                lineHeight: 1.35,
                marginTop: 2,
              }}
            >
              {testimonial.role}
            </div>
          </div>
        </div>
      </motion.article>
    </AnimateOnScroll>
  );
}

export default function Testimonials() {
  return (
    <section
      className="testimonials-section"
      style={{
        background: "#111418",
        padding: "108px 0 92px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        <AnimateOnScroll variant="fadeInUp">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: "#687078",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              EARLY ACCESS VOICES
            </p>
            <h2
              style={{
                marginTop: 12,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 4.7vw, 48px)",
                fontWeight: 500,
                color: "#faf9f5",
                lineHeight: 1.15,
              }}
            >
              What early users say
            </h2>
          </div>
        </AnimateOnScroll>

        <div
          className="testimonials-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 20,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .testimonials-section {
            padding: 84px 0 68px !important;
          }

          .testimonials-section > * {
            padding: 0 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
