import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import "./madrona-v2.css";
import "./playbook.css";

// Current entry: Madrona Principles (Essay). Source of truth:
// charlie-hq thinking/madrona/foundation/principles.md, published nearly
// verbatim; the doc's own framing (working principles, revised when
// evidence changes) is the standfirst.

const PRINCIPLES = [
  { lead: "Build things worth building.", body: "Speed and leverage are not meaningful without purpose." },
  { lead: "Start with people, not technology.", body: "AI is an enabler, not the reason a product should exist." },
  { lead: "Stay close to the customer.", body: "Customer understanding cannot be outsourced to process or generated output." },
  { lead: "Working software is a learning tool.", body: "Build early enough that reality can challenge the idea." },
  { lead: "The disciplines remain.", body: "Product, Design, Engineering, Research, Content, and other crafts retain distinct value." },
  { lead: "Everyone contributes to building.", body: "The goal is not role collapse. It is broader contribution from each vector of expertise." },
  { lead: "Product leadership creates clarity.", body: "The work is to help a team understand what matters, why it matters, and what to learn next." },
  { lead: "Small senior teams have unusual leverage.", body: "Keep teams coherent, experienced, and close to the outcome." },
  { lead: "Use AI to expand people.", body: "Technology should amplify judgment, creativity, access, and capability rather than diminish them." },
  { lead: "Learning speed matters more than output volume.", body: "The advantage is not more software. It is better understanding gained through software." },
  { lead: "Evolution beats theater.", body: "Help teams move one meaningful stage forward instead of performing a wholesale transformation." },
  { lead: "Share what the work teaches.", body: "Publishing observations strengthens the practice and makes the learning useful to others." },
  { lead: "Protect craft.", body: "Lower implementation cost does not lower the bar for quality, coherence, or care." },
  { lead: "Leave the world better than we found it.", body: "Direct finite energy toward work that improves lives, communities, access, health, equity, stewardship, or human possibility." },
];

export default function MadronaV2PrinciplesNote() {
  useReveal();

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="Madrona Principles · Current" />
      <M2Nav active="current" />

      {/* Hero */}
      <section className="m2-ab4 m2-th-hero">
        <p className="m2-kicker m2-who-kicker"><Link className="m2-pb-crumb" to="/current">Current</Link> · Essay · Aug 2026</p>
        <h1>Fourteen working <span className="m2-pop">principles.</span></h1>
        <p className="m2-th-standfirst">These are the principles Madrona works by: how we decide what to build, how we build it, and when to say no. They are working principles in the honest sense. We test them against the work and revise them when the evidence changes.</p>
      </section>

      {/* The principles */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">The principles</p>
          <p className="m2-ab4-statement">Held firmly, and loosely, at the same time.</p>
          <div className="m2-ab4-body">
            <p>Firmly, because a studio without principles is just a vendor. Loosely, because a principle the work has disproven is a superstition.</p>
          </div>
        </div>
        <div className="m2-pr-list">
          {PRINCIPLES.map((p, i) => (
            <div key={p.lead} className="m2-pr-item">
              <span className="n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <p><b>{p.lead}</b> {p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Close */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Why publish them</p>
          <p className="m2-ab4-statement">Principle twelve is why this page exists.</p>
        </div>
        <div className="m2-ab4-body">
          <p>Share what the work teaches. Publishing these makes them testable by people outside the building, which is the fastest way to find out which ones are wrong. If the work disagrees with this page, the page changes.</p>
          <div className="m2-th-close-links">
            <Link className="m2-text-link" to="/thesis">Read the thesis <span aria-hidden="true">→</span></Link>
            <Link className="m2-text-link" to="/current">More from Current <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
