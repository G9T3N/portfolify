import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

/**
 * Fetches a single project by its ID.
 *
 * @param id The ID of the project to fetch.
 * @param initialData Project preloaded by the route loader, used to hydrate the cache without a refetch.
 * @returns The query result containing the fetched project record, or `null` if not found.
 */
export function useProject(id: string | undefined, initialData?: ProjectRow | null) {
  return useQuery({
    queryKey: ["project", id],
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
      return data;
    },
    enabled: !!id,
    ...(initialData !== undefined ? { initialData } : {}),
  });
}
