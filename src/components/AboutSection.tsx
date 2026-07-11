import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { useWorkExperiences, useSiteSetting } from "@/queries";
import { LazyInView } from "./common/LazyInView";

const Lanyard = lazy(() => import("./Lanyard"));

const AboutSection = () => {
  const { data: experiences } = useWorkExperiences();
  const { data: cvUrl } = useSiteSetting("cv_url");

  const yearsExperience =
    experiences && experiences.length > 0
      ? Math.max(
          1,
          new Date().getFullYear() -
            new Date(
              Math.min(...experiences.map((e) => new Date(e.start_date).getTime())),
            ).getFullYear(),
        )
      : null;

  return (
    <section id="about" className="px-4 md:px-8 lg:px-12 py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto">
        <div className="  z-10 flex justify-center">
          <motion.span
            className="section-label  text-center  "
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.span>
        </div>
        <div className="flex flex-col lg:flex-row items-center ">
          {/* Photo */}
          <div className="flex-2 w-full h-full min-h-[50vh]">
            <LazyInView 
              margin="300px" 
              fallback={<div className="w-full h-full min-h-[50vh] animate-pulse bg-[var(--color-bg-card)] rounded-4xl border border-[var(--color-border-default)]" />}
            >
              <Suspense
                fallback={
                  <div className="w-full h-full min-h-[50vh] animate-pulse bg-[var(--color-bg-card)] rounded-4xl border border-[var(--color-border-default)]" />
                }
              >
                <Lanyard />
              </Suspense>
            </LazyInView>
          </div>

          {/* Text */}
          <motion.div
            className=" flex-3"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-2xl sm:text-3xl md:text-4xl leading-[1.3] text-center md:font-light text-[var(--color-text-secondary)]">
              I&apos;m a{" "}
              <strong className="font-bold text-[var(--color-text-primary)]">
                Full Stack Developer
              </strong>{" "}
              & <strong className="font-bold text-[var(--color-text-primary)]">designer</strong>{" "}
              specializing in{" "}
              <strong className="font-bold text-[var(--color-text-primary)]">
                Frontend Engineering,
              </strong>{" "}
              focusing on building high quality web experiences through{" "}
              <strong className="font-bold text-[var(--color-text-primary)]">clean code</strong> and{" "}
              <strong className="font-bold text-[var(--color-text-primary)]">
                thoughtful design.
              </strong>
            </p>

            {/* Quick stats */}
            <motion.div
              className="flex flex-wrap justify-center md:justify-start gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border-default)] text-sm text-[var(--color-text-secondary)]">
                <span className="i-ph:map-pin w-4 h-4 text-[var(--color-mp-primary)]" />
                Remote — Worldwide
              </div>
              {yearsExperience && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border-default)] text-sm text-[var(--color-text-secondary)]">
                  <span className="i-ph:calendar w-4 h-4 text-[var(--color-mp-primary)]" />
                  {yearsExperience}+ Years Experience
                </div>
              )}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border-default)] text-sm text-[var(--color-text-secondary)]">
                <span className="i-ph:briefcase w-4 h-4 text-[var(--color-mp-primary)]" />
                Open to Opportunities
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="mt-12 flex flex-wrap justify-center md:justify-start gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-pill "
              >
                <span className="i-ph:sparkle w-4 h-4" />
                Get in touch
                <span className="i-ph:sparkle w-4 h-4" />
              </a>
              <a
                href={cvUrl || "/cv.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-all text-sm font-medium"
              >
                <span className="i-ph:file-arrow-down w-4 h-4" />
                View CV
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
