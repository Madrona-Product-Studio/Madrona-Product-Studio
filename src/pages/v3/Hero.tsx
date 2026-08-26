import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serviceAreas } from "../../data/services";
import { bookClick, bookHref, bookProps } from "../lab/useCalEmbed";
import hero1 from "../../../docs/madrona-v2-build-kit/site-assets/hero-1.webp";
import hero2 from "../../../docs/madrona-v2-build-kit/site-assets/hero-2.webp";
import hero3 from "../../../docs/madrona-v2-build-kit/site-assets/hero-3.webp";
import hero4 from "../../../docs/madrona-v2-build-kit/site-assets/hero-4.webp";
import hero5 from "../../../docs/madrona-v2-build-kit/site-assets/hero-5.webp";
import hero6 from "../../../docs/madrona-v2-build-kit/site-assets/hero-6.webp";

// The locked hero direction (Charlie, 2026-08-26): the live site's six-image
// rotation running full-bleed, message left on a paper scrim, the what-we-can-do
// doors card + one signal-check example mid-frame, and the explicit next-steps
// band on the bottom edge. Exploration variants live in git history on the
// codex-redesign branch (hero-lab, removed here per the lock-in rule).
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
    <ul>{rows.map(([label, status], index) => <li key={label}><span>{label}</span><strong className={index === 3 ? "is-bark" : ""}>{status}</strong></li>)}</ul>
    <footer><span>First recommendation</span><p>Fix the highest-friction handoff before adding another tool.</p></footer>
  </article>;
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
  return <div className="v3-current-next"><div className="v3-current-next-label"><span>Next steps</span><Link to="/consulting#process">How we work →</Link></div><ol>{nextSteps.map(([number, title, note], index) => <li key={number}><span>{number}</span><div><strong>{title}</strong><small>{note}</small></div>{index < nextSteps.length - 1 && <i aria-hidden="true">→</i>}</li>)}</ol></div>;
}

export function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setHeroIndex(index => (index + 1) % heroImages.length), heroInterval);
    return () => window.clearTimeout(id);
  }, [heroIndex]);
  return <section className="v3-current-hero">
    <div className="v3-current-images">{heroImages.map((src, index) => <img key={src} src={src} alt={index === 0 ? "Pacific Northwest landscapes across the Salish Sea" : ""} aria-hidden={index === 0 ? undefined : true} className={index === heroIndex ? "is-active" : ""} loading={index < 2 ? "eager" : "lazy"} />)}<button type="button" className="v3-current-cycle" aria-label={`Hero image ${heroIndex + 1} of ${heroImages.length}. Show next image.`} onClick={() => setHeroIndex(index => (index + 1) % heroImages.length)}><svg key={heroIndex} viewBox="0 0 36 36" aria-hidden="true"><circle className="v3-current-cycle-track" cx="18" cy="18" r="15" /><circle className="v3-current-cycle-arc" cx="18" cy="18" r="15" /></svg></button></div>
    <div className="v3-shell v3-current-main">
      <div className="v3-current-scrim"><HeroCopy descriptor="A senior product studio that finds the most valuable move, makes it tangible, and builds it with you." /></div>
      <div className="v3-current-cluster"><DoorsCard /><div className="v3-current-diagnostic"><DiagnosticCard compact /></div></div>
    </div>
    <div className="v3-shell v3-current-band"><NextStepsBand /></div>
  </section>;
}
