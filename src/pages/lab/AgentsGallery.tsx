import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { agents } from "../../data/agents";
import { ConnectorLogos } from "./connectors";
import "./madrona-v2.css";
import "./agent-demo.css";

// The Tools gallery — the top-level "what can I deploy" surface. Built on the
// shared page scaffolding (m2-ab-page + m2-ab4 masthead/sections) so it reads
// as a sibling of /thinking and /apps. Grouped by category; compact panel
// rows. Data lives in data/agents.ts.

export default function AgentsGallery() {
  useReveal();
  const cats = Array.from(new Set(agents.map((a) => a.category)));

  return (
    <main className="m2 m2-ab-page">
      <LabMeta title="Tools we deploy for your business · Madrona Product Studio" />
      <M2Nav active="tools" />

      {/* Masthead — same shape as /thinking */}
      <section className="m2-ab4 m2-th-hero">
        <p className="m2-kicker m2-who-kicker">Deployable AI</p>
        <h1>Tools.</h1>
        <p className="m2-th-standfirst">
          The tools we build and deploy for a business: each an AI agent on a
          real workflow, each stopping for a human wherever it touches money,
          customers, or judgment. Run any of them live on Berry Good, our
          demonstration farm, then we set it up on your operation and leave you
          able to run it yourself.
        </p>
      </section>

      {/* Grouped panel rows */}
      <section className="m2-ab4">
        <div className="agx-groups" aria-label="Available tools">
          {cats.map((cat) => {
            const items = agents.filter((a) => a.category === cat);
            return (
              <div className="agx-group" key={cat}>
                <div className="agx-group-head">
                  <span>{cat}</span>
                  <span>{items.length} {items.length === 1 ? "agent" : "agents"}</span>
                </div>
                <div className="agx-group-rows">
                  {items.map((a) => (
                    <Link key={a.id} to={a.href} className="agx-row" data-reveal>
                      <div className="agx-row-logos"><ConnectorLogos items={a.connects} /></div>
                      <div className="agx-row-main">
                        <h2>{a.name}</h2>
                        <p>{a.blurb}</p>
                      </div>
                      <div className="agx-row-right">
                        <span className="agx-row-cadence">{a.cadence}</span>
                        <span className="m2-text-link agx-row-cta">Run the demo <span aria-hidden="true">→</span></span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <p className="m2-jr-cadence">Start with one workflow. A human stays in charge. Yours to keep, no lock-in.</p>
      </section>

      {/* Closing statement — same rail + body shape as /thinking's "Why we publish" */}
      <section className="m2-ab4 m2-ab4-sec">
        <div className="m2-ab4-rail">
          <p className="m2-kicker m2-who-kicker">Don’t see yours?</p>
          <p className="m2-ab4-statement">The pattern behind these generalizes to almost any operation.</p>
        </div>
        <div className="m2-ab4-body">
          <p>
            An agent on a real workflow, a human on the gate, one source of truth
            underneath. Tell us the work you&rsquo;d rather not do, and we&rsquo;ll
            tell you honestly whether an agent belongs on it.
          </p>
          <div className="m2-th-close-links">
            <Link className="m2-text-link" to="/connect">Get in touch <span aria-hidden="true">→</span></Link>
            <Link className="m2-text-link" to="/services/agentic-operations">How agentic operations work <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
