import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";

// Mock react-router useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

// Use vi.hoisted to avoid hoisting issues with mock factories
const { mockToast } = vi.hoisted(() => ({
  mockToast: vi.fn(),
}));

vi.mock("@/hooks/use-toast", () => ({
  toast: mockToast,
}));

// Supabase mock factory (inline - no top-level references)
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
      signUp: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
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

import { useAdminAuth } from "./queries";

describe("login/queries useAdminAuth – maybeSingle() usage (PR change)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with empty email, password, not loading session complete", () => {
    supabaseMock = buildAuthMock({ sessionData: null });
    const { result } = renderHook(() => useAdminAuth());
    expect(result.current.email).toBe("");
    expect(result.current.password).toBe("");
    expect(result.current.isLoading).toBe(false);
  });

  it("redirects to /admin if session exists and user has admin role via maybeSingle", async () => {
    const sessionUser = { id: "user-123" };
    supabaseMock = buildAuthMock({
      sessionData: { user: sessionUser },
      rolesData: { role: "admin" },
    });

    renderHook(() => useAdminAuth());

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

    renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(supabaseMock._maybeSingleFn).toHaveBeenCalled();
    });

    expect(mockNavigate).not.toHaveBeenCalledWith("/admin", expect.anything());
  });

  it("handleSubmit shows toast when email is empty", async () => {
    supabaseMock = buildAuthMock({ sessionData: null });
    const { result } = renderHook(() => useAdminAuth());

    const fakeEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
    await act(async () => {
      await result.current.handleSubmit(fakeEvent);
    });

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Please fill in all fields" }),
    );
  });

  it("handleSubmit shows toast when password is empty", async () => {
    supabaseMock = buildAuthMock({ sessionData: null });
    const { result } = renderHook(() => useAdminAuth());

    act(() => {
      result.current.setEmail("admin@test.com");
    });

    const fakeEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
    await act(async () => {
      await result.current.handleSubmit(fakeEvent);
    });

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Please fill in all fields" }),
    );
  });

  it("handleSubmit shows toast when password is shorter than 6 characters", async () => {
    supabaseMock = buildAuthMock({ sessionData: null });
    const { result } = renderHook(() => useAdminAuth());

    act(() => {
      result.current.setEmail("admin@test.com");
      result.current.setPassword("abc");
    });

    const fakeEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
    await act(async () => {
      await result.current.handleSubmit(fakeEvent);
    });

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Password must be at least 6 characters" }),
    );
  });

  it("handleSubmit: signs in, checks role via maybeSingle, and navigates to /admin when admin role found", async () => {
    const sessionUser = { id: "admin-user" };
    supabaseMock = buildAuthMock({
      sessionData: null,
      rolesData: { role: "admin" },
      signInData: { session: { user: sessionUser } },
    });

    const { result } = renderHook(() => useAdminAuth());

    act(() => {
      result.current.setEmail("admin@test.com");
      result.current.setPassword("secret123");
    });

    const fakeEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
    await act(async () => {
      await result.current.handleSubmit(fakeEvent);
    });

    expect(supabaseMock._maybeSingleFn).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/admin", { replace: true });
  });

  it("handleSubmit: signs out and shows error when maybeSingle returns null (no admin role)", async () => {
    const sessionUser = { id: "non-admin" };
    supabaseMock = buildAuthMock({
      sessionData: null,
      rolesData: null,
      signInData: { session: { user: sessionUser } },
    });

    const { result } = renderHook(() => useAdminAuth());

    act(() => {
      result.current.setEmail("user@test.com");
      result.current.setPassword("secret123");
    });

    const fakeEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
    await act(async () => {
      await result.current.handleSubmit(fakeEvent);
    });

    expect(supabaseMock.auth.signOut).toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ variant: "destructive" }));
    expect(mockNavigate).not.toHaveBeenCalledWith("/admin", expect.anything());
  });

  it("handleSubmit: handles signIn error and shows destructive toast", async () => {
    supabaseMock = buildAuthMock({
      sessionData: null,
      signInError: { message: "Invalid credentials" },
    });

    const { result } = renderHook(() => useAdminAuth());

    act(() => {
      result.current.setEmail("admin@test.com");
      result.current.setPassword("wrongpass");
    });

    const fakeEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;
    await act(async () => {
      await result.current.handleSubmit(fakeEvent);
    });

    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ variant: "destructive" }));
  });

  it("setIsSignUp toggles the sign-up mode", () => {
    supabaseMock = buildAuthMock({ sessionData: null });
    const { result } = renderHook(() => useAdminAuth());

    expect(result.current.isSignUp).toBe(false);
    act(() => {
      result.current.setIsSignUp(true);
    });
    expect(result.current.isSignUp).toBe(true);
  });
});
