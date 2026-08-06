import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import "./madrona-v2.css";
import "./playbook.css";

// The Madrona Journal — the publication stream (named 2026-08-05). When the
// work teaches us something, we organize the thinking and publish it here.
// Feed design: one lead entry with an entry plate (a small designed visual,
// never a naked text row), earlier entries as dated archive rows, and one
// honest cadence line. Published work only; nothing forthcoming is listed.

type Entry = {
  date: string;
  type: "Artifact" | "Essay" | "Thesis" | "Note";
  title: string;
  dek: string;
  href: string;
  cta: string;
};

// Newest first. ENTRIES[0] renders as the lead story.
const ENTRIES: Entry[] = [
  {
    date: "August 2026",
    type: "Artifact",
    title: "The Madrona engine, in three diagrams",
    dek: "The platform every project inherits, the gates that hold the bar, and the learning loop that compounds with every launch. Our build engine, opened up.",
    href: "/journal/the-madrona-engine",
    cta: "Open the artifact",
  },
  {
    date: "August 2026",
    type: "Thesis",
    title: "The Madrona Product Thesis",
    dek: "A working theory of how great software gets built in the AI era, and what that changes about product leadership.",
    href: "/thesis",
    cta: "Read the thesis",
  },
];

// The lead entry's plate: a distilled rendition of the engine diagram
// (pipeline over the platform band). Decorative; the title carries meaning.
function EnginePlate() {
  return (
    <div className="m2-jr-plate" aria-hidden="true">
      <div className="m2-jr-plate-pipe">
        <span /><span /><span className="gate" /><span className="gate" /><span />
      </div>
      <div className="m2-jr-plate-band">
        <span /><span /><span /><span /><span />
      </div>
      <div className="m2-jr-plate-return" />
    </div>
  );
}

function ThesisPlate() {
  return (
    <div className="m2-jr-plate m2-jr-plate-quote" aria-hidden="true">
      <p>&ldquo;Everyone builds, but they build different things.&rdquo;</p>
    </div>
  );
}

const PLATES: Record<string, () => React.JSX.Element> = {
  "The Madrona engine, in three diagrams": EnginePlate,
  "The Madrona Product Thesis": ThesisPlate,
};

export default function MadronaV2Journal() {
  useReveal();
  const [lead, ...rest] = ENTRIES;
  const LeadPlate = PLATES[lead.title];

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="The Madrona Journal · Madrona Product Studio" />
      <M2Nav active="journal" />

      {/* Masthead */}
      <section className="m2-ab4 m2-th-hero">
        <p className="m2-kicker m2-who-kicker">From inside the studio</p>
        <h1>The Madrona <span className="m2-pop">Journal.</span></h1>
        <p className="m2-th-standfirst">When the work teaches us something, we write it down and organize the thinking, so we can build on it and so can you. Artifacts, essays, and learnings, published when they are ready.</p>
      </section>

      {/* Lead entry */}
      <section className="m2-ab4">
        <Link to={lead.href} className="m2-jr-lead">
          <div className="m2-jr-lead-text">
            <p className="m2-jr-meta"><span className="m2-jr-type">{lead.type}</span> · {lead.date}</p>
            <h2>{lead.title}.</h2>
            <p className="m2-jr-dek">{lead.dek}</p>
            <span className="m2-text-link">{lead.cta} <span aria-hidden="true">→</span></span>
          </div>
          {LeadPlate && <LeadPlate />}
        </Link>
      </section>

      {/* Earlier entries */}
      <section className="m2-ab4 m2-jr-archive">
        {rest.map((e) => {
          const Plate = PLATES[e.title];
          return (
            <Link key={e.title} to={e.href} className="m2-jr-row">
              <p className="m2-jr-meta"><span className="m2-jr-type">{e.type}</span> · {e.date}</p>
              <div className="m2-jr-row-main">
                <h3>{e.title} <span aria-hidden="true">→</span></h3>
                <p>{e.dek}</p>
              </div>
              {Plate && <Plate />}
            </Link>
          );
        })}
        <p className="m2-jr-cadence">Entries publish when the work has taught us something worth organizing. No schedule, no filler.</p>
      </section>

      {/* Why we publish */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Why a journal</p>
          <p className="m2-ab4-statement">Builders who teach.</p>
        </div>
        <div className="m2-ab4-body">
          <p>We build it, set it up, and teach you to run it. Publishing what the work teaches us is the same posture: a craft that gets better in the open, and thinking that others can build on.</p>
          <div className="m2-th-close-links">
            <Link className="m2-text-link" to="/connect">Get in touch <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
