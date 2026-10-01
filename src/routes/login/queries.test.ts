import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";

// Mock react-router useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

// Mock sonner toast
const { mockToast } = vi.hoisted(() => ({
  mockToast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("sonner", () => ({
  toast: mockToast,
}));

// Supabase mock factory
const buildMaybeSingleFn = (rolesData: object | null, rolesError: object | null = null) =>
  vi.fn().mockResolvedValue({ data: rolesData, error: rolesError });

const buildQueryBuilder = (maybeSingleFn: ReturnType<typeof vi.fn>) => {
  const qb = {
    from: vi.fn(),
    select: vi.fn(),
    eq: vi.fn(),
    maybeSingle: maybeSingleFn,
  };
  qb.from.mockReturnValue(qb);
  qb.select.mockReturnValue(qb);
  qb.eq.mockReturnValue(qb);
  return qb;
};

const buildAuthMock = (opts: {
  sessionData?: object | null;
  rolesData?: object | null;
  rolesError?: object | null;
  signInData?: object | null;
  signInError?: object | null;
  signUpData?: object | null;
  signUpError?: object | null;
}) => {
  const maybeSingleFn = buildMaybeSingleFn(opts.rolesData ?? null, opts.rolesError ?? null);
  const qb = buildQueryBuilder(maybeSingleFn);
  return {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: opts.sessionData ?? null } }),
      signInWithPassword: vi.fn().mockResolvedValue({
        data: opts.signInData ?? null,
        error: opts.signInError ?? null,
      }),
      signUp: vi.fn().mockResolvedValue({
        data: opts.signUpData ?? { user: null },
        error: opts.signUpError ?? null,
      }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } },
      }),
    },
    from: qb.from,
    _maybeSingleFn: maybeSingleFn,
  };
};

let supabaseMock = buildAuthMock({});
vi.mock("@/integrations/supabase/client", () => ({
  get supabase() {
    return supabaseMock;
  },
}));

import { useAdminLoginForm } from "./queries";

describe("login/queries useAdminLoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with initial state", () => {
    supabaseMock = buildAuthMock({ sessionData: null });
    const { result } = renderHook(() => useAdminLoginForm());
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSignUp).toBe(false);
  });

  it("redirects to /admin if session exists and user has admin role via maybeSingle", async () => {
    const sessionUser = { id: "user-123" };
    supabaseMock = buildAuthMock({
      sessionData: { user: sessionUser },
      rolesData: { role: "admin" },
    });

    renderHook(() => useAdminLoginForm());

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/admin", { replace: true });
    });
  });

  it("does NOT redirect to /admin when maybeSingle returns null (no admin role)", async () => {
    const sessionUser = { id: "user-no-role" };
    supabaseMock = buildAuthMock({
      sessionData: { user: sessionUser },
      rolesData: null,
    });

    renderHook(() => useAdminLoginForm());

    await waitFor(() => {
      expect(supabaseMock._maybeSingleFn).toHaveBeenCalled();
    });

    expect(mockNavigate).not.toHaveBeenCalledWith("/admin", expect.anything());
  });

  it("submitAuth: signs in, checks role via maybeSingle, and navigates to /admin when admin role found", async () => {
    const sessionUser = { id: "admin-user" };
    supabaseMock = buildAuthMock({
      sessionData: null,
      rolesData: { role: "admin" },
      signInData: { session: { user: sessionUser } },
    });

    const { result } = renderHook(() => useAdminLoginForm());

    await act(async () => {
      await result.current.submitAuth({ email: "admin@test.com", password: "secret123" });
    });

    expect(supabaseMock._maybeSingleFn).toHaveBeenCalled();
    expect(mockToast.success).toHaveBeenCalledWith(
      expect.stringContaining("Welcome back! Successfully logged in as admin."),
    );
    expect(mockNavigate).toHaveBeenCalledWith("/admin", { replace: true });
  });

  it("submitAuth: signs out and shows error when maybeSingle returns null (no admin role)", async () => {
    const sessionUser = { id: "non-admin" };
    supabaseMock = buildAuthMock({
      sessionData: null,
      rolesData: null,
      signInData: { session: { user: sessionUser } },
    });

    const { result } = renderHook(() => useAdminLoginForm());

    await act(async () => {
      await result.current.submitAuth({ email: "user@test.com", password: "secret123" });
    });

    expect(supabaseMock.auth.signOut).toHaveBeenCalled();
    expect(mockToast.error).toHaveBeenCalledWith(expect.stringContaining("Access denied"));
    expect(mockNavigate).not.toHaveBeenCalledWith("/admin", expect.anything());
  });

  it("submitAuth: handles signIn error and shows error toast", async () => {
    supabaseMock = buildAuthMock({
      sessionData: null,
      signInError: { message: "Invalid credentials" },
    });

    const { result } = renderHook(() => useAdminLoginForm());

    await act(async () => {
      await result.current.submitAuth({ email: "admin@test.com", password: "wrongpass" });
    });

    expect(mockToast.error).toHaveBeenCalledWith(expect.stringContaining("Invalid credentials"));
  });

  it("setIsSignUp toggles the sign-up mode", () => {
    supabaseMock = buildAuthMock({ sessionData: null });
    const { result } = renderHook(() => useAdminLoginForm());

    expect(result.current.isSignUp).toBe(false);
    act(() => {
      result.current.setIsSignUp(true);
    });
    expect(result.current.isSignUp).toBe(true);
  });
});
