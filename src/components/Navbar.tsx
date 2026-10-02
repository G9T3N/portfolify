import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sun, Moon, Languages, Menu, X } from "lucide-react";
import { Trans } from "@lingui/react/macro";
import { useLocale } from "@/hooks/useLocale";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useThemeSync } from "@/hooks/useThemeSync";
import { NAV_SECTION_IDS } from "@/utils/constants/navigation";

const navLinks = [
  { href: "#projects", label: <Trans>Projects</Trans> },
  { href: "#experience", label: <Trans>Experience</Trans> },
  { href: "#about", label: <Trans>About</Trans> },
  { href: "#skills", label: <Trans>Skills</Trans> },
  { href: "#contact", label: <Trans>Contact</Trans> },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { locale, toggleLanguage } = useLocale();
  const activeSection = useScrollSpy({ sectionIds: NAV_SECTION_IDS });
  const { resolvedTheme, toggleTheme } = useThemeSync();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <motion.header
      className="sticky top-13.5 start-0 w-full md:w-fit z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className={cn(
          "glass-nav flex items-center justify-between gap-1 sm:gap-3 rounded-4xl px-2.5 sm:px-3.5 py-2 transition-[box-shadow] duration-500 max-w-full",
          scrolled && "shadow-lg shadow-black/20",
        )}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
          }}
          className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-[var(--color-bg-elevated)] transition-colors group flex-shrink-0"
          aria-label="Mr.Err - Return to top"
        >
          <img src="/favicon.svg" alt="Mr.Err Logo" className="w-6 h-6 object-contain" />
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center overflow-x-auto no-scrollbar gap-0.5 w-auto">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
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

        {/* Mobile Nav Dropdown */}
        {menuOpen && (
          <motion.div
            className="absolute top-full start-0 mt-2 w-full md:hidden glass-nav rounded-3xl p-2 flex flex-col gap-1 shadow-xl"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
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
          <button
            type="button"
            className="md:hidden h-9 w-9 rounded-4xl flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-colors cursor-pointer flex-shrink-0"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            className="h-9 px-2.5 rounded-4xl flex items-center gap-1.5 text-xs font-mono font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)] transition-colors cursor-pointer"
            aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
            onClick={toggleLanguage}
            title={locale === "en" ? "تبديل إلى العربية" : "Switch to English"}
          >
            <Languages className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{locale === "en" ? "عربي" : "EN"}</span>
          </button>

          <button
            type="button"
            className="w-9 h-9 rounded-4xl flex items-center justify-center transition-colors hover:bg-[var(--color-bg-elevated)] cursor-pointer"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            {resolvedTheme === "dark" ? (
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
