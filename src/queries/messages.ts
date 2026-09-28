import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type ContactMessageInput = {
  name: string;
  email: string;
  message: string;
};

export function useSendMessage() {
  return useMutation({
    mutationFn: async (input: ContactMessageInput) => {
      const { error } = await supabase.from("contact_messages").insert(input);
      if (error) {
        throw error;
      }
    },
  });
}
