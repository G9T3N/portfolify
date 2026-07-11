import { motion } from "framer-motion";
import { FolderKanban, MessageSquare, Users, Layout, Award } from "lucide-react";
import { useDashboardStats } from "./queries";

const statCards = [
  {
    label: "Total Projects",
    key: "totalProjects" as const,
    icon: Layout,
  },
  {
    label: "Work Experiences",
    key: "totalExperiences" as const,
    icon: Users,
  },
  {
    label: "Certificates",
    key: "totalCertificates" as const,
    icon: Award,
  },
  {
    label: "Messages",
    key: "totalMessages" as const,
    icon: MessageSquare,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

/**
 * Render the admin dashboard overview with animated statistic cards.
 */
export default function AdminDashboard() {
  const { data: stats } = useDashboardStats();
  const value = (k: (typeof statCards)[number]["key"]) => stats?.[k] ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Dashboard Overview
        </h1>
        <p className="text-base text-[var(--color-text-muted)] mt-2 font-sans max-w-xl">
          Welcome to the control center. Here is a high-level view of your portfolio's metrics and
          data.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {statCards.map(({ label, key, icon: Icon }) => (
          <motion.div key={label} variants={itemVariants}>
            <div className="group relative bg-[var(--color-bg-card)] rounded-3xl p-6 border border-[var(--color-border-default)] hover:border-[var(--color-border-hover)] transition-all duration-300 overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]">
              {/* Subtle background glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-mp-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] flex items-center justify-center group-hover:scale-110 group-hover:border-[var(--color-mp-primary)]/40 transition-all duration-500">
                    <Icon className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-mp-primary)] transition-colors duration-300" />
                  </div>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-1">
                    {value(key)}
                  </p>
                  <p className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wider font-mono">
                    {label}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
