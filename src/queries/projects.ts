import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getContentLocale, localizeRow, localizeRows } from "@/queries/translations";

export function useProjects() {
  const locale = getContentLocale();
  return useQuery({
    queryKey: ["projects", locale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) {
        throw error;
      }
      return localizeRows("projects", data, locale);
    },
  });
}

export function useProject(id: string) {
  const locale = getContentLocale();
  return useQuery({
    queryKey: ["project", id, locale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) {
        throw error;
      }
      if (!data) {
        return null;
      }
      return localizeRow("projects", data, locale);
    },
    enabled: !!id,
  });
}

export function useProjectImages(projectId: string) {
  return useQuery({
    queryKey: ["project-images", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", projectId)
        .order("display_order", { ascending: true });
      if (error) {
        throw error;
      }
      return data;
    },
    enabled: !!projectId,
  });
}
