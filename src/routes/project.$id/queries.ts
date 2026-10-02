import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { getContentLocale, localizeRow, applyDirectArabicColumns } from "@/queries/translations";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

/**
 * Fetches a single project by its ID with active locale translation.
 *
 * @param id The ID of the project to fetch.
 * @param initialData Project preloaded by the route loader, used to hydrate the cache without a refetch.
 * @returns The query result containing the fetched project record, or `null` if not found.
 */
export function useProject(id: string | undefined, initialData?: ProjectRow | null) {
  const locale = getContentLocale();
  return useQuery({
    queryKey: ["project", id, locale],
    queryFn: async () => {
      if (!id) {
        return null;
      }

      const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();

      if (error) {
        if (error.code === "PGRST116") {
          return null; // Not found
        }
        throw error;
      }
      return localizeRow("projects", data, locale);
    },
    enabled: !!id,
    ...(initialData !== undefined
      ? {
          initialData: initialData
            ? locale === "ar"
              ? (applyDirectArabicColumns(
                  initialData as unknown as Record<string, unknown>,
                ) as ProjectRow)
              : initialData
            : null,
        }
      : {}),
  });
}
