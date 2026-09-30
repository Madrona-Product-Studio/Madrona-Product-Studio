// The AI & Operations showcase (Charlie picked motion option I1, 2026-09-29).
// Brief: docs/positioning-2026-09/showcase-motion-brief.md
//
// A copy of the shipped before/after (InspectionShowcase) that reads itself
// once. A soft highlighter band travels down the field notes a line at a
// time. Each sure line it reads writes its finding into the report (fade and
// settle, the photo drops into its Fig. slot). Each unsure line takes a beat
// longer: its ? mark appears, the bridge count ticks up (0 to 3, an odometer),
// and the line lands in the report as a held row. Then the band lifts off and
// the page rests, finished.
//
// The markup and CSS describe the finished page. Motion is layered on with
// WAAPI (transform and opacity only), armed just before the figure scrolls in
// and played once it is ~40% in view. Reduced motion, no JS, and any still
// get the finished page. Anonymized, no client data, labeled illustrative.
import { useEffect, useRef, type ReactNode } from "react";
import "./inspection.css";

type Note = { text: ReactNode; flag?: boolean; finding?: number; held?: number };

// Each note line points at the report row it becomes.
const notes: Note[] = [
  { text: <>hull: crazing stbd bow</>, finding: 0 },
  { text: <><s>stbd</s> port tank corr.</>, finding: 1 },
  { text: <>flares x</>, flag: true, held: 0 },
  { text: <>bilge pump ok</>, finding: 2 },
  { text: <>ge? detector</>, flag: true, held: 1 },
  { text: <>aft seacock stiff??</>, flag: true, held: 2 },
];

const findings = [
  { n: "1", area: "Hull", text: "Gelcoat crazing at the starboard bow.", fig: "Fig. 1" },
  { n: "2", area: "Fuel system", text: "Corrosion on the port tank.", fig: "Fig. 2" },
  { n: "3", area: "Bilge", text: "Bilge pump working." },
];

// The three flagged lines, held open in the report until the surveyor confirms.
const held = ["Flares", "Detector", "Aft seacock"];

// ---- Timeline (ms) ----
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";     // entering: strong ease-out
const EASE_MOVE = "cubic-bezier(0.65, 0, 0.35, 1)";    // the band travelling line to line
const START = 320;      // band has faded onto line 1
const STEP = 500;       // time on a sure line (dwell + travel)
const PAUSE = 140;      // the extra beat an unsure line gets
const TRAVEL = 240;     // band travel between lines
const WRITE = 460;      // a report row settling in

// When the band arrives on each line.
const arrive: number[] = [];
notes.reduce((t, n, i) => { arrive[i] = t; return t + STEP + (n.flag ? PAUSE : 0); }, START);
const last = notes.length - 1;
const BAND_OUT = arrive[last] + STEP + PAUSE - 60;   // band starts to lift off
const BAND_END = BAND_OUT + 300;

function onScreenReady(root: HTMLElement, arm: () => void, play: () => void) {
  // Arm a little before the figure arrives (so nobody sees the finished page
  // rewind), play once it is ~40% in view (or fills half the screen, for
  // narrow viewports where the stacked figure is tall).
  const playIO = new IntersectionObserver(([e]) => {
    if (e.intersectionRatio >= 0.4 || e.intersectionRect.height >= window.innerHeight * 0.5) {
      playIO.disconnect();
      play();
    }
  }, { threshold: Array.from({ length: 21 }, (_, i) => i / 20) });
  const armIO = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    armIO.disconnect();
    arm();
    playIO.observe(root);
  }, { rootMargin: "0px 0px 60% 0px" });
  armIO.observe(root);
  return () => { armIO.disconnect(); playIO.disconnect(); };
}

export function InspectionShowcase() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || typeof root.animate !== "function" || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const q = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
    const band = root.querySelector<HTMLElement>(".insr-band");
    const odo = root.querySelector<HTMLElement>(".insr-odo");
    const lines = q<HTMLElement>(".insr-lines li");
    const noteMarks = q<HTMLElement>(".insr-lines li .insr-mark");
    const findRows = q<HTMLElement>(".insr-findings > li");
    const heldRows = q<HTMLElement>(".insr-held > li");
    if (!band || !odo || lines.length !== notes.length) return;

    let anims: Animation[] = [];
    const add = (el: Element, frames: Keyframe[], delay: number, duration: number, easing = EASE_OUT) => {
      const a = el.animate(frames, { delay, duration, easing, fill: "both" });
      a.pause();
      anims.push(a);
    };
    const settle: Keyframe[] = [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "none" }];
    const pop: Keyframe[] = [{ opacity: 0, transform: "scale(0.9)" }, { opacity: 1, transform: "none" }];

    const arm = () => {
      // The band: fade onto line 1, travel line to line, lift off after the last.
      band.style.height = `${lines[0].offsetHeight}px`;
      const y = (i: number) => `translateY(${lines[i].offsetTop}px)`;
      const k: Keyframe[] = [{ offset: 0, opacity: 0, transform: y(0) }];
      const at = (t: number) => t / BAND_END;
      k.push({ offset: at(START - 220), opacity: 0, transform: y(0), easing: EASE_OUT });
      k.push({ offset: at(START), opacity: 1, transform: y(0) });
      for (let i = 0; i < last; i++) {
        k.push({ offset: at(arrive[i + 1] - TRAVEL), opacity: 1, transform: y(i), easing: EASE_MOVE });
        k.push({ offset: at(arrive[i + 1]), opacity: 1, transform: y(i + 1) });
      }
      k.push({ offset: at(BAND_OUT), opacity: 1, transform: y(last), easing: EASE_OUT });
      k.push({ offset: 1, opacity: 0, transform: y(last) });
      add(band, k, 0, BAND_END, "linear");

      // What each line becomes, landing just after the band reaches it.
      let flagIdx = 0;
      const ticks: number[] = [];
      notes.forEach((n, i) => {
        const t = arrive[i];
        if (n.finding !== undefined) {
          const row = findRows[n.finding];
          if (!row) return;
          add(row, settle, t + 120, WRITE);
          const tile = row.querySelector(".insr-tile");
          if (tile) add(tile, pop, t + 260, 360);
        } else if (n.held !== undefined) {
          const mark = noteMarks[flagIdx];
          if (mark) add(mark, pop, t + 90, 260);
          ticks.push(t + 170);
          const row = heldRows[n.held];
          if (row) {
            add(row, settle, t + 240, WRITE);
            const m = row.querySelector(".insr-mark");
            if (m) add(m, pop, t + 380, 260);
          }
          flagIdx++;
        }
      });

      // The bridge count (final pass, 2026-09-29): it never claims "0 lines
      // need the surveyor". The line stays hidden until the first flag is
      // found, arrives at 1, then rolls to 2 and 3 as the next flags land.
      const bridgeLine = root.querySelector<HTMLElement>(".insr-bridge p");
      if (bridgeLine) add(bridgeLine, [{ opacity: 0 }, { opacity: 1 }], ticks[0], 360);
      const ODO_END = ticks[ticks.length - 1] + 420;
      const ok: Keyframe[] = [{ offset: 0, transform: "translateY(-25%)" }];
      ticks.slice(1).forEach((t, j) => {
        ok.push({ offset: t / ODO_END, transform: `translateY(${-25 * (j + 1)}%)`, easing: EASE_OUT });
        ok.push({ offset: Math.min(1, (t + 420) / ODO_END), transform: `translateY(${-25 * (j + 2)}%)` });
      });
      add(odo, ok, 0, ODO_END, "linear");
    };

    const play = () => {
      anims.forEach(a => a.play());
      // Hand back to the CSS resting state (identical to the final frames).
      Promise.all(anims.map(a => a.finished)).then(() => { anims.forEach(a => a.cancel()); anims = []; }, () => {});
    };

    const stop = onScreenReady(root, arm, play);
    return () => { stop(); anims.forEach(a => a.cancel()); anims = []; };
  }, []);

  return <figure className="insr" ref={ref}>
    <div className="insr-stage">
      <div className="insr-side">
        <p className="insr-label">Before</p>
        <div className="v3-artifact insr-page insr-notes" role="img" aria-label="Rough handwritten field notes and three photos, with three unclear lines marked">
          <p className="insr-scrawl-head">haul-out, 34&prime; sloop</p>
          <div className="insr-lines">
            <i className="insr-band" aria-hidden="true" />
            <ul>{notes.map((n, i) => <li key={i} className={n.flag ? "is-flag" : undefined}>
              <span>{n.text}</span>{n.flag && <i className="insr-mark" aria-hidden="true">?</i>}
            </li>)}</ul>
          </div>
          <div className="insr-snaps" aria-hidden="true">
            <span className="insr-tile">IMG 12</span>
            <span className="insr-tile">IMG 13</span>
            <span className="insr-tile">IMG 17</span>
          </div>
        </div>
      </div>

      <div className="insr-bridge">
        <p>
          <b className="insr-count"><span className="insr-sr">3</span><span className="insr-odo" aria-hidden="true"><span>0</span><span>1</span><span>2</span><span>3</span></span></b>
          <span>lines need the surveyor</span>
        </p>
        <i aria-hidden="true" />
      </div>

      <div className="insr-side">
        <p className="insr-label">After</p>
        <article className="v3-artifact insr-page insr-report" aria-label="The finished draft report page">
          <header className="insr-doc-head"><span>Condition survey</span><em>Draft</em></header>
          <h4>Findings</h4>
          <ol className="insr-findings">{findings.map(f => <li key={f.n}>
            <span>{f.n}</span><div><strong>{f.area}</strong><p>{f.text}</p></div>
            {f.fig && <b className="insr-tile" aria-hidden="true">{f.fig}</b>}
          </li>)}</ol>
          <ol className="insr-held" start={4} aria-label="Three items held for the surveyor">
            {held.map((h, i) => <li key={h}><span>{i + 4}</span><b>{h} <em>held</em></b><i className="insr-mark" aria-hidden="true">?</i></li>)}
          </ol>
        </article>
      </div>
    </div>
    <figcaption className="insr-caption">
      <strong>Illustrative, based on client work in progress</strong> for a marine surveyor. Nothing unsure goes in until they confirm it.
    </figcaption>
  </figure>;
}
