import { lazy, Suspense } from "react";
import { motion, useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

// Lazy load below-the-fold components
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

// Fallback skeleton or empty block to prevent layout shift
const SectionFallback = () => (
  <div className="min-h-screen bg-[var(--color-bg-primary)] animate-pulse" />
);
const FooterFallback = () => (
  <div className="min-h-[20vh] bg-[var(--color-bg-primary)] animate-pulse" />
);

export default function HomeRoute() {
  const { scrollYProgress } = useScroll();

  return (
    <div className=" relative min-h-screen max-w-[95vw] lg:max-w-[85vw] mx-auto bg-[var(--color-bg-primary)]">
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <Navbar />
      <main>
        <div className="snap-section">
          <HeroSection />
        </div>
        <Suspense fallback={<SectionFallback />}>
          <div className="snap-section">
            <ProjectsSection />
          </div>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <div className="snap-section">
            <AboutSection />
          </div>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <div className="snap-section">
            <SkillsSection />
          </div>
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <div className="snap-section">
            <ContactSection />
          </div>
        </Suspense>
      </main>
      <Suspense fallback={<FooterFallback />}>
        <div className="snap-section">
          <Footer />
        </div>
      </Suspense>
    </div>
  );
}
