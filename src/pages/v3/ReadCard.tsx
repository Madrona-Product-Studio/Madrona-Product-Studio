// The shared browser-window chrome for hero/lab artifacts. Lives here (not in
// Hero.tsx) so the assessment can render the card without pulling in the hero.
export function WindowBar({ path, note }: { path: string; note?: string }) {
  return <header className="v3-window-bar"><span className="v3-window-dots" aria-hidden="true"><i /><i /><i /></span><code>{path}</code>{note && <small>{note}</small>}</header>;
}

// The "Where to Start" read card (docs/redesign-2026-08/assessment-respec.md).
// One component, two homes: the V3 hero renders it with the fixture below
// ("example read"), the assessment result page renders it live from answers.
// The card is the assessment's output spec — keep its shape fixed: four
// signal rows, targets for flagged rows only, one workflow-level move.

export interface ReadRow {
  label: string;
  status: string;
  // bark = the headline signal, at most one. pending/dormant/captured exist
  // only for the assessment's live building state: pending = flagged,
  // awaiting its follow-up; dormant = not flagged (yet); captured = answered
  // but held back — a redacted chip, the verdict stays for the reveal.
  tone: "quiet" | "flag" | "bark" | "pending" | "dormant" | "captured";
}

export interface ReadTarget {
  label: string;
  target: string; // the plain-words better state: Clear / Connected / Useful
  now: number; // 0–1 position of today's state; the forest fill is the gap we'd close
  bark?: boolean;
  hidden?: boolean; // building state: an unlabeled shimmer bar, verdict withheld
}

export interface ReadProfile {
  path: string;
  note: string;
  // The named read — result-stage headline (absent on the hero fixture).
  title?: string;
  rows: ReadRow[];
  targets: ReadTarget[];
  // null while the report is still assembling — the card shows placeholders.
  move: { headline: string; support: string; whyNow: string } | null;
  movePlaceholder?: string; // building copy for the recommendation slot
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

const toneClass: Record<ReadRow["tone"], string> = {
  bark: "is-bark",
  quiet: "is-quiet",
  flag: "",
  pending: "is-pending",
  dormant: "is-dormant",
  captured: "is-captured",
};

export function ReadCard({ profile }: { profile: ReadProfile }) {
  const building = profile.move === null;
  return <article className="v3-artifact v3-wide-diagnostic" aria-label="Where to Start read">
    <WindowBar path={profile.path} note={profile.note} />
    <div className="v3-diagnostic-panes">
      <section>
        <h2>Current signals</h2>
        <ul className="v3-diagnostic-status">
          {/* Keyed by status too, so a row remounts (and its fill animation
              plays) when an answer lands. */}
          {profile.rows.map(row => <li key={`${row.label}:${row.tone}:${row.status}`} className={`row-${row.tone}`}>
            <span>{row.label}</span>
            {/* Captured = answered but withheld: a redacted chip holds the
                slot so the picture gets clearer without giving the verdict. */}
            {row.tone === "captured"
              ? <strong className="is-captured" aria-label="Noted, revealed at the end"><b className="wts-redact" aria-hidden="true" /></strong>
              : <strong className={toneClass[row.tone]}>{row.status}</strong>}
          </li>)}
        </ul>
      </section>
      <section>
        <h2>What better looks like</h2>
        {profile.targets.length ? <ul className="v3-better-bars">
          {profile.targets.map((target, i) => target.hidden
            ? <li key={`hidden-${i}`} className="is-hidden" aria-label="Taking shape, revealed at the end">
              <span><b className="wts-redact wts-redact--label" aria-hidden="true" /></span>
              <i><b className="is-shimmer" /></i>
              <small />
            </li>
            : <li key={target.label}>
              <span>{target.label}</span>
              <i><b className={target.bark ? "is-bark" : ""} style={{ transform: `translateX(${target.now * 100}%) scaleX(${1 - target.now})` }} /></i>
              <small>{target.target}</small>
            </li>)}
        </ul> : <p className="v3-better-empty">{building ? "Fills in as areas resolve." : "Nothing urgent flagged."}</p>}
      </section>
      <section className="v3-recommendation-pane">
        <h2>First recommendation</h2>
        {profile.move ? <>
          <p>{profile.move.headline}</p>
          <span>{profile.move.support} {profile.move.whyNow}</span>
        </> : <p className="v3-rec-pending">{profile.movePlaceholder ?? "Resolves at the end."}</p>}
      </section>
    </div>
  </article>;
}
