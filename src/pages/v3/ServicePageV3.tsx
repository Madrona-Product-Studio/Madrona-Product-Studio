import { Link } from "react-router-dom";
import { serviceAreas, type ServiceArea, type ServiceId } from "../../data/services";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import { useCalEmbed, bookClick, bookHref, bookProps } from "../lab/useCalEmbed";
import { BriefArtifact, ReviewArtifact, WorkflowArtifact } from "./V3Artifacts";
import "../lab/madrona-v2.css";
import "./v3.css";

type Module = { kicker: string; title: string; body: string; to: string; artifact: "brief" | "flow" | "review" | "capabilities" | "problems" | "outputs" | "image"; items?: string[] };

const operationsModules: Module[] = [
  { kicker: "Know what changed", title: "Turn scattered signals into a short brief.", body: "An agent watches the sources that matter, explains what moved, and routes the useful signal to a next step.", to: "/tools/industry-brief", artifact: "brief" },
  { kicker: "Move work forward", title: "Connect the request, decision, and action.", body: "We remove repeated entry and brittle handoffs while keeping people in control of the judgment calls.", to: "/tools/customer-inbox", artifact: "flow" },
  { kicker: "Keep review visible", title: "Give people one clear place to approve.", body: "Drafts, exceptions, and open questions arrive ready for review instead of getting buried across tools.", to: "/tools", artifact: "review" },
  { kicker: "See the operation", title: "Make the work legible at a glance.", body: "A focused command surface shows what ran, what changed, and what needs attention next.", to: "https://helm.day", artifact: "image" },
];

function serviceModules(service: ServiceArea): Module[] {
  if (service.id === "operations-and-ai") return operationsModules;
  const [firstGroup, secondGroup] = service.capabilityGroups;
  return [
    { kicker: firstGroup.title, title: service.valuePoints[0].title, body: service.valuePoints[0].description, to: `/services#${service.id}`, artifact: "capabilities", items: firstGroup.items },
    { kicker: secondGroup.title, title: service.valuePoints[1].title, body: service.valuePoints[1].description, to: `/services#${service.id}`, artifact: "capabilities", items: secondGroup.items },
    { kicker: "Where we begin", title: "Make the problem concrete before making the solution bigger.", body: service.bestFor, to: `/services#${service.id}`, artifact: "problems", items: service.problems.slice(0, 4) },
    { kicker: "What the work can become", title: service.valuePoints[2].title, body: service.valuePoints[2].description, to: `/services#${service.id}`, artifact: "image" },
  ];
}

function ListArtifact({ label, items }: { label: string; items: string[] }) {
  return <article className="v3-artifact v3-data-artifact"><header><span>{label} · example scope</span><small>Shaped to the engagement</small></header><ul>{items.map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong><em>{index === 0 ? "Good place to start" : "As needed"}</em></li>)}</ul><footer>Illustrative structure using this service area’s canonical scope.</footer></article>;
}

function ModuleArtifact({ module, service }: { module: Module; service: ServiceArea }) {
  const { artifact: kind } = module;
  if (kind === "brief") return <BriefArtifact />;
  if (kind === "flow") return <WorkflowArtifact />;
  if (kind === "review") return <ReviewArtifact />;
  if (kind !== "image") return <ListArtifact label={kind === "problems" ? "Typical problems" : kind === "outputs" ? "Possible outputs" : "Capability set"} items={module.items ?? []} />;
  return <figure className="v3-module-image"><img src={service.artifact.src} alt={service.artifact.alt} /><figcaption>{service.artifact.caption}</figcaption></figure>;
}

export default function ServicePageV3({ serviceId }: { serviceId: ServiceId }) {
  const service = serviceAreas.find((item) => item.id === serviceId) ?? serviceAreas[0];
  const modules = serviceModules(service);
  useCalEmbed();
  return (
    <main className="m2 v3">
      <LabMeta title={`${service.name} · Madrona Product Studio`} />
      <M2Nav active="services" />
      <section className="v3-service-hero v3-shell">
        <div className="v3-service-copy">
          <p className="v3-kicker">{service.name}</p>
          <h1>{service.outcome}</h1>
          <p className="v3-lede">{service.summary}</p>
          <a className="v3-btn v3-btn-primary" href={bookHref()} {...bookProps()} onClick={bookClick}>Book a 30m free chat</a>
        </div>
        <div className="v3-service-art">{service.id === "operations-and-ai" ? <BriefArtifact /> : <figure className="v3-service-proof"><img src={service.artifact.src} alt={service.artifact.alt} /><figcaption><span>Existing product proof</span>{service.artifact.caption}</figcaption></figure>}</div>
      </section>

      <section className="v3-section v3-shell">
        <div className="v3-spread-intro"><div><p className="v3-kicker">What we put to work</p><h2>Every useful system produces something you can see.</h2></div><p>We start with the work, then choose the smallest practical combination of workflow design, software, and AI.</p></div>
        <div className="v3-module-grid">{modules.map((mod) => <article className="v3-module" key={mod.title}><div className="v3-module-copy"><p className="v3-kicker">{mod.kicker}</p><h3>{mod.title}</h3><p>{mod.body}</p><Link to={mod.to}>See this service in context <span aria-hidden="true">→</span></Link></div><ModuleArtifact module={mod} service={service} /></article>)}</div>
      </section>

      <section className="v3-section v3-shell v3-detail-band">
        <div><p className="v3-kicker">A practical fit</p><h2>Start with the friction you already feel.</h2><p>{service.bestFor}</p></div>
        <div className="v3-bands">
          <div><h3>Included skills</h3>{service.capabilityGroups.map(group => <div className="v3-chip-group" key={group.title}><p>{group.title}</p><ul className="v3-chips">{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
          <div className="v3-problem-output"><div><h3>Typical problems</h3><ul className="v3-problems">{service.problems.slice(0, 5).map(item => <li key={item}>{item}</li>)}</ul></div><div><h3>What we might make</h3><ul className="v3-chips">{service.outputs.map(item => <li key={item}>{item}</li>)}</ul></div></div>
        </div>
      </section>

      <section className="v3-start v3-shell"><div><p className="v3-kicker">How we start</p><h2>A small first move with visible payback.</h2></div><div><p>{service.startingPoint}</p><div className="v3-start-links"><a className="v3-btn v3-btn-primary" href={bookHref()} {...bookProps()} onClick={bookClick}>Book a 30m free chat</a>{service.tryIt && <Link to={service.tryIt.to}>{service.tryIt.label} →</Link>}{service.demos && <Link to={service.demos.to}>{service.demos.label} →</Link>}{service.pov && <Link to={service.pov.to}>{service.pov.label} →</Link>}</div></div></section>
      <SiteFooter cta={false} />
    </main>
  );
}
