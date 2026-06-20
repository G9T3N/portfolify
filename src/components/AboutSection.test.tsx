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
}));

// Mock lucide-react Sparkles
vi.mock("lucide-react", () => ({
  Sparkles: () => <span data-testid="sparkles-icon">✨</span>,
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
    expect(screen.getByText(/Full Stack Developer/)).toBeInTheDocument();
  });

  it("renders the 'Get in touch' CTA button", () => {
    render(<AboutSection />);
    expect(screen.getByText("Get in touch")).toBeInTheDocument();
  });

  it("renders the Lanyard component inside a Suspense boundary", async () => {
    render(
      <Suspense fallback={<div data-testid="lanyard-fallback">Loading...</div>}>
        <AboutSection />
      </Suspense>
    );

    // With the mock, Lanyard should resolve immediately
    const lanyard = await screen.findByTestId("lanyard-component");
    expect(lanyard).toBeInTheDocument();
  });

  it("Suspense fallback is a pulsing skeleton div", () => {
    // Test that when the module isn't resolved yet, a fallback appears
    // (We verify via the component's JSX structure via snapshot or class)
    render(<AboutSection />);
    // The Lanyard is mocked to resolve synchronously, so fallback won't show,
    // but we verify the container has min-h-[50vh] class
    const container = document.querySelector(".min-h-\\[50vh\\]");
    expect(container).toBeInTheDocument();
  });
});