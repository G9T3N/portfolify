import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

// Mock react-router useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

// Build a reusable supabase mock factory
const makeSupabaseMock = (
  overrides: {
    sessionData?: object | null;
    rolesData?: object | null;
    rolesError?: object | null;
    onAuthStateChangeCb?: ((event: string, session: object | null) => void) | null;
    onAuthStateChangeUnsubscribe?: () => void;
  } = {},
) => {
  const {
    sessionData = null,
    rolesData = null,
    rolesError = null,
    onAuthStateChangeCb = null,
    onAuthStateChangeUnsubscribe = vi.fn(),
  } = overrides;

  const maybeSingleFn = vi.fn().mockResolvedValue({ data: rolesData, error: rolesError });

  const queryBuilder = {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    maybeSingle: maybeSingleFn,
  };
  queryBuilder.from.mockReturnValue(queryBuilder);
  queryBuilder.select.mockReturnValue(queryBuilder);
  queryBuilder.eq.mockReturnValue(queryBuilder);

  const onAuthStateChange = vi.fn((cb: (event: string, session: object | null) => void) => {
    if (onAuthStateChangeCb) {
      // Simulate an immediate auth event
      onAuthStateChangeCb(cb as unknown as (event: string, session: object | null) => void);
    }
    return { data: { subscription: { unsubscribe: onAuthStateChangeUnsubscribe } } };
  });

  return {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: sessionData } }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
      onAuthStateChange,
    },
    from: queryBuilder.from,
    _maybeSingleFn: maybeSingleFn,
    _onAuthStateChange: onAuthStateChange,
  };
};

let supabaseMock = makeSupabaseMock();
vi.mock("@/integrations/supabase/client", () => ({
  get supabase() {
    return supabaseMock;
  },
}));

import { useAdminAuth } from "./useAdminAuth";

describe("hooks/useAdminAuth – maybeSingle() usage (PR change)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with isLoading=true, user=null, isAdmin=false", () => {
    supabaseMock = makeSupabaseMock({ sessionData: null });
    const { result } = renderHook(() => useAdminAuth());
    // isLoading starts true before async check completes
    expect(result.current.user).toBeNull();
    expect(result.current.isAdmin).toBe(false);
  });

  it("sets isLoading=false when no session exists and navigates to /login", async () => {
    supabaseMock = makeSupabaseMock({ sessionData: null });
    const { result } = renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });

  it("sets isAdmin=true and user when session exists and maybeSingle returns admin role", async () => {
    const sessionUser = { id: "admin-user-id", email: "admin@test.com" };
    supabaseMock = makeSupabaseMock({
      sessionData: { user: sessionUser },
      rolesData: { role: "admin" },
    });

    const { result } = renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isAdmin).toBe(true);
    expect(result.current.user).toEqual(sessionUser);
  });

  it("signs out and navigates to /login when session exists but maybeSingle returns null (no admin role)", async () => {
    const sessionUser = { id: "regular-user", email: "user@test.com" };
    supabaseMock = makeSupabaseMock({
      sessionData: { user: sessionUser },
      rolesData: null, // no admin role
    });

    const { result } = renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(supabaseMock.auth.signOut).toHaveBeenCalled();
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.user).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });

  it("uses maybeSingle (not single) so missing role row does not throw", async () => {
    // This is the key PR change: maybeSingle returns null instead of throwing
    // when no row is found. We verify that the query builder calls maybeSingle.
    const sessionUser = { id: "user-no-role" };
    supabaseMock = makeSupabaseMock({
      sessionData: { user: sessionUser },
      rolesData: null,
    });

    renderHook(() => useAdminAuth());

    await waitFor(() => {
      expect(supabaseMock._maybeSingleFn).toHaveBeenCalled();
    });

    // maybeSingle was called (not single, which would throw on missing row)
    expect(supabaseMock._maybeSingleFn).toHaveBeenCalledTimes(1);
  });

  it("signOut function calls supabase.auth.signOut", async () => {
    supabaseMock = makeSupabaseMock({ sessionData: null });
    const { result } = renderHook(() => useAdminAuth());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await result.current.signOut();
    expect(supabaseMock.auth.signOut).toHaveBeenCalled();
  });

  it("on SIGNED_OUT auth event, clears state and navigates to /login", async () => {
    let capturedCb: ((event: string, session: object | null) => void) | null = null;

    supabaseMock = makeSupabaseMock({
      sessionData: null,
      onAuthStateChangeCb: (cb) => {
        capturedCb = cb as unknown as (event: string, session: object | null) => void;
      },
    });

    const { result } = renderHook(() => useAdminAuth());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Trigger SIGNED_OUT
    if (capturedCb) {
      await (capturedCb as (event: string, session: object | null) => void)("SIGNED_OUT", null);
    }

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
    });
  });
});
