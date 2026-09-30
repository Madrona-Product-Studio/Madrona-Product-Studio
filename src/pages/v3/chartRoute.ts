// The hand-off between the hero's route and the chart of the bay behind it
// (Charlie, 2026-09-30: the route should look like part of the map, not a
// layer over it). The route registers its element and announces when its plot
// starts; HeroChart reads the route's geometry and the plot clock every frame
// and shapes the chart around it: contours ring each waypoint as it is
// reached, and part to clear a channel along each leg, its leader, and its
// label as they arrive. Timings mirror the route's CSS.

export const ROUTE_T0 = 360;    // first waypoint reached
export const ROUTE_STEP = 460;  // one leg plus a dwell
export const ROUTE_LEG = 420;   // a leg's travel
export const ROUTE_TOTAL = ROUTE_T0 + 3 * ROUTE_STEP + 900;

type State = { el: HTMLElement | null; armed: boolean; start: number | null };
const state: State = { el: null, armed: false, start: null };

export function registerChartRoute(el: HTMLElement) {
  state.el = el; state.armed = false; state.start = null;
  return () => { if (state.el === el) { state.el = null; state.armed = false; state.start = null; } };
}
/** The plot is armed and waiting (held until on screen). */
export function armChartRoute() { state.armed = true; state.start = null; }
export function playChartRoute() { state.start = performance.now(); }

/** Ms since the plot started: -1 while held, Infinity when there is no plot (finished page). */
export function chartRouteClock(now = performance.now()) {
  if (!state.armed) return Infinity;
  if (state.start === null) return -1;
  return now - state.start;
}
export function chartRoutePlaying(now = performance.now()) {
  const t = chartRouteClock(now);
  return t >= -1 && t < ROUTE_TOTAL;
}

export type RouteGeo = {
  fixes: { x: number; y: number }[];
  labels: { x: number; y: number; w: number; h: number }[];
};

/** The route's fixes and label boxes, in CSS px relative to `origin`. */
export function measureChartRoute(origin: DOMRect): RouteGeo | null {
  const el = state.el;
  if (!el) return null;
  const fixes = Array.from(el.querySelectorAll<HTMLElement>("[data-chart-fix]")).map(d => {
    const r = d.getBoundingClientRect();
    return { x: r.left + r.width / 2 - origin.left, y: r.top + r.height / 2 - origin.top };
  });
  const labels = Array.from(el.querySelectorAll<HTMLElement>("[data-chart-label]")).map(d => {
    const r = d.getBoundingClientRect();
    return { x: r.left - origin.left, y: r.top - origin.top, w: r.width, h: r.height };
  });
  return fixes.length ? { fixes, labels } : null;
}
