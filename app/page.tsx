import HeroSection from "./components/HeroSection";
import IntelligenceCore from "./components/IntelligenceCore";
import AgentBreakdown from "./components/AgentBreakdown";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "../components/sections/Testimonials";
import CTAAndFooter from "../components/sections/CTAAndFooter";

export default function Home() {
  return (
    <div style={{ background: "#1a1a1a", minHeight: "100vh", padding: "24px", fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide original hero nav to replace with Rave glass header */
        #hero nav { display: none !important; }
        /* Add some padding to hero to clear new header */
        #hero { padding-top: 80px !important; }
      `}} />
      
      {/* Rave inspired outer wrapper */}
      <div style={{ 
        position: "relative",
        background: "#f8f9fa",
        borderRadius: "32px",
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4), 0 24px 48px rgba(0,0,0,0.5)",
        minHeight: "calc(100vh - 48px)"
      }}>
        
        {/* Rave Glassmorphic Floating Header */}
        <header style={{
          position: "absolute",
          top: "24px",
          left: "24px",
          right: "24px",
          height: "64px",
          background: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: "100px",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          zIndex: 100,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <div style={{ fontSize: "15px", fontWeight: 900, letterSpacing: "-0.04em", color: "#111" }}>SUPERPLACED</div>
          </div>
          
          <div style={{ display: "flex", gap: "40px", fontSize: "11px", fontWeight: 700, color: "#111", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            <a href="#hero" style={{ textDecoration: "none", color: "inherit", transition: "opacity 0.2s" }} onMouseEnter={e=>e.currentTarget.style.opacity="0.5"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>New Arrivals</a>
            <a href="#agents" style={{ textDecoration: "none", color: "inherit", transition: "opacity 0.2s" }} onMouseEnter={e=>e.currentTarget.style.opacity="0.5"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>Agents</a>
            <a href="#how" style={{ textDecoration: "none", color: "inherit", transition: "opacity 0.2s" }} onMouseEnter={e=>e.currentTarget.style.opacity="0.5"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>Platform</a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a href="/signin" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)", color: "#111", textDecoration: "none", transition: "background 0.2s" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(0,0,0,0.05)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </a>
            <a href="/signin" style={{ fontSize: "11px", fontWeight: 700, background: "#111", color: "#fff", padding: "12px 24px", borderRadius: "100px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em", transition: "transform 0.2s" }} onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
              Sign In
            </a>
          </div>
        </header>

        <main>
          <HeroSection />
          <IntelligenceCore />
          <AgentBreakdown />
          <HowItWorks />
          <Testimonials />
          <CTAAndFooter />
        </main>
      </div>
    </div>
  );
}
