import { lazy, Suspense } from "react";
import { motion, useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import type { Route } from "./+types/route";
import { LazyInView } from "@/components/common/LazyInView";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/utils/constants/site";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: SITE_TITLE },
    { name: "description", content: SITE_DESCRIPTION },
    { name: "author", content: "Wael Alamrany" },
    { rel: "canonical", href: SITE_URL },
    { property: "og:title", content: SITE_TITLE },
    { property: "og:description", content: SITE_DESCRIPTION },
    { property: "og:type", content: "website" },
    { property: "og:url", content: SITE_URL },
    { property: "og:image", content: OG_IMAGE },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:site_name", content: "Wael Alamrany (Mr.Err)" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: SITE_TITLE },
    { name: "twitter:description", content: SITE_DESCRIPTION },
    { name: "twitter:image", content: OG_IMAGE },
  ];
}

/** Structured data: Person + WebSite for search engines and AI answer engines */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Wael Alamrany",
      alternateName: "Mr.Err",
      jobTitle: "Full-Stack Developer & UI Specialist",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: OG_IMAGE,
      sameAs: ["https://github.com/G9T3N", "https://www.linkedin.com/in/wael-alamrany-1557a5288"],
      knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Web Performance"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Wael Alamrany — Portfolio",
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
  ],
};

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
    <div className=" relative min-h-screen max-w-[95vw] lg:max-w-[85vw] xl:max-w-[1400px] 2xl:max-w-[1800px] mx-auto bg-[var(--color-bg-primary)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
