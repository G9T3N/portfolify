import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

// Placeholder testimonials — replace with Supabase data when ready
const PLACEHOLDER_TESTIMONIALS = [
  {
    id: "1",
    name: "Coming Soon",
    role: "Client",
    company: "",
    content: "Testimonials from happy clients will appear here. Add them via the admin dashboard.",
    rating: 5,
    avatar_url: null,
  },
];

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar_url: string | null;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <motion.div
    className="flex-shrink-0 w-[340px] md:w-[400px] p-6 rounded-3xl border border-[var(--color-border-default)] bg-[var(--color-bg-card)] space-y-4"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <Quote className="w-8 h-8 text-[var(--color-mp-primary)] opacity-40" />

    <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed italic">
      &ldquo;{testimonial.content}&rdquo;
    </p>

    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < testimonial.rating ? "text-[var(--color-mp-primary)] fill-[var(--color-mp-primary)]" : "text-[var(--color-border-default)]"}`}
        />
      ))}
    </div>

    <div className="flex items-center gap-3 pt-2 border-t border-[var(--color-border-default)]">
      {testimonial.avatar_url ? (
        <img
          src={testimonial.avatar_url}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center text-sm font-bold text-[var(--color-text-muted)]">
          {testimonial.name.charAt(0)}
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-[var(--color-text-primary)]">
          {testimonial.name}
        </p>
        <p className="text-xs text-[var(--color-text-muted)]">
          {testimonial.role}
          {testimonial.company ? ` at ${testimonial.company}` : ""}
        </p>
      </div>
    </div>
  </motion.div>
);

const TestimonialsSection = () => {
  // TODO: Replace with useTestimonials() query when table is created
  const testimonials = PLACEHOLDER_TESTIMONIALS;

  // Don't render the section if there are only placeholder testimonials
  if (testimonials.length <= 1 && testimonials[0]?.name === "Coming Soon") {
    return null;
  }

  return (
    <section className="px-4 md:px-8 lg:px-12 py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Section label */}
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">What Clients Say</span>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
