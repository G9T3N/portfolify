import { useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { THEME_COLORS } from "@/utils/constants/navigation";

/**
 * Custom hook to synchronize theme state with document theme-color meta tag
 * and provide a stable toggle handler.
 */
export function useThemeSync() {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    if (typeof document === "undefined") return;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && resolvedTheme) {
      meta.setAttribute(
        "content",
        THEME_COLORS[resolvedTheme as keyof typeof THEME_COLORS] ?? THEME_COLORS.dark,
      );
    }
  }, [resolvedTheme]);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return {
    resolvedTheme,
    isDark: resolvedTheme === "dark",
    toggleTheme,
  };
}

export default useThemeSync;
