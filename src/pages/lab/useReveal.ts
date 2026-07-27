import { useEffect } from "react";

/**
 * Scroll-reveal for madrona-motion. Elements marked `data-reveal` fade + rise
 * (opacity + 8px) as they enter the viewport. Siblings that share a parent
 * auto-stagger (55ms each, capped) so groups cascade instead of popping at once.
 *
 * Honors prefers-reduced-motion and no-IntersectionObserver by revealing
 * everything immediately. CSS lives in madrona-v2.css (`[data-reveal]`).
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (els.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    // Stagger siblings by their order within a shared parent.
    const groups = new Map<Element, HTMLElement[]>();
    for (const el of els) {
      const parent = el.parentElement;
      if (!parent) continue;
      const list = groups.get(parent) ?? [];
      list.push(el);
      groups.set(parent, list);
    }
    for (const list of groups.values()) {
      if (list.length > 1) list.forEach((el, i) => { el.style.transitionDelay = `${Math.min(i, 6) * 55}ms`; });
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));

    // Safety net: never leave content hidden if something goes wrong.
    const fallback = window.setTimeout(() => els.forEach((el) => el.classList.add("is-revealed")), 1800);
    return () => { io.disconnect(); window.clearTimeout(fallback); };
  }, []);
}
