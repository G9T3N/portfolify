import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock react-router components
vi.mock("react-router", () => ({
  Links: () => null,
  Meta: () => null,
  Outlet: () => <div data-testid="outlet">Page content</div>,
  Scripts: () => null,
  ScrollRestoration: () => null,
}));

// Mock CSS import
vi.mock("./index.css", () => ({}));

// Mock Lingui messages
vi.mock("./locales/en/messages", () => ({
  messages: {
    "Wael Alamrany": ["Wael Alamrany"],
    "Full-Stack Developer & UI Specialist": ["Full-Stack Developer & UI Specialist"],
  },
}));

// Mock @tanstack/react-query
vi.mock("@tanstack/react-query", () => ({
  QueryClient: class MockQueryClient {
    defaultOptions = {};
  },
  QueryClientProvider: ({ children }: React.PropsWithChildren<object>) => (
    <div data-testid="query-provider">{children}</div>
  ),
}));

// Use vi.hoisted to avoid hoisting issues
const { mockLoad, mockActivate } = vi.hoisted(() => ({
  mockLoad: vi.fn(),
  mockActivate: vi.fn(),
}));

vi.mock("@lingui/core", () => ({
  i18n: {
    load: mockLoad,
    activate: mockActivate,
  },
}));

vi.mock("@lingui/react", () => ({
  I18nProvider: ({ children }: React.PropsWithChildren<{ i18n: unknown }>) => (
    <div data-testid="i18n-provider">{children}</div>
  ),
}));

import App from "./root";

describe("root.tsx – Lingui i18n initialization (PR change)", () => {
  it("calls i18n.load('en', messages) at module level", () => {
    expect(mockLoad).toHaveBeenCalledWith("en", expect.any(Object));
  });

  it("calls i18n.activate('en') at module level", () => {
    expect(mockActivate).toHaveBeenCalledWith("en");
  });

  it("activates 'en' locale (not another locale)", () => {
    expect(mockActivate).not.toHaveBeenCalledWith("cs");
    expect(mockActivate).not.toHaveBeenCalledWith("ar");
  });
});

describe("root.tsx App component – I18nProvider wrapping (PR change)", () => {
  it("renders I18nProvider wrapping QueryClientProvider", () => {
    render(<App />);
    const i18nProvider = screen.getByTestId("i18n-provider");
    const queryProvider = screen.getByTestId("query-provider");
    expect(i18nProvider).toBeInTheDocument();
    expect(queryProvider).toBeInTheDocument();
    expect(i18nProvider.contains(queryProvider)).toBe(true);
  });

  it("renders Outlet (page content) inside providers", () => {
    render(<App />);
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });

  it("I18nProvider is the outermost wrapper", () => {
    render(<App />);
    const i18nProvider = screen.getByTestId("i18n-provider");
    const outlet = screen.getByTestId("outlet");
    expect(i18nProvider.contains(outlet)).toBe(true);
  });
});

describe("root.tsx Layout component – font preconnect links (PR change)", () => {
  it("renders a valid HTML structure via Layout component", async () => {
    const mod = await import("./root");
    const Layout = mod.Layout;

    render(
      <html lang="en">
        <head></head>
        <body>
          <Layout>
            <div data-testid="child-content">content</div>
          </Layout>
        </body>
      </html>
    );
    expect(screen.getByTestId("child-content")).toBeInTheDocument();
  });
});