export interface WorkExperienceItem {
  start_date: string;
}

/**
 * Calculates total years of experience automatically from work experiences,
 * respecting an optional manual override from portfolio metrics.
 */
export function calculateExperienceYears(
  experiences?: readonly WorkExperienceItem[] | null,
  overrideYears?: number | null,
): number | null {
  if (overrideYears !== null && overrideYears !== undefined) {
    return overrideYears;
  }

  if (!experiences || experiences.length === 0) {
    return null;
  }

  const startTimestamps = experiences
    .map((e) => new Date(e.start_date).getTime())
    .filter((time) => !Number.isNaN(time));

  if (startTimestamps.length === 0) {
    return null;
  }

  const earliestYear = new Date(Math.min(...startTimestamps)).getFullYear();
  const currentYear = new Date().getFullYear();

  return Math.max(1, currentYear - earliestYear);
}
