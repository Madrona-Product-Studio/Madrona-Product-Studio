import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

// Force an instant jump to the top on navigation (bypassing the global
// scroll-behavior: smooth so a new page doesn't slowly glide up from the
// previous scroll position). If the URL carries a #hash, smooth-scroll to it.
function jumpTop() {
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  html.style.scrollBehavior = prev;
}

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Wait a frame for the destination page to render the target element.
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else jumpTop();
      });
      return;
    }
    jumpTop();
  }, [pathname, hash]);
  return null;
}

// Replays a short "settle" animation on every path change so pages arrive
// continuously instead of snapping. Keyed by pathname (hash changes don't
// re-fire). CSS lives in index.css (.route-fade); honors reduced-motion.
export function PageFade({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  // Skip the settle on the initial mount (createRoot over prerendered HTML)
  // so first paint doesn't flicker; only animate on client navigations.
  const first = useRef(true);
  useEffect(() => { first.current = false; }, []);
  return (
    <div key={pathname} className={first.current ? undefined : "route-fade"}>
      {children}
    </div>
  );
}
