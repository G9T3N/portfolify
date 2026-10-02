import { formatter } from "@lingui/format-po";
import { defineConfig } from "@lingui/cli";

export default defineConfig({
  /**
   * English is the source locale, and the locale `src/root.tsx` activates by
   * default. It goes first here so the two stay in sync.
   */
  sourceLocale: "en",
  locales: ["en", "ar"],

  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}/messages",
      include: ["<rootDir>/src"],
    },
  ],

  /**
   * `lineNumbers` is off on purpose. Catalog origins stay useful (the
   * `#: src/components/Navbar.tsx` comment tells you where a string lives) but
   * the `:160` suffix is not: it changes whenever anything above the string
   * moves, so a one-line edit above a `<Trans>` used to rewrite the .po and
   * churn the diff.
   */
  format: formatter({ lineNumbers: false }),

  /**
   * Compiled catalogs, imported directly by `src/root.tsx` and loaded into
   * `@lingui/core` at startup. Keep this in step with that import.
   */
  compileNamespace: "ts",
});
