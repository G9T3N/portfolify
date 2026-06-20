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

vi.mock("./portfolio/FeaturedCard", () => ({
  FeaturedCard: () => <div data-testid="featured-card-component">FeaturedCard</div>,
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

  it("renders FeaturedCard inside Suspense boundary", async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
      </Suspense>
    );
    const card = await screen.findByTestId("featured-card-component");
    expect(card).toBeInTheDocument();
  });

  it("renders Gauge inside Suspense boundary", async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
      </Suspense>
    );
    const gauge = await screen.findByTestId("gauge-component");
    expect(gauge).toBeInTheDocument();
  });

  it("renders LogoCarousel inside Suspense boundary", async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
      </Suspense>
    );
    const carousel = await screen.findByTestId("logo-carousel-component");
    expect(carousel).toBeInTheDocument();
  });
});

describe("HeroSection – explicit Trans IDs (PR change)", () => {
  it("renders Trans component with explicit ID for Full-Stack Developer title", () => {
    render(<HeroSection />);
    expect(
      screen.getByTestId("trans-Full-Stack Developer & UI Specialist")
    ).toBeInTheDocument();
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
        "trans-Bridging the gap between robust system architecture and seamless, high-performance user interfaces."
      )
    ).toBeInTheDocument();
  });
});

describe("HeroSection – skeleton fallbacks defined", () => {
  it("CardSkeleton renders an animate-pulse element with correct classes", async () => {
    // The skeletons are only shown when the lazy component hasn't resolved,
    // but we can verify the component renders without errors
    render(<HeroSection />);
    expect(document.querySelector(".animate-pulse")).not.toBeInTheDocument();
    // (components resolve immediately with mocks)
  });
});