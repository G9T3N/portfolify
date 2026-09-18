import { useState } from "react";
import {
  Award,
  CheckCircle2,
  FolderGit2,
  Gauge,
  GitCommit,
  Layers,
  Loader2,
  RotateCcw,
  Save,
  Smile,
  Sparkles,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  useDashboardStats,
  usePortfolioMetrics,
  useSkills,
  useUpdatePortfolioMetricsMutation,
  useWorkExperiences,
} from "../queries";

export default function PortfolioMetricsManager() {
  const { data: metrics, isLoading: isMetricsLoading } = usePortfolioMetrics();
  const { data: stats } = useDashboardStats();
  const { data: skills } = useSkills();
  const { data: experiences } = useWorkExperiences();
  const updateMutation = useUpdatePortfolioMetricsMutation();

  const [draftProjects, setDraftProjects] = useState<string | null>(null);
  const [draftYears, setDraftYears] = useState<string | null>(null);

  const projectsDeliveredInput =
    draftProjects !== null
      ? draftProjects
      : metrics?.projectsDelivered !== null && metrics?.projectsDelivered !== undefined
        ? String(metrics.projectsDelivered)
        : "";

  const yearsExperienceInput =
    draftYears !== null
      ? draftYears
      : metrics?.yearsExperience !== null && metrics?.yearsExperience !== undefined
        ? String(metrics.yearsExperience)
        : "";

  // Compute auto-calculated fallbacks
  const autoProjectsCount = stats?.totalProjects ?? 0;
  const autoYearsExperience =
    experiences && experiences.length > 0
      ? Math.max(
          1,
          new Date().getFullYear() -
            new Date(
              Math.min(...experiences.map((e) => new Date(e.start_date).getTime())),
            ).getFullYear(),
        )
      : 0;

  const totalSkills = skills?.length ?? 0;
  const totalCertificates = stats?.totalCertificates ?? 0;

  const handleSave = async () => {
    const parsedProjects =
      projectsDeliveredInput.trim() === "" ? null : Number(projectsDeliveredInput);
    const parsedYears = yearsExperienceInput.trim() === "" ? null : Number(yearsExperienceInput);

    if (parsedProjects !== null && (isNaN(parsedProjects) || parsedProjects < 0)) {
      toast({
        title: "Invalid projects count",
        description: "Please enter a valid non-negative number.",
        variant: "destructive",
      });
      return;
    }

    if (parsedYears !== null && (isNaN(parsedYears) || parsedYears < 0)) {
      toast({
        title: "Invalid years of experience",
        description: "Please enter a valid non-negative number.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateMutation.mutateAsync({
        projectsDelivered: parsedProjects,
        yearsExperience: parsedYears,
      });
      setDraftProjects(null);
      setDraftYears(null);
      toast({
        title: "Metrics updated successfully",
        description: "Your hero gauge and portfolio stats have been updated.",
      });
    } catch (error) {
      console.error("Failed to save metrics:", error);
      toast({
        title: "Failed to update metrics",
        description: "Could not persist changes to the backend database.",
        variant: "destructive",
      });
    }
  };

  const handleResetToAuto = async () => {
    setDraftProjects("");
    setDraftYears("");
    try {
      await updateMutation.mutateAsync({
        projectsDelivered: null,
        yearsExperience: null,
      });
      setDraftProjects(null);
      setDraftYears(null);
      toast({
        title: "Reverted to automatic metrics",
        description:
          "Projects and experience are now computed automatically from your database data.",
      });
    } catch (error) {
      console.error("Failed to reset metrics:", error);
      toast({
        title: "Failed to reset metrics",
        variant: "destructive",
      });
    }
  };

  const isChanged =
    (projectsDeliveredInput.trim() === "" ? null : Number(projectsDeliveredInput)) !==
      (metrics?.projectsDelivered ?? null) ||
    (yearsExperienceInput.trim() === "" ? null : Number(yearsExperienceInput)) !==
      (metrics?.yearsExperience ?? null);

  return (
    <div className="bg-[var(--color-bg-card)] rounded-3xl border border-[var(--color-border-default)] p-6 md:p-8 space-y-6 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-border-default)]/60">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-mp-primary)] shadow-sm">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Portfolio Hero Metrics
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
              Manage custom values for Projects and Experience. Other metrics stay automatically
              synced.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleResetToAuto}
            disabled={updateMutation.isPending || isMetricsLoading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)] transition-colors disabled:opacity-50 cursor-pointer"
            title="Clear custom overrides and use auto-detected counts"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Auto
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={updateMutation.isPending || isMetricsLoading || !isChanged}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold bg-[var(--color-mp-primary)] text-white hover:opacity-90 transition-all disabled:opacity-50 shadow-md cursor-pointer"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Managed Metrics Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Projects Delivered */}
        <div className="bg-[var(--color-bg-elevated)]/60 rounded-2xl p-5 border border-[var(--color-border-default)]/70 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="projects-delivered-input"
                className="text-sm font-semibold text-[var(--color-text-primary)] flex items-center gap-2"
              >
                <FolderGit2 className="w-4 h-4 text-[var(--color-mp-primary)]" />
                Projects Delivered
              </label>
              <span className="text-xs px-2 py-0.5 rounded-md bg-[var(--color-bg-card)] border border-[var(--color-border-default)] text-[var(--color-text-muted)] font-mono">
                Auto: {autoProjectsCount}
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-1.5">
              Custom count shown in the hero gauge as delivered client & open-source projects.
            </p>
          </div>

          <div className="relative">
            <input
              id="projects-delivered-input"
              type="number"
              min="0"
              placeholder={`Auto (${autoProjectsCount || 25})`}
              value={projectsDeliveredInput}
              onChange={(e) => setDraftProjects(e.target.value)}
              disabled={isMetricsLoading}
              className="w-full h-11 px-3.5 pe-10 bg-[var(--color-bg-card)] border border-[var(--color-border-default)] focus:border-[var(--color-mp-primary)] rounded-xl text-sm font-mono text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none transition-colors"
            />
            <span className="absolute end-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[var(--color-text-muted)] pointer-events-none">
              +
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              Active on portfolio:{" "}
              <strong className="font-mono text-[var(--color-text-primary)]">
                {projectsDeliveredInput.trim() !== ""
                  ? `${projectsDeliveredInput}+`
                  : `${autoProjectsCount > 0 ? autoProjectsCount : 25}+ (Auto)`}
              </strong>
            </span>
          </div>
        </div>

        {/* Years of Experience */}
        <div className="bg-[var(--color-bg-elevated)]/60 rounded-2xl p-5 border border-[var(--color-border-default)]/70 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="years-experience-input"
                className="text-sm font-semibold text-[var(--color-text-primary)] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[var(--color-mp-primary)]" />
                Years of Experience
              </label>
              <span className="text-xs px-2 py-0.5 rounded-md bg-[var(--color-bg-card)] border border-[var(--color-border-default)] text-[var(--color-text-muted)] font-mono">
                Auto: {autoYearsExperience} yrs
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-1.5">
              Custom years shown in hero gauge and About section (timeline from earliest work date).
            </p>
          </div>

          <div className="relative">
            <input
              id="years-experience-input"
              type="number"
              min="0"
              placeholder={`Auto (${autoYearsExperience || 10})`}
              value={yearsExperienceInput}
              onChange={(e) => setDraftYears(e.target.value)}
              disabled={isMetricsLoading}
              className="w-full h-11 px-3.5 pe-12 bg-[var(--color-bg-card)] border border-[var(--color-border-default)] focus:border-[var(--color-mp-primary)] rounded-xl text-sm font-mono text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none transition-colors"
            />
            <span className="absolute end-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[var(--color-text-muted)] pointer-events-none">
              + yrs
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              Active on portfolio:{" "}
              <strong className="font-mono text-[var(--color-text-primary)]">
                {yearsExperienceInput.trim() !== ""
                  ? `${yearsExperienceInput}+ years`
                  : `${autoYearsExperience > 0 ? autoYearsExperience : 10}+ years (Auto)`}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Automatic Metrics Overview */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] font-mono">
            Automatic Metrics (Managed by System)
          </p>
          <span className="text-[11px] text-[var(--color-text-muted)]">
            Untouched and automatically calculated
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Skills */}
          <div className="p-3 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <Layers className="w-4 h-4 text-[var(--color-mp-primary)] shrink-0" />
              <div className="truncate">
                <p className="text-xs font-medium text-[var(--color-text-primary)] truncate">
                  Skills Mastered
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
                  {totalSkills} in database
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Auto
            </span>
          </div>

          {/* Certificates */}
          <div className="p-3 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <Award className="w-4 h-4 text-[var(--color-mp-primary)] shrink-0" />
              <div className="truncate">
                <p className="text-xs font-medium text-[var(--color-text-primary)] truncate">
                  Certificates Earned
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
                  {totalCertificates} verified
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Auto
            </span>
          </div>

          {/* Github Stats */}
          <div className="p-3 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <GitCommit className="w-4 h-4 text-[var(--color-mp-primary)] shrink-0" />
              <div className="truncate">
                <p className="text-xs font-medium text-[var(--color-text-primary)] truncate">
                  GitHub Activity
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
                  Commits & LoC
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Auto
            </span>
          </div>

          {/* Happy Clients */}
          <div className="p-3 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border-default)] flex items-center justify-between">
            <div className="flex items-center gap-2 truncate">
              <Smile className="w-4 h-4 text-[var(--color-mp-primary)] shrink-0" />
              <div className="truncate">
                <p className="text-xs font-medium text-[var(--color-text-primary)] truncate">
                  Happy Clients
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)] font-mono">~90% ratio</p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Auto
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
