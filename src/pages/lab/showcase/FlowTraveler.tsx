// TEMP showcase option G1 · A customer travels the map (2026-09-29).
// Brief: docs/positioning-2026-09/showcase-motion-brief.md
//
// A copy of the Growth & Retention map (src/pages/v3/showcase/AutomationMap)
// with one idea added: the customer moves through it. A small ink token (the
// customer) rides the connectors from "Books a repair online" to "Books
// again". It passes behind each step, so it disappears into a node and
// emerges on the far side, and each node brightens (with a faint ring) the
// moment the customer reaches it. At the review fork the token pauses on the
// diamond while both answers light; it takes Happy, and Not happy fades back
// as the path not taken, then settles in with the rest once the customer
// books again. The finished map is the resting state.
//
// Motion rules (madrona-motion): the markup renders the finished map, so a
// still, no-JS, and reduced motion all show it complete. JS arms the
// sequence before first paint (useLayoutEffect: nodes and connectors dim,
// held paused) and plays it once when the map is ~40% in view (~3.9s), then
// rests. On a fine pointer, hovering the map after it has rested replays the
// journey once (token and rings only, no dimming); never again after that.
// Web Animations on transform and opacity only; no layout shift. The token's
// path is sampled from one timeline so every hop eases in and out on its own.
import { useLayoutEffect, useRef } from "react";
import { WindowBar } from "../../v3/ReadCard";
import "./flow-traveler.css";

type Pt = [number, number];
type Kind = "auto" | "you" | "customer";
type Node = {
  k: string; kind: Kind;
  x: number; y: number; w: number; h: number;
  lines: string[];
  caption?: { text: string; tone: "good" | "bad" };
  branch?: boolean; // the path not taken (Not happy)
};
type Edge = { k: string; pts: Pt[]; arrow?: boolean; branch?: boolean };
type Layout = {
  id: string; view: [number, number]; cls: string;
  phases: { x: number; y: number; t: string }[];
  nodes: Node[]; edges: Edge[];
  route: Pt[]; hold: Pt; diamond: Pt; join: Pt;
};

const LH = 16; // text line height inside a node
const CAP = 15; // caption row height
const WELL = { text: "HAPPY", tone: "good" as const };
const NOT = { text: "NOT HAPPY", tone: "bad" as const };

/* ---------------------------------------------------------------- layouts */

/* Desktop: 640-wide drawing, two rows (Book, Visit; then After, Later back). */
const wide: Layout = (() => {
  const r1 = 34, h1 = 54, c1 = r1 + h1 / 2;
  const Y2 = 214, hb = 62, dx = 480, jx = 306;
  const up = Y2 - 8 - hb / 2, dn = Y2 + 8 + hb / 2;
  return {
    id: "w", view: [640, 296], cls: "flt-wide",
    phases: [{ x: 28, y: 20, t: "Book" }, { x: 340, y: 20, t: "Visit" }, { x: 502, y: 134, t: "After" }, { x: 20, y: 134, t: "Later" }],
    nodes: [
      { k: "n0", kind: "customer", x: 28, y: r1, w: 124, h: h1, lines: ["Books a repair", "online"] },
      { k: "n1", kind: "auto", x: 184, y: r1, w: 124, h: h1, lines: ["Confirmation", "and reminders"] },
      { k: "n2", kind: "you", x: 340, y: r1, w: 124, h: h1, lines: ["You assign", "the tech"] },
      { k: "n3", kind: "you", x: 496, y: r1, w: 124, h: h1, lines: ["Tech checks the", "drafted report"] },
      { k: "n4", kind: "auto", x: 502, y: Y2 - 27, w: 112, h: 54, lines: ["Asks everyone", "for a review"] },
      { k: "n5", kind: "auto", x: 322, y: Y2 - 8 - hb, w: 128, h: hb, lines: ["A thank-you"], caption: WELL },
      { k: "n6", kind: "you", x: 322, y: Y2 + 8, w: 128, h: hb, lines: ["You call them"], caption: NOT, branch: true },
      { k: "n7", kind: "auto", x: 148, y: Y2 - 27, w: 140, h: 54, lines: ["Seasonal", "check-up reminders"] },
      { k: "n8", kind: "customer", x: 20, y: Y2 - 20, w: 104, h: 40, lines: ["Books again"] },
    ],
    edges: [
      { k: "e0", pts: [[152, c1], [184, c1]] },
      { k: "e1", pts: [[308, c1], [340, c1]] },
      { k: "e2", pts: [[464, c1], [496, c1]] },
      { k: "e3", pts: [[558, r1 + h1], [558, Y2 - 27]] },
      { k: "e4", pts: [[502, Y2], [dx + 6.5, Y2]], arrow: false },
      { k: "e5", pts: [[dx, Y2 - 6.5], [dx, up], [450, up]] },
      { k: "e6", pts: [[dx, Y2 + 6.5], [dx, dn], [450, dn]], branch: true },
      { k: "e7", pts: [[322, up], [jx, up], [jx, Y2]], arrow: false },
      { k: "e8", pts: [[322, dn], [jx, dn], [jx, Y2]], arrow: false, branch: true },
      { k: "e9", pts: [[jx, Y2], [288, Y2]] },
      { k: "e10", pts: [[148, Y2], [124, Y2]] },
    ],
    route: [[90, c1], [558, c1], [558, Y2], [dx, Y2], [dx, up], [jx, up], [jx, Y2], [72, Y2]],
    hold: [dx, Y2], diamond: [dx, Y2], join: [jx, Y2],
  };
})();

/* Phones: 340-wide drawing, top to bottom, phases in a left rail. */
const tall: Layout = (() => {
  const X = 84, W = 196, H = 48, cx = X + W / 2;
  const ys = [10, 74, 138, 202, 266];
  const fy = 346, fh = 62, fw = 126, gap = 10;
  const ax = cx - gap / 2 - fw, bx = cx + gap / 2, am = ax + fw / 2, bm = bx + fw / 2;
  const n7 = 454, end = 522, dy = 330, jy = fy + fh + 14;
  return {
    id: "t", view: [340, 570], cls: "flt-tall",
    phases: [{ x: 14, y: ys[0] + 28, t: "Book" }, { x: 14, y: ys[2] + 28, t: "Visit" }, { x: 14, y: ys[4] + 28, t: "After" }, { x: 14, y: n7 + 28, t: "Later" }],
    nodes: [
      { k: "n0", kind: "customer", x: X, y: ys[0], w: W, h: H, lines: ["Books a repair online"] },
      { k: "n1", kind: "auto", x: X, y: ys[1], w: W, h: H, lines: ["Confirmation and reminders"] },
      { k: "n2", kind: "you", x: X, y: ys[2], w: W, h: H, lines: ["You assign the tech"] },
      { k: "n3", kind: "you", x: X, y: ys[3], w: W, h: H, lines: ["Tech checks the", "drafted report"] },
      { k: "n4", kind: "auto", x: X, y: ys[4], w: W, h: H, lines: ["Asks everyone for a review"] },
      { k: "n5", kind: "auto", x: ax, y: fy, w: fw, h: fh, lines: ["A thank-you"], caption: WELL },
      { k: "n6", kind: "you", x: bx, y: fy, w: fw, h: fh, lines: ["You call them"], caption: NOT, branch: true },
      { k: "n7", kind: "auto", x: X, y: n7, w: W, h: H, lines: ["Seasonal check-up", "reminders"] },
      { k: "n8", kind: "customer", x: X + 30, y: end, w: W - 60, h: 38, lines: ["Books again"] },
    ],
    edges: [
      ...[0, 1, 2, 3].map(i => ({ k: `e${i}`, pts: [[cx, ys[i] + H], [cx, ys[i + 1]]] as Pt[] })),
      { k: "e4", pts: [[cx, ys[4] + H], [cx, dy - 6.5]], arrow: false },
      { k: "e5", pts: [[cx - 6.5, dy], [am, dy], [am, fy]] },
      { k: "e6", pts: [[cx + 6.5, dy], [bm, dy], [bm, fy]], branch: true },
      { k: "e7", pts: [[am, fy + fh], [am, jy], [cx, jy]], arrow: false },
      { k: "e8", pts: [[bm, fy + fh], [bm, jy], [cx, jy]], arrow: false, branch: true },
      { k: "e9", pts: [[cx, jy], [cx, n7]] },
      { k: "e10", pts: [[cx, n7 + H], [cx, end]] },
    ],
    route: [[cx, ys[0] + H / 2], [cx, dy], [am, dy], [am, jy], [cx, jy], [cx, end + 19]],
    hold: [cx, dy], diamond: [cx, dy], join: [cx, jy],
  };
})();

/* --------------------------------------------------------------- timeline */

// Timing (ms). Visible hops ease in and out; time inside a node is the step
// "happening" and is the same for every node, whatever its width.
const PRE = 140; // first node lights, then the token sets off
const START = 230; // token eases out of the first node
const DWELL = 200; // token inside a node
const HOLD = 360; // pause on the review fork while both answers light
const END = 280; // token settles into Books again
const hop = (len: number) => 150 + len * 1.6;
const RESOLVE = 420; // the path not taken settles in after the customer books again

function cubic(x1: number, y1: number, x2: number, y2: number) {
  const bez = (a: number, b: number, s: number) => 3 * a * s * (1 - s) ** 2 + 3 * b * s * s * (1 - s) + s ** 3;
  return (t: number) => {
    let lo = 0, hi = 1, s = t;
    for (let i = 0; i < 24; i++) { s = (lo + hi) / 2; if (bez(x1, x2, s) < t) lo = s; else hi = s; }
    return bez(y1, y2, s);
  };
}
const inOut = cubic(0.65, 0, 0.35, 1); // on-screen movement (skill: ease-in-out)
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)"; // skill: strong ease-out

type Piece = { from: number; to: number; t0: number; t1: number; kind: "start" | "hop" | "in" | "hold" | "end" };
type Plan = {
  frames: Keyframe[]; total: number; tokenEnd: number;
  lit: Record<string, number>; // node, edge, diamond, join: when the customer reaches it
  forkIn: number; forkOut: number;
};

function plan(L: Layout): Plan {
  const segs = L.route.slice(1).map((b, i) => ({ a: L.route[i], b }));
  const lens = segs.map(s => Math.hypot(s.b[0] - s.a[0], s.b[1] - s.a[1]));
  const cum = lens.reduce<number[]>((acc, l) => [...acc, acc[acc.length - 1] + l], [0]);
  const total = cum[cum.length - 1];
  const at = (d: number): Pt => {
    const i = Math.max(0, Math.min(segs.length - 1, cum.findIndex((c, j) => j > 0 && d <= c) - 1));
    const f = lens[i] ? (d - cum[i]) / lens[i] : 0;
    const { a, b } = segs[i];
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
  };
  const distOf = (p: Pt) => {
    for (let i = 0; i < segs.length; i++) {
      const { a, b } = segs[i];
      const onX = a[0] === b[0] && Math.abs(p[0] - a[0]) < 0.6 && p[1] >= Math.min(a[1], b[1]) - 0.6 && p[1] <= Math.max(a[1], b[1]) + 0.6;
      const onY = a[1] === b[1] && Math.abs(p[1] - a[1]) < 0.6 && p[0] >= Math.min(a[0], b[0]) - 0.6 && p[0] <= Math.max(a[0], b[0]) + 0.6;
      if (onX || onY) return cum[i] + Math.hypot(p[0] - a[0], p[1] - a[1]);
    }
    return -1;
  };
  const rects = L.nodes.filter(n => !n.branch);
  const inside = (p: Pt) => rects.find(r => p[0] > r.x && p[0] < r.x + r.w && p[1] > r.y && p[1] < r.y + r.h)?.k ?? null;

  // Break the route where it crosses a node's edge, then group into runs.
  const cuts = new Set<number>([0, total, distOf(L.hold)]);
  segs.forEach(({ a, b }, i) => rects.forEach(r => {
    for (const x of [r.x, r.x + r.w]) if (a[1] === b[1] && x > Math.min(a[0], b[0]) && x < Math.max(a[0], b[0]) && a[1] > r.y && a[1] < r.y + r.h) cuts.add(cum[i] + Math.abs(x - a[0]));
    for (const y of [r.y, r.y + r.h]) if (a[0] === b[0] && y > Math.min(a[1], b[1]) && y < Math.max(a[1], b[1]) && a[0] > r.x && a[0] < r.x + r.w) cuts.add(cum[i] + Math.abs(y - a[1]));
  }));
  const ds = [...cuts].sort((p, q) => p - q);
  const holdD = distOf(L.hold);
  const runs: { from: number; to: number; node: string | null }[] = [];
  for (let i = 0; i < ds.length - 1; i++) {
    const node = inside(at((ds[i] + ds[i + 1]) / 2));
    const last = runs[runs.length - 1];
    if (last && last.node === node && ds[i] !== holdD) last.to = ds[i + 1];
    else runs.push({ from: ds[i], to: ds[i + 1], node });
  }

  const pieces: Piece[] = [];
  const lit: Record<string, number> = { n0: PRE };
  let t = PRE, forkIn = 0, forkOut = 0;
  runs.forEach((r, i) => {
    if (r.from === holdD) { forkIn = t; pieces.push({ from: r.from, to: r.from, t0: t, t1: t + HOLD, kind: "hold" }); t += HOLD; forkOut = t; }
    const kind: Piece["kind"] = r.node ? (i === 0 ? "start" : i === runs.length - 1 ? "end" : "in") : "hop";
    const dur = kind === "start" ? START : kind === "end" ? END : kind === "in" ? DWELL : hop(r.to - r.from);
    if (r.node && kind !== "start") lit[r.node] = t;
    pieces.push({ from: r.from, to: r.to, t0: t, t1: t + dur, kind });
    t += dur;
  });
  const tokenEnd = t;
  lit.diamond = forkIn;

  // Where along the timeline does the token reach distance d?
  const timeAt = (d: number) => {
    const p = pieces.find(q => q.kind !== "hold" && d >= q.from - 0.01 && d <= q.to + 0.01);
    if (!p) return tokenEnd;
    if (p.to === p.from) return p.t0;
    const f = (d - p.from) / (p.to - p.from);
    return p.t0 + (p.t1 - p.t0) * f;
  };
  L.edges.forEach(e => { if (!e.branch) { const d = distOf(e.pts[0]); lit[e.k] = d === holdD ? forkOut : timeAt(d); } });
  // Edges that leave the fork diamond start on its tip, not on the route.
  lit.e5 = forkIn;
  lit.join = timeAt(distOf(L.join));

  // Sample the token (position and opacity) at 60fps into linear keyframes.
  const dur = tokenEnd + 40;
  const frames: Keyframe[] = [];
  for (let ms = 0; ms <= dur + 0.1; ms += 1000 / 60) {
    const now = Math.min(ms, dur);
    let d = 0, o = 0;
    const p = pieces.find(q => now >= q.t0 && now < q.t1) ?? (now < PRE ? null : pieces[pieces.length - 1]);
    if (p) {
      const f = Math.min(1, (now - p.t0) / (p.t1 - p.t0));
      if (p.kind === "hop") { d = p.from + (p.to - p.from) * inOut(f); o = 1; }
      else if (p.kind === "hold") { d = p.from; o = 1; }
      else if (p.kind === "start") { d = p.from + (p.to - p.from) * f; o = Math.max(0, (f - 0.55) / 0.45); }
      else if (p.kind === "end") { d = p.from + (p.to - p.from) * Math.min(1, f * 1.6); o = Math.max(0, 1 - f / 0.35); }
      else { d = p.from + (p.to - p.from) * f; o = f < 0.3 ? 1 - f / 0.3 : f > 0.7 ? (f - 0.7) / 0.3 : 0; }
    }
    const [x, y] = at(d);
    frames.push({ offset: Math.min(1, now / dur), transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`, opacity: +o.toFixed(3) });
  }
  return { frames, total: tokenEnd + RESOLVE, tokenEnd, lit, forkIn, forkOut };
}

const plans: Record<string, Plan> = { w: plan(wide), t: plan(tall) };

/* ---------------------------------------------------------------- drawing */

function Box({ n }: { n: Node }) {
  const rx = n.kind === "customer" ? n.h / 2 : 6;
  const inset = n.kind === "you" ? 0.75 : 0.5;
  const block = n.lines.length * LH + (n.caption ? CAP : 0);
  const top = n.y + (n.h - block) / 2;
  const cx = n.x + n.w / 2;
  return <g className={`flt-node is-${n.kind}`} data-k={n.k}>
    <rect className="flt-ring" data-ring={n.k} x={n.x - 3.5} y={n.y - 3.5} width={n.w + 7} height={n.h + 7} rx={rx + 3.5} />
    <rect className="flt-box" x={n.x + inset} y={n.y + inset} width={n.w - inset * 2} height={n.h - inset * 2} rx={rx} />
    {n.caption && <text className={`flt-cap is-${n.caption.tone}`} x={cx} y={top + 9} textAnchor="middle">{n.caption.text}</text>}
    <text x={cx} textAnchor="middle">
      {n.lines.map((l, i) => <tspan key={l} x={cx} y={top + (n.caption ? CAP : 0) + i * LH + 12}>{l}</tspan>)}
    </text>
  </g>;
}

// Rounded orthogonal path through points (corner radius r).
function elbow(pts: Pt[], r = 7) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1], [x, y] = pts[i], [nx, ny] = pts[i + 1];
    const a = Math.min(r, Math.hypot(x - px, y - py) / 2), b = Math.min(r, Math.hypot(nx - x, ny - y) / 2);
    const ux = Math.sign(x - px), uy = Math.sign(y - py), vx = Math.sign(nx - x), vy = Math.sign(ny - y);
    d += ` L${x - ux * a} ${y - uy * a} Q${x} ${y} ${x + vx * b} ${y + vy * b}`;
  }
  const last = pts[pts.length - 1];
  return d + ` L${last[0]} ${last[1]}`;
}

function Drawing({ L }: { L: Layout }) {
  const m = `flt-arrow-${L.id}`;
  const [dx, dy] = L.diamond;
  const [sx, sy] = L.route[0];
  return <svg className={`flt-svg ${L.cls}`} data-plan={L.id} viewBox={`0 0 ${L.view[0]} ${L.view[1]}`} aria-hidden="true" focusable="false">
    <defs>
      <marker id={m} viewBox="0 0 8 8" refX="7.2" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M1 1.2 L7 4 L1 6.8" className="flt-tip" />
      </marker>
    </defs>
    {L.phases.map(p => <text key={p.t} className="flt-phase" x={p.x} y={p.y}>{p.t}</text>)}
    {L.edges.map(e => <path key={e.k} data-k={e.k} className="flt-edge" d={elbow(e.pts)} markerEnd={e.arrow === false ? undefined : `url(#${m})`} />)}
    <path data-k="diamond" className="flt-diamond" d={`M${dx} ${dy - 6.5} L${dx + 6.5} ${dy} L${dx} ${dy + 6.5} L${dx - 6.5} ${dy} Z`} />
    <circle data-k="join" className="flt-join" cx={L.join[0]} cy={L.join[1]} r={2.5} />
    {/* The customer: rides the connectors, behind the nodes. Rests hidden. */}
    <g className="flt-token" data-token="" style={{ transform: `translate(${sx}px, ${sy}px)` }}>
      <circle className="flt-token-halo" r={10} />
      <circle className="flt-token-dot" r={5} />
    </g>
    {L.nodes.map(n => <Box key={n.k} n={n} />)}
  </svg>;
}

/* -------------------------------------------------------------- the motion */

const DIM = 0.34;

function animate(root: HTMLElement, mode: "first" | "replay") {
  const all: Animation[] = [];
  root.querySelectorAll<SVGSVGElement>("svg[data-plan]").forEach(svg => {
    const P = plans[svg.dataset.plan!];
    const token = svg.querySelector<SVGGElement>("[data-token]");
    if (token) all.push(token.animate(P.frames, { duration: P.tokenEnd + 40, easing: "linear", fill: "both" }));
    svg.querySelectorAll<SVGRectElement>("[data-ring]").forEach(r => {
      const at = P.lit[r.dataset.ring!];
      if (at === undefined) return;
      all.push(r.animate([{ opacity: 0 }, { opacity: 0.5, offset: 0.2 }, { opacity: 0 }], { duration: 760, delay: at, easing: "ease-out", fill: "both" }));
    });
    if (mode === "replay") return;
    svg.querySelectorAll<SVGElement>("[data-k]").forEach(el => {
      const k = el.dataset.k!;
      const at = P.lit[k];
      if (k === "n5") {
        // The Happy answer: lights with the fork beside Not happy, then
        // comes to full as the customer arrives.
        all.push(el.animate([
          { opacity: DIM, offset: 0 },
          { opacity: DIM, offset: P.forkIn / at, easing: EASE_OUT },
          { opacity: 0.78, offset: (P.forkIn + 200) / at },
          { opacity: 0.78, offset: 1 },
        ], { duration: at, easing: "linear", fill: "backwards" }));
        all.push(el.animate([{ opacity: 0.78 }, { opacity: 1 }], { duration: 300, delay: at, easing: EASE_OUT, fill: "forwards" }));
        return;
      }
      if (at !== undefined) {
        all.push(el.animate([{ opacity: DIM }, { opacity: 1 }], { duration: 300, delay: at, easing: EASE_OUT, fill: "both" }));
        return;
      }
      // The path not taken: lights with the fork, recedes as the customer
      // takes Happy, then settles in once they book again.
      // (Easing per keyframe; the effect itself runs linear so the offsets
      // land on the same clock as the token.)
      const T = P.total, o = (ms: number) => Math.min(1, ms / T);
      all.push(el.animate([
        { opacity: DIM, offset: 0 },
        { opacity: DIM, offset: o(P.forkIn), easing: EASE_OUT },
        { opacity: 0.78, offset: o(P.forkIn + 200) },
        { opacity: 0.78, offset: o(P.forkOut), easing: EASE_OUT },
        { opacity: DIM, offset: o(P.forkOut + 360) },
        { opacity: DIM, offset: o(P.tokenEnd - 60), easing: EASE_OUT },
        { opacity: 1, offset: 1 },
      ], { duration: T, easing: "linear", fill: "both" }));
    });
  });
  return all;
}

export function FlowTraveler() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Arm before paint so the finished map never flashes; hold until seen.
    let anims = animate(el, "first");
    anims.forEach(a => a.pause());
    let replays = 1, resting = false;
    const done = () => { resting = true; };
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      io.disconnect();
      anims.forEach(a => a.play());
      Promise.all(anims.map(a => a.finished)).then(done, () => {});
    }, { threshold: 0.4 });
    io.observe(el);

    // One replay on hover of the map, fine pointers only, after it rests.
    const map = el.querySelector(".flt-map");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onEnter = () => {
      if (!resting || replays < 1) return;
      replays--; resting = false;
      anims.forEach(a => a.cancel());
      anims = animate(el, "replay");
    };
    if (fine) map?.addEventListener("pointerenter", onEnter);
    return () => { io.disconnect(); map?.removeEventListener("pointerenter", onEnter); anims.forEach(a => a.cancel()); };
  }, []);

  return <article ref={ref} className="v3-artifact flt" aria-label="Illustrative example: one customer’s journey at a local plumbing company">
    <WindowBar path="plumbing-co / journey" note="Illustrative example" />
    <div className="flt-head">
      <div>
        <p className="flt-eyebrow">A local plumbing company</p>
        <p className="flt-title">One customer, from booking to repeat visit</p>
      </div>
      <ul className="flt-legend" aria-label="Legend">
        <li><i className="is-auto" aria-hidden="true" />Runs on its own</li>
        <li><i className="is-you" aria-hidden="true" />Your call</li>
        <li><i className="is-customer" aria-hidden="true" />The customer</li>
      </ul>
    </div>
    <figure className="flt-map">
      <Drawing L={wide} />
      <Drawing L={tall} />
      <figcaption className="sr-only">
        <ol>
          <li>Book: the customer books a repair online. Confirmation and reminders go out on their own.</li>
          <li>Visit: you assign the tech, and the tech checks the drafted job report.</li>
          <li>After: every customer is asked for a review. Happy customers get a thank-you on its own. If someone is not happy, you call them.</li>
          <li>Later: seasonal check-up reminders go out on their own, and the customer books again.</li>
        </ol>
      </figcaption>
    </figure>
    <footer className="flt-out">
      <span>Intended benefits</span>
      <ul><li>Bookings that show up</li><li>Reviews that get written</li><li>Customers who come back</li></ul>
    </footer>
  </article>;
}
