import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Layout, Award, MessageSquare, Users } from "lucide-react";

// Mock framer-motion to avoid animation side-effects in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

// Mock the Card components
vi.mock("@/components/ui/card", () => ({
  Card: ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
    <div className={className}>{children}</div>
  ),
  CardContent: ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
    <div className={className}>{children}</div>
  ),
}));

// Mock useDashboardStats query
vi.mock("./queries", () => ({
  useDashboardStats: vi.fn(),
}));

import { useDashboardStats } from "./queries";
import AdminDashboard from "./route";

const mockUseDashboardStats = vi.mocked(useDashboardStats);

describe("AdminDashboard statCards configuration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders exactly 4 stat cards (PR change: removed Unread Messages and All Messages)", () => {
    mockUseDashboardStats.mockReturnValue({ data: undefined } as ReturnType<typeof useDashboardStats>);
    render(<AdminDashboard />);

    // There should be 4 stat card labels
    expect(screen.getByText("Total Projects")).toBeInTheDocument();
    expect(screen.getByText("Work Experiences")).toBeInTheDocument();
    expect(screen.getByText("Certificates")).toBeInTheDocument();
    expect(screen.getByText("Messages")).toBeInTheDocument();
  });

  it("does NOT render old stat card labels removed in this PR", () => {
    mockUseDashboardStats.mockReturnValue({ data: undefined } as ReturnType<typeof useDashboardStats>);
    render(<AdminDashboard />);

    expect(screen.queryByText("All Messages")).not.toBeInTheDocument();
    expect(screen.queryByText("Unread Messages")).not.toBeInTheDocument();
  });

  it("displays 0 for all stats when data is undefined", () => {
    mockUseDashboardStats.mockReturnValue({ data: undefined } as ReturnType<typeof useDashboardStats>);
    render(<AdminDashboard />);

    const zeros = screen.getAllByText("0");
    expect(zeros).toHaveLength(4);
  });

  it("displays correct stats values from data", () => {
    mockUseDashboardStats.mockReturnValue({
      data: {
        totalProjects: 5,
        totalExperiences: 3,
        totalCertificates: 12,
        totalMessages: 7,
      },
    } as ReturnType<typeof useDashboardStats>);
    render(<AdminDashboard />);

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("7")).toBeInTheDocument();
  });

  it("falls back to 0 for individual missing stat keys", () => {
    mockUseDashboardStats.mockReturnValue({
      data: {
        totalProjects: 2,
        // totalExperiences missing
        totalCertificates: 0,
        totalMessages: 1,
      },
    } as unknown as ReturnType<typeof useDashboardStats>);
    render(<AdminDashboard />);

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    // totalExperiences is missing -> falls back to 0; totalCertificates is also 0
    const zeros = screen.getAllByText("0");
    expect(zeros.length).toBeGreaterThanOrEqual(2);
  });

  it("renders the dashboard header text", () => {
    mockUseDashboardStats.mockReturnValue({ data: undefined } as ReturnType<typeof useDashboardStats>);
    render(<AdminDashboard />);

    expect(screen.getByText("Dashboard Overview")).toBeInTheDocument();
    expect(screen.getByText(/Welcome to the admin panel/)).toBeInTheDocument();
  });
});

describe("statCards array structure (PR-modified configuration)", () => {
  it("statCards uses totalProjects, totalExperiences, totalCertificates, totalMessages keys", () => {
    // Import the module to inspect its statCards structure indirectly via render
    mockUseDashboardStats.mockReturnValue({
      data: {
        totalProjects: 10,
        totalExperiences: 20,
        totalCertificates: 30,
        totalMessages: 40,
      },
    } as ReturnType<typeof useDashboardStats>);
    render(<AdminDashboard />);

    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("40")).toBeInTheDocument();
  });
});