import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getContentLocale } from "@/queries/translations";

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
  const locale = getContentLocale();
  return useQuery({
    queryKey: ["site-setting", key, locale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("id, value")
        .eq("key", key)
        .maybeSingle();
      if (error) {
        throw error;
      }
      if (!data) {
        return null;
      }
      const baseValue = data.value ?? null;
      if (locale === "en" || baseValue === null) {
        return baseValue;
      }
      const { data: translations, error: translationsError } = await supabase
        .from("translations")
        .select("value")
        .eq("table_name", "site_settings")
        .eq("row_id", data.id)
        .eq("locale", locale)
        .eq("field", "value")
        .maybeSingle();
      if (translationsError) {
        throw translationsError;
      }
      return translations?.value ?? baseValue;
    },
    enabled: !!key,
  });
}
