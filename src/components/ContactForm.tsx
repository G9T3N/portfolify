import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSendMessage } from "@/queries";
import { motion } from "framer-motion";

const contactSchema = z.object({
  name: z.string().min(1, "Please enter your name").max(25, "Name must be at most 25 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(1, "Please enter a message").max(250, "Message must be at most 250 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const sendMessage = useSendMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    delayError: 500,
    defaultValues: { name: "", email: "", message: "" }
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await sendMessage.mutateAsync(data);
      setSubmitted(true);
      toast.success("Message sent successfully! ✨");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
      console.error("Failed to send message");
    }
  };

  if (submitted) {
    return (
      <motion.div
        className="text-xl font-medium text-[var(--color-text-primary)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        ✨ Message sent! I&apos;ll get back to you soon.
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 space-y-1">
          <input
            type="text"
            placeholder="Your name"
            {...register("name")}
            className={`form-input w-full rounded-xl ${errors.name ? 'border-red-500/50 focus:border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-xs px-1">{errors.name.message}</p>}
        </div>
        <div className="flex-1 space-y-1">
          <input
            placeholder="Your email"
            {...register("email")}
            className={`form-input w-full rounded-xl ${errors.email ? 'border-red-500/50 focus:border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-xs px-1">{errors.email.message}</p>}
        </div>
      </div>
      <div className="space-y-1">
        <textarea
          placeholder="Tell me about your project..."
          {...register("message")}
          rows={4}
          className={`form-input w-full resize-none rounded-xl ${errors.message ? 'border-red-500/50 focus:border-red-500' : ''}`}
        />
        {errors.message && <p className="text-red-500 text-xs px-1">{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={sendMessage.isPending || isSubmitting}
        className="bg-[var(--color-mp-primary)] cursor-pointer text-white px-10 h-12 rounded-xl border flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" />
        {sendMessage.isPending || isSubmitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
};
