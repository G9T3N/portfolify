import { describe, it, expect, beforeAll, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectsSection from "./ProjectsSection";

// Mock framer-motion to avoid animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock useProjects query hook
vi.mock("@/queries", () => ({
  useProjects: () => ({
    data: undefined,
    isLoading: false,
  }),
}));

beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    observe = () => null;
    unobserve = () => null;
    disconnect = () => null;
  } as unknown as typeof window.IntersectionObserver;

  // Mock scrollIntoView
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
});

describe("ProjectsSection Read More functionality", () => {
  it("renders 5 featured projects initially with Read More button", () => {
    render(<ProjectsSection />);

    // The top 5 projects must be visible
    expect(screen.getByText("Sofa Platform")).toBeInTheDocument();
    expect(screen.getByText("Solvera")).toBeInTheDocument();
    expect(screen.getByText("Sparksoft Platform")).toBeInTheDocument();
    expect(screen.getByText("HAJZAK")).toBeInTheDocument();
    expect(screen.getByText("Hareer")).toBeInTheDocument();

    // Project #6 should not be visible before clicking Read More
    expect(screen.queryByText("Mr.Err — mrerr.com")).not.toBeInTheDocument();

    // Read More button must be present with remaining count (+17)
    const readMoreBtn = screen.getByRole("button", { name: /read more projects/i });
    expect(readMoreBtn).toBeInTheDocument();
    expect(screen.getByText("+17")).toBeInTheDocument();
  });

  it("expands to show all projects when Read More is clicked, and collapses on Show Less", () => {
    render(<ProjectsSection />);

    const readMoreBtn = screen.getByRole("button", { name: /read more projects/i });
    fireEvent.click(readMoreBtn);

    // Now project #6 and others are visible
    expect(screen.getByText("Mr.Err — mrerr.com")).toBeInTheDocument();
    expect(screen.getByText("MRERR Platform")).toBeInTheDocument();
    expect(screen.getByText("Big Cart")).toBeInTheDocument();

    // Button changes to Show Less
    const showLessBtn = screen.getByRole("button", { name: /show less/i });
    expect(showLessBtn).toBeInTheDocument();

    // Clicking Show Less collapses back
    fireEvent.click(showLessBtn);
    expect(screen.queryByText("Mr.Err — mrerr.com")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /read more projects/i })).toBeInTheDocument();
  });
});
