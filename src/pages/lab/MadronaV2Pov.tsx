import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import TypeMark from "./TypeMark";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import PovThumb from "./PovThumb";
import { useReveal } from "./useReveal";
import { thinkingEntries, type ThinkingType } from "../../data/thinking";
import "./madrona-v2.css";
import "./playbook.css";

// Thinking — the studio's feed. Editorial feed rows (chosen 2026-08-17 from
// four candidates): small motif thumbnail left, meta + title, Read link.
// Entries render in the curated read-first order from src/data/thinking.ts
// (thesis leads; order is Charlie's, not chronological).

export default function MadronaV2Pov() {
  useReveal();
  // TEMP (2026-08-18): type-mark presentation candidates behind ?icons=a|b|c.
  // a: bare glyph beside the chip · b: tinted circle (thesis idiom) · c: pill.
  // Winner locks in; param + losers get deleted.
  const [params] = useSearchParams();
  const icons = params.get("icons");
  const TONE: Record<string, string> = { Essay: "sprout", Guide: "layers", Artifact: "storefront" };
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

      {/* Filters + feed */}
      <section className="m2-ab4">
        <div className="m2-cu-filters" role="tablist" aria-label="Filter entries">
          {(["All", ...types] as const).map((t) => (
            <button key={t} role="tab" aria-selected={filter === t} className={filter === t ? "is-active" : undefined} onClick={() => setFilter(t as "All" | ThinkingType)}>
              {t === "All" ? "All" : `${t}s`}
            </button>
          ))}
        </div>
        <div className="m2-povl-d">
          {shown.map((e) => (
            <Link key={e.href} to={e.href} className="m2-povl-d-row">
              <div className="m2-pov-plate m2-povl-d-plate"><PovThumb motif={e.motif} /></div>
              <div className="m2-povl-d-body">
                {!icons && <p className="m2-povl-d-meta"><span className="m2-jr-type">{e.type}</span></p>}
                {icons === "a" && (
                  <p className="m2-povl-d-meta m2-tm-a"><TypeMark type={e.type} /><span className="m2-jr-type">{e.type}</span></p>
                )}
                {icons === "b" && (
                  <p className="m2-povl-d-meta m2-tm-b"><span className="m2-ab4-ico m2-tm-circle" data-tone={TONE[e.type] ?? "sprout"}><TypeMark type={e.type} /></span><span className="m2-jr-type">{e.type}</span></p>
                )}
                {icons === "c" && (
                  <p className="m2-povl-d-meta m2-tm-c"><span className="m2-tm-pill"><TypeMark type={e.type} />{e.type}</span></p>
                )}
                <h2>{e.title}</h2>
                <p className="m2-povl-d-excerpt">{e.excerpt}</p>
              </div>
              <span className="m2-text-link m2-povl-d-read">Read <span aria-hidden="true">→</span></span>
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
