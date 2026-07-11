import {
  Award,
  BarChart3,
  Briefcase,
  FileText,
  FolderKanban,
  Home,
  MessageSquare,
  Settings,
  Layers,
  Menu,
  X,
} from "lucide-react";
import { NavLink, Outlet } from "react-router";
import { useAdminStats } from "./queries";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const sidebarItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/admin", label: "Projects", icon: FolderKanban, end: true },
  { to: "/admin/stacks", label: "Skills & Stacks", icon: Layers },
  { to: "/admin/experience", label: "Experience", icon: Briefcase },
  { to: "/admin/certificates", label: "Certificates", icon: Award },
  { to: "/admin/settings", label: "CV & Settings", icon: Settings },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
];

/**
 * Renders the admin page layout with a fixed left sidebar and a main content area.
 */
export default function AdminLayout() {
  const { data: stats } = useAdminStats();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] flex font-sans selection:bg-[var(--color-mp-primary)]/30">
      {/* Floating Sidebar */}
      <aside className="w-64 fixed inset-y-0 start-0 z-30 p-4 lg:p-6 hidden lg:flex flex-col">
        <div className="flex-1 rounded-3xl bg-[var(--color-bg-elevated)]/40 backdrop-blur-xl border border-[var(--color-border-default)] shadow-2xl flex flex-col overflow-hidden">
          <div className="p-6 border-b border-[var(--color-border-default)]/50">
            <NavLink to="/admin" end className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border-default)] flex items-center justify-center group-hover:border-[var(--color-mp-primary)]/50 transition-colors">
                <FileText className="w-5 h-5 text-[var(--color-mp-primary)]" />
              </div>
              <div>
                <p className="text-base font-bold tracking-tight text-[var(--color-text-primary)]">
                  Mr.Err
                </p>
                <p className="text-xs text-[var(--color-text-muted)] font-mono tracking-wider uppercase mt-0.5">
                  Admin Panel
                </p>
              </div>
            </NavLink>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
            {sidebarItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--color-bg-card)] text-[var(--color-text-primary)] border border-[var(--color-border-hover)] shadow-md"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-card)]/50 hover:text-[var(--color-text-secondary)] border border-transparent"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? "text-[var(--color-mp-primary)]" : ""}`}
                    />
                    <span className="flex-1 font-sans">{label}</span>
                    {to === "/admin/messages" &&
                      stats?.unreadMessages &&
                      stats.unreadMessages > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-[var(--color-mp-primary)]/20 text-[var(--color-mp-primary)] text-[10px] font-bold">
                          {stats.unreadMessages}
                        </span>
                      )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-[var(--color-border-default)]/50">
            <NavLink
              to="/"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-bold text-[var(--color-bg-primary)] bg-[var(--color-text-primary)] hover:bg-[var(--color-mp-primary)] hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(0,128,0,0.3)]"
            >
              <Home className="w-4 h-4" />
              Back to Site
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:pl-[18rem] min-w-0 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden p-4 border-b border-[var(--color-border-default)] bg-[var(--color-bg-elevated)]/80 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[var(--color-text-muted)] p-2 hover:text-[var(--color-text-primary)]"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border-default)] flex items-center justify-center">
              <FileText className="w-4 h-4 text-[var(--color-mp-primary)]" />
            </div>
            <p className="text-sm font-bold text-[var(--color-text-primary)]">Mr.Err Admin</p>
          </div>
          <NavLink to="/" className="text-[var(--color-text-muted)] p-2">
            <Home className="w-5 h-5" />
          </NavLink>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 start-0 w-64 bg-[var(--color-bg-elevated)] border-e border-[var(--color-border-default)] z-50 lg:hidden flex flex-col shadow-xl"
              >
                <div className="p-4 border-b border-[var(--color-border-default)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border-default)] flex items-center justify-center">
                      <FileText className="w-4 h-4 text-[var(--color-mp-primary)]" />
                    </div>
                    <p className="text-sm font-bold text-[var(--color-text-primary)]">
                      Mr.Err Admin
                    </p>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[var(--color-text-muted)] p-1 hover:text-[var(--color-text-primary)]"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                  {sidebarItems.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                      key={to}
                      to={to}
                      end={end}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-[var(--color-bg-card)] text-[var(--color-text-primary)] border border-[var(--color-border-hover)] shadow-md"
                            : "text-[var(--color-text-muted)] hover:bg-[var(--color-bg-card)]/50 hover:text-[var(--color-text-secondary)] border border-transparent"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? "text-[var(--color-mp-primary)]" : ""}`}
                          />
                          <span className="flex-1 font-sans">{label}</span>
                          {to === "/admin/messages" &&
                            stats?.unreadMessages &&
                            stats.unreadMessages > 0 && (
                              <span className="px-2 py-0.5 rounded-full bg-[var(--color-mp-primary)]/20 text-[var(--color-mp-primary)] text-[10px] font-bold">
                                {stats.unreadMessages}
                              </span>
                            )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </nav>

                <div className="p-4 border-t border-[var(--color-border-default)]">
                  <NavLink
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-bold text-[var(--color-bg-primary)] bg-[var(--color-text-primary)] hover:bg-[var(--color-mp-primary)] hover:text-white transition-colors duration-300"
                  >
                    <Home className="w-4 h-4" />
                    Back to Site
                  </NavLink>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="flex-1 p-6 lg:p-10 lg:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto"
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
