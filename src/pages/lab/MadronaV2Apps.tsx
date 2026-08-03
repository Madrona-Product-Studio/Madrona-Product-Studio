import { useState } from "react";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { useReveal } from "./useReveal";
import appsHero from "../../../docs/madrona-v2-build-kit/site-assets/apps-hero.webp";
import "./madrona-v2.css";
import {
  studioProducts, STAGE_META, STAGE_ORDER, stageCounts, sortProducts,
  type ProductStage, type StudioProduct,
} from "../../data/studioProducts";

const STAGE_CLASS: Record<ProductStage, string> = {
  live: "live", beta: "beta", "in-development": "dev", prototype: "prototype", concept: "concept",
};

function StageBadge({ stage }: { stage: ProductStage }) {
  return <span className={`m2-stage m2-stage--${STAGE_CLASS[stage]} m2-stage--outline`}><i aria-hidden="true" />{STAGE_META[stage].label}</span>;
}

function Artifact({ product }: { product: StudioProduct }) {
  const { artifact, stage } = product;
  if (artifact.src) {
    return <div className="m2-ap-artifact"><img src={artifact.src} alt={artifact.alt} loading="lazy" /></div>;
  }
  const note =
    stage === "concept" ? "Early exploration" : stage === "prototype" ? "Prototype in progress" : "In progress";
  return (
    <div className={`m2-ap-artifact m2-ap-artifact--placeholder m2-ap-artifact--${STAGE_CLASS[stage]}`} role="img" aria-label={artifact.alt}>
      <span className="m2-ap-artifact-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v11H4zM4 20h16M9 9h6M9 12.5h4" /></svg></span>
      <small>{note}</small>
    </div>
  );
}

function ProductRow({ product }: { product: StudioProduct }) {
  return (
    <article className="m2-ap-row">
      <span className="m2-ap-logo"><img src={product.logoSrc} alt="" aria-hidden="true" /></span>
      <div className="m2-ap-identity">
        <h3>{product.name}</h3>
        <StageBadge stage={product.stage} />
        <p>{product.shortDescription}</p>
        {product.primaryAction && (
          <a className="m2-text-link m2-ap-action" href={product.primaryAction.href} {...(product.primaryAction.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {product.primaryAction.label}<span aria-hidden="true"> →</span>
            {product.primaryAction.external && <span className="m2-ap-sr"> (opens in a new tab)</span>}
          </a>
        )}
      </div>
      <Artifact product={product} />
      <dl className="m2-ap-context">
        <div><dt>Built for</dt><dd>{product.builtFor}</dd></div>
        <div><dt>Helps them</dt><dd>{product.helpsThem}</dd></div>
        <div><dt>Right now</dt><dd>{product.rightNow}</dd></div>
      </dl>
    </article>
  );
}

const WHY = [
  { title: "Keeps the work honest", body: "Real users and real constraints expose weak assumptions quickly." },
  { title: "Sharpens our judgment", body: "Operating products changes how we think about scope, quality, launch, and maintenance." },
  { title: "Creates a feedback loop", body: "What we learn from our products makes its way into every client engagement." },
];

export default function MadronaV2Apps() {
  useReveal();
  const [filter, setFilter] = useState<ProductStage | "all">("all");
  const counts = stageCounts(studioProducts);
  const presentStages = STAGE_ORDER.filter((s) => counts[s] > 0);
  const visible = sortProducts(studioProducts.filter((p) => filter === "all" || p.stage === filter));

  return (
    <main className="m2 m2-ap-page">
      <LabMeta title="Products · Madrona Product Studio" />
      <M2Nav active="apps" />

      <section className="m2-phead">
        <div className="m2-ab-intro-copy">
          <h1>Our products</h1>
          <span className="m2-ab-rule" aria-hidden="true" />
          <p className="m2-ab-headline">We build our own products because the best way to understand a new way of working is to practice it.</p>
          <div className="m2-ab-body">
            <p>Each product begins with a real customer problem and gives us a place to test ideas, improve our methods, and create something useful in its own right.</p>
          </div>
          <a className="m2-ap-jump" href="#why">Why we build our own products <span aria-hidden="true">↓</span></a>
        </div>
        <div className="m2-ab-intro-visual">
          <div className="m2-phead-media"><img src={appsHero} alt="Fog lifting off a forested Salish Sea shoreline" /></div>
        </div>
      </section>

      <div className="m2-ap-filters" role="group" aria-label="Filter apps by stage">
        <button type="button" aria-pressed={filter === "all"} className={filter === "all" ? "is-active" : ""} onClick={() => setFilter("all")}>All <b>{counts.all}</b></button>
        {presentStages.map((s) => (
          <button type="button" key={s} aria-pressed={filter === s} className={filter === s ? "is-active" : ""} onClick={() => setFilter(s)}>
            <i className={`m2-ap-dot m2-stage--${STAGE_CLASS[s]}`} aria-hidden="true" />{STAGE_META[s].label} <b>{counts[s]}</b>
          </button>
        ))}
      </div>

      <div className="m2-ap-list">
        {visible.map((p) => <ProductRow product={p} key={p.id} />)}
        {visible.length === 0 && (
          <p className="m2-ap-empty">No products are currently in this stage. <button type="button" className="m2-text-link" onClick={() => setFilter("all")}>Show all apps →</button></p>
        )}
      </div>

      <section className="m2-ap-why" id="why">
        <div className="m2-ap-why-intro">
          <h2>Why we build our own products</h2>
          <p>Operating our own products keeps the work honest. We make the strategy, design the experience, build the software, respond to users, and decide what to improve next.</p>
        </div>
        <ul className="m2-ap-why-list">
          {WHY.map((w) => <li key={w.title} data-reveal><strong>{w.title}</strong><p>{w.body}</p></li>)}
        </ul>
      </section>

      <SiteFooter />
    </main>
  );
}
