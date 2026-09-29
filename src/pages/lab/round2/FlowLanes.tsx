// TEMP round-2 option F2 · Two lanes (2026-09-29).
// Brief: docs/positioning-2026-09/round2-brief.md
//
// The AutomationMap story (a local plumbing company, one customer from booking
// to repeat visit) as a swimlane timeline. One time axis; the top lane holds
// what runs on its own, the bottom lane what a person decides. Each human step
// hangs off the automation at the moment it happens, so the ratio (five to
// three) and the hand-offs read at a glance. The review fork is the drop in
// “Days after”: a good visit stays automatic (a thank-you), a bad one comes
// down to you. Illustrative: no client, no numbers, no prices.
//
// Wide column: time runs left to right, lanes stacked. Narrow column (phones):
// the grid transposes, time runs down, lanes side by side. Same DOM, same
// order (grouped by moment, so a screen reader hears it in sequence).
import type { CSSProperties } from "react";
import { WindowBar } from "../../v3/ReadCard";
import "./flow-lanes.css";

type Lane = "auto" | "you";
type Step = { lane: Lane; text: string; when?: string; note?: string };
type Moment = { time: string; steps: Step[] };

const moments: Moment[] = [
  { time: "Booking", steps: [
    { lane: "auto", text: "Confirms the booking" },
    { lane: "you", text: "Picks the tech" },
  ] },
  { time: "Day before", steps: [
    { lane: "auto", text: "Sends a reminder" },
  ] },
  { time: "Visit day", steps: [
    { lane: "auto", text: "“On\u00a0the\u00a0way” text" },
    { lane: "you", text: "Checks the drafted report" },
  ] },
  { time: "Days after", steps: [
    { lane: "auto", text: "Asks how it went", note: "If happy, a thank-you" },
    { lane: "you", when: "If it didn’t", text: "Calls them personally" },
  ] },
  { time: "Months later", steps: [
    { lane: "auto", text: "Reminds them each season" },
  ] },
];

const laneName: Record<Lane, string> = { auto: "Runs on its own", you: "You decide" };
const count = (lane: Lane) => moments.reduce((n, m) => n + m.steps.filter(s => s.lane === lane).length, 0);

export function FlowLanes() {
  return <article className="v3-artifact fl" aria-label="Illustrative example: one customer’s journey at a local plumbing company, split into what runs on its own and what you decide">
    <WindowBar path="plumbing-co / one customer" note="Illustrative example" />
    <div className="fl-head">
      <p className="fl-eyebrow">A local plumbing company</p>
      <p className="fl-title">One customer, from booking to repeat visit</p>
      <p className="fl-sub">They book a repair online at 9pm. Here’s what happens next, and who does it.</p>
    </div>

    <div className="fl-board">
      <i className="fl-band is-auto" aria-hidden="true" />
      <i className="fl-band is-you" aria-hidden="true" />
      <i className="fl-track" aria-hidden="true" />
      {(["auto", "you"] as Lane[]).map(lane => <p key={lane} className={`fl-lane is-${lane}`} aria-hidden="true">
        <b>{laneName[lane]}</b><span>{count(lane)} {lane === "auto" ? "steps" : "moments"}</span>
      </p>)}

      {moments.map((m, i) => {
        const t = { "--t": i + 2 } as CSSProperties;
        const hasYou = m.steps.some(s => s.lane === "you");
        return [
          <p key={`t${i}`} className="fl-time" style={t}>{m.time}</p>,
          hasYou && <i key={`d${i}`} className={`fl-drop${m.steps.some(s => s.when) ? " is-fork" : ""}`} style={t} aria-hidden="true" />,
          ...m.steps.map(s => <div key={s.text} className={`fl-node is-${s.lane}`} style={t}>
            <span className="fl-sr">{laneName[s.lane]}: </span>
            {s.when && <small>{s.when}</small>}
            <strong>{s.text}</strong>
            {s.note && <em>{s.note}</em>}
          </div>),
        ];
      })}
    </div>

    <footer className="fl-out">
      <span>Intended benefits</span>
      <ul><li>Bookings that show up</li><li>Reviews that get written</li><li>Customers who come back</li></ul>
    </footer>
  </article>;
}
