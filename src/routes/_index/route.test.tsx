import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <div {...props}>{children}</div>
    ),
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useInView: () => true,
}));

// Mock Navbar and HeroSection (eager loaded)
vi.mock("@/components/Navbar", () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}));

vi.mock("@/components/HeroSection", () => ({
  default: () => <section data-testid="hero-section">HeroSection</section>,
}));

// Mock the lazy-loaded components
vi.mock("@/components/ProjectsSection", () => ({
  default: () => <section data-testid="projects-section">ProjectsSection</section>,
}));

vi.mock("@/components/AboutSection", () => ({
  default: () => <section data-testid="about-section">AboutSection</section>,
}));

vi.mock("@/components/SkillsSection", () => ({
  default: () => <section data-testid="skills-section">SkillsSection</section>,
}));

vi.mock("@/components/ContactSection", () => ({
  default: () => <section data-testid="contact-section">ContactSection</section>,
}));

vi.mock("@/components/Footer", () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

import HomeRoute, { meta } from "./route";

describe("HomeRoute – metadata for SEO and social previews", () => {
  const tags = meta({} as Parameters<typeof meta>[0]) as unknown as Array<
    Record<string, string | undefined>
  >;
  const findTag = (key: string, value: string) =>
    tags.find((t) => t[key] === value) ?? {};

  it("returns the full title, description, and canonical URL", () => {
    expect(tags).toContainEqual({ title: "Wael Alamrany — Full-Stack Developer & UI Specialist | mrerr.com" });
    expect(findTag("name", "description").content).toContain("Full-Stack Developer");
    expect(findTag("rel", "canonical").href).toBe("https://mrerr.com");
  });

  it("includes Open Graph and Twitter card tags with the og:image", () => {
    expect(findTag("property", "og:title").content).toContain("Wael Alamrany");
    expect(findTag("property", "og:type").content).toBe("website");
    expect(findTag("property", "og:url").content).toBe("https://mrerr.com");
    expect(findTag("property", "og:image").content).toBe("https://mrerr.com/og-image.png");
    expect(findTag("name", "twitter:card").content).toBe("summary_large_image");
    expect(findTag("name", "twitter:image").content).toBe("https://mrerr.com/og-image.png");
  });

  it("renders Person + WebSite JSON-LD structured data", () => {
    const { container } = render(<HomeRoute />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();

    const data = JSON.parse(script?.textContent ?? "{}");
    const graph = data["@graph"] as { "@type": string }[];
    expect(graph.map((g) => g["@type"])).toEqual(["Person", "WebSite"]);
  });
});

describe("HomeRoute – lazy loading below-fold sections with Suspense (PR change)", () => {
  it("renders Navbar eagerly (not lazy)", () => {
    render(<HomeRoute />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("renders HeroSection eagerly (not lazy)", () => {
    render(<HomeRoute />);
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
  });

  it("renders ProjectsSection inside Suspense boundary", async () => {
    render(
      <Suspense fallback={<div>loading...</div>}>
        <HomeRoute />
      </Suspense>,
    );
    const el = await screen.findByTestId("projects-section");
    expect(el).toBeInTheDocument();
  });

  it("renders AboutSection inside Suspense boundary", async () => {
    render(
      <Suspense fallback={<div>loading...</div>}>
        <HomeRoute />
      </Suspense>,
    );
    const el = await screen.findByTestId("about-section");
    expect(el).toBeInTheDocument();
  });

  it("renders SkillsSection inside Suspense boundary", async () => {
    render(
      <Suspense fallback={<div>loading...</div>}>
        <HomeRoute />
      </Suspense>,
    );
    const el = await screen.findByTestId("skills-section");
    expect(el).toBeInTheDocument();
  });

  it("renders ContactSection inside Suspense boundary", async () => {
    render(
      <Suspense fallback={<div>loading...</div>}>
        <HomeRoute />
      </Suspense>,
    );
    const el = await screen.findByTestId("contact-section");
    expect(el).toBeInTheDocument();
  });

  it("renders Footer inside Suspense boundary", async () => {
    render(
      <Suspense fallback={<div>loading...</div>}>
        <HomeRoute />
      </Suspense>,
    );
    const el = await screen.findByTestId("footer");
    expect(el).toBeInTheDocument();
  });
});

describe("HomeRoute – SectionFallback and FooterFallback skeleton components", () => {
  it("renders without errors when all sections are available", () => {
    expect(() => render(<HomeRoute />)).not.toThrow();
  });

  it("renders a scroll-progress indicator element", () => {
    render(<HomeRoute />);
    const progressEl = document.querySelector(".scroll-progress");
    expect(progressEl).toBeInTheDocument();
  });
});
