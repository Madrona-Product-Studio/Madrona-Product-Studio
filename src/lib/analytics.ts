// Sitewide event tracking. GA4's gtag is loaded globally in index.html and
// Vercel Analytics is injected in main.tsx; both sinks are fired here so the
// funnel shows up wherever Charlie happens to be looking. Every call is
// guarded — blockers and dev environments make either sink a silent no-op.
//
// Event vocabulary (keep this list current):
//   cta_click         { label, to, source }   — any primary CTA: "Get in touch",
//                                               "Find your AI opportunities", the
//                                               tool hero buttons (trackCta)
//   outbound_click    { href, source }        — outbound proof links: Berry Good,
//                                               Helm, Lila, San Juan, GitHub
//                                               (trackOutbound)
//   book_click        { source }              — any "Schedule a 30-minute call" CTA;
//                                               source is the pathname. Anchors may
//                                               carry data-book-placement to tell
//                                               the drawer from the page body.
//   contact_submit    { topics, from }        — /connect form success; topics is
//                                               the comma-joined topic list, from
//                                               is the ?from= referrer (e.g.
//                                               "ai-opportunities") or "direct"
//   contact_error     { reason }              — /connect form failure
//                                               (validation | api_<status> | network)
//   tool_demo_run     { tool }                — a /tools scripted demo started
//   tool_demo_replay  { tool }                — a /tools scripted demo re-run
//   tool_try_run      { tool }                — a /tools "try it on your own text"
//                                               live run started
//   tool_try_result   { tool, status }        — that run finished
//                                               (ok | unavailable | error)
//   app_outbound_click{ app }                 — outbound link to a live app on /apps
//   email_click       { source }              — mailto link (footer | connect)
//   theme_switch      { theme }               — header sky switcher (day/dusk/night)
//   wts_start         {}                      — /ai-opportunities: first answer
//   wts_question      { index, id }           — a question answered
//   wts_complete      { read }                — the read is generated
//   wts_retake        {}                      — start over
//   wts_cta_click     { read, to }            — a CTA on the report clicked
//   wts_proof_click   { read, to }            — a proof link on the report clicked
//   wts_keep          { read }                — "keep this read" (print / save)
//   wts_copy_link     { read }                — share link copied
//   wts_email_read    { read }                — the read emailed to the visitor
//   wts_ai_assist     { read }                — AI assist used on the report
//   assessment_*                              — the retired /checkup funnel
//                                               (see assessment/analytics.ts)
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

// A primary call to action was clicked. `label` is the visible text, `to` the
// destination, `source` the page or surface it sat on (e.g. "nav",
// "home-hero", "footer", "tools/month-end-close").
export function trackCta(label: string, to: string, source: string) {
  track("cta_click", { label, to, source });
}

// An outbound proof link was clicked (Berry Good, Helm, a live app, GitHub).
export function trackOutbound(href: string, source: string) {
  track("outbound_click", { href, source });
}

// onClick helpers so a link can be wired in one attribute:
//   <Link to="/connect" onClick={ctaClick("Get in touch", "/connect", "footer")}>
export function ctaClick(label: string, to: string, source: string) {
  return () => trackCta(label, to, source);
}

export function outboundClick(href: string, source: string) {
  return () => trackOutbound(href, source);
}
