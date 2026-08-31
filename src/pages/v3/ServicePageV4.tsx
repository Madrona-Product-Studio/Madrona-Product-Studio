import { Link } from "react-router-dom";
import { serviceAreas, type ServiceArea, type ServiceId } from "../../data/services";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import { useCalEmbed } from "../lab/useCalEmbed";
import { BriefArtifact } from "./V3Artifacts";
import { BeforeAfterArtifact, JourneyArtifact, RoutingArtifact, ThreadArtifact, VariantsArtifact, WeekArtifact } from "./ServiceArtifacts";
import "../lab/madrona-v2.css";
import "./v3.css";

// The V4 service template (Charlie's review batch, 2026-08-30): a full hero,
// then the old prod page's condensed actionable core right below it (value
// points + the dense four-column strip), then CXO-style worked examples that
// each pair copy with a different structured artifact. The four-ways-in rail
// was tried and cut (Charlie: the strip is the payload, not cross-nav).
// Rolled out to all four doors 08-30 (Charlie sign-off on the refined
// template); operations keeps bespoke artifacts, the other three build
// worked examples from the service data until each earns its own.
type Module = { kicker: string; title: string; body: string; to: string; linkLabel: string; artifact: "brief" | "thread" | "routing" | "journey" | "variants" | "beforeafter" | "image" | "list"; items?: string[]; listLabel?: string };

const operationsModules: Module[] = [
  { kicker: "Know what changed", title: "Turn scattered signals into a short brief.", body: "An agent watches the sources that matter, explains what moved, and routes the useful signal to a next step.", to: "/tools/industry-brief", linkLabel: "See the industry brief agent", artifact: "brief" },
  { kicker: "Move work forward", title: "Everything lands somewhere.", body: "Requests come in every shape; each one gets routed with enough context to act, and the judgment calls stay yours.", to: "/tools/customer-inbox", linkLabel: "See the customer inbox agent", artifact: "routing" },
  { kicker: "Keep review visible", title: "The agent drafts. You decide.", body: "Questions arrive answered, in your voice, waiting for your okay — the conversation where the work actually happens.", to: "/tools", linkLabel: "Browse the live tools", artifact: "thread" },
  { kicker: "See the operation", title: "Make the work legible at a glance.", body: "A focused command surface shows what ran, what changed, and what needs attention next.", to: "https://helm.day", linkLabel: "Open the Helm demo", artifact: "image" },
];

// The other three doors build their worked examples from the service data
// until each earns bespoke artifacts like operations has.
function serviceModules(service: ServiceArea): Module[] {
  if (service.id === "operations-and-ai") return operationsModules;
  const [firstGroup, secondGroup] = service.capabilityGroups;
  const proofTo = service.demos?.to ?? service.tryIt?.to ?? "/apps";
  const proofLabel = service.demos?.label ?? service.tryIt?.label ?? "See the work in context";
  const mods: Module[] = [
    { kicker: firstGroup.title, title: service.valuePoints[0].title, body: service.valuePoints[0].description, to: proofTo, linkLabel: proofLabel, artifact: "list", items: firstGroup.items, listLabel: firstGroup.title },
    { kicker: secondGroup.title, title: service.valuePoints[1].title, body: service.valuePoints[1].description, to: proofTo, linkLabel: proofLabel, artifact: "list", items: secondGroup.items, listLabel: secondGroup.title },
    { kicker: "Where we begin", title: "Make the problem concrete before making the solution bigger.", body: service.bestFor, to: "/where-to-start", linkLabel: "Find where to start", artifact: "list", items: service.problems.slice(0, 4), listLabel: "Typical problems" },
    { kicker: "What the work can become", title: service.valuePoints[2].title, body: service.valuePoints[2].description, to: proofTo, linkLabel: proofLabel, artifact: "image" },
  ];
  // Door-specific deliverable windows (artifact library, 2026-08-30).
  if (service.id === "customers-and-growth") {
    mods[0] = { ...mods[0], artifact: "journey", title: "Find the leak, wire the return.", body: "The come-back path usually breaks in one quiet spot. We make it visible, then install the fix." };
    mods[3] = { ...mods[3], artifact: "variants", title: "Learn what actually works.", body: "Every send teaches the next one. Honest tests beat taste debates." };
  }
  return mods;
}

function ListArtifact({ label, items }: { label: string; items: string[] }) {
  return <article className="v3-artifact v3-data-artifact"><header><span>{label}</span><small>Shaped to the engagement</small></header><ul>{items.map((item, index) => <li key={item}><span>0{index + 1}</span><strong>{item}</strong><em>{index === 0 ? "Good place to start" : "As needed"}</em></li>)}</ul></article>;
}

function HeroWindow({ serviceId }: { serviceId: ServiceId }) {
  if (serviceId === "operations-and-ai") return <WeekArtifact />;
  if (serviceId === "brand-and-web") return <BeforeAfterArtifact />;
  if (serviceId === "customers-and-growth") return <ThreadArtifact />;
  if (serviceId === "new-products") return <VariantsArtifact />;
  return <BriefArtifact />;
}

function ModuleArtifact({ mod, service }: { mod: Module; service: ServiceArea }) {
  if (mod.artifact === "brief") return <BriefArtifact />;
  if (mod.artifact === "routing") return <RoutingArtifact />;
  if (mod.artifact === "thread") return <ThreadArtifact />;
  if (mod.artifact === "journey") return <JourneyArtifact />;
  if (mod.artifact === "variants") return <VariantsArtifact />;
  if (mod.artifact === "beforeafter") return <BeforeAfterArtifact />;
  if (mod.artifact === "list") return <ListArtifact label={mod.listLabel ?? "Scope"} items={mod.items ?? []} />;
  return <figure className="v3-module-image v4-module-image"><img src={service.artifact.src} alt={service.artifact.alt} /><figcaption>{service.artifact.caption}</figcaption></figure>;
}

export default function ServicePageV4({ serviceId }: { serviceId: ServiceId }) {
  const service = serviceAreas.find((item) => item.id === serviceId) ?? serviceAreas[0];
  const modules = serviceModules(service);
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
            <Link className="v3-btn v3-btn-primary" to="/connect">Get in touch</Link>
            {service.tryIt && <Link className="v3-hero-text-link" to={service.tryIt.to}>{service.tryIt.label} <span aria-hidden="true">→</span></Link>}
          </div>
        </div>
        <div className="v4-hero-art" aria-hidden="true">
          <figure className="v3-service-proof v4-hero-image"><img src={service.artifact.src} alt="" /><figcaption><span>Working proof</span>{service.artifact.caption}</figcaption></figure>
          <div className="v4-hero-window"><HeroWindow serviceId={service.id} /></div>
        </div>
      </section>

      <section className="v4-points v3-shell">
        {service.valuePoints.map((point, index) => (
          <div key={point.title}><span>0{index + 1}</span><strong>{point.title}</strong><p>{point.description}</p></div>
        ))}
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
            <Link to="/connect">Get in touch <span aria-hidden="true">→</span></Link>
            {service.demos && <Link to={service.demos.to}>{service.demos.label} <span aria-hidden="true">→</span></Link>}
            {service.tryIt && <Link to={service.tryIt.to}>{service.tryIt.label} <span aria-hidden="true">→</span></Link>}
            {service.pov && <Link to={service.pov.to}>{service.pov.label} <span aria-hidden="true">→</span></Link>}
          </div>
        </div>
      </section>

      <section className="v4-modules v3-shell">
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
            <div className="v4-module-art"><ModuleArtifact mod={mod} service={service} /></div>
          </article>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
