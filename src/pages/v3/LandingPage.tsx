import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import Reveal from "./Reveal";
import { bookClick, bookHref, bookProps } from "../lab/useCalEmbed";
import type { PathStep } from "../../data/offer";
import { ctaClick } from "../../lib/analytics";
import "../lab/madrona-v2.css";
import "./v3.css";
import "./home-refactor.css";

// The area landing page (Charlie, 2026-10-05). Every service area is a
// landing page built from one structure, so they stay consistent: a dark hero
// that leads with the benefit and books the call, a visual of what the owner
// gets, a before/after table of what changes, the path as timed, priced
// steps, one example up close, the honest questions, and the ask again.
// Each area supplies its own copy, visuals, and offer (data/offer.ts).

export type LandingConfig = {
  slug: string;                       // analytics source prefix
  title: string;                      // document title
  kicker: string;
  headline: ReactNode;                // the <h1>, with its flash phrase in a <span>
  lede: string;
  alt?: { label: string; to: string }; // secondary hero link
  heroVisual: ReactNode;
  changes: { heading: string; colToday?: string; colAfter: string; rows: { job: string; before: string; after: string }[] };
  path: { heading: string; steps: PathStep[]; timing: Record<string, string> };
  showcase: { kicker: string; heading: string; intro: string; node: ReactNode };
  faq: { q: string; a: string }[];
  faqNote?: ReactNode;
  final: { heading: string; line: string };
};

function BookButton({ source }: { source: string }) {
  return <a className="v3-btn v3-btn-light ais-book" href={bookHref()} target="_blank" rel="noopener noreferrer" data-book-placement={source} {...bookProps()} onClick={bookClick}>Book a free 30-minute call</a>;
}

export default function LandingPage({ c }: { c: LandingConfig }) {
  return <div className="m2 v3">
    <LabMeta title={c.title} />
    <M2Nav active="services" />
    <main id="main">

    <section className="ais-hero">
      <div className="v3-shell ais-hero-grid">
        <div>
          <p className="ais-kicker">{c.kicker}</p>
          <h1>{c.headline}</h1>
          <p className="ais-lede">{c.lede}</p>
          <div className="ais-actions">
            <BookButton source={`${c.slug}-hero`} />
            {c.alt && <Link className="ais-alt" to={c.alt.to} onClick={ctaClick(c.alt.label, c.alt.to, `${c.slug}-hero`)}>{c.alt.label} <span aria-hidden="true">→</span></Link>}
          </div>
          <ul className="ais-trust"><li>Free first call</li><li>Fixed price, in writing</li><li>Yours to keep, no lock-in</li></ul>
        </div>
        {c.heroVisual}
      </div>
    </section>

    <Reveal as="section" className="v3-shell ais-changes" aria-labelledby="ais-changes-h">
      <div className="ais-head">
        <p className="v3-kicker">What changes for you</p>
        <h2 id="ais-changes-h">{c.changes.heading}</h2>
      </div>
      <table className="ais-table">
        <thead><tr><th scope="col">The job</th><th scope="col">{c.changes.colToday ?? "Today"}</th><th scope="col">{c.changes.colAfter}</th></tr></thead>
        <tbody>{c.changes.rows.map(r => <tr key={r.job}><th scope="row">{r.job}</th><td className="is-before">{r.before}</td><td className="is-after">{r.after}</td></tr>)}</tbody>
      </table>
    </Reveal>

    <Reveal as="section" className="v3-section ais-path" aria-labelledby="ais-path-h">
      <div className="v3-shell">
        <div className="ais-head">
          <p className="v3-kicker">How it works</p>
          <h2 id="ais-path-h">{c.path.heading}</h2>
        </div>
        <ol className="ais-timeline">{c.path.steps.map(step => <li key={step.id} id={step.id}>
          <p className="ais-when">{c.path.timing[step.id]}</p>
          <h3>{step.name}</h3>
          <p className="ais-step-line">{step.line}</p>
          <ul>{step.gets.slice(0, 3).map(g => <li key={g}>{g.split(":")[0]}</li>)}</ul>
          <p className="ais-price">{step.price}</p>
        </li>)}</ol>
      </div>
    </Reveal>

    <Reveal as="section" className="v3-shell ais-cc" aria-labelledby="ais-cc-h">
      <div className="ais-head ais-head-row">
        <div><p className="v3-kicker">{c.showcase.kicker}</p>
        <h2 id="ais-cc-h">{c.showcase.heading}</h2></div>
        <p>{c.showcase.intro}</p>
      </div>
      {c.showcase.node}
    </Reveal>

    <Reveal as="section" className="v3-shell ais-faq" aria-labelledby="ais-faq-h">
      <div className="ais-head">
        <p className="v3-kicker">Fair questions</p>
        <h2 id="ais-faq-h">What owners ask first.</h2>
      </div>
      <div className="ai-faq-list">{c.faq.map(f => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
      {c.faqNote && <p className="ais-new">{c.faqNote}</p>}
    </Reveal>

    <section className="ais-final">
      <div className="v3-shell ais-final-inner">
        <h2>{c.final.heading}</h2>
        <p>{c.final.line}</p>
        <BookButton source={`${c.slug}-final`} />
      </div>
    </section>

    </main>
    <SiteFooter cta={false} />
  </div>;
}
