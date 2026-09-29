import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProjectTable from "./project-table";

describe("ProjectTable in Admin Dashboard", () => {
  const onView = vi.fn();
  const onEdit = vi.fn();
  const onDelete = vi.fn();

  it("renders 5 featured projects initially with Read More button and category tabs", () => {
    render(
      <ProjectTable
        projects={undefined}
        isLoading={false}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    // The top 5 common projects must be visible
    expect(screen.getByText("Sofa Platform")).toBeInTheDocument();
    expect(screen.getByText("Solvera")).toBeInTheDocument();
    expect(screen.getByText("Sparksoft Platform")).toBeInTheDocument();
    expect(screen.getByText("HAJZAK")).toBeInTheDocument();
    expect(screen.getByText("Hareer")).toBeInTheDocument();

    // Project #6 should not be visible before clicking Read More
    expect(screen.queryByText("Mr.Err — mrerr.com")).not.toBeInTheDocument();

    // Read More button must be present with remaining count
    const readMoreBtn = screen.getByRole("button", { name: /read more projects/i });
    expect(readMoreBtn).toBeInTheDocument();
    expect(screen.getByText(/\+17/)).toBeInTheDocument();

    // Category tabs must be present
    expect(screen.getByRole("button", { name: /^all$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^web$/i })).toBeInTheDocument();
  });

  it("HAJZAK displays Internal Dashboard indicator without public live navigation", () => {
    render(
      <ProjectTable
        projects={undefined}
        isLoading={false}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    expect(screen.getByText("HAJZAK")).toBeInTheDocument();
    expect(screen.getByText("Internal Dashboard")).toBeInTheDocument();
  });

  it("expands to show all projects when Read More is clicked and collapses on Show Less", () => {
    render(
      <ProjectTable
        projects={undefined}
        isLoading={false}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    const readMoreBtn = screen.getByRole("button", { name: /read more projects/i });
    fireEvent.click(readMoreBtn);

    // Now project #6 is visible
    expect(screen.getByText("Mr.Err — mrerr.com")).toBeInTheDocument();

    // Button changed to Show Less
    const showLessBtn = screen.getByRole("button", { name: /show less/i });
    expect(showLessBtn).toBeInTheDocument();

    // Clicking Show Less collapses
    fireEvent.click(showLessBtn);
    expect(screen.queryByText("Mr.Err — mrerr.com")).not.toBeInTheDocument();
  });

  it("filters table by category when category tab is clicked", () => {
    render(
      <ProjectTable
        projects={undefined}
        isLoading={false}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />,
    );

    const ecommerceTab = screen.getByRole("button", { name: /^ecommerce$/i });
    fireEvent.click(ecommerceTab);

    // Solvera is in ecommerce
    expect(screen.getByText("Solvera")).toBeInTheDocument();
    // Sofa Platform is web, so not in ecommerce
    expect(screen.queryByText("Sofa Platform")).not.toBeInTheDocument();
  });
});
