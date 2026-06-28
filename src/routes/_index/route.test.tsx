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

import HomeRoute from "./route";

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
