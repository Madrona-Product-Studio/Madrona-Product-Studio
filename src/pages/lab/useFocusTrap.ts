import { useEffect, type RefObject } from "react";

// Focus management for the site's two modal surfaces (the nav drawer and the
// agent document viewer). While `active`: moves focus into the container
// (to `initial`, else the first focusable), keeps Tab / Shift+Tab cycling
// inside it, and hands focus back to `returnTo` (else whatever had it) when
// the surface closes. Escape and scroll-locking stay with the callers; this
// only owns where the keyboard is. The drawer animates opacity/visibility
// on an always-mounted element, so the initial focus waits a frame for
// visibility to flip before it lands.
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
  container: RefObject<HTMLElement | null>,
  active: boolean,
  opts: { initial?: string; returnTo?: RefObject<HTMLElement | null> } = {},
) {
  const { initial, returnTo } = opts;
  useEffect(() => {
    if (!active) return;
    const root = container.current;
    if (!root) return;
    const previous = (returnTo?.current ?? document.activeElement) as HTMLElement | null;

    const focusables = () => [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(el => el.offsetParent !== null || getComputedStyle(el).position === "fixed");
    // A visibility transition reports its hidden start value on the first
    // frame, and focus() is refused while hidden; try across two frames,
    // then once more after the transition has run.
    const land = () => {
      const target = (initial ? root.querySelector<HTMLElement>(initial) : null) ?? focusables()[0] ?? root;
      target.focus({ preventScroll: true });
      return document.activeElement === target;
    };
    let raf2 = 0, timer = 0;
    const raf = requestAnimationFrame(() => { if (!land()) raf2 = requestAnimationFrame(() => { if (!land()) timer = window.setTimeout(land, 260); }); });

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = focusables();
      if (!list.length) { e.preventDefault(); return; }
      const first = list[0], last = list[list.length - 1];
      const current = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (current === first || !root.contains(current))) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (current === last || !root.contains(current))) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey, true);
    return () => {
      cancelAnimationFrame(raf); cancelAnimationFrame(raf2); clearTimeout(timer);
      document.removeEventListener("keydown", onKey, true);
      previous?.focus?.({ preventScroll: true });
    };
  }, [active, container, initial, returnTo]);
}
