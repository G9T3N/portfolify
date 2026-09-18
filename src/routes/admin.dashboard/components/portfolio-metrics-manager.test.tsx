import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PortfolioMetricsManager from "./portfolio-metrics-manager";

// Mock toast
const mockToast = vi.fn();
vi.mock("@/hooks/use-toast", () => ({
  toast: (...args: unknown[]) => mockToast(...args),
}));

// Mock queries
const mockMutateAsync = vi.fn();
const mockUsePortfolioMetrics = vi.fn();
const mockUseDashboardStats = vi.fn();
const mockUseSkills = vi.fn();
const mockUseWorkExperiences = vi.fn();

vi.mock("../queries", () => ({
  usePortfolioMetrics: () => mockUsePortfolioMetrics(),
  useUpdatePortfolioMetricsMutation: () => ({
    mutateAsync: mockMutateAsync,
    isPending: false,
  }),
  useDashboardStats: () => mockUseDashboardStats(),
  useSkills: () => mockUseSkills(),
  useWorkExperiences: () => mockUseWorkExperiences(),
}));

describe("PortfolioMetricsManager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePortfolioMetrics.mockReturnValue({
      data: { projectsDelivered: 28, yearsExperience: 6 },
      isLoading: false,
    });
    mockUseDashboardStats.mockReturnValue({
      data: { totalProjects: 4, totalCertificates: 3 },
    });
    mockUseSkills.mockReturnValue({
      data: [{ id: "1" }, { id: "2" }],
    });
    mockUseWorkExperiences.mockReturnValue({
      data: [{ start_date: "2020-01-01" }],
    });
  });

  it("renders inputs prefilled with portfolio metrics data", () => {
    render(<PortfolioMetricsManager />);

    const projectsInput = screen.getByLabelText("Projects Delivered") as HTMLInputElement;
    const yearsInput = screen.getByLabelText("Years of Experience") as HTMLInputElement;

    expect(projectsInput.value).toBe("28");
    expect(yearsInput.value).toBe("6");
  });

  it("displays automatic baseline hints for projects and experience", () => {
    render(<PortfolioMetricsManager />);

    expect(screen.getByText("Auto: 4")).toBeInTheDocument();
    expect(screen.getByText(/Auto:.*yrs/)).toBeInTheDocument();
  });

  it("displays the automatic metrics overview section", () => {
    render(<PortfolioMetricsManager />);

    expect(screen.getByText("Automatic Metrics (Managed by System)")).toBeInTheDocument();
    expect(screen.getByText("Skills Mastered")).toBeInTheDocument();
    expect(screen.getByText("Certificates Earned")).toBeInTheDocument();
    expect(screen.getByText("GitHub Activity")).toBeInTheDocument();
    expect(screen.getByText("Happy Clients")).toBeInTheDocument();
  });

  it("calls update mutation with updated values when Save is clicked", async () => {
    mockMutateAsync.mockResolvedValueOnce(undefined);
    render(<PortfolioMetricsManager />);

    const projectsInput = screen.getByLabelText("Projects Delivered");
    fireEvent.change(projectsInput, { target: { value: "35" } });

    const saveButton = screen.getByRole("button", { name: /Save Changes/i });
    expect(saveButton).not.toBeDisabled();

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        projectsDelivered: 35,
        yearsExperience: 6,
      });
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Metrics updated successfully",
        }),
      );
    });
  });

  it("calls update mutation with nulls when Reset to Auto is clicked", async () => {
    mockMutateAsync.mockResolvedValueOnce(undefined);
    render(<PortfolioMetricsManager />);

    const resetButton = screen.getByRole("button", { name: /Reset to Auto/i });
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        projectsDelivered: null,
        yearsExperience: null,
      });
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Reverted to automatic metrics",
        }),
      );
    });
  });

  it("shows destructive toast when negative numbers are entered", async () => {
    render(<PortfolioMetricsManager />);

    const projectsInput = screen.getByLabelText("Projects Delivered");
    fireEvent.change(projectsInput, { target: { value: "-5" } });

    const saveButton = screen.getByRole("button", { name: /Save Changes/i });
    fireEvent.click(saveButton);

    expect(mockMutateAsync).not.toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Invalid projects count",
        variant: "destructive",
      }),
    );
  });
});
