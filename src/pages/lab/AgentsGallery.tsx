import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { agents } from "../../data/agents";
import { ConnectorLogos } from "./connectors";
import "./madrona-v2.css";
import "./agent-demo.css";

// The agent gallery — the top-level "what can I deploy" surface. Grouped by
// category (agent counts in the header), then compact panel rows: connector
// logos, name + blurb, cadence, run link. Data lives in data/agents.ts.

export default function AgentsGallery() {
  useReveal();
  const cats = Array.from(new Set(agents.map((a) => a.category)));

  return (
    <main className="m2 agx-gallery-page">
      <LabMeta title="Tools we deploy for your business · Madrona Product Studio" />
      <M2Nav active="tools" />

      <section className="agx-gallery-hero">
        <p className="m2-kicker">Tools</p>
        <h1>Tools we build and deploy for your business.</h1>
        <p className="agx-gallery-lede">
          Not a demo reel of what AI might do someday. Each of these is an agent
          we build and run ourselves — on a real workflow, stopping for a human
          wherever it touches money, customers, or judgment. Run any of them
          right here on Berry Good, our demonstration farm. When one fits, we
          deploy it on your operation and leave you able to run it yourself.
        </p>
        <div className="agx-gallery-principles">
          <span><i aria-hidden="true" />Start with one workflow</span>
          <span><i aria-hidden="true" />A human stays in charge</span>
          <span><i aria-hidden="true" />Yours to keep, no lock-in</span>
        </div>
      </section>

      <section className="agx-groups" aria-label="Available agents">
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
      </section>

      <section className="agx-gallery-foot">
        <div className="agx-gallery-foot-inner">
          <h2>Don’t see the job that eats your week?</h2>
          <p>
            These are the common ones. The pattern behind them — an agent on a
            real workflow, a human on the gate, one source of truth underneath —
            generalizes to almost any operation. Tell us the work you&rsquo;d
            rather not do, and we&rsquo;ll tell you honestly whether an agent
            belongs on it.
          </p>
          <div className="art-close-links">
            <Link className="m2-text-link" to="/connect">Book a free 30-minute call <span aria-hidden="true">→</span></Link>
            <Link className="m2-text-link" to="/services/agentic-operations">How agentic operations work <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
