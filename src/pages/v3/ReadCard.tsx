import { WindowBar } from "./Hero";

// The "Where to Start" read card (docs/redesign-2026-08/assessment-respec.md).
// One component, two homes: the V3 hero renders it with the fixture below
// ("example read"), the assessment result page renders it live from answers.
// The card is the assessment's output spec — keep its shape fixed: four
// signal rows, targets for flagged rows only, one workflow-level move.

export interface ReadRow {
  label: string;
  status: string;
  tone: "quiet" | "flag" | "bark"; // bark = the headline signal, at most one
}

export interface ReadTarget {
  label: string;
  target: string; // the plain-words better state: Clear / Connected / Useful
  now: number; // 0–1 position of today's state; the forest fill is the gap we'd close
  bark?: boolean;
}

export interface ReadProfile {
  path: string;
  note: string;
  rows: ReadRow[];
  targets: ReadTarget[];
  move: { headline: string; support: string; whyNow: string };
}

// Hero fixture. One row deliberately unflagged ("Steady") — the card must be
// able to say an area is fine, or every read looks like a brochure.
export const heroReadFixture: ReadProfile = {
  path: "madronaproduct.com/where-to-start",
  note: "example read",
  rows: [
    { label: "Web presence", status: "Underselling", tone: "flag" },
    { label: "Repeat customers", status: "Steady", tone: "quiet" },
    { label: "Hours lost to admin", status: "12+ a week", tone: "flag" },
    { label: "AI leverage", status: "Untapped", tone: "bark" },
  ],
  targets: [
    { label: "Clearer offer", target: "Clear", now: 0.34 },
    { label: "Admin relief", target: "Useful", now: 0.18, bark: true },
  ],
  move: {
    headline: "Fix the highest-friction handoff before adding another tool.",
    support: "Start with the workflow people already repeat.",
    whyNow: "AI can now draft it in your own format, from the notes you already keep.",
  },
};

export function ReadCard({ profile }: { profile: ReadProfile }) {
  return <article className="v3-artifact v3-wide-diagnostic" aria-label="Where to Start example read">
    <WindowBar path={profile.path} note={profile.note} />
    <div className="v3-diagnostic-panes">
      <section>
        <h2>Current signals</h2>
        <ul className="v3-diagnostic-status">
          {profile.rows.map(row => <li key={row.label}>
            <span>{row.label}</span>
            <strong className={row.tone === "bark" ? "is-bark" : row.tone === "quiet" ? "is-quiet" : ""}>{row.status}</strong>
          </li>)}
        </ul>
      </section>
      <section>
        <h2>What better looks like</h2>
        <ul className="v3-better-bars">
          {profile.targets.map(target => <li key={target.label}>
            <span>{target.label}</span>
            <i><b className={target.bark ? "is-bark" : ""} style={{ marginLeft: `${target.now * 100}%`, width: `${(1 - target.now) * 100}%` }} /></i>
            <small>{target.target}</small>
          </li>)}
        </ul>
      </section>
      <section className="v3-recommendation-pane">
        <h2>First recommendation</h2>
        <p>{profile.move.headline}</p>
        <span>{profile.move.support} {profile.move.whyNow}</span>
      </section>
    </div>
  </article>;
}
