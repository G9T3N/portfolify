import { motion } from "framer-motion";
import CVManager from "./components/cv-manager";
import PortfolioMetricsManager from "../admin.dashboard/components/portfolio-metrics-manager";

/**
 * Renders the CVManager and PortfolioMetricsManager wrapped in a framer-motion container.
 */
export default function AdminSettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <CVManager />
      <PortfolioMetricsManager />
    </motion.div>
  );
}
