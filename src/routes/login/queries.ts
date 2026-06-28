import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useAdminAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (roles) {
          navigate("/admin", { replace: true });
        }
      }
    });

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", session.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (roles) {
          navigate("/admin", { replace: true });
          return;
        }
      }
      setIsCheckingSession(false);
    };

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const submitAuth = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Sign up new user
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) {
          throw error;
        }

        if (data.user) {
          toast.success("Account created! Please wait while admin privileges are being granted...");
          // User created, they need to be granted admin role via database
        }
      } else {
        // Sign in existing user
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        if (data.session) {
          const { data: roles, error: rolesError } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", data.session.user.id)
            .eq("role", "admin")
            .maybeSingle();

          if (rolesError || !roles) {
            await supabase.auth.signOut();
            throw new Error("Access denied. You do not have admin privileges.");
          }

          toast.success("Welcome back! Successfully logged in as admin.");
          navigate("/admin", { replace: true });
        }
      }
    } catch (error) {
      const err = error as Error;
      toast.error(
        isSignUp
          ? "Sign up failed: " + (err.message || "An error occurred")
          : "Login failed: " + (err.message || "An error occurred"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isCheckingSession,
    isSignUp,
    setIsSignUp,
    submitAuth,
  };
};
