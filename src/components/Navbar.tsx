import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Sun, Moon, Languages, Menu, X } from "lucide-react";
import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react";

const NAV_SECTION_IDS = ["projects", "experience", "about", "skills", "contact"];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as "dark" | "light" | null;
      return (
        saved ?? (document.documentElement.getAttribute("data-theme") as "dark" | "light") ?? "dark"
      );
    }
    return "dark";
  });

  const [locale, setLocale] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("locale");
      if (saved === "en" || saved === "ar") return saved;
      return i18n.locale || "en";
    }
    return i18n.locale || "en";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
      }
      i18n.activate(locale);
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }
  }, [locale]);

  const toggleLanguage = useCallback(() => {
    const nextLocale = locale === "en" ? "ar" : "en";
    setLocale(nextLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", nextLocale);
    }
  }, [locale]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll spy — track which section is in the viewport
  useEffect(() => {
    const sectionIds = NAV_SECTION_IDS;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    const observeSections = () => {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && !observer.takeRecords().some((r) => r.target === el)) {
          observer.observe(el);
        }
      }
    };

    observeSections();

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof Element && node.id && sectionIds.includes(node.id)) {
            observer.observe(node);
          }
        }
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { href: "#projects", label: <Trans id="nav.projects">Projects</Trans> },
    { href: "#experience", label: <Trans id="nav.experience">Experience</Trans> },
    { href: "#about", label: <Trans id="nav.about">About</Trans> },
    { href: "#skills", label: <Trans id="nav.skills">Skills</Trans> },
    { href: "#contact", label: <Trans id="nav.contact">Contact</Trans> },
  ];

  return (
    <motion.header
      className="sticky top-5 start-0 w-full md:w-fit z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className={cn(
          "glass-nav flex items-center justify-between gap-1 sm:gap-3 rounded-4xl px-2.5 sm:px-3.5 py-2 transition-all duration-500 max-w-full",
          scrolled && "shadow-lg shadow-black/20",
        )}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-[var(--color-bg-elevated)] transition-colors group flex-shrink-0"
          aria-label="Mr.Err - Return to top"
        >
          <img src="/favicon.svg" alt="Mr.Err Logo" className="w-6 h-6 object-contain" />
          <span className="font-bold text-sm text-[var(--color-text-primary)] font-mono tracking-tight hidden sm:inline group-hover:text-[var(--color-primary)] transition-colors">
            Mr.Err
          </span>
        </a>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center overflow-x-auto no-scrollbar gap-0.5 w-auto">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                handleNavClick(e, link.href);
              }}
              className={cn(
                "px-2.5 sm:px-3.5 py-1.5 text-sm font-medium rounded-4xl transition-colors whitespace-nowrap",
                activeSection === link.href
                  ? "text-[var(--color-text-primary)] bg-[var(--color-bg-elevated)] font-semibold"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)]",
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile nav dropdown */}
        {menuOpen && (
          <motion.div
            className="absolute top-full start-0 mt-2 w-full md:hidden glass-nav rounded-3xl p-2 flex flex-col gap-1"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                }}
                className={cn(
                  "px-4 py-3 text-sm font-medium rounded-2xl transition-colors",
                  activeSection === link.href
                    ? "text-[var(--color-text-primary)] bg-[var(--color-bg-elevated)] font-semibold"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)]",
                )}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}

        {/* Actions (Language Switcher & Theme Toggle) */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden h-9 w-9 rounded-4xl flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-colors cursor-pointer flex-shrink-0"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          {/* Language Switcher */}
          <button
            type="button"
            className="h-9 px-2.5 rounded-4xl flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-colors cursor-pointer"
            aria-label={locale === "en" ? "عربي — Switch to Arabic" : "EN — Switch to English"}
            onClick={toggleLanguage}
            title={locale === "en" ? "تبديل إلى العربية" : "Switch to English"}
          >
            <Languages className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{locale === "en" ? "عربي" : "EN"}</span>
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            className="w-9 h-9 rounded-4xl flex items-center justify-center transition-colors hover:bg-[var(--color-bg-elevated)] cursor-pointer"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-[var(--color-text-secondary)]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--color-text-secondary)]" />
            )}
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
