// The Growth & Retention showcase (Charlie picked motion option G2, 2026-09-29).
// Brief: docs/positioning-2026-09/showcase-motion-brief.md
//
// A copy of the Growth & Retention map (src/pages/v3/showcase/AutomationMap.tsx)
// that draws itself, the way the bridge trail above it is plotted: the
// customer's first pill settles, then each connector draws out of it
// (stroke-dashoffset on a normalised pathLength) and the next node settles as
// the line arrives, along the serpentine: Book, Visit, the turn down, After,
// the review fork, Later, Books again. At the fork the diamond lands, then both
// branches draw at once and both outcomes settle together (the fork splits
// cleanly), and the two branches rejoin at the dot before Later.
//
// Arrowheads are drawn as their own small paths (not SVG markers, which render
// with the whole line), so each tip lands only when its line arrives.
//
// Motion rules (madrona-motion): the markup renders the finished map, so a
// still frame, no-JS, and reduced motion all show it complete. JS arms the
// sequence before first paint (useLayoutEffect) and holds it paused until the
// map is ~40% in view, then it plays once (~3.8s) and rests. Opacity,
// transform, and stroke-dashoffset only; nothing shifts layout.
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { WindowBar } from "../ReadCard";
import "./automation-map.css";

type Kind = "auto" | "you" | "customer";
type Node = {
  kind: Kind;
  x: number; y: number; w: number; h: number;
  lines: string[];
  caption?: { text: string; tone: "good" | "bad" };
  at: number; // ms: when the node settles
};
type Pt = [number, number];

/* The plot, in ms from the start. A node settles as the line into it lands;
   the line out of it starts ~200ms later. One beat is ~420ms. */
const T = {
  n0: 0, e0: 200, n1: 420, e1: 620, n2: 840, e2: 1040, n3: 1260,
  turn: 1460, n4: 1760, toFork: 1960, fork: 2100, split: 2240, n56: 2500,
  join: 2700, dot: 2900, e5: 2960, n7: 3060, e6: 3260, n8: 3380,
};
const D = { edge: 260, turn: 320, short: 160, split: 300, join: 220 };

const at = (ms: number) => ({ "--d": `${ms}ms` } as CSSProperties);
const run = (ms: number, dur: number) => ({ "--d": `${ms}ms`, "--t": `${dur}ms` } as CSSProperties);

const LH = 16; // text line height inside a node
const CAP = 15; // caption row height

function Box({ n }: { n: Node }) {
  const rx = n.kind === "customer" ? n.h / 2 : 6;
  const inset = n.kind === "you" ? 0.75 : 0.5;
  const rows = n.lines.length;
  const block = rows * LH + (n.caption ? CAP : 0);
  const top = n.y + (n.h - block) / 2;
  const cx = n.x + n.w / 2;
  return <g className={`flp-node is-${n.kind}`} style={at(n.at)}>
    <rect x={n.x + inset} y={n.y + inset} width={n.w - inset * 2} height={n.h - inset * 2} rx={rx} />
    {n.caption && <text className={`flp-cap is-${n.caption.tone}`} x={cx} y={top + 9} textAnchor="middle">{n.caption.text}</text>}
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

/* The arrowhead the original drew as a marker, as its own path at the line's
   end, pointed along the last leg (the map only turns in right angles). */
function Tip({ pts, style }: { pts: Pt[]; style: CSSProperties }) {
  const [px, py] = pts[pts.length - 2], [x, y] = pts[pts.length - 1];
  const deg = x > px ? 0 : x < px ? 180 : y > py ? 90 : -90;
  return <g transform={`translate(${x} ${y}) rotate(${deg})`}>
    <path className="flp-tip" style={style} d="M-6.8 -3.1 L-0.2 0 L-6.8 3.1" />
  </g>;
}

/* A connector that draws from its first point to its last, starting at `d`
   and taking `t` ms; its tip lands as the line arrives. */
function Line({ pts, d, t = D.edge, arrow = true }: { pts: Pt[]; d: number; t?: number; arrow?: boolean }) {
  return <>
    <path className="flp-edge" d={elbow(pts)} pathLength={1} style={run(d, t)} />
    {arrow && <Tip pts={pts} style={at(d + t - 70)} />}
  </>;
}

function Diamond({ x, y, d }: { x: number; y: number; d: number }) {
  return <path className="flp-diamond" style={at(d)} d={`M${x} ${y - 6.5} L${x + 6.5} ${y} L${x} ${y + 6.5} L${x - 6.5} ${y} Z`} />;
}

function Phase({ x, y, d, children }: { x: number; y: number; d: number; children: string }) {
  return <text className="flp-phase" style={at(d)} x={x} y={y}>{children}</text>;
}

const WELL = { text: "HAPPY", tone: "good" as const };
const NOT = { text: "NOT HAPPY", tone: "bad" as const };

/* Desktop: 640-wide drawing, two rows read left to right. */
function Wide() {
  const r1 = 34, h1 = 54, c1 = r1 + h1 / 2;
  const Y2 = 214, hb = 62;
  const nodes: Node[] = [
    { kind: "customer", x: 28, y: r1, w: 124, h: h1, lines: ["Books a repair", "online"], at: T.n0 },
    { kind: "auto", x: 184, y: r1, w: 124, h: h1, lines: ["Confirmation", "and reminders"], at: T.n1 },
    { kind: "you", x: 340, y: r1, w: 124, h: h1, lines: ["You assign", "the tech"], at: T.n2 },
    { kind: "you", x: 496, y: r1, w: 124, h: h1, lines: ["Tech checks the", "drafted report"], at: T.n3 },
    { kind: "auto", x: 502, y: Y2 - 27, w: 112, h: 54, lines: ["Asks everyone", "for a review"], at: T.n4 },
    { kind: "auto", x: 322, y: Y2 - 8 - hb, w: 128, h: hb, lines: ["A thank-you"], caption: WELL, at: T.n56 },
    { kind: "you", x: 322, y: Y2 + 8, w: 128, h: hb, lines: ["You call them"], caption: NOT, at: T.n56 },
    { kind: "auto", x: 148, y: Y2 - 27, w: 140, h: 54, lines: ["Seasonal", "check-up reminders"], at: T.n7 },
    { kind: "customer", x: 20, y: Y2 - 20, w: 104, h: 40, lines: ["Books again"], at: T.n8 },
  ];
  const dx = 480, jx = 306;
  return <svg className="flp-svg flp-wide" viewBox="0 0 640 296" aria-hidden="true" focusable="false">
    <Phase x={28} y={20} d={T.n0}>Book</Phase>
    <Phase x={340} y={20} d={T.n2}>Visit</Phase>
    <Phase x={502} y={134} d={T.n4}>After</Phase>
    <Phase x={20} y={134} d={T.n7}>Later</Phase>
    <Line d={T.e0} pts={[[152, c1], [184, c1]]} />
    <Line d={T.e1} pts={[[308, c1], [340, c1]]} />
    <Line d={T.e2} pts={[[464, c1], [496, c1]]} />
    {/* the turn: straight down from the end of row one into row two */}
    <Line d={T.turn} t={D.turn} pts={[[558, r1 + h1], [558, Y2 - 27]]} />
    <Line d={T.toFork} t={D.short} arrow={false} pts={[[502, Y2], [dx + 6.5, Y2]]} />
    {/* the fork: both branches leave the diamond together */}
    <Line d={T.split} t={D.split} pts={[[dx, Y2 - 6.5], [dx, Y2 - 8 - hb / 2], [450, Y2 - 8 - hb / 2]]} />
    <Line d={T.split} t={D.split} pts={[[dx, Y2 + 6.5], [dx, Y2 + 8 + hb / 2], [450, Y2 + 8 + hb / 2]]} />
    <Line d={T.join} t={D.join} arrow={false} pts={[[322, Y2 - 8 - hb / 2], [jx, Y2 - 8 - hb / 2], [jx, Y2]]} />
    <Line d={T.join} t={D.join} arrow={false} pts={[[322, Y2 + 8 + hb / 2], [jx, Y2 + 8 + hb / 2], [jx, Y2]]} />
    <Line d={T.e5} t={D.short} pts={[[jx, Y2], [288, Y2]]} />
    <Line d={T.e6} t={D.short} pts={[[148, Y2], [124, Y2]]} />
    <Diamond x={dx} y={Y2} d={T.fork} />
    <circle className="flp-join" style={at(T.dot)} cx={jx} cy={Y2} r={2.5} />
    {nodes.map(n => <Box key={n.lines.join()} n={n} />)}
  </svg>;
}

/* Phones: 340-wide drawing, top to bottom, phases in a left rail. */
function Tall() {
  const X = 84, W = 196, H = 48, cx = X + W / 2;
  const ys = [10, 74, 138, 202, 266];
  const fy = 346, fh = 62, fw = 126, gap = 10;
  const ax = cx - gap / 2 - fw, bx = cx + gap / 2;
  const n7 = 454, end = 522;
  const rowAt = [T.n0, T.n1, T.n2, T.n3, T.n4];
  const edgeAt = [T.e0, T.e1, T.e2, T.turn];
  const nodes: Node[] = [
    { kind: "customer", x: X, y: ys[0], w: W, h: H, lines: ["Books a repair online"], at: rowAt[0] },
    { kind: "auto", x: X, y: ys[1], w: W, h: H, lines: ["Confirmation and reminders"], at: rowAt[1] },
    { kind: "you", x: X, y: ys[2], w: W, h: H, lines: ["You assign the tech"], at: rowAt[2] },
    { kind: "you", x: X, y: ys[3], w: W, h: H, lines: ["Tech checks the", "drafted report"], at: rowAt[3] },
    { kind: "auto", x: X, y: ys[4], w: W, h: H, lines: ["Asks everyone for a review"], at: rowAt[4] },
    { kind: "auto", x: ax, y: fy, w: fw, h: fh, lines: ["A thank-you"], caption: WELL, at: T.n56 },
    { kind: "you", x: bx, y: fy, w: fw, h: fh, lines: ["You call them"], caption: NOT, at: T.n56 },
    { kind: "auto", x: X, y: n7, w: W, h: H, lines: ["Seasonal check-up", "reminders"], at: T.n7 },
    { kind: "customer", x: X + 30, y: end, w: W - 60, h: 38, lines: ["Books again"], at: T.n8 },
  ];
  const dy = 330;
  return <svg className="flp-svg flp-tall" viewBox="0 0 340 570" aria-hidden="true" focusable="false">
    <Phase x={14} y={ys[0] + 28} d={T.n0}>Book</Phase>
    <Phase x={14} y={ys[2] + 28} d={T.n2}>Visit</Phase>
    <Phase x={14} y={ys[4] + 28} d={T.n4}>After</Phase>
    <Phase x={14} y={n7 + 28} d={T.n7}>Later</Phase>
    {[0, 1, 2, 3].map(i => <Line key={i} d={edgeAt[i]} t={D.short} pts={[[cx, ys[i] + H], [cx, ys[i + 1]]]} />)}
    <Line d={T.toFork} t={D.short} arrow={false} pts={[[cx, ys[4] + H], [cx, dy - 6.5]]} />
    <Line d={T.split} t={D.split} pts={[[cx - 6.5, dy], [ax + fw / 2, dy], [ax + fw / 2, fy]]} />
    <Line d={T.split} t={D.split} pts={[[cx + 6.5, dy], [bx + fw / 2, dy], [bx + fw / 2, fy]]} />
    <Line d={T.join} t={D.join} arrow={false} pts={[[ax + fw / 2, fy + fh], [ax + fw / 2, fy + fh + 14], [cx, fy + fh + 14]]} />
    <Line d={T.join} t={D.join} arrow={false} pts={[[bx + fw / 2, fy + fh], [bx + fw / 2, fy + fh + 14], [cx, fy + fh + 14]]} />
    <Line d={T.e5} t={D.short} pts={[[cx, fy + fh + 14], [cx, n7]]} />
    <Line d={T.e6} t={D.short} pts={[[cx, n7 + H], [cx, end]]} />
    <Diamond x={cx} y={dy} d={T.fork} />
    <circle className="flp-join" style={at(T.dot)} cx={cx} cy={fy + fh + 14} r={2.5} />
    {nodes.map(n => <Box key={n.lines.join()} n={n} />)}
  </svg>;
}

export function AutomationMap() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Arm before paint so the finished map never flashes, hold until seen.
    el.classList.add("flp-play", "flp-hold");
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      io.disconnect();
      el.classList.remove("flp-hold");
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <article ref={ref} className="v3-artifact flp" aria-label="Illustrative example: one customer’s journey at a local plumbing company">
    <WindowBar path="plumbing-co / journey" note="Illustrative example" />
    <div className="flp-head">
      <div>
        <p className="flp-eyebrow">A local plumbing company</p>
        <p className="flp-title">One customer, from booking to repeat visit</p>
      </div>
      <ul className="flp-legend" aria-label="Legend">
        <li><i className="is-auto" aria-hidden="true" />Runs on its own</li>
        <li><i className="is-you" aria-hidden="true" />Your call</li>
        <li><i className="is-customer" aria-hidden="true" />The customer</li>
      </ul>
    </div>
    <figure className="flp-map">
      <Wide />
      <Tall />
      <figcaption className="sr-only">
        <ol>
          <li>Book: the customer books a repair online. Confirmation and reminders go out on their own.</li>
          <li>Visit: you assign the tech, and the tech checks the drafted job report.</li>
          <li>After: every customer is asked for a review. Happy customers get a thank-you on its own. If someone is not happy, you call them.</li>
          <li>Later: seasonal check-up reminders go out on their own, and the customer books again.</li>
        </ol>
      </figcaption>
    </figure>
    <footer className="flp-out">
      <span>Intended benefits</span>
      <ul><li>Bookings that show up</li><li>Reviews that get written</li><li>Customers who come back</li></ul>
    </footer>
  </article>;
}
