import HeroSection from "./components/HeroSection";
import IntelligenceCore from "./components/IntelligenceCore";
import AgentBreakdown from "./components/AgentBreakdown";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "../components/sections/Testimonials";
import CTAAndFooter from "../components/sections/CTAAndFooter";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <IntelligenceCore />
      <AgentBreakdown />
      <HowItWorks />
      <Testimonials />
      <CTAAndFooter />
    </main>
  );
}
