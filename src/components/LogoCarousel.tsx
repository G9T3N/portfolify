import { useSkills } from "@/queries";
import { TechIcon } from "@/components/common/TechIcon";

const FALLBACK_LOGOS = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "FastAPI",
  "Supabase",
  "PostgreSQL",
  "Docker",
  "Git",
  "GraphQL",
  "Vite",
  "Vitest",
  "Linux",
];

export default function LogoCarousel() {
  const { data: skills } = useSkills();

  // Use dynamic skills if available, otherwise use curated fallback
  const logoNames =
    skills && skills.length > 0 ? skills.map((skill) => skill.name) : FALLBACK_LOGOS;

  return (
    <div className="w-full bg-[var(--color-bg-elevated)] py-3 overflow-hidden border-y border-[var(--color-border-default)]">
      <div className="relative flex max-w-[100vw] overflow-hidden group">
        <div className="flex w-max gap-16 animate-marquee group-hover:[animation-play-state:paused]">
          {[...logoNames, ...logoNames, ...logoNames].map((name, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 flex-1 w-fit py-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
            >
              <TechIcon name={name} className="text-2xl" />
              <span className="font-mono w-full break-keep whitespace-nowrap text-sm uppercase tracking-wider font-semibold">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
