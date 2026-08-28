import { lazy, Suspense } from "react";
import { motion, useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import type { Route } from "./+types/route";
import { LazyInView } from "@/components/common/LazyInView";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Wael Alamrany — Full-Stack Developer & UI Specialist | mrerr.com" },
    {
      name: "description",
      content:
        "Portfolio of Wael Alamrany (Mr.Err) — Full-Stack Developer specializing in React, Next.js, TypeScript, and high-performance web applications.",
    },
    { name: "og:title", content: "Wael Alamrany — Full-Stack Developer & UI Specialist" },
    {
      name: "og:description",
      content:
        "Bridging the gap between robust system architecture and seamless, high-performance user interfaces.",
    },
  ];
}

// Lazy load below-the-fold components
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));

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
    <div className=" relative min-h-screen max-w-[95vw] lg:max-w-[85vw] xl:max-w-[1400px] mx-auto bg-[var(--color-bg-primary)]">
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <Navbar />
      <main>
        <div className="snap-section">
          <HeroSection />
        </div>

        <LazyInView margin="300px" fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <div className="snap-section">
              <ProjectsSection />
            </div>
          </Suspense>
        </LazyInView>

        <LazyInView margin="300px" fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <div className="snap-section">
              <AboutSection />
            </div>
          </Suspense>
        </LazyInView>

        <LazyInView margin="300px" fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <div className="snap-section">
              <SkillsSection />
            </div>
          </Suspense>
        </LazyInView>

        <LazyInView margin="300px" fallback={<div className="min-h-[30vh] animate-pulse" />}>
          <Suspense fallback={null}>
            <TestimonialsSection />
          </Suspense>
        </LazyInView>

        <LazyInView margin="300px" fallback={<SectionFallback />}>
          <Suspense fallback={<SectionFallback />}>
            <div className="snap-section">
              <ContactSection />
            </div>
          </Suspense>
        </LazyInView>
      </main>

      <LazyInView margin="300px" fallback={<FooterFallback />}>
        <Suspense fallback={<FooterFallback />}>
          <div className="snap-section">
            <Footer />
          </div>
        </Suspense>
      </LazyInView>
    </div>
  );
}
