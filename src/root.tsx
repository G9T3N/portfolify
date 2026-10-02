import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
const Toaster = lazy(() => import("@/components/ui/sonner").then((m) => ({ default: m.Toaster })));
import "./index.css";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { messages as messagesEn } from "./locales/en/messages";
import { messages as messagesAr } from "./locales/ar/messages";
import { Analytics } from "@/lib/analytics";

import { useLocale } from "@/hooks/useLocale";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

// Initialize Lingui
i18n.load("en", messagesEn);
i18n.load("ar", messagesAr);
const initialLocale =
  typeof window !== "undefined" && localStorage.getItem("locale") === "ar" ? "ar" : "en";
i18n.activate(initialLocale);

export default function App() {
  const { locale } = useLocale();

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      storageKey="theme"
    >
      {/* reducedMotion="user" makes every framer-motion animation below honour
          the OS "reduce motion" setting (WCAG 2.3.3). CSS-driven animation is
          handled by the prefers-reduced-motion block in index.css. */}
      <MotionConfig reducedMotion="user">
        <I18nProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <div key={locale} dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen">
              <Outlet />
            </div>
          </QueryClientProvider>
        </I18nProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}

export function HydrateFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg-primary)] gap-4">
      <svg
        className="w-10 h-10 animate-spin text-[var(--color-mp-primary,#10b981)]"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#121212" />
        <link
          rel="preload"
          as="image"
          href="/favicon.svg"
          type="image/svg+xml"
          fetchPriority="high"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Analytics />
        <Suspense fallback={null}>
          <Toaster />
        </Suspense>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let details;
  if (error instanceof Error) {
    details = error.message;
  } else {
    details = "Unknown error";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 text-center">
      <div className="glass-card p-8 max-w-md w-full">
        <h1 className="text-2xl font-mono font-bold text-destructive mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-sm text-muted-foreground mb-4">
          An unexpected error occurred. Please try refreshing the page.
        </p>
        {details && (
          <div className="bg-muted/50 p-4 rounded-lg overflow-x-auto text-left">
            <pre className="text-xs font-mono text-muted-foreground">{details}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
