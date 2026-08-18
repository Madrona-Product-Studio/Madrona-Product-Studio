import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import PovThumb from "./PovThumb";
import { useReveal } from "./useReveal";
import { thinkingEntries, type ThinkingEntry, type ThinkingType } from "../../data/thinking";
import "./madrona-v2.css";
import "./playbook.css";

// Thinking — the studio's feed. Editorial-list redesign exploration
// (2026-08-17): three candidate list views behind ?v=a|b|c while Charlie
// picks; the no-param default stays the shipped card grid. TEMP: once a
// variant is chosen, it becomes the only render path and the switcher
// param + losing variants are deleted (lock-in rule).
// Entries live in src/data/thinking.ts (shared with related-reading).

// Editorial lists read newest first; the data file appends chronologically.
const newestFirst = (list: ThinkingEntry[]) => [...list].reverse();

/* ---- Variant A — the index: hairline rows, meta rail, plate right ------- */
function ListIndex({ entries }: { entries: ThinkingEntry[] }) {
  return (
    <div className="m2-povl-a">
      {entries.map((e) => (
        <Link key={e.href} to={e.href} className="m2-povl-a-row">
          <div className="m2-povl-a-meta">
            <span className="m2-jr-type">{e.type}</span>
            <span className="m2-povl-date">{e.date}</span>
          </div>
          <div className="m2-povl-a-body">
            <h2>{e.title}</h2>
            <p>{e.excerpt}</p>
          </div>
          <div className="m2-pov-plate m2-povl-a-plate"><PovThumb motif={e.motif} /></div>
        </Link>
      ))}
    </div>
  );
}

/* ---- Variant B — the ledger: numbered, dense, no plates ----------------- */
function ListLedger({ entries }: { entries: ThinkingEntry[] }) {
  return (
    <div className="m2-povl-b">
      {entries.map((e, i) => (
        <Link key={e.href} to={e.href} className="m2-povl-b-row">
          <span className="m2-povl-b-num">{String(entries.length - i).padStart(2, "0")}</span>
          <div className="m2-povl-b-body">
            <h2>{e.title}</h2>
            <p>{e.excerpt}</p>
          </div>
          <span className="m2-povl-b-meta">
            <span className="m2-jr-type">{e.type}</span> · {e.date}
            <span className="m2-povl-arrow" aria-hidden="true">→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}

/* ---- Variant C — feature lead + compact list ---------------------------- */
function ListFeature({ entries, featured }: { entries: ThinkingEntry[]; featured: boolean }) {
  const [lead, ...rest] = entries;
  return (
    <div className="m2-povl-c">
      {featured && lead && (
        <Link to={lead.href} className="m2-povl-c-lead">
          <div className="m2-pov-plate m2-povl-c-plate"><PovThumb motif={lead.motif} /></div>
          <div className="m2-povl-c-leadbody">
            <p className="m2-kicker">The latest · {lead.type}</p>
            <h2>{lead.title}</h2>
            <p className="m2-povl-c-excerpt">{lead.excerpt}</p>
            <span className="m2-text-link">Read it <span aria-hidden="true">→</span></span>
          </div>
        </Link>
      )}
      <div className="m2-povl-b">
        {(featured ? rest : entries).map((e) => (
          <Link key={e.href} to={e.href} className="m2-povl-b-row m2-povl-c-row">
            <div className="m2-povl-b-body">
              <h2>{e.title}</h2>
              <p>{e.excerpt}</p>
            </div>
            <span className="m2-povl-b-meta">
              <span className="m2-jr-type">{e.type}</span> · {e.date}
              <span className="m2-povl-arrow" aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ---- Variant D — the feed: small thumb left, title, read link ----------- */
function ListFeed({ entries }: { entries: ThinkingEntry[] }) {
  return (
    <div className="m2-povl-d">
      {entries.map((e) => (
        <Link key={e.href} to={e.href} className="m2-povl-d-row">
          <div className="m2-pov-plate m2-povl-d-plate"><PovThumb motif={e.motif} /></div>
          <div className="m2-povl-d-body">
            <p className="m2-povl-d-meta"><span className="m2-jr-type">{e.type}</span> · {e.date}</p>
            <h2>{e.title}</h2>
          </div>
          <span className="m2-text-link m2-povl-d-read">Read <span aria-hidden="true">→</span></span>
        </Link>
      ))}
    </div>
  );
}

export default function MadronaV2Pov() {
  useReveal();
  const [params] = useSearchParams();
  const variant = params.get("v"); // TEMP switcher — see header comment
  const [filter, setFilter] = useState<"All" | ThinkingType>("All");
  const types = Array.from(new Set(thinkingEntries.map((e) => e.type)));
  const shown = filter === "All" ? thinkingEntries : thinkingEntries.filter((e) => e.type === filter);
  const listed = newestFirst(shown);

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="Thinking · Madrona Product Studio" />
      <M2Nav active="pov" />

      {/* Masthead */}
      <section className="m2-ab4 m2-th-hero m2-pov-hero">
        <p className="m2-kicker m2-who-kicker">From inside the studio</p>
        <h1>Thinking.</h1>
        <p className="m2-th-standfirst">Learnings, artifacts, and guides from inside the studio. When the work teaches us something, we organize the thinking here so we can build on it, and so can you.</p>
      </section>

      {/* Filters + entries */}
      <section className="m2-ab4">
        <div className="m2-cu-filters" role="tablist" aria-label="Filter entries">
          {(["All", ...types] as const).map((t) => (
            <button key={t} role="tab" aria-selected={filter === t} className={filter === t ? "is-active" : undefined} onClick={() => setFilter(t as "All" | ThinkingType)}>
              {t === "All" ? "All" : `${t}s`}
            </button>
          ))}
        </div>

        {variant === "a" && <ListIndex entries={listed} />}
        {variant === "b" && <ListLedger entries={listed} />}
        {variant === "c" && <ListFeature entries={listed} featured={filter === "All"} />}
        {variant === "d" && <ListFeed entries={listed} />}
        {!variant && (
          <div className="m2-cu-grid">
            {shown.map((e) => (
              <Link key={e.title} to={e.href} className="m2-cu-card">
                <div className="m2-pov-plate"><PovThumb motif={e.motif} /></div>
                <div className="m2-cu-card-body">
                  <h2>{e.title}</h2>
                  <p>{e.excerpt}</p>
                </div>
                <p className="m2-cu-card-meta"><span className="m2-jr-type">{e.type}</span> · {e.date}</p>
              </Link>
            ))}
          </div>
        )}
        <p className="m2-jr-cadence">Entries publish when there is something worth sharing. No schedule, no filler.</p>
      </section>

      {/* Why we publish */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Why we publish</p>
          <p className="m2-ab4-statement">Builders who teach.</p>
        </div>
        <div className="m2-ab4-body">
          <p>We build it, set it up, and teach you to run it. Sharing what the work teaches us is the same posture: a craft that gets better in the open, and thinking that others can build on.</p>
          <div className="m2-th-close-links">
            <Link className="m2-text-link" to="/connect">Get in touch <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
