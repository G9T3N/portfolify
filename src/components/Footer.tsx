import { GitMerge, Dock, Mail, Lock } from "lucide-react";
import { Link } from "react-router";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SOCIAL_LINKS = [
  { icon: GitMerge, href: "https://github.com/G9T3N", label: "GitHub" },
  { icon: Dock, href: "https://www.linkedin.com/in/wael-alamrany-1557a5288", label: "LinkedIn" },
  { icon: Mail, href: "mailto:waelamrany@gmail.com", label: "Email" },
] as const;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 md:px-8 lg:px-12 py-12 border-t border-[var(--color-border-default)]">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-[var(--color-text-muted)]">
            © {currentYear} Wael Alamrany. All rights reserved.
          </p>
          <Link
            to="/login"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors opacity-50 hover:opacity-100 ml-2"
            title="Admin Login"
          >
            <Lock className="w-4 h-4" />
          </Link>
        </div>

        {/* Social links */}
        <TooltipProvider delayDuration={100}>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((link) => (
              <Tooltip key={link.label}>
                <TooltipTrigger asChild>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-10 h-10 rounded-4xl border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-muted)] transition-all hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] hover:scale-110"
                  >
                    <link.icon className="w-4 h-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" className="bg-[var(--color-bg-card)] text-[var(--color-text-primary)] border border-[var(--color-border-default)] rounded-xl text-xs px-3 py-1.5 shadow-lg">
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
