// TEMP round-2 option F3 · The loop (2026-09-29).
// Brief: docs/positioning-2026-09/round2-brief.md
//
// The AutomationMap story (a local plumbing company, one customer) drawn as
// the relationship it is meant to create: a loop. Six stations clockwise from
// the top, book to book again. The two moments that are a person's call are
// the only outlined things on the page (the visit, and the call when a review
// goes badly). The review fork splits at the bottom: the good arm stays on the
// loop in mint, the bad arm drops off it to you. Illustrative: no client, no
// numbers, no prices.
//
// Wide column: labels sit around the ring. Narrow column (phones): the ring
// shows numbered stations and the labels become a numbered list beneath it.
import { WindowBar } from "../../v3/ReadCard";
import "./flow-loop.css";

const R = 110;
const at = (deg: number, r = R) => {
  const a = (deg * Math.PI) / 180;
  return [+(r * Math.cos(a)).toFixed(2), +(r * Math.sin(a)).toFixed(2)] as const;
};

type Kind = "start" | "auto" | "you" | "good";
type Station = { n: number; deg: number; kind: Kind; text: string; when?: string };

// Clockwise from the top (SVG angles: -90 is 12 o'clock, 90 is 6 o'clock).
const stations: Station[] = [
  { n: 1, deg: -90, kind: "start", text: "Books a repair online" },
  { n: 2, deg: -30, kind: "auto", text: "Reminder, then “on the way”" },
  { n: 3, deg: 30, kind: "you", when: "The visit", text: "Your tech checks the drafted report" },
  { n: 4, deg: 90, kind: "auto", text: "Asks how it went" },
  { n: 5, deg: 150, kind: "good", when: "If it went well", text: "A thank-you and review link" },
  { n: 6, deg: 210, kind: "auto", text: "Seasonal reminders" },
];

// Chevrons between stations, pointing clockwise.
const arrows = [-60, 0, 60, 120, 180, 240];

function Ring() {
  const [gx, gy] = at(90);
  const [tx, ty] = at(150);
  return <svg className="flp-ring" viewBox="-130 -130 260 300" aria-hidden="true">
    <circle className="flp-track" r={R} />
    <path className="flp-good" d={`M ${gx} ${gy} A ${R} ${R} 0 0 1 ${tx} ${ty}`} />
    <line className="flp-branch" x1={0} y1={R} x2={0} y2={170} />
    {arrows.map(d => {
      const [x, y] = at(d);
      return <path key={d} className={`flp-arrow${d === 120 ? " is-good" : ""}`} d="M -3.5 -4 L 1.5 0 L -3.5 4" transform={`translate(${x} ${y}) rotate(${d + 90})`} />;
    })}
    {stations.map(s => {
      const [x, y] = at(s.deg);
      return <g key={s.n} className={`flp-st is-${s.kind}`} transform={`translate(${x} ${y})`}>
        <circle />
        <text dy="0.35em">{s.n}</text>
      </g>;
    })}
  </svg>;
}

function Label({ s }: { s: Station }) {
  return <li className={`flp-label is-${s.kind} at-${s.n}`}>
    <b className="flp-num" aria-hidden="true">{s.n}</b>
    <div>
      {s.when && <small>{s.when}</small>}
      <strong>{s.text}</strong>
    </div>
  </li>;
}

export function FlowLoop() {
  const [before, after] = [stations.slice(0, 4), stations.slice(4)];
  return <article className="v3-artifact flp" aria-label="Illustrative example: one customer’s relationship with a local plumbing company, drawn as a loop">
    <WindowBar path="plumbing-co / one customer" note="Illustrative example" />
    <div className="flp-head">
      <p className="flp-eyebrow">A local plumbing company</p>
      <p className="flp-title">One customer, round and round</p>
      <p className="flp-sub">Outlined steps are your call. The rest runs on its own.</p>
    </div>

    <div className="flp-stage">
      <Ring />
      <p className="flp-center"><span>Repeat business</span>Every visit sets up the next one.</p>
      <ol className="flp-labels">
        {before.map(s => <Label key={s.n} s={s} />)}
        <li className="flp-label is-you is-fork">
          <b className="flp-num" aria-hidden="true" />
          <div>
            <small>If it didn’t go well</small>
            <strong>You call them</strong>
          </div>
        </li>
        {after.map(s => <Label key={s.n} s={s} />)}
      </ol>
    </div>

    <footer className="flp-out">
      <span>Intended benefits</span>
      <ul><li>Bookings that show up</li><li>Reviews that get written</li><li>Customers who come back</li></ul>
    </footer>
  </article>;
}
