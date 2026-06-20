import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock react-dom/client at top-level
const mockHydrateRoot = vi.fn();
vi.mock("react-dom/client", () => ({
  hydrateRoot: mockHydrateRoot,
}));

// Mock react-router/dom at top-level
vi.mock("react-router/dom", () => ({
  HydratedRouter: () => null,
}));

// Mock React's startTransition to call the callback immediately
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    startTransition: (cb: () => void) => cb(),
  };
});

describe("entry.client.tsx – hydrateRoot setup (new file in PR)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("calls hydrateRoot with document as root element", async () => {
    await import("./entry.client");
    expect(mockHydrateRoot).toHaveBeenCalledWith(document, expect.anything());
  });

  it("calls hydrateRoot exactly once per load", async () => {
    await import("./entry.client");
    expect(mockHydrateRoot).toHaveBeenCalledTimes(1);
  });

  it("passes a StrictMode-wrapped element as the second argument", async () => {
    await import("./entry.client");
    expect(mockHydrateRoot).toHaveBeenCalledWith(
      document,
      expect.objectContaining({ type: expect.anything() })
    );
  });
});