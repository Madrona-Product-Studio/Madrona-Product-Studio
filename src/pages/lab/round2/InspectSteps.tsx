// TEMP round-2 option (2026-09-29). I2 · Three steps.
// Brief: docs/positioning-2026-09/round2-brief.md
// Three big, simple frames in sequence: Capture, Check, Report. Each frame is
// a picture first (shapes, not a form) with a two-word name and one short line
// under it. The one flagged item in Check is the whole point: a person decides
// anything unsure. Anonymized, no client data, labeled illustrative.
import "./inspect-steps.css";

const checks = [
  { label: "Hull", ok: true },
  { label: "Fuel tank", ok: true },
  { label: "Flares", ok: false },
  { label: "Bilge", ok: true },
];

function Capture() {
  return <div className="isx-art isx-capture" aria-hidden="true">
    <div className="isx-sheet">
      <span>hull: crazing</span><span><s>stbd</s> port tank</span><span>flares x</span><span>bilge ok</span>
    </div>
    <span className="isx-photo isx-photo-a">IMG 12</span>
    <span className="isx-photo isx-photo-b">IMG 13</span>
  </div>;
}

function Check() {
  return <ul className="isx-art isx-check" aria-label="Four items read from the notes; one waits for the surveyor">
    {checks.map(c => <li key={c.label} className={c.ok ? "is-ok" : "is-ask"}>
      <i aria-hidden="true">{c.ok ? <svg viewBox="0 0 12 12"><path d="M2.5 6.2 5 8.5l4.5-5" /></svg> : "?"}</i>
      <span>{c.label}</span>{!c.ok && <span className="isx-sr"> (waits for the surveyor)</span>}
    </li>)}
  </ul>;
}

const rows = [
  { n: "1", area: "Hull", text: "Bow crazing", photo: true },
  { n: "2", area: "Fuel tank", text: "Corrosion", photo: true },
  { n: "3", area: "Bilge", text: "Normal" },
];

function Report() {
  return <div className="isx-art isx-report" aria-hidden="true">
    <p className="isx-report-title">Findings</p>
    {rows.map(r => <div key={r.n} className="isx-line">
      <span>{r.n}</span><div><strong>{r.area}</strong><small>{r.text}</small></div>
      {r.photo && <b className="isx-photo" />}
    </div>)}
    <div className="isx-line is-held">
      <span>4</span><div><strong>Flares</strong><small>Held</small></div>
    </div>
  </div>;
}

const steps = [
  { n: "01", name: "Capture", line: "Notes and photos, as taken.", Art: Capture },
  { n: "02", name: "Check", line: "Anything unsure waits for the surveyor.", Art: Check },
  { n: "03", name: "Report", line: "A clean draft in their template.", Art: Report },
];

export function InspectSteps() {
  return <figure className="isx">
    <ol className="isx-steps">
      {steps.map(({ n, name, line, Art }) => <li key={n} className="isx-step">
        <div className="v3-artifact isx-frame"><Art /></div>
        <div className="isx-text">
          <p className="isx-name"><span>{n}</span>{name}</p>
          <p className="isx-line-copy">{line}</p>
        </div>
      </li>)}
    </ol>
    <figcaption className="isx-caption">
      <strong>Illustrative, based on client work in progress</strong> for a marine surveyor.
    </figcaption>
  </figure>;
}
