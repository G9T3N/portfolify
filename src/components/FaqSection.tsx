import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    answer:
      "Wael Alamrany (Mr.Err) is a software engineer and frontend-focused full-stack developer based in Sana'a, Yemen, working with companies worldwide. He is currently at Sofa and collaborates remotely with Sparksoft and OnePlusOneTech.",
    question: "Who is Wael Alamrany?",
    value: "who-is-wael",
  },
  {
    answer:
      "His core specialization is React.js and TypeScript, with strong experience in Python/FastAPI backend development and Node.js. He also builds CI/CD pipelines with GitHub Actions and GitLab CI, including release automation and Conventional Commits.",
    question: "What technologies does he specialize in?",
    value: "technologies",
  },
  {
    answer:
      "He has shipped web products ranging from dashboard-style admin consoles to public-facing sites, with a strong focus on performance, reliability, and code quality. He also contributes to open source and publishes reusable NPM packages.",
    question: "What type of products has he worked on?",
    value: "products",
  },
  {
    answer:
      "Yes. Wael works fully remotely from Sana'a, Yemen, collaborating across time zones using Jira, pull requests, and code review workflows.",
    question: "Does he work remotely?",
    value: "remote-work",
  },
  {
    answer:
      "Companies can reach out via the contact form on this page or through his public profiles on GitHub and LinkedIn, which are linked in the footer.",
    question: "How can companies contact him?",
    value: "contact",
  },
];

const FaqSection = () => (
  <section className="px-4 md:px-8 lg:px-12 py-24 md:py-32 overflow-hidden">
    <div className="max-w-[1400px] mx-auto">
      <motion.div
        className="flex justify-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">Frequently Asked Questions</span>
      </motion.div>

      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.value}
              value={item.value}
              className="border-[var(--color-border-default)]"
            >
              <AccordionTrigger className="text-start text-base md:text-lg font-semibold text-[var(--color-text-primary)]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FaqSection;
