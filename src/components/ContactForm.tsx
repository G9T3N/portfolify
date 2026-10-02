import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSendMessage } from "@/queries";
import { motion } from "framer-motion";
import { Trans } from "@lingui/react/macro";

const contactSchema = z.object({
  name: z.string().min(1, "Please enter your name").max(25, "Name must be at most 25 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(1, "Please enter a message")
    .max(250, "Message must be at most 250 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const sendMessage = useSendMessage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    delayError: 500,
    defaultValues: { name: "", email: "", message: "" },
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
        <Trans>✨ Message sent! I&apos;ll get back to you soon.</Trans>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <label
            htmlFor="contact-name"
            className="text-sm font-medium text-[var(--color-text-secondary)]"
          >
            <Trans>Name</Trans>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
            className={`form-input w-full rounded-2xl ${errors.name ? "border-red-500/50 focus:border-red-500" : ""}`}
          />
          {errors.name && (
            <p id="contact-name-error" className="text-red-500 text-xs">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label
            htmlFor="contact-email"
            className="text-sm font-medium text-[var(--color-text-secondary)]"
          >
            <Trans>Email</Trans>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
            className={`form-input w-full rounded-2xl ${errors.email ? "border-red-500/50 focus:border-red-500" : ""}`}
          />
          {errors.email && (
            <p id="contact-email-error" className="text-red-500 text-xs">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-sm font-medium text-[var(--color-text-secondary)]"
        >
          <Trans>Message</Trans>
        </label>
        <textarea
          id="contact-message"
          placeholder="Tell me about your project..."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
          rows={4}
          className={`form-input w-full resize-none rounded-2xl ${errors.message ? "border-red-500/50 focus:border-red-500" : ""}`}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-red-500 text-xs">
            {errors.message.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={sendMessage.isPending || isSubmitting}
        className="bg-[var(--color-mp-primary)] cursor-pointer text-white px-10 h-12 rounded-2xl border flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" />
        {sendMessage.isPending || isSubmitting ? (
          <Trans>Sending...</Trans>
        ) : (
          <Trans>Send message</Trans>
        )}
      </button>
    </form>
  );
};
