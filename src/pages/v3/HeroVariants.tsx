import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serviceAreas } from "../../data/services";
import { bookClick, bookHref, bookProps } from "../lab/useCalEmbed";
import { BriefArtifact, ReviewArtifact, WorkflowArtifact } from "./V3Artifacts";
import heroImage from "../../../docs/madrona-v2-build-kit/hero-options/hero-island-editorial.webp";
import berryDashboard from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-operations-dashboard.webp";
import hero1 from "../../../docs/madrona-v2-build-kit/site-assets/hero-1.webp";
import hero2 from "../../../docs/madrona-v2-build-kit/site-assets/hero-2.webp";
import hero3 from "../../../docs/madrona-v2-build-kit/site-assets/hero-3.webp";
import hero4 from "../../../docs/madrona-v2-build-kit/site-assets/hero-4.webp";
import hero5 from "../../../docs/madrona-v2-build-kit/site-assets/hero-5.webp";
import hero6 from "../../../docs/madrona-v2-build-kit/site-assets/hero-6.webp";

export type HeroVariant = "a" | "b" | "c";

const stack = ["Claude", "OpenAI", "Shopify", "Vercel", "Resend", "GA4", "Cal.com", "GitHub"];
const heroImages = [hero2, hero1, hero3, hero4, hero5, hero6];
const heroInterval = 9000;
const doorRoutes: Record<string, string> = { "operations-and-ai": "/v3/consulting/work-smarter", "customers-and-growth": "/consulting#customers-and-growth", "brand-and-web": "/consulting#brand-and-web", "new-products": "/consulting#new-products" };

function HeroCopy({ descriptor }: { descriptor: string }) {
  return <div className="v3-home-copy v3-experiment-copy">
    <p className="v3-kicker">Product strategy · design · engineering</p>
    <h1>Figure out what to build, <span>then build it.</span></h1>
    <p className="v3-lede">{descriptor}</p>
    <div className="v3-actions"><a className="v3-btn v3-btn-primary" href={bookHref()} {...bookProps()} onClick={bookClick}>Book a 30m free chat</a><Link className="v3-btn v3-btn-secondary" to="/checkup">Take the free signal check</Link></div>
  </div>;
}

function DiagnosticCard({ compact = false }: { compact?: boolean }) {
  const rows = [["Web presence", "Underselling"], ["Repeat customers", "Leaking away"], ["Hours lost to admin", "12+ a week"], ["AI leverage", "Untapped"]];
  return <article className={`v3-artifact v3-diagnostic${compact ? " is-compact" : ""}`} aria-label="Signal check example diagnostic">
    <header><span>Signal check · example</span><small>Illustrative read</small></header>
    <ul>{rows.map(([label,status], index) => <li key={label}><span>{label}</span><strong className={index === 3 ? "is-bark" : ""}>{status}</strong></li>)}</ul>
    <footer><span>First recommendation</span><p>Fix the highest-friction handoff before adding another tool.</p></footer>
  </article>;
}

function ProofStackPanel() {
  return <article className="v3-artifact v3-proof-stack">
    <section><h2>Built at</h2><div className="v3-built-logos"><img src="/images/logos/rei-logo.svg" alt="REI" /><img src="/images/logos/healthline-logo.svg" alt="Healthline" /><img src="/images/logos/microsoft-logo.svg" alt="Microsoft" /></div></section>
    <section><h2>Stack</h2><ul>{stack.map(tool => <li key={tool}>{tool}</li>)}</ul></section>
  </article>;
}

function MaturityPanel() {
  return <article className="v3-artifact v3-maturity" aria-label="Example product maturity panel">
    <header><span>Opportunity maturity · example</span><small>Current read</small></header>
    <ul>
      <li><span>Customer signal</span><i><b style={{ width: "72%" }} /></i><strong>Present</strong></li>
      <li><span>Working process</span><i><b style={{ width: "38%" }} /></i><strong>Fragmented</strong></li>
      <li><span>AI readiness</span><i><b style={{ width: "18%" }} /></i><strong className="is-bark">Early</strong></li>
    </ul>
  </article>;
}

function EvidenceBand() {
  return <div className="v3-evidence-band"><section><h2>Built at</h2><div className="v3-built-logos"><img src="/images/logos/rei-logo.svg" alt="REI" /><img src="/images/logos/healthline-logo.svg" alt="Healthline" /><img src="/images/logos/microsoft-logo.svg" alt="Microsoft" /></div></section><section><h2>Stack</h2><ul>{stack.map(tool => <li key={tool}>{tool}</li>)}</ul></section></div>;
}

function DoorsCard() {
  return <article className="v3-artifact v3-hero-doors"><header><span>What we can do</span><small>Four ways in</small></header><ul>{serviceAreas.map(service => <li key={service.id}><Link to={doorRoutes[service.id]}><strong>{service.door}</strong><span>{service.outcome}</span><i aria-hidden="true">→</i></Link></li>)}</ul></article>;
}

const nextSteps = [
  ["01", "Talk it through", "Free 30 minutes"],
  ["02", "A written point of view", "Free, you keep it"],
  ["03", "The smallest useful build", "Paid, only if it makes sense"],
];

function NextStepsBand() {
  return <div className="v3-current-next"><div className="v3-current-next-label"><span>Next steps</span><Link to="/consulting#process">How we work →</Link></div><ol>{nextSteps.map(([number,title,note], index) => <li key={number}><span>{number}</span><div><strong>{title}</strong><small>{note}</small></div>{index < nextSteps.length - 1 && <i aria-hidden="true">→</i>}</li>)}</ol></div>;
}

export function CurrentHero() {
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setHeroIndex(index => (index + 1) % heroImages.length), heroInterval);
    return () => window.clearTimeout(id);
  }, [heroIndex]);
  return <section className="v3-current-hero">
    <div className="v3-current-images">{heroImages.map((src,index) => <img key={src} src={src} alt={index === 0 ? "Pacific Northwest landscapes across the Salish Sea" : ""} aria-hidden={index === 0 ? undefined : true} className={index === heroIndex ? "is-active" : ""} loading={index < 2 ? "eager" : "lazy"} />)}<button type="button" className="v3-current-cycle" aria-label={`Hero image ${heroIndex + 1} of ${heroImages.length}. Show next image.`} onClick={() => setHeroIndex(index => (index + 1) % heroImages.length)}><svg key={heroIndex} viewBox="0 0 36 36" aria-hidden="true"><circle className="v3-current-cycle-track" cx="18" cy="18" r="15" /><circle className="v3-current-cycle-arc" cx="18" cy="18" r="15" /></svg></button></div>
    <div className="v3-shell v3-current-main">
      <div className="v3-current-scrim"><HeroCopy descriptor="A senior product studio that finds the most valuable move, makes it tangible, and builds it with you." /></div>
      <div className="v3-current-cluster"><DoorsCard /><div className="v3-current-diagnostic"><DiagnosticCard compact /></div></div>
    </div>
    <div className="v3-shell v3-current-band"><NextStepsBand /></div>
  </section>;
}

export function HeroA() {
  return <section className="v3-hero-a">
    <div className="v3-shell v3-hero-a-inner"><HeroCopy descriptor="We diagnose where the real leverage is, make the first move tangible, and build the system with your team." /><div className="v3-cluster-a"><img src={heroImage} alt="A warm view across the Salish Sea and island shoreline" /><div className="v3-cluster-diagnostic"><DiagnosticCard /></div><div className="v3-cluster-proof"><ProofStackPanel /></div></div></div>
  </section>;
}

export function HeroB() {
  return <section className="v3-hero-b" style={{ backgroundImage: `url(${heroImage})` }}>
    <div className="v3-shell v3-hero-b-main"><div className="v3-hero-scrim"><HeroCopy descriptor="Bring us the opportunity, the friction, or the question. We turn it into a clear product move and working proof." /></div><div className="v3-cluster-b"><DiagnosticCard compact /><MaturityPanel /></div></div><div className="v3-shell"><EvidenceBand /></div>
  </section>;
}

export function HeroC() {
  return <section className="v3-hero-c"><div className="v3-shell v3-hero-c-inner"><HeroCopy descriptor="Senior product strategy, design, and engineering for finding the useful signal and turning it into something real." /><div className="v3-work-surface"><img src={berryDashboard} alt="Berry Good demonstration operations dashboard" /><div className="v3-paper v3-paper-brief"><BriefArtifact /></div><div className="v3-paper v3-paper-flow"><WorkflowArtifact /></div><div className="v3-paper v3-paper-review"><ReviewArtifact /></div><div className="v3-paper v3-paper-diagnostic"><DiagnosticCard compact /></div></div></div></section>;
}

export function HeroVariantView({ variant }: { variant: HeroVariant }) {
  if (variant === "a") return <HeroA />;
  if (variant === "b") return <HeroB />;
  return <HeroC />;
}
