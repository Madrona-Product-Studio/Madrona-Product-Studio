import { useState } from "react";
import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import "./madrona-v2.css";
import "./playbook.css";

// Current — the studio's feed (named 2026-08-05). The latest from inside
// Madrona: learnings, artifacts, essays, announcements, anything worth
// sharing. Card-grid feed; every card carries an entry plate (a small
// designed visual, never a naked text row). Published work only.

type EntryType = "Artifact" | "Essay" | "Learning" | "Guide" | "Announcement";

type Entry = {
  date: string;
  type: EntryType;
  title: string;
  excerpt: string;
  href: string;
  plate: "engine" | "thesis-quote" | "helm-loop" | "terminal" | "checklist" | "fourteen";
};

// Charlie's chosen order: the thesis leads, then the engine, then the ops piece.
const ENTRIES: Entry[] = [
  {
    date: "Aug 2026",
    type: "Essay",
    title: "The Madrona Product Thesis",
    excerpt: "A working theory of how great software gets built in the AI era, and what that changes about product leadership.",
    href: "/thesis",
    plate: "thesis-quote",
  },
  {
    date: "Aug 2026",
    type: "Artifact",
    title: "Madrona: under the hood",
    excerpt: "The engine behind every product we ship: the platform each project inherits, the gates that hold the bar, and the learning loop that compounds.",
    href: "/current/under-the-hood",
    plate: "engine",
  },
  {
    date: "Aug 2026",
    type: "Essay",
    title: "The era of agentic operations",
    excerpt: "A business can now run on one source of truth and agents on a rhythm, with a person firmly in charge. What changes, and how to start small.",
    href: "/current/the-era-of-agentic-operations",
    plate: "helm-loop",
  },
  {
    date: "Aug 2026",
    type: "Guide",
    title: "A starter guide to building with AI",
    excerpt: "The piece I wish someone had handed me on day one: the tools, the setup, and the habits that take you from zero to shipping real software.",
    href: "/current/starter-guide-to-building-with-ai",
    plate: "terminal",
  },
];

function Plate({ kind }: { kind: Entry["plate"] }) {
  if (kind === "engine") {
    return (
      <div className="m2-cu-plate" aria-hidden="true">
        <div className="m2-jr-plate-pipe"><span /><span /><span className="gate" /><span className="gate" /><span /></div>
        <div className="m2-jr-plate-band"><span /><span /><span /><span /><span /></div>
        <div className="m2-jr-plate-return" />
      </div>
    );
  }
  if (kind === "terminal") {
    return (
      <div className="m2-cu-plate m2-cu-plate-term" aria-hidden="true">
        <div className="term">
          <div className="term-bar"><span /><span /><span /></div>
          <div className="term-line"><i>$</i> claude</div>
          <div className="term-line dim">Describe what you want to build.</div>
          <div className="term-line"><i>&gt;</i> a guide for boaters in the San Juans<span className="caret" /></div>
        </div>
      </div>
    );
  }
  if (kind === "checklist") {
    return (
      <div className="m2-cu-plate m2-cu-plate-check" aria-hidden="true">
        <div className="ln"><i>✓</i><span style={{ maxWidth: "72%" }} /></div>
        <div className="ln"><i>✓</i><span style={{ maxWidth: "88%" }} /></div>
        <div className="ln"><i>✓</i><span style={{ maxWidth: "60%" }} /></div>
        <div className="ln"><i>✓</i><span style={{ maxWidth: "80%" }} /></div>
      </div>
    );
  }
  if (kind === "fourteen") {
    return (
      <div className="m2-cu-plate m2-cu-plate-num" aria-hidden="true">
        <span className="big">14</span>
        <span className="cap">working principles</span>
      </div>
    );
  }
  if (kind === "helm-loop") {
    return (
      <div className="m2-cu-plate m2-cu-plate-loop" aria-hidden="true">
        <div className="row"><span className="box" /><i>→</i><span className="box core" /><i>→</i><span className="box" /></div>
        <div className="m2-jr-plate-return" />
      </div>
    );
  }
  return (
    <div className="m2-cu-plate m2-cu-plate-quote" aria-hidden="true">
      <p>&ldquo;Everyone builds, but they build different things.&rdquo;</p>
    </div>
  );
}

export default function MadronaV2Current() {
  useReveal();
  const [filter, setFilter] = useState<"All" | EntryType>("All");
  const types = Array.from(new Set(ENTRIES.map((e) => e.type)));
  const shown = filter === "All" ? ENTRIES : ENTRIES.filter((e) => e.type === filter);

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="Current · Madrona Product Studio" />
      <M2Nav active="current" />

      {/* Masthead */}
      <section className="m2-ab4 m2-th-hero">
        <p className="m2-kicker m2-who-kicker">From inside the studio</p>
        <h1><span className="m2-pop">Current.</span></h1>
        <p className="m2-th-standfirst">What is moving through the studio right now: learnings, artifacts, announcements, and anything worth sharing. When the work teaches us something, we organize the thinking here so we can build on it, and so can you.</p>
      </section>

      {/* Filters + grid */}
      <section className="m2-ab4">
        <div className="m2-cu-filters" role="tablist" aria-label="Filter entries">
          {(["All", ...types] as const).map((t) => (
            <button key={t} role="tab" aria-selected={filter === t} className={filter === t ? "is-active" : undefined} onClick={() => setFilter(t as "All" | EntryType)}>
              {t === "All" ? "All" : `${t}s`}
            </button>
          ))}
        </div>
        <div className="m2-cu-grid">
          {shown.map((e) => (
            <Link key={e.title} to={e.href} className="m2-cu-card">
              <Plate kind={e.plate} />
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
