import { useEffect, useRef, useState } from "react";
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

// Built once per page load; the masthead date is the day the read was made.
const TODAY = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

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
      <section className="or-tools">
        <h3>Tools worth a look</h3>
        <p className="or-moves-pending">Matched from your picks. Revealed at the end.</p>
      </section>
      <footer className="or-foot">
        <span>Assembled from your answers · no email required</span>
      </footer>
    </article>
  );
}

// Copy link with a fallback for browsers that refuse the Clipboard API:
// select the URL in a hidden field and use the old command.
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }
  try {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(field);
    return ok;
  } catch {
    return false;
  }
}

function CopyLink({ permalink }: { permalink: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = async () => {
    const ok = await copyText(permalink);
    setState(ok ? "copied" : "failed");
    track("wts_copy_link", { status: ok ? "copied" : "failed" });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2200);
  };
  return (
    <button type="button" onClick={copy} aria-live="polite">
      {state === "copied" ? "Link copied" : state === "failed" ? "Copy failed, select the address bar" : <>Copy link <span aria-hidden="true">⧉</span></>}
    </button>
  );
}

interface ReportProps {
  data: OpportunityReportData;
  // "hero" is the compact example on the home page: masthead, map, and the
  // first two moves in three columns; no tools, heard, or foot.
  variant?: "full" | "hero";
  // The read's own URL; when present the foot offers Copy link and print
  // spells it out.
  permalink?: string;
  // The AI bridge under "What we heard" (WhereToStart fetches it; null =
  // not arrived or not available, in which case the rule lines stand alone).
  bridge?: string | null;
}

export function OpportunityReport({ data, variant = "full", permalink, bridge = null }: ReportProps) {
  const hero = variant === "hero";
  const { map, moves, heard, overall, title } = data;
  const hasMap =
    map.runsItself.length > 0 || map.amplified.length > 0 || map.staysYours.length > 0;
  const shownMoves = hero ? moves.slice(0, 2) : moves;

  return (
    <article className={`v3-artifact or-card${hero ? " or-card--hero" : ""}`} aria-label={hero ? "Example read from the AI opportunity assessment" : undefined}>
      <WindowBar path="madronaproduct.com/ai-opportunities" note={hero ? "example read" : "your read"} />

      {/* 1. Masthead */}
      <header className="or-head">
        <p className="or-kicker">AI opportunity assessment{hero ? "" : ` · ${TODAY}`}</p>
        <h2>{title}</h2>
        <p className="or-overall">
          <strong>{overall.grade}</strong> {overall.note}
        </p>
      </header>

      {/* 2. Your week, sorted: the map */}
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

          {!hero && map.staysYours.length > 0 && (
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

      {/* 3. Where to start: ranked moves (or the honest empty state) */}
      <section className="or-moves">
        <h3>Where to start</h3>
        {data.movesLead && !hero && <p className="or-moves-lead">{data.movesLead}</p>}
        {shownMoves.length > 0 ? (
          <ol className="or-moves-list">
            {shownMoves.map(({ rank, move }) => (
              <li key={move.chip} className={rank === "Now" ? "is-now" : undefined}>
                <span className="or-rank">{rank}</span>
                <div className="or-move-body">
                  <p className="or-move-head">{move.headline}</p>
                  {(!hero || rank === "Now") && <p className="or-move-support">{move.support}</p>}
                  {!hero && (
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
                  )}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="or-moves-pending">Nothing urgent flagged. If the week changes, retake this in a month.</p>
        )}
      </section>

      {/* 4. Tools worth a look: the live demos matched to their picks */}
      {!hero && data.tools.length > 0 && (
        <section className="or-tools">
          <h3>Tools worth a look</h3>
          <ul className="or-tools-list">
            {data.tools.map((tool) => (
              <li key={tool.href}>
                <Link to={tool.href} onClick={() => track("wts_proof_click", { chip: tool.chip })}>
                  {tool.name} <span aria-hidden="true">→</span>
                  <span className="or-print-url">madronaproduct.com{tool.href}</span>
                </Link>
                <p>{tool.blurb}</p>
              </li>
            ))}
          </ul>
          <Link className="or-tools-all" to="/tools">Every tool, with live demos <span aria-hidden="true">→</span></Link>
        </section>
      )}

      {/* 5. What we heard */}
      {!hero && heard.length > 0 && (
        <section className="or-heard">
          <h3>What we heard</h3>
          <ul className="or-heard-list">
            {heard.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
          {bridge && <p className="or-heard-bridge">{bridge}</p>}
        </section>
      )}

      {/* 6. Foot */}
      {!hero && (
        <footer className="or-foot">
          <span className="or-foot-actions">
            <button type="button" onClick={() => { track("wts_keep"); window.print(); }}>
              Keep this read <span aria-hidden="true">↧</span>
            </button>
            {permalink && <CopyLink permalink={permalink} />}
          </span>
          <span>Assembled from your answers · no email required</span>
          {permalink && <span className="or-print-url or-print-permalink">This read lives at {permalink}</span>}
        </footer>
      )}
    </article>
  );
}
