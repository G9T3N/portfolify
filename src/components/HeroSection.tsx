import { lazy, Suspense } from "react";
import { Trans } from "@lingui/react";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ImageCardStack } from "./card-swapping/features/ImageStack";

// Lazy load the heavy widgets so they don't block the initial text/gradient render
const Gauge = lazy(() => import("./portfolio/Gauge").then((m) => ({ default: m.Gauge })));
// const FeaturedCard = lazy(() => import("./portfolio/FeaturedCard").then(m => ({ default: m.FeaturedCard })));
const LogoCarousel = lazy(() => import("./LogoCarousel"));

// Skeletons to prevent layout shift
const CardSkeleton = () => (
  <div className="h-80 w-full bg-[var(--color-bg-card)] rounded-4xl animate-pulse border border-[var(--color-border-default)]" />
);
const GaugeSkeleton = () => (
  <div className="min-h-60 flex-1 w-full bg-[var(--color-bg-card)] rounded-4xl animate-pulse border border-[var(--color-border-default)]" />
);
const CarouselSkeleton = () => <div className="h-[60px] w-full bg-transparent mt-8" />;

const HeroSection = () => {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-[85svh] flex flex-col">
      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 pt-14 lg:pt-5 pb-8">
        {/* Left — Gradient mesh hero image */}
        <motion.div
          className="relative flex-1 gradient-mesh rounded-4xl rounded-ee-none overflow-hidden min-h-[50vh] lg:min-h-0 "
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative flex flex-col justify-start h-full">
            {/* Bottom text overlay */}
            <motion.div
              className="inverted-border-card ps-6 md:ps-8 p-7 md:pt-10 lg:pt-12"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex flex-col gap-4 max-w-2xl pr-4">
                <div className="space-y-1">
                  <span className="text-xs sm:text-sm font-semibold tracking-widest text-[var(--color-primary)] uppercase font-mono">
                    <Trans id="Full-Stack Developer & UI Specialist">
                      Full-Stack Developer & UI Specialist
                    </Trans>
                  </span>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-[var(--color-text-primary)]">
                    <Trans id="Wael Alamrany">Wael Alamrany</Trans>
                    <span className="block text-xl sm:text-2xl md:text-3xl font-medium text-[var(--color-text-secondary)] mt-1 font-mono">
                      <Trans id="— Mr.Err">— Mr.Err</Trans>
                    </span>
                  </h1>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-lg font-sans">
                  <Trans id="Bridging the gap between robust system architecture and seamless, high-performance user interfaces.">
                    Bridging the gap between robust system architecture and seamless,
                    high-performance user interfaces.
                  </Trans>
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="absolute end-0 bottom-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="inverted-border-button rounded-ss-4xl rounded-ee-none! flex flex-col justify-start h-full">
              <motion.button
                className="bg-[var(--color-mp-text-primary)] cursor-pointer text-[var(--color-bg-primary)] px-10 h-12 m-5 mb-1 me-0 rounded-xl border flex items-center gap-2   "
                onClick={scrollToProjects}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0, duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <p>Let's Build</p> <ArrowRight />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 pt-5 md:pt-0 lg:w-[clamp(280px,22vw,380px)] xl:w-[360px]">
          {/* Featured card */}
          <Suspense fallback={<CardSkeleton />}>
            {/* <FeaturedCard /> */}

            <ImageCardStack />
          </Suspense>

          {/* Stat circle */}
          <Suspense fallback={<GaugeSkeleton />}>
            <Gauge />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<CarouselSkeleton />}>
        <LogoCarousel />
      </Suspense>
    </section>
  );
};

export default HeroSection;
