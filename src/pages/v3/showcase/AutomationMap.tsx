// The Growth & Retention showcase (Charlie picked round-2 option F1, 2026-09-29).
// Brief: docs/positioning-2026-09/round2-brief.md
//
// The Growth & Retention story (one customer at an illustrative plumbing
// company, booking to repeat visit) drawn as a true node-and-connector map.
// Desktop is a serpentine: Book and Visit run left to right on top, then the
// line drops straight down and After and Later run back right to left, so no
// connector has to cross the whole map. The review fork is the one decision.
// Phones get their own vertical drawing (a scaled-down desktop map would put
// the words below legible size). Node style carries the meaning: a soft
// filled box runs on its own, an ink-outlined box is a person's call, and the
// customer's start and end are pills. Two-item legend, no per-node labels.
// No orange inside the window: it is the identity color, never a status.
import { WindowBar } from "../ReadCard";
import "./automation-map.css";

type Kind = "auto" | "you" | "customer";
type Node = {
  kind: Kind;
  x: number; y: number; w: number; h: number;
  lines: string[];
  caption?: { text: string; tone: "good" | "bad" };
};

const LH = 16; // text line height inside a node
const CAP = 15; // caption row height

function Box({ n }: { n: Node }) {
  const rx = n.kind === "customer" ? n.h / 2 : 6;
  const inset = n.kind === "you" ? 0.75 : 0.5;
  const rows = n.lines.length;
  const block = rows * LH + (n.caption ? CAP : 0);
  const top = n.y + (n.h - block) / 2;
  const cx = n.x + n.w / 2;
  return <g className={`fn-node is-${n.kind}`}>
    <rect x={n.x + inset} y={n.y + inset} width={n.w - inset * 2} height={n.h - inset * 2} rx={rx} />
    {n.caption && <text className={`fn-cap is-${n.caption.tone}`} x={cx} y={top + 9} textAnchor="middle">{n.caption.text}</text>}
    <text x={cx} textAnchor="middle">
      {n.lines.map((l, i) => <tspan key={l} x={cx} y={top + (n.caption ? CAP : 0) + i * LH + 12}>{l}</tspan>)}
    </text>
  </g>;
}

function Defs({ id }: { id: string }) {
  return <defs>
    <marker id={id} viewBox="0 0 8 8" refX="7.2" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M1 1.2 L7 4 L1 6.8" className="fn-tip" />
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
  return <path className="fn-edge" d={elbow(pts)} markerEnd={arrow ? `url(#${marker})` : undefined} />;
}

function Diamond({ x, y }: { x: number; y: number }) {
  return <path className="fn-diamond" d={`M${x} ${y - 6.5} L${x + 6.5} ${y} L${x} ${y + 6.5} L${x - 6.5} ${y} Z`} />;
}

function Phase({ x, y, children }: { x: number; y: number; children: string }) {
  return <text className="fn-phase" x={x} y={y}>{children}</text>;
}

const WELL = { text: "HAPPY", tone: "good" as const };
const NOT = { text: "NOT HAPPY", tone: "bad" as const };

/* Desktop: 640-wide drawing, two rows read left to right. */
function Wide() {
  const m = "fn-arrow-w";
  const r1 = 34, h1 = 54, c1 = r1 + h1 / 2;
  const Y2 = 214, hb = 62;
  const nodes: Node[] = [
    { kind: "customer", x: 28, y: r1, w: 124, h: h1, lines: ["Books a repair", "online"] },
    { kind: "auto", x: 184, y: r1, w: 124, h: h1, lines: ["Confirmation", "and reminders"] },
    { kind: "you", x: 340, y: r1, w: 124, h: h1, lines: ["You assign", "the tech"] },
    { kind: "you", x: 496, y: r1, w: 124, h: h1, lines: ["Tech checks the", "drafted report"] },
    { kind: "auto", x: 502, y: Y2 - 27, w: 112, h: 54, lines: ["Asks everyone", "for a review"] },
    { kind: "auto", x: 322, y: Y2 - 8 - hb, w: 128, h: hb, lines: ["A thank-you"], caption: WELL },
    { kind: "you", x: 322, y: Y2 + 8, w: 128, h: hb, lines: ["You call them"], caption: NOT },
    { kind: "auto", x: 148, y: Y2 - 27, w: 140, h: 54, lines: ["Seasonal", "check-up reminders"] },
    { kind: "customer", x: 20, y: Y2 - 20, w: 104, h: 40, lines: ["Books again"] },
  ];
  const dx = 480, jx = 306;
  return <svg className="fn-svg fn-wide" viewBox="0 0 640 296" aria-hidden="true" focusable="false">
    <Defs id={m} />
    <Phase x={28} y={20}>Book</Phase>
    <Phase x={340} y={20}>Visit</Phase>
    <Phase x={502} y={134}>After</Phase>
    <Phase x={20} y={134}>Later</Phase>
    <Line marker={m} pts={[[152, c1], [184, c1]]} />
    <Line marker={m} pts={[[308, c1], [340, c1]]} />
    <Line marker={m} pts={[[464, c1], [496, c1]]} />
    {/* the turn: straight down from the end of row one into row two */}
    <Line marker={m} pts={[[558, r1 + h1], [558, Y2 - 27]]} />
    <Line marker={m} arrow={false} pts={[[502, Y2], [dx + 6.5, Y2]]} />
    <Line marker={m} pts={[[dx, Y2 - 6.5], [dx, Y2 - 8 - hb / 2], [450, Y2 - 8 - hb / 2]]} />
    <Line marker={m} pts={[[dx, Y2 + 6.5], [dx, Y2 + 8 + hb / 2], [450, Y2 + 8 + hb / 2]]} />
    <Line marker={m} arrow={false} pts={[[322, Y2 - 8 - hb / 2], [jx, Y2 - 8 - hb / 2], [jx, Y2]]} />
    <Line marker={m} arrow={false} pts={[[322, Y2 + 8 + hb / 2], [jx, Y2 + 8 + hb / 2], [jx, Y2]]} />
    <Line marker={m} pts={[[jx, Y2], [288, Y2]]} />
    <Line marker={m} pts={[[148, Y2], [124, Y2]]} />
    <Diamond x={dx} y={Y2} />
    <circle className="fn-join" cx={jx} cy={Y2} r={2.5} />
    {nodes.map(n => <Box key={n.lines.join()} n={n} />)}
  </svg>;
}

/* Phones: 340-wide drawing, top to bottom, phases in a left rail. */
function Tall() {
  const m = "fn-arrow-t";
  const X = 84, W = 196, H = 48, cx = X + W / 2;
  const ys = [10, 74, 138, 202, 266];
  const fy = 346, fh = 62, fw = 126, gap = 10;
  const ax = cx - gap / 2 - fw, bx = cx + gap / 2;
  const n7 = 454, end = 522;
  const nodes: Node[] = [
    { kind: "customer", x: X, y: ys[0], w: W, h: H, lines: ["Books a repair online"] },
    { kind: "auto", x: X, y: ys[1], w: W, h: H, lines: ["Confirmation and reminders"] },
    { kind: "you", x: X, y: ys[2], w: W, h: H, lines: ["You assign the tech"] },
    { kind: "you", x: X, y: ys[3], w: W, h: H, lines: ["Tech checks the", "drafted report"] },
    { kind: "auto", x: X, y: ys[4], w: W, h: H, lines: ["Asks everyone for a review"] },
    { kind: "auto", x: ax, y: fy, w: fw, h: fh, lines: ["A thank-you"], caption: WELL },
    { kind: "you", x: bx, y: fy, w: fw, h: fh, lines: ["You call them"], caption: NOT },
    { kind: "auto", x: X, y: n7, w: W, h: H, lines: ["Seasonal check-up", "reminders"] },
    { kind: "customer", x: X + 30, y: end, w: W - 60, h: 38, lines: ["Books again"] },
  ];
  const dy = 330;
  return <svg className="fn-svg fn-tall" viewBox="0 0 340 570" aria-hidden="true" focusable="false">
    <Defs id={m} />
    <Phase x={14} y={ys[0] + 28}>Book</Phase>
    <Phase x={14} y={ys[2] + 28}>Visit</Phase>
    <Phase x={14} y={ys[4] + 28}>After</Phase>
    <Phase x={14} y={n7 + 28}>Later</Phase>
    {[0, 1, 2, 3].map(i => <Line key={i} marker={m} pts={[[cx, ys[i] + H], [cx, ys[i + 1]]]} />)}
    <Line marker={m} arrow={false} pts={[[cx, ys[4] + H], [cx, dy - 6.5]]} />
    <Line marker={m} pts={[[cx - 6.5, dy], [ax + fw / 2, dy], [ax + fw / 2, fy]]} />
    <Line marker={m} pts={[[cx + 6.5, dy], [bx + fw / 2, dy], [bx + fw / 2, fy]]} />
    <Line marker={m} arrow={false} pts={[[ax + fw / 2, fy + fh], [ax + fw / 2, fy + fh + 14], [cx, fy + fh + 14]]} />
    <Line marker={m} arrow={false} pts={[[bx + fw / 2, fy + fh], [bx + fw / 2, fy + fh + 14], [cx, fy + fh + 14]]} />
    <Line marker={m} pts={[[cx, fy + fh + 14], [cx, n7]]} />
    <Line marker={m} pts={[[cx, n7 + H], [cx, end]]} />
    <Diamond x={cx} y={dy} />
    <circle className="fn-join" cx={cx} cy={fy + fh + 14} r={2.5} />
    {nodes.map(n => <Box key={n.lines.join()} n={n} />)}
  </svg>;
}

export function AutomationMap() {
  return <article className="v3-artifact fn" aria-label="Illustrative example: one customer’s journey at a local plumbing company">
    <WindowBar path="plumbing-co / journey" note="Illustrative example" />
    <div className="fn-head">
      <div>
        <p className="fn-eyebrow">A local plumbing company</p>
        <p className="fn-title">One customer, from booking to repeat visit</p>
      </div>
      <ul className="fn-legend" aria-label="Legend">
        <li><i className="is-auto" aria-hidden="true" />Runs on its own</li>
        <li><i className="is-you" aria-hidden="true" />Your call</li>
        <li><i className="is-customer" aria-hidden="true" />The customer</li>
      </ul>
    </div>
    <figure className="fn-map">
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
    <footer className="fn-out">
      <span>Intended benefits</span>
      <ul><li>Bookings that show up</li><li>Reviews that get written</li><li>Customers who come back</li></ul>
    </footer>
  </article>;
}
