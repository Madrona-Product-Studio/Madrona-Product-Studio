// TEMP showcase option G3 · Your calls light up (2026-09-29). Delete before ship.
// Brief: docs/positioning-2026-09/showcase-motion-brief.md
//
// A copy of the Growth & Retention map (src/pages/v3/showcase/AutomationMap.tsx)
// with one idea added: the point of the map is the human moments. On first
// view the map is already there; a quiet wave runs through the boxes that run
// on their own (they softly darken and fade back, in path order), while the
// three "your call" boxes wait, dimmed. Then those three light up one by one:
// the box comes to full ink, a hairline ring draws itself around it, and a
// tiny caption settles in underneath its label saying why a person does this.
//
// Motion rules (madrona-motion): the markup renders the finished map (rings
// drawn, captions shown), so a still, no-JS, and reduced motion all show the
// resting state. JS arms the sequence before first paint and holds it until
// 40% of the map is on screen; it plays once (~3.6s) and rests. Opacity,
// transform, and stroke-dashoffset only. No orange inside the window.
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { WindowBar } from "../../v3/ReadCard";
import "./flow-calls.css";

type Kind = "auto" | "you" | "customer";
type Node = {
  kind: Kind;
  x: number; y: number; w: number; h: number;
  lines: string[];
  caption?: { text: string; tone: "good" | "bad" };
  sub?: string;      // "your call" only: why a person does this
  order?: number;    // wave order (auto) or light-up order (you)
};

const LH = 16; // text line height inside a node
const CAP = 15; // caption row height
const SUB = 15; // sub-caption row height
const RING = 4.5; // ring offset outside a "your call" box

function Box({ n }: { n: Node }) {
  const rx = n.kind === "customer" ? n.h / 2 : 6;
  const inset = n.kind === "you" ? 0.75 : 0.5;
  const rows = n.lines.length;
  const block = rows * LH + (n.caption ? CAP : 0) + (n.sub ? SUB : 0);
  const top = n.y + (n.h - block) / 2;
  const cx = n.x + n.w / 2;
  const lineTop = top + (n.caption ? CAP : 0);
  const style = n.order !== undefined ? { "--k": n.order } as CSSProperties : undefined;
  const body = <>
    <rect x={n.x + inset} y={n.y + inset} width={n.w - inset * 2} height={n.h - inset * 2} rx={rx} />
    {n.kind === "auto" && <rect className="flc-wash" x={n.x} y={n.y} width={n.w} height={n.h} rx={rx} />}
    {n.caption && <text className={`flc-cap is-${n.caption.tone}`} x={cx} y={top + 9} textAnchor="middle">{n.caption.text}</text>}
    <text className="flc-label" x={cx} textAnchor="middle">
      {n.lines.map((l, i) => <tspan key={l} x={cx} y={lineTop + i * LH + 12}>{l}</tspan>)}
    </text>
  </>;
  if (n.kind !== "you") return <g className={`flc-node is-${n.kind}`} style={style}>{body}</g>;
  return <g className="flc-node is-you" style={style}>
    <rect className="flc-ring" pathLength={1} x={n.x - RING} y={n.y - RING} width={n.w + RING * 2} height={n.h + RING * 2} rx={rx + RING} />
    <g className="flc-body">{body}</g>
    {n.sub && <text className="flc-sub" x={cx} y={lineTop + rows * LH + 13} textAnchor="middle">{n.sub}</text>}
  </g>;
}

function Defs({ id }: { id: string }) {
  return <defs>
    <marker id={id} viewBox="0 0 8 8" refX="7.2" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M1 1.2 L7 4 L1 6.8" className="flc-tip" />
    </marker>
  </defs>;
}

// Rounded orthogonal path through points (corner radius r).
function elbow(pts: [number, number][], r = 7) {
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

function Line({ pts, marker, arrow = true }: { pts: [number, number][]; marker: string; arrow?: boolean }) {
  return <path className="flc-edge" d={elbow(pts)} markerEnd={arrow ? `url(#${marker})` : undefined} />;
}

function Diamond({ x, y }: { x: number; y: number }) {
  return <path className="flc-diamond" d={`M${x} ${y - 6.5} L${x + 6.5} ${y} L${x} ${y + 6.5} L${x - 6.5} ${y} Z`} />;
}

function Phase({ x, y, children }: { x: number; y: number; children: string }) {
  return <text className="flc-phase" x={x} y={y}>{children}</text>;
}

const WELL = { text: "HAPPY", tone: "good" as const };
const NOT = { text: "NOT HAPPY", tone: "bad" as const };
const WHY = ["You know who fits", "A person signs off", "A person, not a script"];

/* Desktop: 640-wide drawing, two rows read left to right. */
function Wide() {
  const m = "flc-arrow-w";
  const r1 = 34, h1 = 64, c1 = r1 + h1 / 2;
  const Y2 = 218, hb = 74;
  const nodes: Node[] = [
    { kind: "customer", x: 28, y: r1, w: 124, h: h1, lines: ["Books a repair", "online"] },
    { kind: "auto", x: 184, y: r1, w: 124, h: h1, lines: ["Confirmation", "and reminders"], order: 0 },
    { kind: "you", x: 340, y: r1, w: 124, h: h1, lines: ["You assign", "the tech"], sub: WHY[0], order: 0 },
    { kind: "you", x: 496, y: r1, w: 124, h: h1, lines: ["Tech checks the", "drafted report"], sub: WHY[1], order: 1 },
    { kind: "auto", x: 502, y: Y2 - 27, w: 112, h: 54, lines: ["Asks everyone", "for a review"], order: 1 },
    { kind: "auto", x: 322, y: Y2 - 8 - hb, w: 128, h: hb, lines: ["A thank-you"], caption: WELL, order: 2 },
    { kind: "you", x: 322, y: Y2 + 8, w: 128, h: hb, lines: ["You call them"], caption: NOT, sub: WHY[2], order: 2 },
    { kind: "auto", x: 148, y: Y2 - 27, w: 140, h: 54, lines: ["Seasonal", "check-up reminders"], order: 3 },
    { kind: "customer", x: 20, y: Y2 - 20, w: 104, h: 40, lines: ["Books again"] },
  ];
  const dx = 480, jx = 306;
  return <svg className="flc-svg flc-wide" viewBox="0 0 640 310" aria-hidden="true" focusable="false">
    <Defs id={m} />
    <Phase x={28} y={20}>Book</Phase>
    <Phase x={340} y={20}>Visit</Phase>
    <Phase x={502} y={134}>After</Phase>
    <Phase x={20} y={134}>Later</Phase>
    <Line marker={m} pts={[[152, c1], [184, c1]]} />
    <Line marker={m} pts={[[308, c1], [340 - RING, c1]]} />
    <Line marker={m} pts={[[464 + RING, c1], [496 - RING, c1]]} />
    {/* the turn: straight down from the end of row one into row two */}
    <Line marker={m} pts={[[558, r1 + h1 + RING], [558, Y2 - 27]]} />
    <Line marker={m} arrow={false} pts={[[502, Y2], [dx + 6.5, Y2]]} />
    <Line marker={m} pts={[[dx, Y2 - 6.5], [dx, Y2 - 8 - hb / 2], [450, Y2 - 8 - hb / 2]]} />
    <Line marker={m} pts={[[dx, Y2 + 6.5], [dx, Y2 + 8 + hb / 2], [450 + RING, Y2 + 8 + hb / 2]]} />
    <Line marker={m} arrow={false} pts={[[322, Y2 - 8 - hb / 2], [jx, Y2 - 8 - hb / 2], [jx, Y2]]} />
    <Line marker={m} arrow={false} pts={[[322 - RING, Y2 + 8 + hb / 2], [jx, Y2 + 8 + hb / 2], [jx, Y2]]} />
    <Line marker={m} pts={[[jx, Y2], [288, Y2]]} />
    <Line marker={m} pts={[[148, Y2], [124, Y2]]} />
    <Diamond x={dx} y={Y2} />
    <circle className="flc-join" cx={jx} cy={Y2} r={2.5} />
    {nodes.map(n => <Box key={n.lines.join()} n={n} />)}
  </svg>;
}

/* Phones: 340-wide drawing, top to bottom, phases in a left rail. */
function Tall() {
  const m = "flc-arrow-t";
  const X = 84, W = 196, cx = X + W / 2, GAP = 18;
  // Box heights down the spine; a "your call" box is taller (it carries the why).
  const hs = [48, 48, 62, 76, 48];
  // A ring sits outside a "your call" box, so the gap beside one grows by it.
  const you = [false, false, true, true, false];
  const ys: number[] = [];
  hs.reduce((y, h, i) => { ys.push(y); return y + h + GAP + (you[i] ? RING : 0) + (you[i + 1] ? RING : 0); }, 10);
  const last = ys[4] + hs[4];
  const dy = last + 16;
  const fy = dy + 16, fh = 76, fw = 126, gap = 10;
  const ax = cx - gap / 2 - fw, bx = cx + gap / 2;
  const my = fy + fh + RING + 12;
  const n7 = my + 18, h7 = 48, end = n7 + h7 + GAP;
  const nodes: Node[] = [
    { kind: "customer", x: X, y: ys[0], w: W, h: hs[0], lines: ["Books a repair online"] },
    { kind: "auto", x: X, y: ys[1], w: W, h: hs[1], lines: ["Confirmation and reminders"], order: 0 },
    { kind: "you", x: X, y: ys[2], w: W, h: hs[2], lines: ["You assign the tech"], sub: WHY[0], order: 0 },
    { kind: "you", x: X, y: ys[3], w: W, h: hs[3], lines: ["Tech checks the", "drafted report"], sub: WHY[1], order: 1 },
    { kind: "auto", x: X, y: ys[4], w: W, h: hs[4], lines: ["Asks everyone for a review"], order: 1 },
    { kind: "auto", x: ax, y: fy, w: fw, h: fh, lines: ["A thank-you"], caption: WELL, order: 2 },
    { kind: "you", x: bx, y: fy, w: fw, h: fh, lines: ["You call them"], caption: NOT, sub: WHY[2], order: 2 },
    { kind: "auto", x: X, y: n7, w: W, h: h7, lines: ["Seasonal check-up", "reminders"], order: 3 },
    { kind: "customer", x: X + 30, y: end, w: W - 60, h: 38, lines: ["Books again"] },
  ];
  const isYou = (i: number) => nodes[i].kind === "you";
  return <svg className="flc-svg flc-tall" viewBox={`0 0 340 ${end + 38 + 10}`} aria-hidden="true" focusable="false">
    <Defs id={m} />
    <Phase x={14} y={ys[0] + 28}>Book</Phase>
    <Phase x={14} y={ys[2] + hs[2] / 2 + 4}>Visit</Phase>
    <Phase x={14} y={ys[4] + 28}>After</Phase>
    <Phase x={14} y={n7 + 28}>Later</Phase>
    {[0, 1, 2, 3].map(i => <Line key={i} marker={m} pts={[[cx, ys[i] + hs[i] + (isYou(i) ? RING : 0)], [cx, ys[i + 1] - (isYou(i + 1) ? RING : 0)]]} />)}
    <Line marker={m} arrow={false} pts={[[cx, last], [cx, dy - 6.5]]} />
    <Line marker={m} pts={[[cx - 6.5, dy], [ax + fw / 2, dy], [ax + fw / 2, fy]]} />
    <Line marker={m} pts={[[cx + 6.5, dy], [bx + fw / 2, dy], [bx + fw / 2, fy - RING]]} />
    <Line marker={m} arrow={false} pts={[[ax + fw / 2, fy + fh], [ax + fw / 2, my], [cx, my]]} />
    <Line marker={m} arrow={false} pts={[[bx + fw / 2, fy + fh + RING], [bx + fw / 2, my], [cx, my]]} />
    <Line marker={m} pts={[[cx, my], [cx, n7]]} />
    <Line marker={m} pts={[[cx, n7 + h7], [cx, end]]} />
    <Diamond x={cx} y={dy} />
    <circle className="flc-join" cx={cx} cy={my} r={2.5} />
    {nodes.map(n => <Box key={n.lines.join()} n={n} />)}
  </svg>;
}

export function FlowCalls() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Arm before paint so the finished map never flashes, hold until seen.
    el.classList.add("flc-play", "flc-hold");
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      io.disconnect();
      el.classList.remove("flc-hold");
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); el.classList.remove("flc-play", "flc-hold"); };
  }, []);

  return <article ref={ref} className="v3-artifact flc" aria-label="Illustrative example: one customer’s journey at a local plumbing company">
    <WindowBar path="plumbing-co / journey" note="Illustrative example" />
    <div className="flc-head">
      <div>
        <p className="flc-eyebrow">A local plumbing company</p>
        <p className="flc-title">One customer, from booking to repeat visit</p>
      </div>
      <ul className="flc-legend" aria-label="Legend">
        <li><i className="is-auto" aria-hidden="true" />Runs on its own</li>
        <li><i className="is-you" aria-hidden="true" />Your call</li>
        <li><i className="is-customer" aria-hidden="true" />The customer</li>
      </ul>
    </div>
    <figure className="flc-map">
      <Wide />
      <Tall />
      <figcaption className="sr-only">
        <ol>
          <li>Book: the customer books a repair online. Confirmation and reminders go out on their own.</li>
          <li>Visit: you assign the tech, because you know who fits. The tech checks the drafted job report, so a person signs off.</li>
          <li>After: every customer is asked for a review. Happy customers get a thank-you on its own. If someone is not happy, you call them: a person, not a script.</li>
          <li>Later: seasonal check-up reminders go out on their own, and the customer books again.</li>
        </ol>
      </figcaption>
    </figure>
    <footer className="flc-out">
      <span>Intended benefits</span>
      <ul><li>Bookings that show up</li><li>Reviews that get written</li><li>Customers who come back</li></ul>
    </footer>
  </article>;
}
