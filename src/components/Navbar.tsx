import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return (document.documentElement.getAttribute("data-theme") as "dark" | "light") ?? "dark";
    }
    return "dark";
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
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
    const sectionIds = NAV_LINKS.map((link) => link.href.replace("#", ""));

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

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      className="absolute top-5 sticky start-0 w-full md:w-fit z-1   "
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className={cn(
          "glass-nav flex justify-between md:justify-center items-center gap-1 rounded-4xl px-2 py-2 transition-all duration-500",
          scrolled && "shadow-lg shadow-black/20",
        )}
      >
        {/* Nav links */}
        <div className="flex items-center overflow-x-auto no-scrollbar w-full md:w-auto">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                handleNavClick(e, link.href);
              }}
              className={cn(
                "px-3 md:px-4 py-2 text-sm font-medium rounded-4xl transition-colors whitespace-nowrap",
                activeSection === link.href
                  ? "text-[var(--color-text-primary)] bg-[var(--color-bg-elevated)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)]",
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          className="ml-1 w-10 h-10 rounded-4xl flex items-center justify-center transition-colors hover:bg-[var(--color-bg-elevated)]"
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-[var(--color-text-secondary)]" />
          ) : (
            <Moon className="w-4 h-4 text-[var(--color-text-secondary)]" />
          )}
        </button>
      </nav>
    </motion.header>
  );
};

export default Navbar;
