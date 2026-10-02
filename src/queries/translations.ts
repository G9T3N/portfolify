import { i18n } from "@lingui/core";
import { supabase } from "@/integrations/supabase/client";

export type TranslationField = "title" | "description" | "full_content" | "position" | "value";

export type TranslationOverride = {
  rowId: string;
  field: TranslationField;
  value: string;
};

/**
 * Returns the content locale to serve. English is the canonical base and the
 * fallback; Arabic is the only localized locale today.
 */
export function getContentLocale(): "ar" | "en" {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("locale");
    if (saved === "ar" || saved === "en") {
      return saved;
    }
  }
  return i18n.locale === "ar" ? "ar" : "en";
}

/** Fetches localized overrides for a content table in the active locale. */
async function fetchTranslations(
  tableName: string,
  locale: "ar" | "en",
): Promise<TranslationOverride[]> {
  if (locale === "en") {
    return [];
  }
  const { data, error } = await supabase
    .from("translations")
    .select("row_id, field, value")
    .eq("table_name", tableName)
    .eq("locale", locale);
  if (error) {
    throw error;
  }
  return (data ?? []).map((t) => ({
    rowId: t.row_id,
    field: t.field as TranslationField,
    value: t.value,
  }));
}

function buildRowMap(overrides: TranslationOverride[]): Map<string, Map<string, string>> {
  const byRow = new Map<string, Map<string, string>>();
  for (const override of overrides) {
    let rowOverrides = byRow.get(override.rowId);
    if (!rowOverrides) {
      byRow.set(override.rowId, (rowOverrides = new Map()));
    }
    rowOverrides.set(override.field, override.value);
  }
  return byRow;
}

/**
 * Applies direct Arabic columns (e.g. title_ar -> title) onto a row object.
 */
export function applyDirectArabicColumns<T extends Record<string, unknown>>(row: T): T {
  const merged: Record<string, unknown> = { ...row };

  if (typeof row.title_ar === "string" && row.title_ar.trim()) {
    merged.title = row.title_ar;
  }
  if (typeof row.description_ar === "string" && row.description_ar.trim()) {
    merged.description = row.description_ar;
  }
  if (typeof row.full_content_ar === "string" && row.full_content_ar.trim()) {
    merged.full_content = row.full_content_ar;
  }
  if (typeof row.position_ar === "string" && row.position_ar.trim()) {
    merged.position = row.position_ar;
  }

  return merged as T;
}

/** Overlays localized fields onto a list of rows, keeping English fields as-is. */
export function applyTranslations<T extends { id: string }>(
  rows: T[],
  overrides: TranslationOverride[],
  locale?: "ar" | "en",
): T[] {
  const activeLocale = locale ?? getContentLocale();

  let byRow: Map<string, Map<string, string>> | null = null;
  if (overrides.length > 0) {
    byRow = buildRowMap(overrides);
  }

  return rows.map((row) => {
    let current = row;
    if (activeLocale === "ar") {
      current = applyDirectArabicColumns(current as unknown as Record<string, unknown>) as T;
    }
    if (byRow) {
      const rowOverrides = byRow.get(row.id);
      if (rowOverrides) {
        const merged: Record<string, unknown> = { ...current };
        for (const [field, value] of rowOverrides) {
          merged[field] = value;
        }
        current = merged as T;
      }
    }
    return current;
  });
}

/** Overlays localized fields onto a single row. */
export function applyTranslationsToRow<T extends { id: string }>(
  row: T,
  overrides: TranslationOverride[],
  locale?: "ar" | "en",
): T {
  return applyTranslations([row], overrides, locale)[0] ?? row;
}

/** Portable helper used by the query hooks to attach localized content. */
export async function localizeRows<T extends { id: string }>(
  tableName: string,
  rows: T[],
  locale: "ar" | "en",
): Promise<T[]> {
  if (locale === "en") {
    return rows;
  }
  const overrides = await fetchTranslations(tableName, locale);
  return applyTranslations(rows, overrides, locale);
}

/** Portable helper for a single localized row. */
export async function localizeRow<T extends { id: string }>(
  tableName: string,
  row: T,
  locale: "ar" | "en",
): Promise<T> {
  if (locale === "en") {
    return row;
  }
  const overrides = await fetchTranslations(tableName, locale);
  return applyTranslationsToRow(row, overrides, locale);
}
