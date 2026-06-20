import { motion } from "framer-motion";
import { FileText, FolderKanban, Mail, MessageSquare, Users, Layout, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboardStats } from "./queries";

const statCards = [
  { label: "Total Projects", key: "totalProjects" as const, icon: Layout, color: "from-[var(--color-primary)]/20 to-[var(--color-secondary)]/10 border-[var(--color-primary)]/30" },
  { label: "Work Experiences", key: "totalExperiences" as const, icon: Users, color: "from-[var(--color-primary)]/20 to-[var(--color-secondary)]/10 border-[var(--color-primary)]/30" },
  { label: "Certificates", key: "totalCertificates" as const, icon: Award, color: "from-[var(--color-primary)]/20 to-[var(--color-secondary)]/10 border-[var(--color-primary)]/30" },
  { label: "Messages", key: "totalMessages" as const, icon: MessageSquare, color: "from-[var(--color-primary)]/20 to-[var(--color-secondary)]/10 border-[var(--color-primary)]/30" }
];

/**
 * Render the admin dashboard overview with animated statistic cards.
 *
 * Displays a header and a responsive grid of stat cards driven by `useDashboardStats()`.
 * Each card shows a label, icon, and the corresponding metric value (falls back to `0` when a metric is missing).
 *
 * @returns A React element representing the admin dashboard UI
 */
export default function AdminDashboard() {
  const { data: stats } = useDashboardStats();
  const value = (k: typeof statCards[number]["key"]) => stats?.[k] ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-mono font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground font-mono mt-1">
          Welcome to the admin panel — here's what's happening.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map(({ label, key, icon: Icon, color }) => (
          <Card key={label} className={`bg-gradient-to-br ${color} border`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-mono text-muted-foreground mb-1">{label}</p>
                  <p className="text-3xl font-mono font-bold text-foreground">{value(key)}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-background/50 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-foreground/70" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
