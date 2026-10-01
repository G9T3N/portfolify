export interface MinimalProject {
  title: string;
  description: string;
  live_url?: string | null;
  code_url?: string | null;
  status?: string;
  category?: string;
}

const PLACEHOLDER_PATTERNS =
  /^(test|asdasd|asd|placeholder|lorem|untitled|example|secureauth dashboard|cryptotracker pro|healthsync mobile|devops monitor)$/i;

/**
 * Pure predicate function checking if a project entry resembles placeholder/test data.
 */
export function isPlaceholderProject(project: MinimalProject): boolean {
  if (PLACEHOLDER_PATTERNS.test(project.title.trim())) return true;
  if (PLACEHOLDER_PATTERNS.test(project.description.trim())) return true;
  if (
    project.live_url?.includes("example.com") &&
    (!project.code_url || project.code_url.includes("example.com"))
  ) {
    return true;
  }
  return false;
}

/**
 * Derives unique, lowercased categories list prepended with "all".
 */
export function deriveProjectCategories(projects: readonly { category?: string }[]): string[] {
  const categories = new Set(
    projects.map((p) => p.category?.toLowerCase()).filter((cat): cat is string => Boolean(cat)),
  );
  return ["all", ...Array.from(categories)];
}
