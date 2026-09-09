import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { useSiteSetting, useWorkExperiences } from "@/queries";
import { LazyInView } from "./common/LazyInView";
import { Briefcase, Calendar, FileDown, MapPin, Sparkles } from "lucide-react";

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
    <section id="about" className="px-4 md:px-8 lg:px-12 py-16 md:py-32">
      <div className="max-w-[1400px] 2xl:max-w-[1700px] mx-auto">
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
              fallback={
                <div className="w-full h-full min-h-[50vh] animate-pulse bg-[var(--color-bg-card)] rounded-4xl border border-[var(--color-border-default)]" />
              }
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
            viewport={{ margin: "-100px", once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-4 text-center md:text-left">
              <p className="text-2xl sm:text-3xl md:text-4xl leading-[1.3] text-[var(--color-text-primary)] font-medium">
                Software Engineer based in Sana'a, Yemen & collaborating worldwide.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-[var(--color-text-secondary)] font-normal">
                I currently work at{" "}
                <strong className="text-[var(--color-text-primary)]">Sofa</strong> and collaborate
                remotely with{" "}
                <strong className="text-[var(--color-text-primary)]">Sparksoft</strong> and{" "}
                <strong className="text-[var(--color-text-primary)]">OnePlusOneTech</strong>. My
                core domain is <strong className="text-[var(--color-text-primary)]">React</strong>{" "}
                and <strong className="text-[var(--color-text-primary)]">TypeScript</strong>, with
                extensive experience across REST APIs, backend integration, CI/CD, release
                automation, debugging, architecture, and code quality.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--color-text-muted)]">
                I prioritize deep understanding of system architecture and business logic to ship
                reliable, high-performance web products. Beyond commercial work, I publish reusable
                NPM utilities under the{" "}
                <code className="text-xs bg-[var(--color-bg-elevated)] px-1.5 py-0.5 rounded text-[var(--color-text-primary)]">
                  @g9t3n
                </code>{" "}
                namespace and contribute to open-source tooling.
              </p>
            </div>

            {/* Quick stats */}
            <motion.div
              className="flex flex-wrap justify-center md:justify-start gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border-default)] text-sm text-[var(--color-text-secondary)]">
                <MapPin className="w-4 h-4 text-[var(--color-mp-primary)]" />
                Sana'a, Yemen & Remote
              </div>
              {yearsExperience && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border-default)] text-sm text-[var(--color-text-secondary)]">
                  <Calendar className="w-4 h-4 text-[var(--color-mp-primary)]" />
                  {yearsExperience}+ Years Experience
                </div>
              )}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border-default)] text-sm text-[var(--color-text-secondary)]">
                <Briefcase className="w-4 h-4 text-[var(--color-mp-primary)]" />
                Open to Opportunities
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="mt-10 flex flex-wrap justify-center md:justify-start items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-pill text-white "
              >
                <Sparkles className="w-4 h-4" />
                Get in touch
                <Sparkles className="w-4 h-4" />
              </a>
              <a
                href={cvUrl || "/cv.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-all text-sm font-medium"
              >
                <FileDown className="w-4 h-4" />
                View CV
              </a>
              <a
                href="https://www.npmjs.com/~g9t3n"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-all text-sm font-medium"
              >
                NPM Profile
              </a>
              <a
                href="https://github.com/wael-amrany"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full border border-[var(--color-border-default)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-all text-sm font-medium"
              >
                Secondary GitHub
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
