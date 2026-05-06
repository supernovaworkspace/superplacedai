import HeroSection from "./components/HeroSection";
import IntelligenceCore from "./components/IntelligenceCore";
import AgentBreakdown from "./components/AgentBreakdown";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "../components/sections/Testimonials";
import CTAAndFooter from "../components/sections/CTAAndFooter";

export default function Home() {
  return (
    <div className="mesh-bg" style={{ minHeight: "100vh", padding: "0px", fontFamily: "'Inter', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide original hero nav to replace with Rave glass header */
        #hero nav { display: none !important; }
        /* Add some padding to hero to clear new header */
        #hero { padding-top: 80px !important; }
        
        .rave-link { transition: opacity 0.2s; }
        .rave-link:hover { opacity: 0.5; }
        .rave-btn-icon { transition: background 0.2s; }
        .rave-btn-icon:hover { background: rgba(0,0,0,0.05) !important; }
        .rave-btn-solid { transition: transform 0.2s; display: inline-block; }
        .rave-btn-solid:hover { transform: scale(1.05); }
        /* 3D Mesh Gradient Animation */
        .mesh-bg {
          background-color: #0f172a;
          background-image: 
            radial-gradient(at 40% 20%, rgba(99, 102, 241, 0.6) 0px, transparent 50%),
            radial-gradient(at 80% 0%, rgba(236, 72, 153, 0.6) 0px, transparent 50%),
            radial-gradient(at 0% 50%, rgba(59, 130, 246, 0.6) 0px, transparent 50%),
            radial-gradient(at 80% 50%, rgba(139, 92, 246, 0.6) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(244, 63, 94, 0.6) 0px, transparent 50%),
            radial-gradient(at 80% 100%, rgba(56, 189, 248, 0.6) 0px, transparent 50%),
            radial-gradient(at 0% 0%, rgba(168, 85, 247, 0.6) 0px, transparent 50%);
          background-size: 200% 200%;
          animation: meshAnimation 12s ease infinite;
        }
        @keyframes meshAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
      
      {/* Rave inspired outer wrapper */}
      <div style={{ 
        position: "relative",
        background: "rgba(248, 249, 250, 0.65)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        borderRadius: "0px",
        overflow: "hidden",
        boxShadow: "none",
        minHeight: "100vh"
      }}>
        
        {/* Rave Glassmorphic Floating Header */}
        <header style={{
          position: "fixed",
          top: "24px",
          left: "24px",
          right: "24px",
          height: "64px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          borderRadius: "100px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          zIndex: 100,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img 
              src="/logo.png" 
              alt="Superplaced AI Logo" 
              style={{ height: "200px", objectFit: "contain", filter: "invert(1) brightness(0)", marginLeft: "-8px" }} 
            />
          </div>
          
          <div style={{ display: "flex", gap: "40px", fontSize: "11px", fontWeight: 700, color: "#111", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            <a href="#about" className="rave-link" style={{ textDecoration: "none", color: "inherit" }}>About Us</a>
            <a href="#pricing" className="rave-link" style={{ textDecoration: "none", color: "inherit" }}>Pricing</a>
            <a href="#blog" className="rave-link" style={{ textDecoration: "none", color: "inherit" }}>Blog</a>
            <a href="#faq" className="rave-link" style={{ textDecoration: "none", color: "inherit" }}>FAQ</a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a href="/signin" className="rave-btn-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)", color: "#111", textDecoration: "none" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </a>
            <a href="/signin" className="rave-btn-solid" style={{ fontSize: "11px", fontWeight: 700, background: "#111", color: "#fff", padding: "12px 24px", borderRadius: "100px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.05em" }}>
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
