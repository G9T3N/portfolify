import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getContentLocale } from "@/queries/translations";

export interface PortfolioMetrics {
  projectsDelivered: number | null;
  yearsExperience: number | null;
}

/**
 * Fetches all site settings rows from Supabase and exposes the result via a React Query hook.
 *
 * @returns The React Query result object containing `data` (an array of `site_settings` rows), status flags, and query utilities.
 * @throws The Supabase error if the database query fails.
 */
export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) {
        throw error;
      }
      return data;
    },
  });
}

/**
 * Fetches portfolio custom metrics (projects_delivered and years_experience) from site_settings.
 */
export function usePortfolioMetrics() {
  return useQuery({
    queryKey: ["portfolio-metrics"],
    queryFn: async (): Promise<PortfolioMetrics> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["projects_delivered", "years_experience"]);
      if (error) {
        throw error;
      }
      const settingsMap = new Map((data || []).map((row) => [row.key, row.value]));
      const projectsRaw = settingsMap.get("projects_delivered");
      const yearsRaw = settingsMap.get("years_experience");

      return {
        projectsDelivered:
          projectsRaw !== null &&
          projectsRaw !== undefined &&
          projectsRaw !== "" &&
          !isNaN(Number(projectsRaw))
            ? Number(projectsRaw)
            : null,
        yearsExperience:
          yearsRaw !== null && yearsRaw !== undefined && yearsRaw !== "" && !isNaN(Number(yearsRaw))
            ? Number(yearsRaw)
            : null,
      };
    },
  });
}

/**
 * Mutation to update portfolio custom metrics in site_settings.
 */
export function useUpdatePortfolioMetricsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectsDelivered,
      yearsExperience,
    }: {
      projectsDelivered: number | null;
      yearsExperience: number | null;
    }) => {
      const updates = [
        {
          key: "projects_delivered",
          value: projectsDelivered !== null ? String(projectsDelivered) : null,
        },
        {
          key: "years_experience",
          value: yearsExperience !== null ? String(yearsExperience) : null,
        },
      ];

      for (const item of updates) {
        const { data: existing } = await supabase
          .from("site_settings")
          .select("id")
          .eq("key", item.key)
          .maybeSingle();

        if (existing) {
          const { error } = await supabase
            .from("site_settings")
            .update({ value: item.value, updated_at: new Date().toISOString() })
            .eq("key", item.key);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("site_settings").insert({
            key: item.key,
            value: item.value,
            updated_at: new Date().toISOString(),
          });
          if (error) throw error;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-metrics"] });
      queryClient.invalidateQueries({ queryKey: ["site-setting"] });
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
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
