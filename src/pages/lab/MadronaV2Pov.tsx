import { useState } from "react";
import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import PovThumb from "./PovThumb";
import { useReveal } from "./useReveal";
import { thinkingEntries, type ThinkingType } from "../../data/thinking";
import "./madrona-v2.css";
import "./playbook.css";

// Current — the studio's feed (named 2026-08-05). The latest from inside
// Madrona: learnings, artifacts, essays, announcements, anything worth
// sharing. Card-grid feed; every card carries an entry plate (a small
// designed visual, never a naked text row). Published work only.
// Entries live in src/data/thinking.ts (shared with related-reading).

export default function MadronaV2Pov() {
  useReveal();
  const [filter, setFilter] = useState<"All" | ThinkingType>("All");
  const types = Array.from(new Set(thinkingEntries.map((e) => e.type)));
  const shown = filter === "All" ? thinkingEntries : thinkingEntries.filter((e) => e.type === filter);

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

      {/* Filters + grid */}
      <section className="m2-ab4">
        <div className="m2-cu-filters" role="tablist" aria-label="Filter entries">
          {(["All", ...types] as const).map((t) => (
            <button key={t} role="tab" aria-selected={filter === t} className={filter === t ? "is-active" : undefined} onClick={() => setFilter(t as "All" | ThinkingType)}>
              {t === "All" ? "All" : `${t}s`}
            </button>
          ))}
        </div>
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
