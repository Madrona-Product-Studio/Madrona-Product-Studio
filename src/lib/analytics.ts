// Sitewide event tracking. GA4's gtag is loaded globally in index.html and
// Vercel Analytics is injected in main.tsx; both sinks are fired here so the
// funnel shows up wherever Charlie happens to be looking. Every call is
// guarded — blockers and dev environments make either sink a silent no-op.
//
// Event vocabulary (keep this list current):
//   book_click        { source }        — any "Schedule a 30-min call" CTA
//   contact_submit    {}                — /connect form success
//   contact_error     { reason }        — /connect form failure
//   tool_demo_run     { tool }          — a /tools demo started
//   tool_demo_replay  { tool }          — a /tools demo re-run
//   app_outbound_click{ app }           — outbound link to a live app on /apps
//   email_click       { source }        — mailto link
//   now_click         { href }          — the "Now" announcement strip above the nav
//   assessment_*                        — the /checkup funnel (see assessment/analytics.ts)
import { track as vercelTrack } from "@vercel/analytics";

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params?: EventParams) {
  try {
    window.gtag?.("event", event, params);
    vercelTrack(event, params);
  } catch {
    // Analytics must never break the page.
  }
}
