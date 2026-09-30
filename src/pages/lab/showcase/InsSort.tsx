// TEMP showcase option I2 · Sorting sure from unsure (2026-09-29). Delete with
// src/pages/lab/showcase before ship; if picked, fold into InspectionShowcase.
// Brief: docs/positioning-2026-09/showcase-motion-brief.md
//
// A copy of the shipped before/after (InspectionShowcase) that sorts itself
// once. Each note line lifts off the crooked field sheet as a paper slip, in
// reading order. Sure lines square up and slide right into their empty report
// rows, where the finding settles in. Unsure lines stop in the middle and
// stack under "lines need the surveyor" (the count ticks 1, 2, 3 as each one
// lands). After a beat the stack moves on together and settles into the held
// rows. The field sheet comes back to full ink: the notes are kept, not lost.
//
// The markup and CSS describe the finished page. Motion is layered on with
// WAAPI (transform and opacity only), armed before first paint and played
// once the stage is in view. Reduced motion, no JS, and any still get the
// finished page. Anonymized, no client data, labeled illustrative.
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import "./ins-sort.css";

type Note = { text: ReactNode; to: { kind: "finding" | "held"; i: number } };

const notes: Note[] = [
  { text: <>hull: crazing stbd bow</>, to: { kind: "finding", i: 0 } },
  { text: <><s>stbd</s> port tank corr.</>, to: { kind: "finding", i: 1 } },
  { text: <>flares x</>, to: { kind: "held", i: 0 } },
  { text: <>bilge pump ok</>, to: { kind: "finding", i: 2 } },
  { text: <>ge? detector</>, to: { kind: "held", i: 1 } },
  { text: <>aft seacock stiff??</>, to: { kind: "held", i: 2 } },
];

const findings = [
  { n: "1", area: "Hull", text: "Gelcoat crazing at the starboard bow.", fig: "Fig. 1" },
  { n: "2", area: "Fuel system", text: "Corrosion on the port tank.", fig: "Fig. 2" },
  { n: "3", area: "Bilge", text: "Bilge pump working." },
];

// The three flagged lines, held open in the report until the surveyor confirms.
const held = ["Flares", "Detector", "Aft seacock"];

// Timing (ms from the start of the sort). Lines leave in reading order.
const T = {
  lift: 110,        // slip fades up and lifts off the sheet
  gap: 230,         // between one line leaving and the next
  first: 150,       // first line leaves
  toReport: 760,    // sure line: sheet to report row
  toMiddle: 620,    // unsure line: sheet to the middle stack
  hold: 2420,       // the stack moves on together at this time
  holdStagger: 90,
  toHeld: 640,      // middle stack to held rows
  settle: 420,      // row content settles in
  restore: 520,     // field sheet returns to full ink
};
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_MOVE = "cubic-bezier(0.65, 0, 0.35, 1)";
const SLIP_SCALE_MIDDLE = 0.8;

type Phase = "rest" | "armed" | "play" | "done";

export function InsSort() {
  const root = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<Phase>("rest");
  const [count, setCount] = useState(3);

  // Arm before first paint so the finished state never flashes first.
  useLayoutEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    if (!root.current?.animate) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("armed");
    setCount(0);
  }, []);

  useEffect(() => {
    if (phase !== "armed") return;
    const el = root.current?.querySelector<HTMLElement>(".inss-stage");
    if (!el) return;
    // Start when ~40% is in view; on a phone the stacked stage is tall, so
    // wait until most of it (notes and report) is on screen.
    const vh = window.innerHeight;
    const h = el.getBoundingClientRect().height || 1;
    const threshold = h > vh * 0.6 ? Math.min(0.85, (vh * 0.7) / h) : 0.4;
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { io.disconnect(); setPhase("play"); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [phase]);

  useEffect(() => {
    if (phase !== "play" || !root.current) return;
    return runSort(root.current, setCount, () => setPhase("done"));
  }, [phase]);

  const staged = phase === "armed" || phase === "play" ? phase : undefined;

  return <figure className="inss" ref={root} data-state={staged}>
    <div className="inss-stage">
      <div className="inss-side">
        <p className="inss-label">Before</p>
        <div className="v3-artifact inss-page inss-notes" role="img" aria-label="Rough handwritten field notes and three photos, with three unclear lines marked">
          <p className="inss-scrawl-head">haul-out, 34&prime; sloop</p>
          <ul>{notes.map((n, i) => <li key={i} className={n.to.kind === "held" ? "is-flag" : undefined}>
            <span>{n.text}</span>{n.to.kind === "held" && <i className="inss-mark" aria-hidden="true">?</i>}
          </li>)}</ul>
          <div className="inss-snaps" aria-hidden="true">
            <span className="inss-tile">IMG 12</span>
            <span className="inss-tile">IMG 13</span>
            <span className="inss-tile">IMG 17</span>
          </div>
        </div>
      </div>

      <div className="inss-bridge">
        <p><span className="sr-only">3 lines need the surveyor</span><b aria-hidden="true">{count}</b><span aria-hidden="true">lines need the surveyor</span></p>
        <i aria-hidden="true" />
      </div>

      <div className="inss-side">
        <p className="inss-label">After</p>
        <article className="v3-artifact inss-page inss-report" aria-label="The finished draft report page">
          <header className="inss-doc-head"><span>Condition survey</span><em>Draft</em></header>
          <h4>Findings</h4>
          <ol className="inss-found">{findings.map(f => <li key={f.n}>
            <span>{f.n}</span><div><strong>{f.area}</strong><p>{f.text}</p></div>
            {f.fig && <b className="inss-tile" aria-hidden="true">{f.fig}</b>}
          </li>)}</ol>
          <ol className="inss-held" start={4} aria-label="Three items held for the surveyor">
            {held.map((h, i) => <li key={h}><span>{i + 4}</span><b>{h} <em>held</em></b><i className="inss-mark" aria-hidden="true">?</i></li>)}
          </ol>
        </article>
      </div>

      {/* Paper slips travel here, above both pages. Filled imperatively. */}
      <div className="inss-fly" aria-hidden="true" />
    </div>
    <figcaption className="inss-caption">
      <strong>Illustrative, based on client work in progress</strong> for a marine surveyor. Nothing unsure goes in until they confirm it.
    </figcaption>
  </figure>;
}

// The whole sort, measured once from the live layout. Returns a cleanup that
// cancels every animation and timer (unmount, Replay).
function runSort(fig: HTMLElement, setCount: (n: number) => void, onDone: () => void) {
  const q = <E extends Element = HTMLElement>(s: string) => Array.from(fig.querySelectorAll<E & HTMLElement>(s));
  const stage = fig.querySelector<HTMLElement>(".inss-stage")!;
  const fly = fig.querySelector<HTMLElement>(".inss-fly")!;
  const bridge = fig.querySelector<HTMLElement>(".inss-bridge")!;
  const bridgeText = fig.querySelector<HTMLElement>(".inss-bridge p")!;
  const bridgeNum = fig.querySelector<HTMLElement>(".inss-bridge b")!;
  const arrow = fig.querySelector<HTMLElement>(".inss-bridge > i")!;
  const noteLines = q(".inss-notes li");
  const foundRows = q(".inss-found > li");
  const heldRows = q(".inss-held > li");

  const anims: Animation[] = [];
  const timers: number[] = [];
  const at = (ms: number, fn: () => void) => { timers.push(window.setTimeout(fn, ms)); };
  const animate = (el: Element, kf: Keyframe[], opts: KeyframeAnimationOptions) => {
    const a = el.animate(kf, { fill: "both", ...opts });
    anims.push(a);
    return a;
  };

  const S = stage.getBoundingClientRect();
  const rel = (r: DOMRect) => ({ x: r.left - S.left, y: r.top - S.top, w: r.width, h: r.height, cx: r.left - S.left + r.width / 2, cy: r.top - S.top + r.height / 2 });
  const B = rel(bridge.getBoundingClientRect());
  const stacked = B.w > 200; // phone: the bridge is a row between stacked pages
  const tilt = stacked ? -0.8 : -1.4;

  // The slips: each note line copied onto a scrap of paper, measured once.
  const slips = notes.map((_, i) => {
    const el = document.createElement("span");
    el.className = "v3-artifact inss-slip";
    el.appendChild(noteLines[i].querySelector("span")!.cloneNode(true));
    fly.appendChild(el);
    return { el, w: el.offsetWidth, h: el.offsetHeight };
  });

  // Where the middle stack sits: a left-aligned stack under the arrow on
  // desktop, to the right of the bridge row on a phone.
  const A = rel(arrow.getBoundingClientRect());
  const stackW = Math.max(...notes.map((n, i) => n.to.kind === "held" ? slips[i].w : 0)) * SLIP_SCALE_MIDDLE;
  const stackLeft = stacked ? B.x + B.w - stackW - 4 : B.cx - stackW / 2;
  const middle = (k: number, w: number, h: number) => {
    const sh = h * SLIP_SCALE_MIDDLE, gap = 5;
    const cx = stackLeft + (w * SLIP_SCALE_MIDDLE) / 2;
    if (stacked) return { cx, cy: B.cy + (k - 1) * (sh + gap) };
    return { cx, cy: A.y + A.h + 18 + sh / 2 + k * (sh + gap) };
  };
  const place = (cx: number, cy: number, w: number, h: number, extra = "") => `translate(${cx - w / 2}px, ${cy - h / 2}px)${extra}`;

  // Everything lands by the last held row; then the sheet comes back.
  const heldArrive = T.hold + (held.length - 1) * T.holdStagger + T.toHeld;
  const restoreAt = heldArrive + 180;
  let middleCount = 0;
  let firstMiddle = Infinity;

  notes.forEach((n, i) => {
    const li = noteLines[i];
    const Sr = rel(li.querySelector("span")!.getBoundingClientRect());
    const { el: slip, w, h } = slips[i];

    const leave = T.first + i * T.gap;
    const start = place(Sr.cx, Sr.cy, w, h, ` rotate(${tilt}deg)`);
    const lifted = place(Sr.cx, Sr.cy - 3, w, h, ` rotate(${tilt}deg) scale(1.04)`);

    if (n.to.kind === "finding") {
      const row = foundRows[n.to.i];
      const Tg = rel(row.querySelector("strong")!.getBoundingClientRect());
      const dest = place(Tg.x - 8 + w / 2, Tg.cy, w, h, " rotate(0deg) scale(1)");
      const total = T.lift + T.toReport;
      animate(slip, [
        { transform: start, easing: EASE_OUT },
        { transform: lifted, offset: T.lift / total, easing: EASE_MOVE },
        { transform: dest },
      ], { duration: total, delay: leave });
      const land = leave + total;
      animate(slip, [{ opacity: 0 }, { opacity: 1, offset: T.lift / total }, { opacity: 1, offset: (total - 150) / total }, { opacity: 0 }],
        { duration: total, delay: leave });
      Array.from(row.children).forEach((c, k) => animate(c, [
        { opacity: 0, transform: "translateY(5px)" }, { opacity: 1, transform: "translateY(0)" },
      ], { duration: T.settle, delay: land - 60 + k * 40, easing: EASE_OUT }));
      restoreLine(li, leave);
    } else {
      const k = n.to.i;
      const mid = middle(k, w, h);
      const toMid = place(mid.cx, mid.cy, w, h, ` rotate(0deg) scale(${SLIP_SCALE_MIDDLE})`);
      const row = heldRows[k];
      const Tg = rel(row.querySelector("b")!.getBoundingClientRect());
      const dest = place(Tg.x - 8 + w / 2, Tg.cy, w, h, " rotate(0deg) scale(1)");
      const reach = leave + T.lift + T.toMiddle;
      const go = T.hold + k * T.holdStagger;
      const land = go + T.toHeld;
      const total = land - leave;
      animate(slip, [
        { transform: start, easing: EASE_OUT },
        { transform: lifted, offset: T.lift / total, easing: EASE_MOVE },
        { transform: toMid, offset: (reach - leave) / total },
        { transform: toMid, offset: (go - leave) / total, easing: EASE_MOVE },
        { transform: dest },
      ], { duration: total, delay: leave });
      animate(slip, [{ opacity: 0 }, { opacity: 1, offset: T.lift / total }, { opacity: 1, offset: (total - 150) / total }, { opacity: 0 }],
        { duration: total, delay: leave });
      Array.from(row.children).forEach((c, j) => animate(c, [
        { opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" },
      ], { duration: T.settle, delay: land - 60 + j * 40, easing: EASE_OUT }));
      restoreLine(li, leave);

      // The count ticks as each slip reaches the middle.
      firstMiddle = Math.min(firstMiddle, reach);
      at(reach, () => {
        setCount(++middleCount);
        animate(bridgeNum, [{ opacity: 0.35, transform: "translateY(-5px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 260, easing: EASE_OUT });
      });
    }
  });

  // The bridge line arrives with the first unsure slip (count already 1).
  animate(bridgeText, [{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "translateY(0)" }],
    { duration: 400, delay: firstMiddle, easing: EASE_OUT });

  // The field sheet: each line dims as its slip lifts, and all come back
  // together once the sort is done.
  function restoreLine(li: HTMLElement, leave: number) {
    const end = restoreAt + T.restore;
    const total = end - leave;
    animate(li, [
      { opacity: 1, easing: EASE_OUT },
      { opacity: 0.28, offset: 160 / total },
      { opacity: 0.28, offset: (restoreAt - leave) / total, easing: EASE_OUT },
      { opacity: 1 },
    ], { duration: total, delay: leave });
  }

  at(restoreAt + T.restore + 60, () => { fly.replaceChildren(); onDone(); });

  return () => {
    timers.forEach(t => window.clearTimeout(t));
    anims.forEach(a => a.cancel());
    fly.replaceChildren();
  };
}
