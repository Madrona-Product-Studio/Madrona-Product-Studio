// The hero's right column: the four areas as a course on the chart of the
// bay (Charlie picked B3 · Drawn into the chart, 2026-09-30). It replaced the
// horizontal bridge strip under the hero; the week window it displaced moved
// down to area 01.
//
// The course tacks: waypoints alternate across a track and the legs run
// diagonally between them, the way a boat beats up the Sound. Each waypoint
// is a chart fix symbol, tied to its label by a dotted leader the way a chart
// annotates a feature, so the labels keep one clean edge and never sit on the
// course. The route is drawn into the chart rather than laid over it: it
// registers with chartRoute.ts, and HeroChart rings each waypoint with
// contours as it is reached and parts the contours along each leg, leader,
// and label as they arrive.
//
// Motion rules (madrona-motion): the markup renders the finished route, and
// the chart draws it finished unless a plot is armed, so a still frame, no-JS,
// and reduced motion all show it plotted. JS arms the sequence before first
// paint and holds it until the route is on screen, then it plays once (~2s)
// and rests: each leg draws in turn with a small orange mark riding it, then
// the leader and label arrive. Transform, opacity, and clip only.
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { armChartRoute, playChartRoute, registerChartRoute } from "./chartRoute";
import "./hero-route.css";

// The four areas, in canon order, matching the section anchors in AreasSection.
const AREAS = [
  { id: "ai-operations", name: "AI & Operations", words: "Reports, finance agents, inbox triage" },
  { id: "brand-website", name: "Brand & Website", words: "Brands, websites, messaging" },
  { id: "ecommerce-loyalty", name: "Ecommerce & Loyalty", words: "Online stores, memberships, repeat orders" },
  { id: "new-products", name: "New Products", words: "Prototype to launched product" },
];

// Waypoint positions across the track, as a fraction of its width. The last
// leg runs on toward the middle of the track and fades: the course continues
// into the work below.
const X = [0.04, 0.62, 0.14, 0.78];
const END_X = 0.45;

export function HeroRoute() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const unregister = registerChartRoute(el);
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return unregister;
    // Arm before paint so the finished route never flashes, hold until seen.
    el.classList.add("hrt-play", "hrt-hold");
    armChartRoute();
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      io.disconnect();
      el.classList.remove("hrt-hold");
      playChartRoute();
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); unregister(); };
  }, []);

  return <nav ref={ref} className="hrt" aria-label="The four areas">
    <ol>
      {AREAS.map((a, i) => {
        const last = i === AREAS.length - 1;
        const x0 = X[i];
        const x1 = last ? END_X : X[i + 1];
        return <li key={a.id} className={last ? "hrt-stop is-last" : "hrt-stop"} style={{ "--i": i, "--x": x0, "--dx": x1 - x0 } as CSSProperties}>
          <svg className="hrt-leg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line x1={x0 * 100} y1="0" x2={x1 * 100} y2="100" vectorEffect="non-scaling-stroke" />
          </svg>
          <i className="hrt-mark" aria-hidden="true"><i /></i>
          <a href={`#area-${a.id}`}>
            <span className="hrt-dot" aria-hidden="true" data-chart-fix=""><i /></span>
            <span className="hrt-lead" aria-hidden="true" />
            <span className="hrt-label" data-chart-label="">
              <span className="hrt-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <strong>{a.name}</strong>
              <em>{a.words}</em>
            </span>
          </a>
        </li>;
      })}
    </ol>
  </nav>;
}
