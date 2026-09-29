import { WindowBar } from "../ReadCard";
import "./inspection.css";

// AI & Operations showcase (homepage refactor, 2026-09-29).
// The field-notes-to-report workflow, adapted from the hero window built
// earlier the same day. Anonymized ("a marine surveyor") and labeled
// illustrative until the client grants reference permission. The point it
// makes: we read the messy input, a person confirms anything that matters,
// and only confirmed findings reach the draft. No time-saving claims.

const inputs = [
  { name: "Field notes", detail: "photos of handwritten sheets" },
  { name: "Boat photos", detail: "straight off the camera" },
  { name: "Vessel facts", detail: "looked up by official number" },
];

type Tone = "done" | "check" | "ask";

const readings: { sheet: string; reading: string; area: string; status: string; tone: Tone }[] = [
  { sheet: "Minor corrosion on fuel tanks", reading: "Minor corrosion on fuel tanks", area: "Fuel system", status: "Confirmed", tone: "done" },
  { sheet: "Flares x", reading: "Flares expired or missing", area: "Safety equipment", status: "Confirm", tone: "check" },
  { sheet: "ge? detector", reading: "Gas detector, or a generator item?", area: "Unclear", status: "Needs the surveyor", tone: "ask" },
];

const draft: { n: string; area: string; text?: string; ref?: string; held?: string }[] = [
  { n: "4.1", area: "Fuel system", text: "Minor corrosion noted on fuel tanks.", ref: "Photos 12, 13" },
  { n: "4.2", area: "Safety equipment", held: "Held until confirmed" },
  { n: "4.3", area: "Not yet assigned", held: "Waiting on the surveyor" },
];

export function InspectionShowcase() {
  return <figure className="ins-show">
    <article className="v3-artifact ins-window" aria-label="Illustrative example: field notes and photos turned into a draft survey report">
      <WindowBar path="survey-report / notes to draft" note="Illustrative example" />

      <section className="ins-step ins-in" aria-label="In">
        <span className="ins-label">In</span>
        <ul>{inputs.map(i => <li key={i.name}><strong>{i.name}</strong><em>{i.detail}</em></li>)}</ul>
      </section>

      <section className="ins-reads" aria-label="Readings">
        <div className="ins-reads-head">
          <span className="ins-label">Read</span>
          <p>Our reading of each line, and who has to confirm it.</p>
        </div>
        <ol>{readings.map(row => <li key={row.sheet} className={`is-${row.tone}`}>
          <code>&ldquo;{row.sheet}&rdquo;</code>
          <div><strong>{row.reading}</strong><small>{row.area}</small></div>
          <b>{row.status}</b>
        </li>)}</ol>
      </section>

      <section className="ins-step ins-out" aria-label="Out">
        <span className="ins-label">Out</span>
        <div>
          <p className="ins-out-lede"><strong>A draft report in the surveyor&rsquo;s own template.</strong> Findings numbered, photos placed. Nothing goes in unconfirmed.</p>
          <div className="ins-doc" aria-label="Draft report excerpt">
            <p className="ins-doc-title"><span>Section 4</span>Findings and recommendations <em>Draft</em></p>
            <ol>{draft.map(d => <li key={d.n} className={d.held ? "is-held" : undefined}>
              <span>{d.n}</span>
              <div><strong>{d.area}</strong>{d.text ? <p>{d.text} <em>{d.ref}</em></p> : <p className="ins-held">{d.held}</p>}</div>
            </li>)}</ol>
          </div>
        </div>
      </section>
    </article>
    <figcaption className="ins-caption">
      <p><strong>Illustrative, based on client work in progress</strong> for a marine surveyor.</p>
      <p>The same pattern fits quotes, inspection reports, and grant and board reports.</p>
    </figcaption>
  </figure>;
}
