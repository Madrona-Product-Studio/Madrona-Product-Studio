import { Link } from "react-router-dom";
import { serviceAreas, type ServiceArea, type ServiceId } from "../../data/services";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import { useCalEmbed, bookClick, bookHref, bookProps } from "../lab/useCalEmbed";
import { BriefArtifact, ReviewArtifact, WorkflowArtifact } from "./V3Artifacts";
import "../lab/madrona-v2.css";
import "./v3.css";

// The V4 service template (Charlie's review batch, 2026-08-30): blends the
// old prod page's compact moves (sticky door rail, dense four-column strip)
// with CXO-style variety (each worked example pairs copy with a different
// structured artifact) under a full hero. Refining on AI & Operations first;
// the other three doors stay on ServicePageV3 until the template is signed
// off, then rollout is a route flip.
const SERVICE_ROUTES: Record<ServiceId, string> = {
  "operations-and-ai": "/services/ai-operations",
  "brand-and-web": "/services/brand-website",
  "customers-and-growth": "/services/growth-retention",
  "new-products": "/services/new-products",
};

type Module = { kicker: string; title: string; body: string; to: string; linkLabel: string; artifact: "brief" | "flow" | "review" | "image" };

const operationsModules: Module[] = [
  { kicker: "Know what changed", title: "Turn scattered signals into a short brief.", body: "An agent watches the sources that matter, explains what moved, and routes the useful signal to a next step.", to: "/tools/industry-brief", linkLabel: "See the industry brief agent", artifact: "brief" },
  { kicker: "Move work forward", title: "Connect the request, decision, and action.", body: "We remove repeated entry and brittle handoffs while keeping people in control of the judgment calls.", to: "/tools/customer-inbox", linkLabel: "See the customer inbox agent", artifact: "flow" },
  { kicker: "Keep review visible", title: "Give people one clear place to approve.", body: "Drafts, exceptions, and open questions arrive ready for review instead of getting buried across tools.", to: "/tools", linkLabel: "Browse the live tools", artifact: "review" },
  { kicker: "See the operation", title: "Make the work legible at a glance.", body: "A focused command surface shows what ran, what changed, and what needs attention next.", to: "https://helm.day", linkLabel: "Open the Helm demo", artifact: "image" },
];

function ModuleArtifact({ kind, service }: { kind: Module["artifact"]; service: ServiceArea }) {
  if (kind === "brief") return <BriefArtifact />;
  if (kind === "flow") return <WorkflowArtifact />;
  if (kind === "review") return <ReviewArtifact />;
  return <figure className="v3-module-image v4-module-image"><img src={service.artifact.src} alt={service.artifact.alt} /><figcaption>{service.artifact.caption}</figcaption></figure>;
}

export default function ServicePageV4({ serviceId }: { serviceId: ServiceId }) {
  const service = serviceAreas.find((item) => item.id === serviceId) ?? serviceAreas[0];
  const modules = operationsModules;
  useCalEmbed();
  return (
    <main className="m2 v3">
      <LabMeta title={`${service.name} · Madrona Product Studio`} />
      <M2Nav active="services" />

      <section className="v4-hero v3-shell">
        <div className="v4-hero-copy">
          <p className="v3-kicker">{service.name}</p>
          <h1>{service.outcome}</h1>
          <p className="v3-lede">{service.summary}</p>
          <div className="v3-actions">
            <a className="v3-btn v3-btn-primary" href={bookHref()} {...bookProps()} onClick={bookClick}>Get in touch</a>
            {service.tryIt && <Link className="v3-hero-text-link" to={service.tryIt.to}>{service.tryIt.label} <span aria-hidden="true">→</span></Link>}
          </div>
        </div>
        <div className="v4-hero-art" aria-hidden="true">
          <figure className="v3-service-proof v4-hero-image"><img src={service.artifact.src} alt="" /><figcaption><span>Working proof</span>{service.artifact.caption}</figcaption></figure>
          <div className="v4-hero-window"><BriefArtifact /></div>
        </div>
      </section>

      <section className="v4-points v3-shell">
        {service.valuePoints.map((point, index) => (
          <div key={point.title}><span>0{index + 1}</span><strong>{point.title}</strong><p>{point.description}</p></div>
        ))}
      </section>

      <section className="v4-body v3-shell">
        <aside className="v4-rail">
          <p>Four ways in</p>
          <ol>
            {serviceAreas.map((area, index) => (
              <li key={area.id} className={area.id === service.id ? "is-active" : undefined}>
                <Link to={SERVICE_ROUTES[area.id]}><span>0{index + 1}</span>{area.door}</Link>
              </li>
            ))}
          </ol>
        </aside>
        <div className="v4-modules">
          <div className="v4-modules-intro"><p className="v3-kicker">What we put to work</p><h2>Every useful system produces something you can see.</h2></div>
          {modules.map((mod) => (
            <article className="v4-module" key={mod.title}>
              <div className="v4-module-copy">
                <p className="v3-kicker">{mod.kicker}</p>
                <h3>{mod.title}</h3>
                <p>{mod.body}</p>
                {mod.to.startsWith("http")
                  ? <a href={mod.to} target="_blank" rel="noopener noreferrer">{mod.linkLabel} <span aria-hidden="true">→</span></a>
                  : <Link to={mod.to}>{mod.linkLabel} <span aria-hidden="true">→</span></Link>}
              </div>
              <div className="v4-module-art"><ModuleArtifact kind={mod.artifact} service={service} /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="v4-strip v3-shell">
        <div>
          <h2>Included services</h2>
          {service.capabilityGroups.map(group => (
            <div key={group.title}><h3>{group.title}</h3><ul className="v4-checks">{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>
          ))}
        </div>
        <div>
          <h2>Typical problems</h2>
          <ul className="v4-bullets">{service.problems.slice(0, 5).map(item => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <h2>What we might make</h2>
          <ul className="v4-plain">{service.outputs.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <h2>How we start</h2>
          <p>{service.startingPoint}</p>
          <div className="v4-start-links">
            <a href={bookHref()} {...bookProps()} onClick={bookClick}>Get in touch <span aria-hidden="true">→</span></a>
            {service.demos && <Link to={service.demos.to}>{service.demos.label} <span aria-hidden="true">→</span></Link>}
            {service.tryIt && <Link to={service.tryIt.to}>{service.tryIt.label} <span aria-hidden="true">→</span></Link>}
            {service.pov && <Link to={service.pov.to}>{service.pov.label} <span aria-hidden="true">→</span></Link>}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
