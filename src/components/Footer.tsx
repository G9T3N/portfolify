import { GitMerge, Dock, Mail } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useCallback } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SOCIAL_LINKS = [
  { icon: GitMerge, href: "https://github.com/G9T3N", label: "GitHub" },
  { icon: Dock, href: "https://www.linkedin.com/in/wael-alamrany-1557a5288", label: "LinkedIn" },
  { icon: Mail, href: "mailto:waelamrany@gmail.com", label: "Email" },
] as const;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);

  // Hidden admin access: triple-click the copyright text
  const handleCopyrightClick = useCallback(() => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        navigate("/login");
        return 0;
      }
      // Reset after 2 seconds of inactivity
      setTimeout(() => setClickCount(0), 2000);
      return next;
    });
  }, [navigate]);

  return (
    <footer className="px-4 md:px-8 lg:px-12 py-12 border-t border-[var(--color-border-default)]">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Copyright — 5-click to access admin */}
        <p
          className="text-sm text-[var(--color-text-muted)] cursor-default select-none"
          onClick={handleCopyrightClick}
        >
          © {currentYear} Wael Alamrany. All rights reserved.
        </p>

        {/* Social links */}
        <TooltipProvider delayDuration={100}>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => (
              <Tooltip key={link.label}>
                <TooltipTrigger asChild>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-9 h-9 rounded-full border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-muted)] transition-all hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] hover:scale-110"
                  >
                    <link.icon className="w-4 h-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  align="center"
                  className="bg-[var(--color-bg-card)] text-[var(--color-text-primary)] border border-[var(--color-border-default)] rounded-xl text-xs px-3 py-1.5 shadow-lg"
                >
                  <p>{link.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </footer>
  );
};

export default Footer;
