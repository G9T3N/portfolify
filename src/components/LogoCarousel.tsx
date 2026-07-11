import { useSkills } from "@/queries";

/** Map skill names to Phosphor icon classes — fallback to code icon for unknowns */
const ICON_MAP: Record<string, string> = {
  react: "i-ph:code",
  typescript: "i-ph:terminal-window",
  supabase: "i-ph:database",
  "next.js": "i-ph:globe",
  nextjs: "i-ph:globe",
  "node.js": "i-ph:terminal",
  nodejs: "i-ph:terminal",
  graphql: "i-ph:graph",
  "tailwind css": "i-ph:monitor",
  tailwindcss: "i-ph:monitor",
  "react native": "i-ph:device-mobile",
  aws: "i-ph:cloud",
  cybersecurity: "i-ph:shield-check",
};

const FALLBACK_LOGOS = [
  { icon: "i-ph:code", name: "React" },
  { icon: "i-ph:terminal-window", name: "TypeScript" },
  { icon: "i-ph:database", name: "Supabase" },
  { icon: "i-ph:globe", name: "Next.js" },
  { icon: "i-ph:terminal", name: "Node.js" },
  { icon: "i-ph:graph", name: "GraphQL" },
  { icon: "i-ph:monitor", name: "Tailwind CSS" },
  { icon: "i-ph:device-mobile", name: "React Native" },
  { icon: "i-ph:cloud", name: "AWS" },
  { icon: "i-ph:shield-check", name: "Cybersecurity" },
];

export default function LogoCarousel() {
  const { data: skills } = useSkills();

  // Use dynamic skills if available, otherwise fallback
  const logos =
    skills && skills.length > 0
      ? skills.map((skill) => ({
          icon: ICON_MAP[skill.name.toLowerCase()] ?? "i-ph:code",
          name: skill.name,
        }))
      : FALLBACK_LOGOS;

  return (
    <div className=" w-full bg-[var(--color-bg-elevated)] py-2 overflow-hidden border-y border-[var(--color-border-default)]">
      <div className="relative flex max-w-[100vw] overflow-hidden group">
        <div className="flex w-max gap-16 animate-marquee group-hover:[animation-play-state:paused]">
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center gap-2  flex-1 w-fit  py-2   text-[var(--color-text-muted)] hover:text-[var(--color-mp-primary)] transition-colors duration-300"
            >
              <span className={`${logo.icon} w-6 h-6`} />
              <span className="font-mono w-full break-keep whitespace-nowrap  text-sm uppercase tracking-wider font-semibold">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
