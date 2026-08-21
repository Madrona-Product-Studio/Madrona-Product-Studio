import { Link } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import { agents } from "../../data/agents";
import "./madrona-v2.css";
import "./agent-demo.css";

// The agent gallery — the top-level "what can I deploy" surface. Every card is
// a live demo you can run before you ever talk to us. Data lives in
// data/agents.ts; this page just renders it.

export default function AgentsGallery() {
  useReveal();

  return (
    <main className="m2 agx-gallery-page">
      <LabMeta title="Agents you can deploy · Madrona Product Studio" />
      <M2Nav active="agents" />

      <section className="agx-gallery-hero">
        <p className="m2-kicker">Agents</p>
        <h1>Agents you can actually deploy.</h1>
        <p className="agx-gallery-lede">
          Not a demo reel of what AI might do someday. These are agents we build
          and run ourselves — each on a real workflow, each stopping for a human
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

      <section className="agx-gallery-grid" aria-label="Available agents">
        {agents.map((a) => (
          <Link key={a.id} className="agx-card" to={a.href} data-reveal>
            <div className="agx-card-top">
              <span className="agx-card-cat">{a.category}</span>
              <span className="agx-card-cadence">{a.cadence}</span>
            </div>
            <h2 className="agx-card-name">{a.name}</h2>
            <p className="agx-card-blurb">{a.blurb}</p>
            <div className="agx-card-connects">
              <span className="agx-card-connects-lbl">Connects to</span>
              <div className="agx-chips">
                {a.connects.map((c) => <span key={c} className="agx-chip">{c}</span>)}
              </div>
            </div>
            <span className="agx-card-cta">Run the live demo <span aria-hidden="true">→</span></span>
          </Link>
        ))}
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
