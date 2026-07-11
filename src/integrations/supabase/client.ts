import type { Database } from "./types";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "placeholder-key";

// Create a simple in-memory storage fallback for SSR
const createStorage = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage;
  }
  // Fallback for SSR
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
  };
};

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: createStorage(),
    persistSession: true,
    autoRefreshToken: true,
  },
});
