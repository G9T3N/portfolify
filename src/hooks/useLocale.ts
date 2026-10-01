import { useEffect, useCallback, useSyncExternalStore } from "react";
import { i18n } from "@lingui/core";

export type Locale = "en" | "ar";

const LOCALE_KEY = "locale";
const localeListeners = new Set<() => void>();

function subscribeToLocale(onChange: () => void): () => void {
  localeListeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    localeListeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem(LOCALE_KEY);
  if (saved === "en" || saved === "ar") {
    return saved;
  }
  return i18n.locale === "ar" ? "ar" : "en";
}

function getServerLocale(): Locale {
  return "en";
}

function writeLocale(next: Locale): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCALE_KEY, next);
  }
  for (const listener of localeListeners) {
    listener();
  }
}

/**
 * Custom hook to manage bilingual locale state (English / Arabic),
 * persisting to localStorage, updating Lingui i18n, and syncing document lang & direction.
 */
export function useLocale() {
  const locale = useSyncExternalStore(subscribeToLocale, readStoredLocale, getServerLocale);

  useEffect(() => {
    i18n.activate(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const toggleLanguage = useCallback(() => {
    writeLocale(locale === "en" ? "ar" : "en");
  }, [locale]);

  return {
    locale,
    isRtl: locale === "ar",
    toggleLanguage,
  };
}

export default useLocale;
