export const NAV_SECTION_IDS = ["projects", "experience", "about", "skills", "contact"] as const;

export type NavSectionId = (typeof NAV_SECTION_IDS)[number];

export interface NavItemConfig {
  id: NavSectionId;
  labelId: string;
  defaultLabel: string;
  href: string;
}

export const NAV_ITEMS: readonly NavItemConfig[] = [
  { id: "projects", labelId: "Projects", defaultLabel: "Projects", href: "#projects" },
  { id: "experience", labelId: "Experience", defaultLabel: "Experience", href: "#experience" },
  { id: "about", labelId: "About", defaultLabel: "About", href: "#about" },
  { id: "skills", labelId: "Skills", defaultLabel: "Skills", href: "#skills" },
  { id: "contact", labelId: "Contact", defaultLabel: "Contact", href: "#contact" },
];

export const THEME_COLORS = {
  dark: "#121212",
  light: "#ffffff",
} as const;
