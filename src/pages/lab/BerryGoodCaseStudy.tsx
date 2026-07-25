import { useRef, useState } from "react";

import berryImage from "../../../docs/madrona-v2-build-kit/placeholders/product-proof/berry-good-brand-system-wide.webp";
import berryStorefrontDesktop from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-storefront-desktop.webp";
import berryStorefrontMobile from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-storefront-mobile.webp";
import berryJourneyImage from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-customer-journey.webp";
import berryOperationsImage from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-operations-dashboard.webp";
import berryAiImage from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-ai-assistance.webp";

const berryViews = [
  {
    id: "brand",
    number: "01",
    tab: "Brand system",
    eyebrow: "Brand direction",
    headline: "Warm, trustworthy, and unmistakably local.",
    description: "A cohesive identity that shows up on every touchpoint, from the berry box to the roadside sign.",
    capabilities: ["Visual identity and brand guide", "Packaging, signage, and print", "Photography direction and voice"],
  },
  {
    id: "storefront",
    number: "02",
    tab: "Digital storefront",
    eyebrow: "Digital storefront",
    headline: "Know what’s ripe before you go.",
    description: "A website that answers the questions customers actually have, beautifully and quickly on any device.",
    capabilities: ["Live availability and crop updates", "Seasonal commerce and pre-orders", "Hours, directions, and farm information"],
  },
  {
    id: "journey",
    number: "03",
    tab: "Customer journey",
    eyebrow: "Customer journey",
    headline: "Simple from start to pickup.",
    description: "A clear, connected experience from discovery to the stand.",
    capabilities: ["Browse availability", "Order and confirm", "Pickup with ease"],
  },
  {
    id: "operations",
    number: "04",
    tab: "Operations",
    eyebrow: "Operations",
    headline: "Run the day from one simple dashboard.",
    description: "Update once. Keep the website, orders, signs, and customers in sync.",
    capabilities: ["Inventory and crop status", "Orders and pickup queue", "Hours, messages, and publishing"],
  },
  {
    id: "ai",
    number: "05",
    tab: "AI assistance",
    eyebrow: "AI assistance",
    headline: "Helpful answers. Handled with care.",
    description: "AI helps capture orders and answer questions, so the team can focus on the farm and customers.",
    capabilities: ["Answer questions in the farm’s voice", "Capture orders by chat or text", "Summarize and route requests"],
  },
] as const;

type BerryView = (typeof berryViews)[number];
type BerryViewId = BerryView["id"];

function CapabilityList({ items }: { items: readonly string[] }) {
  return <ul className="berry-capabilities">{items.map((item) => <li key={item}><i aria-hidden="true">✓</i>{item}</li>)}</ul>;
}

function BrandVisual() {
  return (
    <div className="berry-brand-visual">
      <img src={berryImage} alt="Berry Good identity shown across a brand guide, packaging, tags, and a mobile storefront" />
    </div>
  );
}

function StorefrontVisual() {
  return (
    <div className="berry-storefront-visual">
      <picture>
        <source media="(max-width: 720px)" srcSet={berryStorefrontMobile} />
        <img src={berryStorefrontDesktop} alt="Berry Good digital storefront shown across desktop and mobile devices with seasonal availability and ordering" />
      </picture>
    </div>
  );
}

function ReferenceVisual({ alt, src }: { alt: string; src: string }) {
  return (
    <div className="berry-reference-visual">
      <img src={src} alt={alt} />
    </div>
  );
}

function ViewVisual({ id }: { id: BerryViewId }) {
  if (id === "brand") return <BrandVisual />;
  if (id === "storefront") return <StorefrontVisual />;
  if (id === "journey") return <ReferenceVisual src={berryJourneyImage} alt="Berry Good customer journey from discovering ripe fruit through ordering, confirmation, and pickup" />;
  if (id === "operations") return <ReferenceVisual src={berryOperationsImage} alt="Berry Good farm dashboard showing inventory, orders, pickups, and messages" />;
  return <ReferenceVisual src={berryAiImage} alt="Berry Good AI assistant turning a customer conversation into a farm order" />;
}

function PanelNarrative({ view }: { view: BerryView }) {
  return (
    <div className="berry-panel-narrative">
      <p>{view.eyebrow}</p>
      <h3>{view.headline}</h3>
      <span>{view.description}</span>
      <CapabilityList items={view.capabilities} />
      {view.id === "brand" && <div className="berry-color-dots" aria-label="Berry Good palette"><i /><i /><i /><i /></div>}
    </div>
  );
}

function DesktopCaseStudy() {
  const requestedView = new URLSearchParams(window.location.search).get("berry");
  const initialView = berryViews.some((view) => view.id === requestedView)
    ? requestedView as BerryViewId
    : "brand";
  const [active, setActive] = useState<BerryViewId>(initialView);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeView = berryViews.find((view) => view.id === active) ?? berryViews[0];

  function moveTab(index: number) {
    const next = (index + berryViews.length) % berryViews.length;
    setActive(berryViews[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="berry-case-desktop">
      <div className="berry-tabs" role="tablist" aria-label="Berry Good business system">
        {berryViews.map((view,index) => <button
          aria-controls={`berry-panel-${view.id}`}
          aria-selected={active === view.id}
          id={`berry-tab-${view.id}`}
          key={view.id}
          onClick={() => setActive(view.id)}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") { event.preventDefault(); moveTab(index + 1); }
            if (event.key === "ArrowLeft") { event.preventDefault(); moveTab(index - 1); }
            if (event.key === "Home") { event.preventDefault(); moveTab(0); }
            if (event.key === "End") { event.preventDefault(); moveTab(berryViews.length - 1); }
          }}
          ref={(element) => { tabRefs.current[index] = element; }}
          role="tab"
          tabIndex={active === view.id ? 0 : -1}
        ><span>{view.number}</span>{view.tab}</button>)}
      </div>
      <div aria-labelledby={`berry-tab-${activeView.id}`} className={`berry-panel berry-panel-${activeView.id}`} id={`berry-panel-${activeView.id}`} role="tabpanel">
        <div className="berry-panel-visual"><ViewVisual id={activeView.id} /></div>
        <PanelNarrative view={activeView} />
      </div>
    </div>
  );
}

function MobileCaseStudy() {
  return (
    <div className="berry-case-mobile">
      {berryViews.map((view) => <article key={view.id}>
        <header><span>{view.number}</span><strong>{view.tab}</strong></header>
        <PanelNarrative view={view} />
        <div className={`berry-panel-visual berry-panel-visual-${view.id}`}><ViewVisual id={view.id} /></div>
      </article>)}
    </div>
  );
}

export default function BerryGoodCaseStudy() {
  return (
    <section className="berry-case-study" id="work">
      <div className="berry-case-intro">
        <p className="m2-kicker">One business, improved end to end</p>
        <span className="m2-chip">Example Experience</span>
        <h2>Berry Good<br />Berry Farm</h2>
        <p>A fictional farm showing how brand, customer experience, operations, and AI can become one coherent business system.</p>
        <ul>
          <li><i />One identity</li>
          <li><i />One source of truth</li>
          <li><i />A simpler day for everyone</li>
        </ul>
      </div>
      <DesktopCaseStudy />
      <MobileCaseStudy />
    </section>
  );
}
