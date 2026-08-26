import { Link } from "react-router-dom";
import { bookClick, bookHref, bookProps } from "../lab/useCalEmbed";
import { BriefArtifact, ReviewArtifact, WorkflowArtifact } from "./V3Artifacts";
import heroImage from "../../../docs/madrona-v2-build-kit/hero-options/hero-island-editorial.webp";
import berryDashboard from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-operations-dashboard.webp";

export type HeroVariant = "a" | "b" | "c";

const stack = ["Claude", "OpenAI", "Shopify", "Vercel", "Resend", "GA4", "Cal.com", "GitHub"];

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
