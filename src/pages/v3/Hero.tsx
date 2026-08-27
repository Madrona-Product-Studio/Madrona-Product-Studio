import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bookClick, bookHref, bookProps } from "../lab/useCalEmbed";
import hero1 from "../../../docs/madrona-v2-build-kit/site-assets/hero-1.webp";
import hero2 from "../../../docs/madrona-v2-build-kit/site-assets/hero-2.webp";
import hero3 from "../../../docs/madrona-v2-build-kit/site-assets/hero-3.webp";
import hero4 from "../../../docs/madrona-v2-build-kit/site-assets/hero-4.webp";
import hero5 from "../../../docs/madrona-v2-build-kit/site-assets/hero-5.webp";
import hero6 from "../../../docs/madrona-v2-build-kit/site-assets/hero-6.webp";

// The locked hero direction (Charlie, 2026-08-26): the live site's six-image
// rotation bleeding off the right edge, message left on warm paper, a wide
// signal-check example crossing into the image fade, and explicit next steps.
const heroImages = [hero2, hero1, hero3, hero4, hero5, hero6];
const heroInterval = 9000;
const stack = ["Claude", "OpenAI", "Shopify", "Vercel", "Resend", "GA4", "Cal.com", "GitHub"];

function HeroCopy({ descriptor }: { descriptor: string }) {
  return <div className="v3-home-copy v3-experiment-copy">
    <p className="v3-kicker">Product strategy · design · engineering</p>
    <h1>Figure out what to build, <span>then build it.</span></h1>
    <p className="v3-lede">{descriptor}</p>
    <div className="v3-actions"><a className="v3-btn v3-btn-primary" href={bookHref()} {...bookProps()} onClick={bookClick}>Book a 30m free chat</a><Link className="v3-hero-text-link" to="/checkup">Take the free signal check <span aria-hidden="true">→</span></Link></div>
  </div>;
}

function DiagnosticCard() {
  const rows = [["Web presence", "Underselling"], ["Repeat customers", "Leaking away"], ["Hours lost to admin", "12+ a week"], ["AI leverage", "Untapped"]];
  const better = [["Clearer offer", "76%"], ["Repeat path", "54%"], ["Admin relief", "68%"]];
  return <article className="v3-artifact v3-wide-diagnostic" aria-label="Signal check example diagnostic">
    <header><span>Signal check · example</span><small>Illustrative read</small></header>
    <div className="v3-diagnostic-panes">
      <section><h2>Current signals</h2><ul className="v3-diagnostic-status">{rows.map(([label, status], index) => <li key={label}><span>{label}</span><strong className={index === 3 ? "is-bark" : ""}>{status}</strong></li>)}</ul></section>
      <section><h2>What better looks like</h2><ul className="v3-better-bars">{better.map(([label, width], index) => <li key={label}><span>{label}</span><i><b className={index === 2 ? "is-bark" : ""} style={{ width }} /></i><small>{index === 0 ? "Clear" : index === 1 ? "Connected" : "Useful"}</small></li>)}</ul></section>
      <section className="v3-recommendation-pane"><h2>First recommendation</h2><p>Fix the highest-friction handoff before adding another tool.</p><span>Start with the workflow people already repeat.</span></section>
    </div>
  </article>;
}

function ProofStackPanel() {
  return <article className="v3-artifact v3-current-proof"><section><h2>Built at</h2><div className="v3-built-logos"><img src="/images/logos/rei-logo.svg" alt="REI" /><img src="/images/logos/healthline-logo.svg" alt="Healthline" /><img src="/images/logos/microsoft-logo.svg" alt="Microsoft" /></div></section><section><h2>Stack</h2><ul>{stack.map(tool => <li key={tool}>{tool}</li>)}</ul></section></article>;
}

const nextSteps = [
  ["01", "Talk it through", "Free 30 minutes"],
  ["02", "A written point of view", "Free, you keep it"],
  ["03", "The smallest useful build", "Paid, only if it makes sense"],
];

function NextStepsBand() {
  return <div className="v3-current-next"><div className="v3-current-next-label"><span>Next steps</span><Link to="/services#process">How we work →</Link></div><ol>{nextSteps.map(([number, title, note], index) => <li key={number}><span>{number}</span><div><strong>{title}</strong><small>{note}</small></div>{index < nextSteps.length - 1 && <i aria-hidden="true">→</i>}</li>)}</ol></div>;
}

export function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setHeroIndex(index => (index + 1) % heroImages.length), heroInterval);
    return () => window.clearTimeout(id);
  }, [heroIndex]);
  return <section className="v3-current-hero">
    <div className="v3-shell v3-current-main">
      <HeroCopy descriptor="A senior product studio that finds the most valuable move, makes it tangible, and builds it with you." />
      <div className="v3-current-images">{heroImages.map((src, index) => <img key={src} src={src} alt={index === 0 ? "Pacific Northwest landscapes across the Salish Sea" : ""} aria-hidden={index === 0 ? undefined : true} className={index === heroIndex ? "is-active" : ""} loading={index < 2 ? "eager" : "lazy"} />)}<button type="button" className="v3-current-cycle" aria-label={`Hero image ${heroIndex + 1} of ${heroImages.length}. Show next image.`} onClick={() => setHeroIndex(index => (index + 1) % heroImages.length)}><svg key={heroIndex} viewBox="0 0 36 36" aria-hidden="true"><circle className="v3-current-cycle-track" cx="18" cy="18" r="15" /><circle className="v3-current-cycle-arc" cx="18" cy="18" r="15" /></svg></button></div>
      <div className="v3-current-cluster"><DiagnosticCard /><div className="v3-current-proof-wrap"><ProofStackPanel /></div></div>
    </div>
    <div className="v3-shell v3-current-band"><NextStepsBand /></div>
  </section>;
}
