// The bridge between the hero and the work (Charlie picked option A · Trail,
// 2026-09-29). Brief: docs/positioning-2026-09/bridge-motion-brief.md
//
// No card. A course line runs across the page under the hero, like a route
// laid on the chart of the bay above it: straight legs between four
// waypoints, one per area. On first view the route is plotted: the first
// waypoint fills, each leg draws to the next waypoint, the waypoint fills as
// the line arrives, and its label settles in. The last leg runs on past 04
// and fades out, because the route continues into the work below. On phones
// the same trail runs down the page. While a leg draws, a small orange mark
// rides its leading edge, like a vessel on the course, and becomes the
// waypoint's fill when it arrives; on the last leg it sails on and fades.
//
// Motion rules (madrona-motion): the markup renders the finished route, so a
// still frame, no-JS, and reduced motion all show it drawn. JS arms the
// sequence before first paint (useLayoutEffect) and holds it paused until the
// trail is on screen; then it plays once (~1.7s) and rests. Charlie's call:
// nothing shows while the hero animates. The held frame is empty (the space
// is reserved, so nothing shifts), and waypoints, numbers, and labels arrive
// with the route. Choreography (heroSequence.ts): the hero's week plays first
// and the route is plotted after it settles; if the visitor has already
// scrolled past the hero, it plots at once. Transform and opacity only (legs
// are scaleX / scaleY hairlines); no layout shift.
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { afterHero } from "./heroSequence";
import "./bridge-trail.css";

// The four areas, in canon order, matching the section anchors in AreasSection.
const areas = [
  { id: "ai-operations", name: "AI & Operations" },
  { id: "brand-website", name: "Brand & Website" },
  { id: "growth-retention", name: "Growth & Retention" },
  { id: "new-products", name: "New Products" },
];

const words: Record<string, string> = {
  "ai-operations": "Reports, finance agents, inbox triage",
  "brand-website": "Brands, storefronts, local guides",
  "growth-retention": "Follow-up, reviews, onboarding",
  "new-products": "Prototype to launched product",
};

export function Bridge() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Arm before paint so the finished route never flashes, hold until seen.
    el.classList.add("btr-play", "btr-hold");
    const play = () => el.classList.remove("btr-hold");
    let cancel = () => {};
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      io.disconnect();
      // Hand-off: if the hero's week is still in view, let it settle first.
      const hero = document.querySelector(".hw-panel");
      const heroInView = hero ? hero.getBoundingClientRect().bottom > 80 : false;
      if (heroInView) cancel = afterHero(play); else play();
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancel(); };
  }, []);

  return <nav ref={ref} className="btr v3-shell" aria-label="The four areas">
    <ol className="btr-route">
      {areas.map((a, i) => <li key={a.id} className={i === areas.length - 1 ? "btr-stop is-last" : "btr-stop"} style={{ "--i": i } as CSSProperties}>
        <i className="btr-leg" aria-hidden="true" />
        <i className="btr-mark" aria-hidden="true" />
        <a href={`#area-${a.id}`}>
          <span className="btr-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <span className="btr-dot" aria-hidden="true"><i /></span>
          <span className="btr-label">
            <strong>{a.name}</strong>
            <em>{words[a.id]}</em>
          </span>
        </a>
      </li>)}
    </ol>
  </nav>;
}
