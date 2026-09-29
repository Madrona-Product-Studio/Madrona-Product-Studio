// TEMP (2026-09-29): hero-to-work transition options. Route
// /lab/transition/:v (a | b | c | d). Unlinked, noindex. Delete this folder,
// its route, and the AreasSection intro/firstClassName hooks' TEMP note once
// Charlie picks and the winner is wired into HomeV3.
import { useParams } from "react-router-dom";
import LabMeta from "../LabMeta";
import M2Nav from "../M2Nav";
import { Hero } from "../../v3/Hero";
import { AreasSection, areas } from "../../v3/AreasSection";
import { studioProducts } from "../../../data/studioProducts";
import "../madrona-v2.css";
import "../../v3/v3.css";
import "../../v3/home-refactor.css";
import "./transition.css";

const pad = (i: number) => String(i + 1).padStart(2, "0");

// Short capability words per area, for the bridge strip.
const shortWhat: Record<string, string> = {
  "ai-operations": "Reports, finance agents, inbox triage",
  "brand-website": "Brands, storefronts, local guides",
  "growth-retention": "Follow-up, reviews, onboarding",
  "new-products": "Prototype to launched product",
};

/* A · the section opens with a map of what's coming. */
function IndexIntro() {
  return <header className="ar-intro tr-index" id="work">
    <div><p className="v3-kicker">The work</p><h2>Here’s what we build.</h2></div>
    <ol>{areas.map((a, i) => <li key={a.id}><a href={`#area-${a.id}`}><span>{pad(i)}</span><strong>{a.name}</strong><em>{a.question}</em><i aria-hidden="true">↓</i></a></li>)}</ol>
  </header>;
}

/* B · a strip of the four areas straddling the hero's bottom edge. */
function BridgeStrip() {
  return <nav className="tr-bridge v3-shell" aria-label="What we build">
    <ol>{areas.map((a, i) => <li key={a.id}><a href={`#area-${a.id}`}><span>{pad(i)}</span><strong>{a.name}</strong><em>{shortWhat[a.id]}</em><i aria-hidden="true">↓</i></a></li>)}</ol>
  </nav>;
}

/* C · proof between the promise and the work. */
const running = ["lila-trips", "san-juan-boating-guide", "helm", "lila-yoga"];
const STACK = ["anthropic", "cursor", "vercel", "github", "shopify", "stripe", "quickbooks", "square"];
function ProofStrip() {
  const products = running.map(id => studioProducts.find(p => p.id === id)).filter(Boolean);
  return <section className="tr-proof" aria-label="What we run and what we build with">
    <div className="v3-shell tr-proof-row">
      <div className="tr-proof-block">
        <p className="tr-proof-label">Built and running</p>
        <ul className="tr-running">{products.map(p => p && <li key={p.id}><i className={`is-${p.stage}`} aria-hidden="true" />{p.name}<small>{p.stage === "live" ? "live" : p.stage === "beta" ? "beta" : "in development"}</small></li>)}
          <li><i className="is-demo" aria-hidden="true" />Berry Good<small>demo business</small></li></ul>
      </div>
      <div className="tr-proof-block tr-stack">
        <p className="tr-proof-label">We build with</p>
        <ul>{STACK.map(m => <li key={m}><img src={`/images/stack/${m}.svg`} alt={m} width="22" height="22" /></li>)}</ul>
      </div>
    </div>
  </section>;
}

/* D · one continuous ground: no rule, the contours drift down, a thread leads in. */
function ContinuousIntro() {
  return <header className="ar-intro tr-cont" id="work">
    <div><p className="v3-kicker">The work</p><h2>Here’s what we build.</h2></div>
    <p className="tr-cont-list">{areas.map((a, i) => <a key={a.id} href={`#area-${a.id}`}>{a.name}{i < areas.length - 1 ? <span aria-hidden="true"> · </span> : null}</a>)}</p>
  </header>;
}

export default function TransitionPreview() {
  const v = (useParams().v ?? "a").toLowerCase();
  let between = null, intro, first = "", root = "";
  if (v === "a") { intro = <IndexIntro />; }
  else if (v === "b") { between = <BridgeStrip />; first = "tr-after-bridge"; root = "tr-b"; }
  else if (v === "c") { between = <ProofStrip />; first = "tr-after-proof"; root = "tr-c"; }
  else { intro = <ContinuousIntro />; first = "tr-after-cont"; root = "tr-d"; }
  return <div className={`m2 v3 ${root}`}>
    <LabMeta title={`Transition ${v.toUpperCase()} · preview`} noindex />
    <M2Nav />
    <main id="main"><Hero />{between}<AreasSection intro={intro} firstClassName={first} /></main>
  </div>;
}
