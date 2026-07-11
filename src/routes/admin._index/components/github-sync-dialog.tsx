import { useState } from "react";
import { Loader2, GitCommit, Check, AlertCircle } from "lucide-react";
import { AnimatedDialog } from "@/components/common/animated-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface GithubSyncDialogProps {
  onClose: () => void;
}

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
}

export default function GithubSyncDialog({ onClose }: GithubSyncDialogProps) {
  const [username, setUsername] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<Set<number>>(new Set());
  const [importStatus, setImportStatus] = useState<"live" | "draft">("draft");
  const [isImporting, setIsImporting] = useState(false);
  
  const queryClient = useQueryClient();

  const handleFetch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    
    setIsFetching(true);
    setError(null);
    setRepos([]);
    setSelectedRepos(new Set());
    
    try {
      const res = await fetch(`https://api.github.com/users/${username}/repos?type=public&per_page=100&sort=updated`);
      if (!res.ok) {
        throw new Error("Failed to fetch repositories. Please check the username.");
      }
      const data = await res.json();
      setRepos(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsFetching(false);
    }
  };

  const toggleRepo = (id: number) => {
    const newSelected = new Set(selectedRepos);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRepos(newSelected);
  };

  const toggleAll = () => {
    if (selectedRepos.size === repos.length) {
      setSelectedRepos(new Set());
    } else {
      setSelectedRepos(new Set(repos.map((r) => r.id)));
    }
  };

  const handleImport = async () => {
    if (selectedRepos.size === 0) return;
    setIsImporting(true);
    
    try {
      const reposToImport = repos.filter((r) => selectedRepos.has(r.id));
      
      const projectsToInsert = reposToImport.map((repo) => ({
        title: repo.name,
        description: repo.description || "No description provided.",
        live_url: repo.homepage || "",
        code_url: repo.html_url,
        category: "web",
        status: importStatus,
        tech_stack: repo.language ? [repo.language] : [],
        display_order: 0,
      }));

      // Insert all selected projects
      const { error: insertError } = await supabase.from("projects").insert(projectsToInsert);
      
      if (insertError) {
        throw insertError;
      }

      // Invalidate caches to refresh lists
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to import projects.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <AnimatedDialog isOpen onClose={onClose} title="Sync from GitHub">
      <div className="p-6 space-y-6">
        
        {/* Fetch Form */}
        <form onSubmit={handleFetch} className="flex gap-2">
          <div className="flex-1 relative">
            <GitCommit className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="GitHub Username"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-muted/30 border border-border/50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={isFetching || !username}
            className="px-6 py-3 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors disabled:opacity-50 font-mono text-sm flex items-center gap-2"
          >
            {isFetching && <Loader2 className="w-4 h-4 animate-spin" />}
            Fetch
          </button>
        </form>

        {error && (
          <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-lg border border-destructive/20 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {/* Results List */}
        {repos.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={toggleAll}
                className="text-xs font-mono text-primary hover:underline"
              >
                {selectedRepos.size === repos.length ? "Deselect All" : "Select All"}
              </button>
              <span className="text-xs font-mono text-muted-foreground">
                {selectedRepos.size} selected
              </span>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
              {repos.map((repo) => (
                <label
                  key={repo.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedRepos.has(repo.id)
                      ? "bg-primary/10 border-primary/50"
                      : "bg-muted/20 border-border/50 hover:bg-muted/40"
                  }`}
                >
                  <div
                    className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                      selectedRepos.has(repo.id)
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-muted-foreground"
                    }`}
                  >
                    {selectedRepos.has(repo.id) && <Check className="w-3 h-3" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono font-medium text-foreground truncate">
                      {repo.name}
                    </p>
                    {repo.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                        {repo.description}
                      </p>
                    )}
                  </div>
                </label>
              ))}
            </div>

            {/* Import Settings */}
            <div className="pt-4 border-t border-border/50 space-y-4">
              <div>
                <label className="block text-sm font-mono text-muted-foreground mb-2">
                  Import Status
                </label>
                <select
                  value={importStatus}
                  onChange={(e) => setImportStatus(e.target.value as "live" | "draft")}
                  className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border/50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                >
                  <option value="draft">Draft (Hidden)</option>
                  <option value="live">Live (Visible in Portfolio)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleImport}
                  disabled={selectedRepos.size === 0 || isImporting}
                  className="cyber-button flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isImporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <GitCommit className="w-4 h-4" />}
                  Import {selectedRepos.size} Projects
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimatedDialog>
  );
}
