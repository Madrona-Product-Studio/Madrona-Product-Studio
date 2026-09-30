// TEMP showcase option I3 · Photos find their place (2026-09-29).
// Brief: docs/positioning-2026-09/showcase-motion-brief.md
// A copy of InspectionShowcase where the report assembles around the photos:
// each photo lifts off the field notes (its note line glows first) and glides
// into its Fig. slot, and the matching finding settles beside it as it lands.
// The one photo with no confirmed finding (IMG 17) travels last and stays a
// raw IMG on the held "Aft seacock" line: no Fig. number until the surveyor
// confirms it. The DOM is always the finished report; motion is layered on
// with WAAPI only after an IntersectionObserver trigger, so no-JS, reduced
// motion, and any still frame show the resting state.
import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import "./ins-photos.css";

type Note = { text: ReactNode; flag?: boolean; photo?: string };

const notes: Note[] = [
  { text: <>hull: crazing stbd bow</>, photo: "a" },
  { text: <><s>stbd</s> port tank corr.</>, photo: "b" },
  { text: <>flares x</>, flag: true },
  { text: <>bilge pump ok</> },
  { text: <>ge? detector</>, flag: true },
  { text: <>aft seacock stiff??</>, flag: true, photo: "c" },
];

const snaps = [
  { id: "a", label: "IMG 12" },
  { id: "b", label: "IMG 13" },
  { id: "c", label: "IMG 17" },
];

const findings = [
  { n: "1", area: "Hull", text: "Gelcoat crazing at the starboard bow.", fig: "Fig. 1", photo: "a" },
  { n: "2", area: "Fuel system", text: "Corrosion on the port tank.", fig: "Fig. 2", photo: "b" },
  { n: "3", area: "Bilge", text: "Bilge pump working." },
];

// The three flagged lines, held open in the report until the surveyor confirms.
// Aft seacock keeps its photo, unnumbered.
const held = [{ name: "Flares" }, { name: "Detector" }, { name: "Aft seacock", photo: "c" }];

// Motion vocabulary (madrona-motion STANDARDS): strong ease-out for things
// arriving, ease-in-out shapes for the on-screen glide.
const OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
// The glide is split into two axes: across leads, the rise lags, which
// bends the straight line into a hand-carried arc.
const ACROSS = "cubic-bezier(0.45, 0, 0.2, 1)";
const RISE = "cubic-bezier(0.8, 0, 0.35, 1)";

// Beat sheet (ms after the trigger). Each photo: its note line glows, the
// print lifts, glides, and lands; the finding settles as it lands.
const LIFT = 170;
const TRAVEL = 720;
const beats = [
  { photo: "a", at: 150 },
  { photo: "b", at: 800 },
  { photo: "c", at: 2350 },
];
const PLAIN_FINDING_AT = 1950; // finding 3, no photo
const HELD_AT = 2150; // held rows settle, 70ms apart

export function InsPhotos() {
  const root = useRef<HTMLElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const fig = root.current;
    const overlay = layer.current;
    if (!fig || !overlay) return;
    if (typeof IntersectionObserver === "undefined" || typeof fig.animate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Arm before first paint: the report shows its skeleton (ruled rows,
    // empty Fig. slots); nothing else changes, so there is no layout shift.
    fig.classList.add("is-armed");
    const anims: Animation[] = [];
    let done = 0;

    const q = (sel: string) => fig.querySelector<HTMLElement>(sel);
    const qa = (sel: string) => Array.from(fig.querySelectorAll<HTMLElement>(sel));

    const settle = (el: HTMLElement | null, at: number, dur = 420, dy = 6) => {
      if (!el) return;
      anims.push(el.animate(
        [{ opacity: 0, transform: `translateY(${dy}px)` }, { opacity: 1, transform: "none" }],
        { duration: dur, delay: at, easing: OUT, fill: "backwards" },
      ));
    };

    const play = () => {
      const box = fig.getBoundingClientRect();
      fig.classList.remove("is-armed");

      for (const { photo, at } of beats) {
        const src = q(`.insp-snaps [data-photo="${photo}"]`);
        const dest = q(`.insp-report [data-photo="${photo}"]`);
        const line = q(`.insp-notes li[data-photo="${photo}"] .insp-glow`);
        if (!src || !dest) continue;
        const land = at + 100 + LIFT + TRAVEL;

        // 1 · the note line that the photo belongs to glows, then lets go.
        if (line) anims.push(line.animate(
          [{ opacity: 0 }, { opacity: 1, offset: .18 }, { opacity: 1, offset: .7 }, { opacity: 0 }],
          { duration: land - at + 300, delay: at, easing: "ease", fill: "both" },
        ));

        // 2 · a print lifts off the notes and glides to its slot. Geometry
        // comes from the finished layout (FLIP): the clone is sized like the
        // source tile, then translated/rotated/scaled onto the destination.
        const s = src.getBoundingClientRect();
        const d = dest.getBoundingClientRect();
        const sw = src.offsetWidth, sh = src.offsetHeight;
        const sx = s.left + s.width / 2 - box.left, sy = s.top + s.height / 2 - box.top;
        const dx = d.left + d.width / 2 - box.left - sx, dy = d.top + d.height / 2 - box.top - sy;
        const scx = dest.offsetWidth / sw, scy = dest.offsetHeight / sh;
        const pageTilt = parseFloat(getComputedStyle(fig).getPropertyValue("--insp-page-tilt")) || 0;
        const r0 = Number(src.dataset.tilt || 0) + pageTilt;

        // Two layers so the path can curve: the carrier moves across, the
        // print inside moves down/up on a lagging curve (plus tilt and scale).
        // Across leads, so a print slides along under the bridge copy before
        // it rises into the report, instead of cutting through the words.
        const cs = getComputedStyle(src);
        const carrier = document.createElement("span");
        carrier.className = "insp-flyer";
        Object.assign(carrier.style, { left: `${sx - sw / 2}px`, top: `${sy - sh / 2}px`, width: `${sw}px`, height: `${sh}px` });
        const print = document.createElement("span");
        print.className = "insp-tile insp-print";
        Object.assign(print.style, { backgroundColor: cs.backgroundColor, color: cs.color, borderColor: cs.borderColor });
        const tag = document.createElement("span");
        tag.textContent = src.textContent;
        const shade = document.createElement("i");
        print.append(tag, shade);
        carrier.appendChild(print);
        overlay.appendChild(carrier);

        const t0 = at + 100;
        const rest = `translateY(0px) rotate(${r0}deg) scale(1)`;
        const lift = `translateY(-5px) rotate(${r0}deg) scale(1.06)`;
        // Hidden until its beat, then it simply appears over its source tile.
        anims.push(carrier.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 100, delay: at, easing: "ease", fill: "backwards" }));
        anims.push(print.animate([{ transform: rest }, { transform: lift }], { duration: LIFT, delay: t0, easing: OUT, fill: "both" }));
        anims.push(carrier.animate([{ transform: "translateX(0px)" }, { transform: `translateX(${dx}px)` }],
          { duration: TRAVEL, delay: t0 + LIFT, easing: ACROSS, fill: "forwards" }));
        anims.push(print.animate([{ transform: lift }, { transform: `translateY(${dy}px) rotate(0deg) scale(${scx}, ${scy})` }],
          { duration: TRAVEL, delay: t0 + LIFT, easing: RISE, fill: "forwards" }));
        // The print sheds its filename on approach; the slot's tile brings
        // the figure number (IMG 12 becomes Fig. 1), so labels never overlap.
        anims.push(tag.animate([{ opacity: 1 }, { opacity: 1, offset: .45 }, { opacity: 0, offset: .8 }, { opacity: 0 }],
          { duration: TRAVEL, delay: t0 + LIFT, easing: "linear", fill: "both" }));
        anims.push(shade.animate([{ opacity: 0 }, { opacity: 1, offset: .2 }, { opacity: 1, offset: .75 }, { opacity: 0 }],
          { duration: LIFT + TRAVEL, delay: t0, easing: "ease", fill: "both" }));
        // Hand-off: the placed tile fades up under the print, the print goes.
        anims.push(carrier.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, delay: land, easing: "ease", fill: "forwards" }));
        settle(dest, land - 40, 220, 0);

        // 3 · the report fills in around the photo as it lands.
        const row = dest.closest<HTMLElement>("li");
        if (row && !row.closest(".insp-held")) row.querySelectorAll<HTMLElement>(":scope > .insp-row-text").forEach(el => settle(el, land - 60));
      }

      qa(".insp-report ol:not(.insp-held) li:not([data-has-photo]) > .insp-row-text").forEach(el => settle(el, PLAIN_FINDING_AT));
      qa(".insp-held li").forEach((row, i) =>
        row.querySelectorAll<HTMLElement>(":scope > .insp-row-text").forEach(el => settle(el, HELD_AT + i * 70, 420, 4)));

      // Leave nothing behind: once every animation has finished, release the
      // fills and drop the prints so the page rests on the real DOM (every
      // end keyframe equals the CSS resting state, so this is invisible).
      Promise.all(anims.map(a => a.finished)).then(() => {
        if (done) return;
        anims.forEach(a => a.cancel());
        overlay.replaceChildren();
      }).catch(() => {});
    };

    // Trigger once ~40% in view. Stacked (phone), the report sits below the
    // notes, so wait for the report itself to be mostly in view.
    const stacked = window.matchMedia("(max-width: 640px)").matches;
    const target = stacked ? fig.querySelector(".insp-report") ?? fig : fig;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { io.disconnect(); play(); }
    }, { threshold: stacked ? .5 : .4 });
    io.observe(target);

    return () => {
      done = 1;
      io.disconnect();
      anims.forEach(a => a.cancel());
      overlay.replaceChildren();
      fig.classList.remove("is-armed");
    };
  }, []);

  return <figure className="insp" ref={root}>
    <div className="insp-stage">
      <div className="insp-side">
        <p className="insp-label">Before</p>
        <div className="v3-artifact insp-page insp-notes" role="img" aria-label="Rough handwritten field notes and three photos, with three unclear lines marked">
          <p className="insp-scrawl-head">haul-out, 34&prime; sloop</p>
          <ul>{notes.map((n, i) => <li key={i} className={n.flag ? "is-flag" : undefined} data-photo={n.photo}>
            {n.photo && <i className="insp-glow" aria-hidden="true" />}
            <span>{n.text}</span>{n.flag && <i className="insp-mark" aria-hidden="true">?</i>}
          </li>)}</ul>
          <div className="insp-snaps" aria-hidden="true">
            {snaps.map((p, i) => <span key={p.id} className="insp-tile" data-photo={p.id} data-tilt={[-3, 2, -1][i]}>{p.label}</span>)}
          </div>
        </div>
      </div>

      <div className="insp-bridge">
        <p><b>3</b><span>lines need the surveyor</span></p>
        <i aria-hidden="true" />
      </div>

      <div className="insp-side">
        <p className="insp-label">After</p>
        <article className="v3-artifact insp-page insp-report" aria-label="The finished draft report page">
          <header className="insp-doc-head"><span>Condition survey</span><em>Draft</em></header>
          <h4>Findings</h4>
          <ol>{findings.map(f => <li key={f.n} data-has-photo={f.photo ? "" : undefined}>
            <span className="insp-row-text">{f.n}</span>
            <div className="insp-row-text"><strong>{f.area}</strong><p>{f.text}</p></div>
            {f.fig && <span className="insp-slot" aria-hidden="true"><b className="insp-tile" data-photo={f.photo}>{f.fig}</b></span>}
          </li>)}</ol>
          <ol className="insp-held" start={4} aria-label="Three items held for the surveyor">
            {held.map((h, i) => <li key={h.name}>
              <span className="insp-row-text">{i + 4}</span>
              <b className="insp-row-text">{h.name} <em>held</em></b>
              {h.photo ? <span className="insp-slot is-held insp-row-text" aria-hidden="true"><b className="insp-tile" data-photo={h.photo}>IMG 17</b></span> : <span />}
              <i className="insp-mark insp-row-text" aria-hidden="true">?</i>
            </li>)}
          </ol>
        </article>
      </div>
    </div>
    <div className="insp-layer" ref={layer} aria-hidden="true" />
    <figcaption className="insp-caption">
      <strong>Illustrative, based on client work in progress</strong> for a marine surveyor. Nothing unsure goes in until they confirm it.
    </figcaption>
  </figure>;
}
