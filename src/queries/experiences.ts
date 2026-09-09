import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getContentLocale, localizeRows } from "@/queries/translations";

export function useWorkExperiences() {
  const locale = getContentLocale();
  return useQuery({
    queryKey: ["work-experiences", locale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("work_experiences")
        .select("*")
        .order("start_date", { ascending: false });
      if (error) {
        throw error;
      }
      return localizeRows("work_experiences", data, locale);
    },
  });
}
