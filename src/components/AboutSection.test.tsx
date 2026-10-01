import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Suspense } from "react";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <div {...props}>{children}</div>
    ),
    h2: ({ children, ...props }: React.PropsWithChildren<object>) => <h2 {...props}>{children}</h2>,
  },
  useReducedMotion: () => false,
}));

// Mock lucide-react
vi.mock("lucide-react", () => ({
  Sparkles: () => <span data-testid="sparkles-icon">✨</span>,
  MapPin: () => <span>📍</span>,
  Calendar: () => <span>📅</span>,
  Briefcase: () => <span>💼</span>,
  FileDown: () => <span>📄</span>,
}));

// Mock queries
vi.mock("@/queries", () => ({
  useWorkExperiences: () => ({ data: [{ start_date: "2020-01-01" }] }),
  useSiteSetting: () => ({ data: "/cv.pdf" }),
  usePortfolioMetrics: () => ({ data: { yearsExperience: 5 } }),
}));

// Mock LazyInView to render children immediately
vi.mock("./common/LazyInView", () => ({
  LazyInView: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock the Lanyard component (it's lazy-loaded inside AboutSection)
vi.mock("./Lanyard", () => ({
  default: () => <div data-testid="lanyard-component">Lanyard</div>,
}));

import AboutSection from "./AboutSection";

describe("AboutSection – lazy loading Lanyard with Suspense (PR change)", () => {
  it("renders the about section element", () => {
    render(<AboutSection />);
    const section = document.querySelector("section#about");
    expect(section).toBeInTheDocument();
  });

  it("renders the developer description text", () => {
    render(<AboutSection />);
    expect(screen.getByText(/Software Engineer/)).toBeInTheDocument();
  });

  it("renders the 'Get in touch' CTA button", () => {
    render(<AboutSection />);
    expect(screen.getByText("Get in touch")).toBeInTheDocument();
  });

  it("renders the Lanyard component inside a Suspense boundary", async () => {
    render(
      <Suspense fallback={<div data-testid="lanyard-fallback">Loading...</div>}>
        <AboutSection />
      </Suspense>,
    );

    const lanyard = await screen.findByTestId("lanyard-component");
    expect(lanyard).toBeInTheDocument();
  });

  it("verifies the container layout min-h-[50vh] class", () => {
    render(<AboutSection />);
    const container = document.querySelector(".min-h-\\[50vh\\]");
    expect(container).toBeInTheDocument();
  });
});
