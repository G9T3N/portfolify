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

/** Overlays localized fields onto a list of rows, keeping English fields as-is. */
export function applyTranslations<T extends { id: string }>(
  rows: T[],
  overrides: TranslationOverride[],
): T[] {
  if (overrides.length === 0) {
    return rows;
  }
  const byRow = buildRowMap(overrides);
  return rows.map((row) => {
    const rowOverrides = byRow.get(row.id);
    if (!rowOverrides) {
      return row;
    }
    const merged: Record<string, unknown> = { ...row };
    for (const [field, value] of rowOverrides) {
      merged[field] = value;
    }
    return merged as T;
  });
}

/** Overlays localized fields onto a single row. */
export function applyTranslationsToRow<T extends { id: string }>(
  row: T,
  overrides: TranslationOverride[],
): T {
  return applyTranslations([row], overrides)[0] ?? row;
}

/** Portable helper used by the query hooks to attach localized content. */
export async function localizeRows<T extends { id: string }>(
  tableName: string,
  rows: T[],
  locale: "ar" | "en",
): Promise<T[]> {
  const overrides = await fetchTranslations(tableName, locale);
  return applyTranslations(rows, overrides);
}

/** Portable helper for a single localized row. */
export async function localizeRow<T extends { id: string }>(
  tableName: string,
  row: T,
  locale: "ar" | "en",
): Promise<T> {
  const overrides = await fetchTranslations(tableName, locale);
  return applyTranslationsToRow(row, overrides);
}
