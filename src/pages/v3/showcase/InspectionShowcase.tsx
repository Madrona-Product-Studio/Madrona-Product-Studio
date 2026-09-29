// The AI & Operations showcase (Charlie picked round-2 option I1, 2026-09-29).
// Brief: docs/positioning-2026-09/round2-brief.md
// The story is the transformation, not the software: a tilted page of rough
// field notes on the left, a clean draft report page on the right, and one
// callout between them. The three unsure lines carry the same outlined mark
// on both sides: flagged in the notes, held open in the report. Anonymized,
// no client data, labeled illustrative. Photos are neutral placeholder tiles.
import type { ReactNode } from "react";
import "./inspection.css";

type Note = { text: ReactNode; flag?: boolean };

const notes: Note[] = [
  { text: <>hull: crazing stbd bow</> },
  { text: <><s>stbd</s> port tank corr.</> },
  { text: <>flares x</>, flag: true },
  { text: <>bilge pump ok</> },
  { text: <>ge? detector</>, flag: true },
  { text: <>aft seacock stiff??</>, flag: true },
];

const findings = [
  { n: "1", area: "Hull", text: "Gelcoat crazing at the starboard bow.", fig: "Fig. 1" },
  { n: "2", area: "Fuel system", text: "Corrosion on the port tank.", fig: "Fig. 2" },
  { n: "3", area: "Bilge", text: "Bilge pump working." },
];

// The three flagged lines, held open in the report until the surveyor confirms.
const held = ["Flares", "Detector", "Aft seacock"];

export function InspectionShowcase() {
  return <figure className="iba">
    <div className="iba-stage">
      <div className="iba-side">
        <p className="iba-label">Before</p>
        <div className="v3-artifact iba-page iba-notes" role="img" aria-label="Rough handwritten field notes and three photos, with three unclear lines marked">
          <p className="iba-scrawl-head">haul-out, 34&prime; sloop</p>
          <ul>{notes.map((n, i) => <li key={i} className={n.flag ? "is-flag" : undefined}>
            <span>{n.text}</span>{n.flag && <i className="iba-mark" aria-hidden="true">?</i>}
          </li>)}</ul>
          <div className="iba-snaps" aria-hidden="true">
            <span className="iba-tile">IMG 12</span>
            <span className="iba-tile">IMG 13</span>
            <span className="iba-tile">IMG 17</span>
          </div>
        </div>
      </div>

      <div className="iba-bridge">
        <p><b>3</b><span>lines need the surveyor</span></p>
        <i aria-hidden="true" />
      </div>

      <div className="iba-side">
        <p className="iba-label">After</p>
        <article className="v3-artifact iba-page iba-report" aria-label="The finished draft report page">
          <header className="iba-doc-head"><span>Condition survey</span><em>Draft</em></header>
          <h4>Findings</h4>
          <ol>{findings.map(f => <li key={f.n}>
            <span>{f.n}</span><div><strong>{f.area}</strong><p>{f.text}</p></div>
            {f.fig && <b className="iba-tile" aria-hidden="true">{f.fig}</b>}
          </li>)}</ol>
          <ol className="iba-held" start={4} aria-label="Three items held for the surveyor">
            {held.map((h, i) => <li key={h}><span>{i + 4}</span><b>{h} <em>held</em></b><i className="iba-mark" aria-hidden="true">?</i></li>)}
          </ol>
        </article>
      </div>
    </div>
    <figcaption className="iba-caption">
      <strong>Illustrative, based on client work in progress</strong> for a marine surveyor. Nothing unsure goes in until they confirm it.
    </figcaption>
  </figure>;
}
