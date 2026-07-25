import LabMeta from "./LabMeta";
import MadronaLogo from "./MadronaLogo";
import "./madrona-v2.css";

import berryImage from "../../../docs/madrona-v2-build-kit/placeholders/product-proof/berry-good-brand-system-wide.webp";
import sanImage from "../../../docs/madrona-v2-build-kit/placeholders/product-proof/san-juan-product-proof-wide.webp";

const serviceDetails = [
  {
    number: "01",
    id: "brand-growth",
    title: "Brand and growth",
    lead: "Give people a clear reason to choose you—and come back.",
    summary:
      "We connect positioning, identity, commerce, and the customer journey so every touchpoint reinforces the same promise.",
    includes: [
      "Positioning and messaging",
      "Brand identity and design systems",
      "Websites and digital commerce",
      "Customer journeys, loyalty, and retention",
    ],
    label: "Customer path",
    flow: "Attention → purchase → loyalty",
    proof: "A clearer reason to choose and return",
    example: "Berry Good",
    exampleCopy:
      "A demonstration farm brand carried from identity and packaging into a simple buying experience.",
    type: "brand",
  },
  {
    number: "02",
    id: "new-products",
    title: "New Products & Services",
    lead: "Turn a promising idea into evidence you can act on.",
    summary:
      "We make new ideas tangible early, test the riskiest assumptions, and build the smallest useful version before a larger investment.",
    includes: [
      "Opportunity framing and customer research",
      "Service concepts and product strategy",
      "Prototypes and demand validation",
      "Focused pilots and production builds",
    ],
    label: "Validation path",
    flow: "Problem → prototype → pilot",
    proof: "Evidence before investment",
    example: "San Juan Boating Guide",
    exampleCopy:
      "A regional product idea shaped into a route-planning prototype that can be tested with real boaters.",
    type: "product",
  },
  {
    number: "03",
    id: "operations-ai",
    title: "Operations and AI",
    lead: "Give repetitive work to systems built to handle it.",
    summary:
      "We improve the work behind the customer experience with practical tools, connected workflows, automation, and carefully scoped AI.",
    includes: [
      "Workflow mapping and service operations",
      "Internal tools and system integrations",
      "Automation and practical AI agents",
      "Measurement, safeguards, and stewardship",
    ],
    label: "Operations path",
    flow: "Request → decision → action",
    proof: "Less manual coordination",
    example: "Order intake",
    exampleCopy:
      "An incoming wholesale request becomes a structured order, an availability check, and a clear next action.",
    type: "ops",
  },
] as const;

function ServiceExample({ service }: { service: (typeof serviceDetails)[number] }) {
  if (service.type !== "ops") {
    const image = service.type === "brand" ? berryImage : sanImage;
    return (
      <div className="m2-service-detail-proof">
        <img src={image} alt="" />
        <div className="m2-service-detail-overlay">
          <small>{service.label}</small>
          <strong>{service.flow}</strong>
          <span><i />{service.proof}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="m2-service-detail-proof m2-service-detail-ops">
      <div className="m2-detail-request">
        <small>New wholesale request</small>
        <strong>Blueberries · 20 lbs</strong>
        <span>Delivery window: May 12–14</span>
      </div>
      <div className="m2-detail-agent-result">
        <span>Availability checked</span>
        <strong>Draft order ready</strong>
        <b aria-hidden="true">✓</b>
      </div>
      <div className="m2-service-detail-overlay">
        <small>{service.label}</small>
        <strong>{service.flow}</strong>
        <span><i />{service.proof}</span>
      </div>
    </div>
  );
}

export default function MadronaV2Services() {
  return (
    <main className="m2 m2-services-page">
      <LabMeta title="Services · Madrona Product Studio" />
      <header className="m2-nav">
        <a className="m2-logo-link" href="/lab/madrona-v2" aria-label="Madrona Product Studio home"><MadronaLogo decorative /></a>
        <nav aria-label="Primary">
          <a aria-current="page" href="#services">Services</a>
          <a href="/lab/madrona-v2#process">Approach</a>
          <a href="/lab/madrona-v2#products">Our apps</a>
          <a href="/lab/madrona-v2#studio">About</a>
        </nav>
        <a className="m2-button m2-nav-cta" href="/connect">Let’s connect</a>
      </header>

      <section className="m2-services-page-hero">
        <p className="m2-kicker">Services</p>
        <h1>Start with what should change.</h1>
        <p>Some businesses need to become easier to choose. Some need to prove what’s next. Others need the work behind the scenes to run better. We help with all three—and often connect them.</p>
      </section>

      <nav className="m2-service-index" aria-label="Service areas">
        {serviceDetails.map((service) => (
          <a href={`#${service.id}`} key={service.id}>
            <span>{service.number}</span>
            <strong>{service.title}</strong>
            <small>{service.lead}</small>
            <b aria-hidden="true">↓</b>
          </a>
        ))}
      </nav>

      <div id="services" className="m2-service-details">
        {serviceDetails.map((service) => (
          <section className="m2-service-detail" id={service.id} key={service.id}>
            <div className="m2-service-detail-intro">
              <span className="m2-service-number">{service.number}</span>
              <p className="m2-kicker">{service.title}</p>
              <h2>{service.lead}</h2>
              <p>{service.summary}</p>
            </div>

            <div className="m2-service-detail-content">
              <div className="m2-service-includes">
                <p className="m2-kicker">The work can include</p>
                <ul>
                  {service.includes.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>

              <figure className="m2-service-example">
                <ServiceExample service={service} />
                <figcaption>
                  <div>
                    <span>Example in action</span>
                    <strong>{service.example}</strong>
                  </div>
                  <p>{service.exampleCopy}</p>
                </figcaption>
              </figure>
            </div>
          </section>
        ))}
      </div>

      <section className="m2-engagement-shapes">
        <div>
          <p className="m2-kicker">How an engagement takes shape</p>
          <h2>Use the smallest move that creates useful evidence.</h2>
        </div>
        <ol>
          <li><span>01</span><strong>Clarify</strong><p>Name the problem, the outcome, and what must be true.</p></li>
          <li><span>02</span><strong>Prove</strong><p>Make the idea tangible and test the important assumptions.</p></li>
          <li><span>03</span><strong>Build</strong><p>Ship the right-sized solution and learn from real use.</p></li>
        </ol>
      </section>

      <section className="m2-services-page-cta">
        <p className="m2-kicker">Not sure where your project fits?</p>
        <h2>Start with where the business is getting stuck.</h2>
        <p>We’ll help identify the right first move in a straightforward 30-minute conversation.</p>
        <a className="m2-button" href="/connect">Start a conversation</a>
      </section>

      <footer className="m2-footer">
        <MadronaLogo variant="horizontal-reversed" />
        <div><a href="/lab/madrona-v2">Home</a><a href="#services">Services</a><a href="/lab/madrona-v2#process">Approach</a><a href="/lab/madrona-v2#studio">About</a></div>
        <p>Bellingham, Washington<br />hello@madronastudio.com</p>
        <small>V2 concept lab · noindex</small>
      </footer>
    </main>
  );
}
