// Assessment funnel events. GA4's gtag is loaded globally in index.html and
// Vercel Analytics is injected in main.tsx; both are fired here so the funnel
// shows up wherever Charlie happens to be looking. Every call is guarded —
// blockers and dev environments make either sink a silent no-op.
import { track as vercelTrack } from "@vercel/analytics";

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAssessment(event: string, params?: EventParams) {
  try {
    window.gtag?.("event", event, params);
    vercelTrack(event, params);
  } catch {
    // Analytics must never break the assessment.
  }
}
