import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import asset1 from "./assets/I21-489;19-443.svg";
import asset2 from "./assets/I21-491;158-1351.svg";
import asset3 from "./assets/I21-493;29-279.svg";
import asset5 from "./assets/I29-316;29-272;29-279.svg";
import asset6 from "./assets/I29-326;29-272;158-1337.svg";
import asset7 from "./assets/I23-996;23-975.svg";
import asset10 from "./assets/23-705.svg";
import asset11 from "./assets/I19-463;19-443.svg";
import asset12 from "./assets/I19-465;162-1328.svg";
import asset17 from "./assets/23-704.webp";
import asset18 from "./assets/4-67.webp";
import asset19 from "./assets/I6-23;4-67.webp";
import asset20 from "./assets/I9-189;4-67.webp";
import asset21 from "./assets/10-213.webp";
import logoWithText from "./assets/logo_with_text.png";

import ProjectCard from "./components/ProjectCard";
import SkillCategory from "./components/SkillCategory";
import ContactMethod from "./components/ContactMethod";
import DotPattern from "./components/DotPattern";

const sections = ["home", "works", "experience", "skills", "about-me", "contacts"];

const App: React.FC = () => {
  const home = useRef(null);
  const works = useRef(null);
  const experience = useRef(null);
  const skills = useRef(null);
  const aboutMe = useRef(null);
  const contacts = useRef(null);

  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (elementRef: string) => {
    const target = elementRef.startsWith("#") ? elementRef.slice(1) : elementRef;
    const el = document.getElementById(target);
    if (el) {
      const top = el.offsetTop - 70;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveSection(target);
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closest = sections[0];
      let minDistance = Infinity;

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closest = id;
        }
      });

      setActiveSection((prev) => (prev === closest ? prev : closest));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NavItem = ({ id, label }: { id: string; label: string }) => (
    <button
      type="button"
      onClick={() => scrollToSection(`#${id}`)}
      className="flex items-start text-left"
    >
      <span className="text-[#297f29] text-sm lg:text-base" aria-hidden>
        #
      </span>
      <span
        className={`${
          activeSection === id ? "text-white font-medium" : "text-[#abb2bf] font-normal"
        } text-sm lg:text-base ml-2 hover:text-white transition-colors`}
      >
        {label}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#282c33] text-white font-['Poppins'] overflow-x-hidden">
      <div className="inset-0 pointer-events-none z-0">
        <div className="absolute w-20 h-20 lg:w-[103px] lg:h-[103px] right-4 lg:right-[77px] top-[800px] lg:top-[1622px] hidden md:block">
          <DotPattern />
        </div>
        <div className="absolute w-20 h-20 lg:w-[103px] lg:h-[103px] left-4 lg:left-[26px] bottom-[100px] lg:bottom-[159px] hidden md:block">
          <DotPattern />
        </div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-[1000] min-h-16 lg:min-h-20 px-4 lg:px-[171px] pt-4 lg:pt-7 pb-3 bg-[#282c33]/95 backdrop-blur-sm border-b border-[#282c33]">
        <div className="flex justify-between items-center">
          <button type="button" onClick={() => scrollToSection("#home")} aria-label="Go to home">
            <img src={logoWithText} alt="Mr.Err - Wael Alamrany" className="h-6 lg:h-8" />
          </button>

          <button
            type="button"
            className="md:hidden p-2 text-[#abb2bf] hover:text-white"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

          <nav className="hidden md:flex items-start gap-4 xl:gap-7">
            <div ref={home}>
              <NavItem id="home" label="home" />
            </div>
            <div ref={works}>
              <NavItem id="works" label="works" />
            </div>
            <div ref={experience}>
              <NavItem id="experience" label="experience" />
            </div>
            <div ref={skills}>
              <NavItem id="skills" label="skills" />
            </div>
            <div ref={aboutMe}>
              <NavItem id="about-me" label="about-me" />
            </div>
            <div ref={contacts}>
              <NavItem id="contacts" label="contacts" />
            </div>
          </nav>
        </div>

        {mobileOpen && (
          <nav className="md:hidden mt-4 border-t border-[#abb2bf]/30 pt-4 grid grid-cols-2 gap-3 pb-2">
            <NavItem id="home" label="home" />
            <NavItem id="works" label="works" />
            <NavItem id="experience" label="experience" />
            <NavItem id="skills" label="skills" />
            <NavItem id="about-me" label="about-me" />
            <NavItem id="contacts" label="contacts" />
          </nav>
        )}
      </header>

      <aside className="fixed left-2 lg:left-[17px] top-16 lg:top-20 z-10 bg-[#282c33] flex-col items-center gap-2 hidden lg:flex">
        <img src={asset10} className="w-px h-[120px] lg:h-[191px] rotate-90" alt="" />
        <div className="flex flex-col items-center gap-2">
          <a href="https://github.com/G9T3N" target="_blank" rel="noreferrer" aria-label="GitHub">
            <img
              src={asset11}
              className="w-6 h-6 object-contain opacity-80 hover:opacity-100"
              alt="GitHub"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/wael-alamrany-1557a5288"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <img
              src={asset12}
              className="w-6 h-6 object-contain opacity-80 hover:opacity-100"
              alt="LinkedIn"
            />
          </a>
          <a href="https://www.npmjs.com/~g9t3n" target="_blank" rel="noreferrer" aria-label="NPM">
            <span className="text-xs text-[#abb2bf] hover:text-white font-semibold">npm</span>
          </a>
        </div>
      </aside>

      <main className="pt-16 lg:pt-20 px-4 lg:px-[171px] relative z-10">
        <section id="home" aria-label="Home" className="min-h-screen py-20 flex items-center">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 w-full">
            <div className="flex-1 max-w-3xl">
              <div className="flex flex-col items-start gap-5">
                <p className="text-[#abb2bf] text-sm lg:text-base">Hello, I'm Wael Alamrany.</p>
                <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-medium leading-tight">
                  Software Engineer focused on <span className="text-[#297f29]">React</span>,{" "}
                  <span className="text-[#297f29]">TypeScript</span> and production systems.
                </h1>
                <p className="text-[#abb2bf] text-sm lg:text-lg max-w-[680px] leading-relaxed">
                  I build maintainable web products, work across real production codebases, automate
                  delivery pipelines, and contribute to open-source tooling. My strongest area is
                  frontend engineering, with practical full-stack experience around APIs,
                  architecture, debugging, and release automation.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => scrollToSection("#contacts")}
                    className="px-4 py-2 border border-[#297f29] text-white font-medium hover:bg-[#297f29] transition-colors"
                  >
                    Contact me!!
                  </button>
                  <a
                    href="https://github.com/G9T3N"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 border border-[#abb2bf] text-[#abb2bf] font-medium hover:text-white hover:border-white transition-colors"
                  >
                    GitHub &gt;
                  </a>
                </div>
              </div>
            </div>

            <div className="relative w-full lg:w-auto flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-24 h-24 lg:w-[155px] lg:h-[155px] border border-[#abb2bf] absolute left-0 top-12 lg:top-[84px] hidden lg:block" />
                <img
                  src={asset21}
                  className="w-full max-w-[300px] lg:max-w-[430px] h-auto"
                  alt="Wael Alamrany"
                />
                <div className="absolute bottom-2 right-2 lg:bottom-4 lg:right-4 w-16 h-16 lg:w-[84px] lg:h-[84px] hidden md:block">
                  <DotPattern className="gap-2 lg:gap-[16px]" />
                </div>
                <div className="absolute bottom-0 left-2 lg:left-auto lg:right-4 p-2 bg-[#282c33] border border-[#abb2bf] flex items-center gap-2.5 max-w-[320px]">
                  <div className="w-3 h-3 lg:w-4 lg:h-4 bg-[#297f29] border border-[#297f29] flex-shrink-0" />
                  <span className="text-[#abb2bf] text-xs lg:text-sm">
                    Building at Sofa + remote product teams
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="works"
          aria-label="Projects"
          className="min-h-screen py-20 flex flex-col justify-center gap-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="flex items-center">
                <span className="text-[#297f29] text-2xl lg:text-[32px] font-medium">#</span>
                <span className="text-white text-2xl lg:text-[32px] font-medium">projects</span>
              </div>
              <img src={asset7} className="flex-1 hidden lg:block" alt="" />
            </div>
            <a
              href="https://github.com/G9T3N?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="text-white text-sm lg:text-base font-medium hover:text-[#297f29]"
            >
              View public work ~~&gt;
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
            <ProjectCard
              image={asset17}
              title="Sofa Platform"
              description="Production web product work spanning reusable React interfaces, API integration, application state, debugging, and maintainable feature delivery."
              tags={["React", "TypeScript", "REST", "Production"]}
              liveUrl="https://play.sofa.ye"
            />
            <ProjectCard
              image={asset18}
              title="Portfolify"
              description="A TypeScript-based public project focused on modern portfolio/product presentation and reusable frontend structure."
              tags={["TypeScript", "React", "UI"]}
              sourceUrl="https://github.com/G9T3N/portfolify"
            />
            <ProjectCard
              image={asset20}
              title="Open Source & NPM"
              description="Reusable React utilities and Mapbox tooling published under the g9t3n namespace, including Skeletune and geospatial packages."
              tags={["NPM", "React", "Mapbox", "Open Source"]}
              liveUrl="https://www.npmjs.com/~g9t3n"
              sourceUrl="https://github.com/G9T3N"
            />
          </div>
        </section>

        <section
          id="experience"
          aria-label="Experience"
          className="min-h-screen py-20 flex flex-col justify-center gap-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="text-[#297f29] text-2xl lg:text-[32px] font-medium">#</span>
              <span className="text-white text-2xl lg:text-[32px] font-medium">experience</span>
            </div>
            <img src={asset7} className="flex-1 hidden lg:block" alt="" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
              {
                company: "Sofa",
                mode: "Sana'a, Yemen · Current",
                text: "Frontend / full-stack product engineering with React and TypeScript, API integration, reusable UI architecture, debugging, and production delivery.",
                url: "https://play.sofa.ye",
              },
              {
                company: "Sparksoft",
                mode: "Remote · Current",
                text: "Remote engineering across private production codebases, collaborative Git workflows, dashboards, commerce-oriented products, CI/CD, and quality gates.",
                url: "https://sparksoft.io",
              },
              {
                company: "OnePlusOneTech",
                mode: "Remote · Current",
                text: "Remote software engineering in private repositories with distributed collaboration, feature delivery, debugging, code review practices, and maintainable implementation.",
              },
            ].map((item) => (
              <article
                key={item.company}
                className="border border-[#abb2bf] p-5 lg:p-6 space-y-4 hover:border-[#297f29] transition-colors"
              >
                <div>
                  <h3 className="text-xl lg:text-2xl font-medium text-white">{item.company}</h3>
                  <p className="text-sm text-[#297f29] mt-1">{item.mode}</p>
                </div>
                <p className="text-sm lg:text-base text-[#abb2bf] leading-relaxed">{item.text}</p>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-sm text-white hover:text-[#297f29]"
                  >
                    Visit &gt;
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="min-h-screen py-20 flex flex-col gap-8 justify-center">
          <div className="flex justify-between items-center gap-20">
            <div className="flex items-start">
              <span className="text-[#297f29] text-2xl lg:text-[32px] font-medium">#</span>
              <span className="text-white text-2xl lg:text-[32px] font-medium">skills</span>
            </div>
            <img src={asset7} className="flex-1 hidden lg:block" alt="" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-8 items-center">
            <div className="space-y-8 hidden lg:block">
              <div className="w-[278px] h-[282px] relative">
                <div className="absolute w-20 h-20 lg:w-[103px] lg:h-[103px] left-[31px] top-[180px]">
                  <DotPattern />
                </div>
                <div className="absolute w-16 h-16 lg:w-[86px] lg:h-[86px] left-[155px] top-[90px]">
                  <DotPattern className="gap-3 lg:gap-[16px]" />
                </div>
                <div className="absolute w-12 h-12 lg:w-[52px] lg:h-[52px] left-[155px] top-[42px] border border-[#abb2bf]" />
                <div className="absolute w-20 h-20 lg:w-[113px] lg:h-[113px] left-0 top-0 border border-[#abb2bf]" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkillCategory
                title="Frontend"
                skills={["React · TypeScript · Next.js", "TanStack Query · Zustand · React Router"]}
              />
              <SkillCategory
                title="APIs & Backend"
                skills={["REST · OpenAPI · Zod", "Python · FastAPI · Node.js"]}
              />
              <SkillCategory
                title="CI/CD & Delivery"
                skills={["GitHub Actions · GitLab CI", "Conventional Commits · Release Automation"]}
              />
              <SkillCategory
                title="Quality & Testing"
                skills={["ESLint · SonarQube · Oxlint", "Vitest · Jest · Cypress"]}
              />
              <SkillCategory
                title="Engineering"
                skills={[
                  "Architecture · Business Logic · API Contracts",
                  "Debugging · Refactoring · Code Review · Jira",
                ]}
              />
              <SkillCategory
                title="Additional"
                skills={["Linux · Git · GitHub", "Mapbox · Geospatial · MCP Tooling"]}
              />
            </div>
          </div>
        </section>

        <section
          id="about-me"
          aria-label="About me"
          className="min-h-screen py-20 flex flex-col justify-center gap-8"
        >
          <div className="flex justify-between items-center gap-20">
            <div className="flex items-start">
              <span className="text-[#297f29] text-2xl lg:text-[32px] font-medium">#</span>
              <span className="text-white text-2xl lg:text-[32px] font-medium">about-me</span>
            </div>
            <img src={asset7} className="flex-1 hidden lg:block" alt="" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 lg:space-y-8">
              <div className="text-[#abb2bf] text-sm lg:text-base leading-relaxed space-y-4">
                <p>Hello, I'm Wael Alamrany, a Software Engineer based in Sana'a, Yemen.</p>
                <p>
                  I currently work at Sofa and collaborate remotely with Sparksoft and
                  OnePlusOneTech. My strongest area is React and TypeScript, but my day-to-day
                  engineering work also includes REST APIs, backend integration, CI/CD, release
                  automation, debugging, architecture, and code-quality workflows.
                </p>
                <p>
                  I enjoy understanding a codebase and its business logic before implementing
                  features. I care about maintainability, clear API contracts, disciplined Git
                  workflows, and shipping reliable products rather than treating frontend work as
                  isolated UI tasks.
                </p>
                <p>
                  Outside commercial work, I publish reusable NPM packages and contribute to
                  open-source tooling, especially around React and geospatial development.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.npmjs.com/~g9t3n"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 lg:px-4 lg:py-2 border border-[#297f29] text-white text-sm lg:text-base font-medium hover:bg-[#297f29] transition-colors"
                >
                  NPM profile -&gt;
                </a>
                <a
                  href="https://github.com/wael-amrany"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 lg:px-4 lg:py-2 border border-[#abb2bf] text-[#abb2bf] text-sm lg:text-base font-medium hover:text-white hover:border-white transition-colors"
                >
                  Secondary GitHub -&gt;
                </a>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute w-20 h-20 lg:w-[103px] lg:h-[103px] right-0 top-[80px] lg:top-[103px] hidden lg:block">
                  <DotPattern />
                </div>
                <img
                  src={asset19}
                  className="w-full max-w-[250px] lg:max-w-[339px] h-auto"
                  alt="Wael Alamrany"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="contacts"
          aria-label="Contacts"
          className="min-h-[75vh] py-20 flex flex-col justify-center gap-8"
        >
          <div className="flex justify-between items-center gap-20">
            <div className="flex items-start">
              <span className="text-[#297f29] text-2xl lg:text-[32px] font-medium">#</span>
              <span className="text-white text-2xl lg:text-[32px] font-medium">contacts</span>
            </div>
            <img src={asset7} className="flex-1 hidden lg:block" alt="" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-[#abb2bf] text-sm lg:text-base font-medium max-w-xl leading-relaxed">
                I'm open to remote and international software engineering opportunities, especially
                roles involving React, TypeScript, product engineering, API integration,
                architecture, and collaborative delivery.
              </p>
            </div>

            <div className="flex justify-start lg:justify-end">
              <div className="p-4 border border-[#abb2bf] space-y-4 w-full max-w-[360px]">
                <h4 className="text-white text-sm lg:text-base font-semibold">Message me here</h4>
                <div className="space-y-3">
                  <ContactMethod
                    icon={asset5}
                    text="github.com/G9T3N"
                    href="https://github.com/G9T3N"
                  />
                  <ContactMethod
                    icon={asset6}
                    text="waelalamrany7@gmail.com"
                    href="mailto:waelalamrany7@gmail.com"
                  />
                  <ContactMethod
                    icon={asset2}
                    text="LinkedIn"
                    href="https://www.linkedin.com/in/wael-alamrany-1557a5288"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-4 lg:px-[171px] pb-4 lg:pb-8 relative z-10">
        <div className="border-t border-[#abb2bf] pt-4 lg:pt-8 space-y-6 lg:space-y-8">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-8">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-6">
                <img src={logoWithText} alt="Mr.Err Logo" className="h-6 lg:h-8" />
                <a
                  href="mailto:waelalamrany7@gmail.com"
                  className="text-[#abb2bf] text-sm lg:text-base break-all hover:text-white"
                >
                  waelalamrany7@gmail.com
                </a>
              </div>
              <p className="text-white text-sm lg:text-base">
                Software Engineer · React & TypeScript
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-white text-xl lg:text-2xl font-medium">Media</h4>
              <div className="flex gap-3 lg:gap-4 items-center">
                <a
                  href="https://github.com/G9T3N"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <img src={asset1} className="w-6 h-6 object-contain" alt="GitHub" />
                </a>
                <a
                  href="https://www.linkedin.com/in/wael-alamrany-1557a5288"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <img src={asset2} className="w-6 h-6 object-contain" alt="LinkedIn" />
                </a>
                <a
                  href="https://www.npmjs.com/~g9t3n"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#abb2bf] hover:text-white text-sm font-semibold"
                >
                  npm
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[#abb2bf] text-xs lg:text-base">
              © 2026 Wael Alamrany. Built as Mr.Err.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
