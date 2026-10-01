import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <div {...props}>{children}</div>
    ),
    button: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <button {...props}>{children}</button>
    ),
  },
  useInView: () => true,
  useReducedMotion: () => false,
}));

// Mock lucide-react
vi.mock("lucide-react", () => ({
  ArrowRight: () => <span>→</span>,
}));

// Mock @lingui/react Trans
vi.mock("@lingui/react", () => ({
  Trans: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <span data-testid={`trans-${id}`}>{children}</span>
  ),
}));

// Mock lazy-loaded components
vi.mock("./portfolio/Gauge", () => ({
  Gauge: () => <div data-testid="gauge-component">Gauge</div>,
}));

vi.mock("./card-swapping/features/ImageStack", () => ({
  ImageCardStack: () => <div data-testid="image-card-stack-component">ImageCardStack</div>,
}));

vi.mock("./LogoCarousel", () => ({
  default: () => <div data-testid="logo-carousel-component">LogoCarousel</div>,
}));

import HeroSection from "./HeroSection";

describe("HeroSection – lazy loading with Suspense (PR change)", () => {
  it("renders the hero section element", () => {
    render(<HeroSection />);
    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders ImageCardStack inside Suspense boundary", async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
      </Suspense>,
    );
    const card = await screen.findByTestId("image-card-stack-component");
    expect(card).toBeInTheDocument();
  });

  it("renders Gauge inside Suspense boundary", async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
      </Suspense>,
    );
    const gauge = await screen.findByTestId("gauge-component");
    expect(gauge).toBeInTheDocument();
  });

  it("renders LogoCarousel inside Suspense boundary", async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
      </Suspense>,
    );
    const carousel = await screen.findByTestId("logo-carousel-component");
    expect(carousel).toBeInTheDocument();
  });
});

describe("HeroSection – explicit Trans IDs (PR change)", () => {
  it("renders Trans component with explicit ID for Software Engineer title", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("trans-Software Engineer · React & TypeScript")).toBeInTheDocument();
  });

  it("renders Trans component with explicit ID for name", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("trans-Wael Alamrany")).toBeInTheDocument();
  });

  it("renders Trans component with explicit ID for nickname", () => {
    render(<HeroSection />);
    expect(screen.getByTestId("trans-— Mr.Err")).toBeInTheDocument();
  });

  it("renders Trans component with explicit ID for description", () => {
    render(<HeroSection />);
    expect(
      screen.getByTestId(
        "trans-Software Engineer building maintainable web products, production architectures, delivery automation, and open-source tooling.",
      ),
    ).toBeInTheDocument();
  });
});

describe("HeroSection – status badge", () => {
  it("renders the live status pulse indicator", () => {
    render(<HeroSection />);
    const pulseDot = document.querySelector(".animate-pulse");
    expect(pulseDot).toBeInTheDocument();
  });
});
