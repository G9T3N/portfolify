import { useEffect } from "react";
import { useLocation } from "react-router";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const UMAMI_SCRIPT_URL = import.meta.env.VITE_UMAMI_SCRIPT_URL as string | undefined;
const UMAMI_WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID as string | undefined;

const GA_ENABLED = Boolean(GA_ID);
const UMAMI_ENABLED = Boolean(UMAMI_SCRIPT_URL && UMAMI_WEBSITE_ID);

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Page views recorded before GA4 finished initializing, flushed once ready. */
const pendingPageViews: {
  page_title: string;
  page_location: string;
  page_path: string;
}[] = [];
let gaInitialized = false;

function sendPageView(): void {
  const args: Record<string, string> = {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  };
  if (!GA_ENABLED || !window.gtag) {
    pendingPageViews.push(args);
    return;
  }
  if (!gaInitialized) {
    pendingPageViews.push(args);
    return;
  }
  window.gtag("event", "page_view", { ...args, send_to: GA_ID });
}

/** Lazily injects the GA4 script after the page has loaded / is idle. */
function loadGtagScript(): void {
  if (!GA_ENABLED || document.querySelector("#ga4-script")) {
    return;
  }
  const inject = () => {
    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]): void {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;
    script.onload = () => {
      gtag("js", new Date());
      gtag("config", GA_ID, { send_page_view: false });
      gaInitialized = true;
      // Flush any page views that arrived before GA4 was ready (initial load / route changes).
      for (const pending of pendingPageViews.splice(0)) {
        window.gtag?.("event", "page_view", { ...pending, send_to: GA_ID });
      }
    };
    document.head.appendChild(script);
  };
  if (document.readyState === "complete") {
    inject();
  } else {
    window.addEventListener("load", inject, { once: true });
  }
}

/** Lazily injects the Umami tracking script after the page has loaded / is idle. */
function loadUmamiScript(): void {
  if (!UMAMI_ENABLED || document.querySelector("#umami-script")) {
    return;
  }
  const inject = () => {
    const script = document.createElement("script");
    script.id = "umami-script";
    script.defer = true;
    script.src = UMAMI_SCRIPT_URL as string;
    script.setAttribute("data-website-id", UMAMI_WEBSITE_ID as string);
    document.head.appendChild(script);
  };
  if (document.readyState === "complete") {
    inject();
  } else {
    window.addEventListener("load", inject, { once: true });
  }
}

/**
 * Mounted once in the root layout. Initializes GA4 + Umami after load and
 * fires a page_view for every route change (SPA navigation).
 */
export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    loadGtagScript();
    loadUmamiScript();
    // Initial page_view is recorded via the pending-buffer once GA4 initializes.
  }, []);

  useEffect(() => {
    sendPageView();
  }, [location.pathname]);

  return null;
}

/** Generic event tracking for custom interactions. No-op when GA4 is disabled. */
export function track(eventName: string, params: Record<string, unknown> = {}): void {
  if (!GA_ENABLED || !window.gtag || !gaInitialized) {
    return;
  }
  window.gtag("event", eventName, { ...params, send_to: GA_ID });
}
