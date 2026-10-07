import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { inject } from "@vercel/analytics";
import "./index.css";
import App from "./App";
import { initTheme } from "./lib/theme";

// Vercel Web Analytics (enabled in the dashboard 2026-08-01). For a Vite SPA
// the script must be injected from code; it no-ops outside Vercel deploys.
inject();

// Day/dusk/night on the Bellingham sky — set before first render so a night
// visitor never sees a light flash.
initTheme();

// Stale tab after a deploy (2026-10-07: Charlie tapped a homepage link on his
// phone and nothing happened). Each deploy renames the lazy page chunks, so a
// tab opened before it asks for a file that is now a 404 and navigation fails
// silently. Vite fires vite:preloadError then; reload once to pick up the
// current files (the URL already points at the page they tapped). The
// timestamp guard stops a reload loop if a chunk is genuinely missing.
window.addEventListener("vite:preloadError", (event) => {
  const KEY = "madrona:chunk-reload";
  let last = 0;
  try { last = Number(sessionStorage.getItem(KEY)) || 0; } catch { /* storage blocked */ }
  if (Date.now() - last < 10_000) return; // already retried just now; let the error surface
  try { sessionStorage.setItem(KEY, String(Date.now())); } catch { /* storage blocked */ }
  event.preventDefault();
  window.location.reload();
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
