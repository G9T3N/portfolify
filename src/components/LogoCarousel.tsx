import { useSkills } from "@/queries";
import {
  Code,
  Terminal,
  Database,
  Globe,
  Network,
  Monitor,
  Smartphone,
  Cloud,
  ShieldCheck,
} from "lucide-react";

/** Map skill names to Lucide icons — fallback to code icon for unknowns */
const ICON_MAP: Record<string, React.ElementType> = {
  react: Code,
  typescript: Terminal,
  supabase: Database,
  "next.js": Globe,
  nextjs: Globe,
  "node.js": Terminal,
  nodejs: Terminal,
  graphql: Network,
  "tailwind css": Monitor,
  tailwindcss: Monitor,
  "react native": Smartphone,
  aws: Cloud,
  cybersecurity: ShieldCheck,
};

const FALLBACK_LOGOS = [
  { icon: Code, name: "React" },
  { icon: Terminal, name: "TypeScript" },
  { icon: Database, name: "Supabase" },
  { icon: Globe, name: "Next.js" },
  { icon: Terminal, name: "Node.js" },
  { icon: Network, name: "GraphQL" },
  { icon: Monitor, name: "Tailwind CSS" },
  { icon: Smartphone, name: "React Native" },
  { icon: Cloud, name: "AWS" },
  { icon: ShieldCheck, name: "Cybersecurity" },
];

export default function LogoCarousel() {
  const { data: skills } = useSkills();

  // Use dynamic skills if available, otherwise fallback
  const logos =
    skills && skills.length > 0
      ? skills.map((skill) => ({
          Icon: ICON_MAP[skill.name.toLowerCase()] ?? Code,
          name: skill.name,
        }))
      : FALLBACK_LOGOS.map((logo) => ({ Icon: logo.icon, name: logo.name }));

  return (
    <div className=" w-full bg-[var(--color-bg-elevated)] py-2 overflow-hidden border-y border-[var(--color-border-default)]">
      <div className="relative flex max-w-[100vw] overflow-hidden group">
        <div className="flex w-max gap-16 animate-marquee group-hover:[animation-play-state:paused]">
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center gap-2  flex-1 w-fit  py-2   text-[var(--color-text-muted)] hover:text-[var(--color-mp-primary)] transition-colors duration-300"
            >
              <logo.Icon className="w-6 h-6" />
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
