import { Link } from "react-router-dom";
import { WindowBar } from "./ReadCard";
import type { OpportunityReportData, MapItem, LivePaneState } from "./opportunityEngine";
import { track } from "../../lib/analytics";
import "./opportunity-report.css";

// Area hue dot classes (money=copper, customers=stone, words=plum, glue=fir).
const AREA_HUE: Record<string, string> = {
  money: "is-copper",
  customers: "is-stone",
  words: "is-plum",
  glue: "is-fir",
};

function MapItemRow({ item }: { item: MapItem }) {
  return (
    <li className="or-map-item">
      <span className={`or-dot ${AREA_HUE[item.area]}`} aria-hidden="true" />
      <span className="or-map-label">{item.label}</span>
      {item.proofLive && (
        <Link
          className="or-proof-live"
          to={item.proofHref}
          onClick={() => track("wts_proof_click", { chip: item.chip })}
        >
          live <span aria-hidden="true">→</span>
        </Link>
      )}
    </li>
  );
}

// The assembling state of the SAME card (critic pass 09-01: the preview must
// be the literal skeleton of the deliverable, filling in). Same sections,
// same headers; area rows sit as faint empty slots until their chips wake
// them, answered areas hold redacted shimmer chips, and the moves slot only
// hints. Nothing here shows a section the final card doesn't ship.
export function OpportunityReportAssembling({ live }: { live: LivePaneState }) {
  return (
    <article className="v3-artifact or-card or-card--assembling">
      <WindowBar path="madronaproduct.com/ai-opportunities" note="assembling" />
      <header className="or-head">
        <p className="or-kicker">AI opportunity assessment</p>
        <p className="or-title-slot" aria-hidden="true"><span className="or-shimmer or-shimmer--title" /></p>
      </header>
      <section className="or-map">
        <h3>Your week, sorted</h3>
        <ul className="or-map-list or-map-list--live">
          {live.areas.map((row) => (
            <li key={row.area} className={`or-map-item is-${row.state}`}>
              <span className={`or-dot ${AREA_HUE[row.area]}`} aria-hidden="true" />
              <span className="or-map-label">{row.label}</span>
              {row.state === "listening" && <span className="or-live-status">Listening</span>}
              {row.state === "captured" && <span className="or-shimmer" aria-label="Read in, revealed at the end" />}
            </li>
          ))}
        </ul>
      </section>
      <section className="or-moves">
        <h3>Where to start</h3>
        <p className="or-moves-pending">{live.movePlaceholder}</p>
      </section>
      <footer className="or-foot">
        <span>Assembled from your answers · no email required</span>
      </footer>
    </article>
  );
}

export function OpportunityReport({ data }: { data: OpportunityReportData }) {
  const today = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const { map, moves, heard, overall, title } = data;
  const hasMap =
    map.runsItself.length > 0 || map.amplified.length > 0 || map.staysYours.length > 0;

  return (
    <article className="v3-artifact or-card">
      <WindowBar path="madronaproduct.com/ai-opportunities" note="your read" />

      {/* 1. Masthead */}
      <header className="or-head">
        <p className="or-kicker">AI opportunity assessment · {today}</p>
        <h2>{title}</h2>
        <p className="or-overall">
          <strong>{overall.grade}</strong> {overall.note}
        </p>
      </header>

      {/* 2. Your week, sorted — the map */}
      {hasMap && (
        <section className="or-map">
          <h3>Your week, sorted</h3>

          {map.runsItself.length > 0 && (
            <div className="or-map-group">
              <p className="or-group-head">Runs itself</p>
              <ul className="or-map-list">
                {map.runsItself.map((item) => (
                  <MapItemRow key={item.chip} item={item} />
                ))}
              </ul>
            </div>
          )}

          {map.amplified.length > 0 && (
            <div className="or-map-group">
              <p className="or-group-head">You, amplified</p>
              <ul className="or-map-list">
                {map.amplified.map((item) => (
                  <MapItemRow key={item.chip} item={item} />
                ))}
              </ul>
            </div>
          )}

          {map.staysYours.length > 0 && (
            <div className="or-map-group">
              <p className="or-group-head">Stays yours</p>
              <ul className="or-map-list or-map-list--yours">
                {map.staysYours.map((line, i) => (
                  <li key={i} className="or-map-item or-map-item--yours">
                    <span className="or-map-label">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* 3. Where to start — ranked moves */}
      {moves.length > 0 && (
        <section className="or-moves">
          <h3>Where to start</h3>
          <ol className="or-moves-list">
            {moves.map(({ rank, move }) => (
              <li key={move.chip} className={rank === "Now" ? "is-now" : undefined}>
                <span className="or-rank">{rank}</span>
                <div className="or-move-body">
                  <p className="or-move-head">{move.headline}</p>
                  <p className="or-move-support">{move.support}</p>
                  <Link
                    className={`or-move-proof${rank === "Now" ? "" : " or-move-proof--quiet"}`}
                    to={move.proofHref}
                    onClick={() => track("wts_proof_click", { chip: move.chip })}
                  >
                    {move.proofLabel}
                    {/* Print-only: spell out the URL */}
                    <span className="or-print-url">
                      madronaproduct.com{move.proofHref}
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 4. What we heard */}
      {heard.length > 0 && (
        <section className="or-heard">
          <h3>What we heard</h3>
          <ul className="or-heard-list">
            {heard.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </section>
      )}

      {/* 5. Foot */}
      <footer className="or-foot">
        <button type="button" onClick={() => window.print()}>
          Keep this read <span aria-hidden="true">↧</span>
        </button>
        <span>Assembled from your answers · no email required</span>
      </footer>
    </article>
  );
}
