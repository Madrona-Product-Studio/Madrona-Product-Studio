import { WindowBar } from "./ReadCard";
import type { ReadinessReportData } from "./whereToStartEngine";

// The V2 report card (Readiness Assessment rebuild, 2026-08-30): the
// deliverable. Named read as masthead, an overall word grade, per-area
// meters with owner-plain grades in the board hues, and ranked moves
// (now / next / later). "Keep this read" prints a fuller version — the
// whyNow lines are print-only detail. Same window language as the
// service-artifact library; in dark skies it rides the light-island rules.
const AREA_HUES: Record<string, string> = { web: "copper", repeat: "stone", hours: "fir", ai: "moss", product: "plum" };

export function ReadinessReport({ data }: { data: ReadinessReportData }) {
  const today = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return (
    <article className="v3-artifact rr-card">
      <WindowBar path="madronaproduct.com/where-to-start" note="your read" />
      <header className="rr-head">
        <p className="rr-kicker">Readiness assessment · {today}</p>
        <h2>{data.title}</h2>
        <p className="rr-overall"><strong>{data.overall.grade}.</strong> {data.overall.note}</p>
      </header>
      <section className="rr-areas">
        <h3>Where you stand</h3>
        <ul>
          {data.areas.map((area) => (
            <li key={area.key} className={area.level === null ? "is-quiet" : undefined}>
              <span className={`rr-dot is-${AREA_HUES[area.key]}`} aria-hidden="true" />
              <span className="rr-label">{area.label}</span>
              <i className="rr-meter"><b className={`is-${AREA_HUES[area.key]}${area.flagged ? " is-flagged" : ""}`} style={{ width: `${Math.round((area.level ?? 0) * 100)}%` }} /></i>
              <strong className={area.flagged ? "is-flagged" : undefined}>{area.grade}</strong>
              {area.detail && <p className="rr-detail">{area.detail}</p>}
            </li>
          ))}
        </ul>
      </section>
      <section className="rr-moves">
        <h3>First moves</h3>
        <ol>
          {data.moves.map(({ rank, move }) => (
            <li key={move.headline} className={rank === "Now" ? "is-now" : undefined}>
              <span className="rr-rank">{rank}</span>
              <div>
                <p className="rr-move">{move.headline}</p>
                <p className="rr-support">{move.support}</p>
                <p className="rr-why">{move.whyNow}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <footer className="rr-foot">
        <button type="button" onClick={() => window.print()}>Keep this read <span aria-hidden="true">↧</span></button>
        <span>Assembled from your answers · no email required</span>
      </footer>
    </article>
  );
}
