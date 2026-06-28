import { motion } from "framer-motion";
import { Sparkles, Mail, Phone, MessageCircle } from "lucide-react";
import { ContactForm } from "./ContactForm";

const ContactSection = () => {
  return (
    <section id="contact" className="relative min-h-screen flex flex-col">
      {/* Card background */}
      <div className="relative flex-1 bg-[var(--color-bg-card)] border border-[var(--color-border-default)] rounded-4xl mx-4 md:mx-8 lg:mx-12 mb-4 md:mb-8 lg:mb-12 overflow-hidden">
        <div className="relative  flex flex-col justify-between h-full p-8 md:p-12 lg:p-20">
          {/* Main CTA text */}
          <div className="flex lg:flex-row flex-col items-center">
            <motion.div
              className="max-w-3xl mt-8"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-[var(--color-text-primary)]">
                Wanna create
                <br />
                something <span className="italic">awesome</span>
                <br />
                together?
              </h2>
            </motion.div>

            {/* Contact form */}
            <motion.div
              className="mt-12 max-w-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ContactForm />
            </motion.div>
          </div>

          {/* Bottom area */}
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-col gap-5 max-w-sm">
              <div className="space-y-1">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Don&apos;t like forms? Reach out directly:
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="mailto:waelamrany@gmail.com"
                  className="group flex items-center gap-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <span className="flex items-center justify-center min-w-8 h-8 rounded-full border border-[var(--color-border-default)] group-hover:border-[var(--color-text-primary)] transition-colors">
                    <Mail className="w-4 h-4" />
                  </span>
                  waelamrany@gmail.com
                </a>

                <a
                  href="tel:+967770826486"
                  className="group flex items-center gap-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <span className="flex items-center justify-center min-w-8 h-8 rounded-full border border-[var(--color-border-default)] group-hover:border-[var(--color-text-primary)] transition-colors">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span className="flex flex-col">
                    <span>+967 770 826 486</span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      Call / WhatsApp / SMS
                    </span>
                  </span>
                </a>

                <a
                  href="https://wa.me/994409197608"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <span className="flex items-center justify-center min-w-8 h-8 rounded-full border border-[var(--color-border-default)] group-hover:border-[var(--color-text-primary)] transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </span>
                  <span className="flex flex-col">
                    <span>+994 409 197 608</span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      Business WhatsApp
                    </span>
                  </span>
                </a>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <a
                  href="https://instagram.com/g9t3n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 text-xs rounded-full border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-all"
                >
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/in/wael-alamrany-1557a5288"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 text-xs rounded-full border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-all"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/G9T3N"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 text-xs rounded-full border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-all"
                >
                  GitHub
                </a>
                <a
                  href="https://www.npmjs.com/~g9t3n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 text-xs rounded-full border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-all"
                >
                  npm
                </a>
              </div>
            </div>

            <a
              href="mailto:waelamrany@gmail.com"
              className="bg-[var(--color-mp-text-primary)] text-[var(--color-bg-primary)] px-10 h-12 rounded-xl border flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-4 h-4" />
              Let&apos;s talk
              <Sparkles className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
