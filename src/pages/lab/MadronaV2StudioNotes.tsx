import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import "./madrona-v2.css";
import "./playbook.css";

// Studio Notes — the publication stream (2026-08-05). Learnings, artifacts,
// and essays from inside the studio, published as they are banked. Entries
// are typed; published ones link to their own page, forthcoming ones carry
// an honest status chip instead of a dead link.

type Entry = {
  date: string;
  type: "Artifact" | "Essay" | "Thesis" | "Note";
  title: string;
  gist: string;
  href?: string;
  status?: string;
};

const ENTRIES: Entry[] = [
  {
    date: "Aug 2026",
    type: "Artifact",
    title: "The Madrona engine, in three diagrams",
    gist: "The platform every project inherits, the gates that hold the bar, and the learning loop that compounds. Our build engine, opened up.",
    href: "/notes/the-madrona-engine",
  },
  {
    date: "Aug 2026",
    type: "Thesis",
    title: "The Madrona Product Thesis",
    gist: "A working theory of how great software gets built in the AI era, and what that changes about product leadership.",
    href: "/thesis",
  },
  {
    date: "In the works",
    type: "Note",
    title: "The checklist our launches taught us",
    gist: "Twenty-plus dated findings from shipping real products, and what each one changed about how we build.",
    status: "Coming soon",
  },
  {
    date: "In the works",
    type: "Essay",
    title: "Madrona Principles",
    gist: "Fourteen working principles for building things worth building, tested against the work and revised when the work disagrees.",
    status: "Coming soon",
  },
  {
    date: "Forthcoming",
    type: "Essay",
    title: "The Teams That Build Next",
    gist: "How small, senior, AI-enabled teams change what product organizations look like.",
    status: "Forthcoming",
  },
];

export default function MadronaV2StudioNotes() {
  useReveal();

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="Studio Notes · Madrona Product Studio" />
      <M2Nav active="notes" />

      {/* Masthead */}
      <section className="m2-ab4 m2-th-hero">
        <p className="m2-kicker m2-who-kicker">From inside the studio</p>
        <h1>Studio <span className="m2-pop">Notes.</span></h1>
        <p className="m2-th-standfirst">Learnings, artifacts, and essays from the workshop: how we build, what the work keeps teaching us, and the thinking behind the products. Published as it happens, dated and specific.</p>
      </section>

      {/* The stream */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The stream</p>
          <p className="m2-ab4-statement">Notes are banked from real work, so this page grows the way the studio does.</p>
        </div>
        <div className="m2-pb-notes">
          {ENTRIES.map((e) => (
            <div key={e.title} className="m2-pb-note">
              <span className="nd">{e.date}</span>
              <div>
                <div className="nt">
                  {e.href ? (
                    <Link className="m2-pb-notelink" to={e.href}>{e.title} <span aria-hidden="true">→</span></Link>
                  ) : (
                    e.title
                  )}
                </div>
                <div className="nm">{e.gist}</div>
              </div>
              <span className="ns">{e.status ?? e.type}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Close */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Why we publish</p>
          <p className="m2-ab4-statement">Builders who teach.</p>
        </div>
        <div className="m2-ab4-body">
          <p>We build it, set it up, and teach you to run it. Sharing what the work teaches us is part of the same posture: the deliverable is a business that does not need us, and a craft that gets better in the open.</p>
          <div className="m2-th-close-links">
            <Link className="m2-text-link" to="/connect">Get in touch <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
