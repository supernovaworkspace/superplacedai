"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import CTABackground3D from "@/components/canvas/CTABackground3D";

const headlineWords = ["Your", "career", "doesn't", "wait."];

const platformLinks = ["How It Works", "Agents", "Partners", "Early Access"] as const;
const companyLinks = ["About", "Blog", "Contact", "Remox"] as const;

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        color: "#687078",
        textDecoration: "none",
        transition: "color 0.2s ease",
      }}
      onMouseEnter={(event) => {
        (event.currentTarget as HTMLAnchorElement).style.color = "#b4bac0";
      }}
      onMouseLeave={(event) => {
        (event.currentTarget as HTMLAnchorElement).style.color = "#687078";
      }}
    >
      {label}
    </a>
  );
}

function SocialIcon({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "#202428",
        border: "1px solid #2a3038",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#687078",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        fontWeight: 500,
        textDecoration: "none",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(event) => {
        const target = event.currentTarget as HTMLAnchorElement;
        target.style.borderColor = "#d4af37";
        target.style.color = "#d4af37";
      }}
      onMouseLeave={(event) => {
        const target = event.currentTarget as HTMLAnchorElement;
        target.style.borderColor = "#2a3038";
        target.style.color = "#687078";
      }}
    >
      {label}
    </a>
  );
}

export default function CTAAndFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section id="waitlist" ref={sectionRef} style={{ position: "relative" }}>
      <motion.div
        style={{
          y: bgY,
          background: "#d4af37",
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <CTABackground3D />
      </motion.div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <section
          className="cta-section"
          style={{
            background: "transparent",
            padding: "120px 24px 112px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <AnimateOnScroll variant="fadeInUp">
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.6)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                EARLY ACCESS
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fadeInUp" delay={0.06}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(40px, 6vw, 64px)",
                  fontWeight: 500,
                  lineHeight: 1.05,
                  color: "#faf9f5",
                  letterSpacing: "-0.015em",
                  margin: 0,
                }}
              >
                {headlineWords.join(" ")}
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fadeInUp" delay={0.16}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 18,
                  color: "rgba(255,255,255,0.75)",
                  marginTop: 16,
                  lineHeight: 1.5,
                }}
              >
                Join the waitlist. Be first when SuperPlaced AI launches.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fadeInUp" delay={0.5}>
              <form
                onSubmit={(event) => event.preventDefault()}
                style={{
                  marginTop: 40,
                  maxWidth: 480,
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email address"
                  style={{
                    flex: 1,
                    background: "#faf9f5",
                    color: "#111418",
                    border: "none",
                    borderRadius: 10,
                    padding: "14px 20px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 15,
                    outline: "none",
                  }}
                />
                <Button variant="dark" size="md" className="cta-submit-button">
                  Join Waitlist
                </Button>
              </form>
            </AnimateOnScroll>

            <AnimateOnScroll variant="fadeInUp" delay={0.58}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.6)",
                  marginTop: 16,
                }}
              >
                ↑ <CountUp end={400} suffix="+" /> students already waiting
              </p>
            </AnimateOnScroll>
          </div>
        </section>

        <footer
          style={{
            background: "#111418",
            borderTop: "1px solid #2a3038",
          }}
        >
          <div
            className="footer-shell"
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              padding: "64px 48px 28px",
            }}
          >
            <div
              className="footer-top"
              style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 1fr",
                gap: 32,
                alignItems: "start",
              }}
            >
              <AnimateOnScroll variant="fadeInLeft">
                <div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 26,
                      color: "#faf9f5",
                      fontWeight: 500,
                      lineHeight: 1.1,
                    }}
                  >
                    <img src="/logo.png" alt="SuperPlaced AI Logo" style={{ height: 160 }} />
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      color: "#687078",
                      marginTop: 6,
                      lineHeight: 1.5,
                    }}
                  >
                    Career acceleration, powered by AI.
                  </p>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll variant="fadeInRight" delay={0.12}>
                <div
                  className="footer-links-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 20,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        color: "#3d3d3a",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 16,
                      }}
                    >
                      Platform
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {platformLinks.map((label) => (
                        <FooterLink key={label} href="#" label={label} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        color: "#3d3d3a",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        marginBottom: 16,
                      }}
                    >
                      Company
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {companyLinks.map((label) => (
                        <FooterLink key={label} href="#" label={label} />
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            <div
              style={{
                height: 1,
                background: "#2a3038",
                margin: "48px 0",
              }}
            />

            <AnimateOnScroll variant="fadeInUp" delay={0.2}>
              <div
                className="footer-bottom"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "#3d3d3a",
                  }}
                >
                  © 2025 SuperPlaced AI. All rights reserved.
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <SocialIcon href="#" label="in" />
                  <SocialIcon href="#" label="𝕏" />
                  <SocialIcon href="#" label="ig" />
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </footer>
      </div>

      <style>{`
        .cta-section input::placeholder {
          color: #9ea5ad;
          opacity: 1;
        }

        .cta-submit-button {
          background: #111418 !important;
          border: none !important;
        }

        .cta-submit-button:hover {
          background: #2a3038 !important;
        }

        @media (max-width: 900px) {
          .footer-top {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }

        @media (max-width: 680px) {
          .cta-section form {
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .cta-section form .cta-submit-button {
            width: 100% !important;
          }

          .footer-shell {
            padding: 56px 20px 24px !important;
          }

          .footer-links-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 18px !important;
          }

          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
