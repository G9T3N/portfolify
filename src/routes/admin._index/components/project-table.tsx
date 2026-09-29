import { useState, useMemo } from "react";
import { format } from "date-fns";
import { Edit3, ExternalLink, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DEFAULT_PROJECTS,
  FEATURED_PROJECTS_COUNT,
} from "@/routes/_index/utils/constants/project-sections";

type Project = Record<string, unknown>;

type ProjectTableProps = {
  projects: Project[] | undefined;
  isLoading: boolean;
  onView: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
};

/** Titles that look like placeholder/test content */
const PLACEHOLDER_PATTERNS =
  /^(test|asdasd|asd|placeholder|lorem|untitled|example|secureauth dashboard|cryptotracker pro|healthsync mobile|devops monitor)$/i;

function isPlaceholder(project: {
  title?: unknown;
  description?: unknown;
  live_url?: unknown;
  code_url?: unknown;
}): boolean {
  const title = typeof project.title === "string" ? project.title.trim() : "";
  const desc = typeof project.description === "string" ? project.description.trim() : "";
  if (PLACEHOLDER_PATTERNS.test(title)) return true;
  if (PLACEHOLDER_PATTERNS.test(desc)) return true;
  if (
    typeof project.live_url === "string" &&
    project.live_url.includes("example.com") &&
    (!project.code_url ||
      (typeof project.code_url === "string" && project.code_url.includes("example.com")))
  ) {
    return true;
  }
  return false;
}

/**
 * Render a table of projects with category filter tabs, a 5-item initial view with Read More expander,
 * and per-row actions.
 */
export default function ProjectTable({
  projects,
  isLoading,
  onView,
  onEdit,
  onDelete,
}: ProjectTableProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);

  // If projects from DB are empty or all placeholders, fallback to DEFAULT_PROJECTS
  const effectiveProjects = useMemo(() => {
    if (!projects || projects.length === 0) return DEFAULT_PROJECTS as unknown as Project[];
    const nonPlaceholders = projects.filter((p) => !isPlaceholder(p));
    return nonPlaceholders.length > 0 ? projects : (DEFAULT_PROJECTS as unknown as Project[]);
  }, [projects]);

  // Derive unique categories
  const categories = useMemo(() => {
    const cats = new Set(
      effectiveProjects.map((p) => (p.category as string)?.toLowerCase()).filter(Boolean),
    );
    return ["all", ...Array.from(cats)];
  }, [effectiveProjects]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return effectiveProjects;
    return effectiveProjects.filter(
      (p) => (p.category as string)?.toLowerCase() === activeCategory,
    );
  }, [effectiveProjects, activeCategory]);

  const hasMore = filteredProjects.length > FEATURED_PROJECTS_COUNT;
  const remainingCount = filteredProjects.length - FEATURED_PROJECTS_COUNT;

  const visibleProjects = useMemo(() => {
    if (isExpanded || !hasMore) return filteredProjects;
    return filteredProjects.slice(0, FEATURED_PROJECTS_COUNT);
  }, [filteredProjects, isExpanded, hasMore]);

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow className="border-sidebar-border">
            <TableHead className="font-mono text-xs text-muted-foreground">Title</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground">Category</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground">Status</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground">Date</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5} className="text-center font-mono text-muted-foreground py-8">
              Loading projects...
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  if (effectiveProjects.length === 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow className="border-sidebar-border">
            <TableHead className="font-mono text-xs text-muted-foreground">Title</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground">Category</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground">Status</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground">Date</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={5} className="text-center font-mono text-muted-foreground py-8">
              No projects yet. Create your first one!
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Category filter tabs */}
      {categories.length > 2 && (
        <div className="flex items-center gap-2 flex-wrap px-6 py-4 border-b border-sidebar-border bg-sidebar/30">
          <span className="text-xs font-mono text-muted-foreground me-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat);
                setIsExpanded(false);
              }}
              className={`px-3 py-1 text-xs font-mono rounded-full border transition-all cursor-pointer capitalize ${
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground font-semibold shadow-sm"
                  : "border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/50 bg-sidebar/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Projects Table */}
      <Table>
        <TableHeader>
          <TableRow className="border-sidebar-border">
            <TableHead className="font-mono text-xs text-muted-foreground">Title</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground">Category</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground">Status</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground">Date</TableHead>
            <TableHead className="font-mono text-xs text-muted-foreground text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleProjects.map((project) => {
            const isHajzak =
              (project.id as string) === "hajzak-dashboard" ||
              (project.title as string)?.toLowerCase().includes("hajzak");
            const hasLiveUrl = Boolean(project.live_url);

            return (
              <TableRow
                key={project.id as string}
                className="border-sidebar-border hover:bg-sidebar-accent/50"
              >
                <TableCell className="font-mono text-sm">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-foreground">{project.title as string}</span>
                    {isHajzak && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Internal Dashboard
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs capitalize">
                    {project.category as string}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                      project.status === "live"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {project.status as string}
                  </span>
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {project.created_at
                    ? format(new Date(project.created_at as string), "MMM d, yyyy")
                    : "Featured"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {!isHajzak && hasLiveUrl ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onView(project)}
                        title="View live site"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    ) : isHajzak ? (
                      <span
                        title="Internal Dashboard · Private Access"
                        className="p-2 text-muted-foreground/40 cursor-not-allowed"
                      >
                        <ExternalLink className="w-4 h-4 opacity-30" />
                      </span>
                    ) : null}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(project)}
                      title="Edit project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(project)}
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Read More / Show Less Footer */}
      {hasMore && (
        <div className="px-6 py-3.5 border-t border-sidebar-border flex items-center justify-between bg-sidebar/20">
          <span className="text-xs font-mono text-muted-foreground">
            {isExpanded
              ? `Showing all ${filteredProjects.length} projects`
              : `Showing 5 featured projects · ${filteredProjects.length} total`}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="gap-2 font-mono text-xs border-border/60 hover:border-foreground/50 cursor-pointer"
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>Read More Projects (+{remainingCount})</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
