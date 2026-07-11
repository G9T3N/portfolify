import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Fetches the site's settings row from Supabase and exposes the result via a React Query hook.
 *
 * @returns The React Query result object containing `data` (the fetched `site_settings` row or `null`), status flags, and query utilities.
 * @throws The Supabase error if the database query fails.
 */
export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").maybeSingle();
      if (error) {
        throw error;
      }
      return data;
    },
  });
}

/**
 * Fetches a specific setting by key from the site_settings table.
 */
export function useSiteSetting(key: string) {
  return useQuery({
    queryKey: ["site-setting", key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", key)
        .maybeSingle();
      if (error) {
        throw error;
      }
      return data?.value ?? null;
    },
    enabled: !!key,
  });
}

