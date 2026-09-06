// The real, public destinations behind every proof link, wired in one place so
// no surface drifts to a stale or private URL.

// Berry Good Berry Farm, our demonstration business. The storefront is the one
// live Berry Good surface a visitor can actually use; everything on /tools is
// a scripted run on its made-up numbers. The Vercel host is the deployed
// storefront (no custom domain yet), so chrome labels must not claim
// berrygoodberryfarm.com.
export const BERRY_URL = "https://berry-good-sigma.vercel.app";
export const BERRY_HOST = "berry-good-sigma.vercel.app";

// Helm's public demo account (helm.day/demo: "Demo account. The mechanics are
// real."). This is the dogfood proof for the operations work. Never link the
// real HQ instance. Checked 2026-09-06: helm.day and helm.day/?demo=1 both
// return the marketing landing; /demo is the actual public demo route.
export const HELM_DEMO_URL = "https://helm.day/demo";
