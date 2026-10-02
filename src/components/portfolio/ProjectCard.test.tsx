import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./ProjectCard";
import {
  DEFAULT_PROJECTS,
  FEATURED_PROJECTS_COUNT,
} from "@/routes/_index/utils/constants/project-sections";

beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    observe = () => null;
    unobserve = () => null;
    disconnect = () => null;
  } as unknown as typeof window.IntersectionObserver;
});

describe("ProjectCard and DEFAULT_PROJECTS", () => {
  it("has exactly 5 common projects at the top of the 22 projects list", () => {
    expect(FEATURED_PROJECTS_COUNT).toBe(5);
    expect(DEFAULT_PROJECTS).toHaveLength(22);

    const top5Ids = DEFAULT_PROJECTS.slice(0, 5).map((p) => p.id);
    expect(top5Ids).toEqual([
      "sofa-platform",
      "solvera",
      "sparksoft-platform",
      "hajzak-dashboard",
      "hareer",
    ]);
  });

  it("renders live site links for navigable projects", () => {
    const sofa = DEFAULT_PROJECTS[0]!;
    render(<ProjectCard project={sofa} />);

    expect(screen.getByText("Sofa Platform")).toBeInTheDocument();
    const liveLink = screen.getByRole("link", { name: /visit live site for sofa platform/i });
    expect(liveLink).toHaveAttribute("href", "https://play.sofa.ye");
  });

  it("HAJZAK does NOT render navigation link and displays internal dashboard indicator", () => {
    const hajzak = DEFAULT_PROJECTS.find((p) => p.id === "hajzak-dashboard")!;
    render(<ProjectCard project={hajzak} />);

    expect(screen.getByText("HAJZAK")).toBeInTheDocument();
    expect(screen.queryByText(/live site/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /visit live site/i })).not.toBeInTheDocument();
    expect(screen.getByText("Internal Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Private Access")).toBeInTheDocument();
  });
});
