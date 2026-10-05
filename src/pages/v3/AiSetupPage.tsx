import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import LabMeta from "../lab/LabMeta";
import M2Nav from "../lab/M2Nav";
import SiteFooter from "../lab/SiteFooter";
import Reveal from "./Reveal";
import { WindowBar } from "./ReadCard";
import { bookClick, bookHref, bookProps } from "../lab/useCalEmbed";
import { AI_PATH, SETUP_SPRINT } from "../../data/offer";
import { HELM_DEMO_URL } from "../../data/proof";
import { CommandCenter } from "./showcase/CommandCenter";
import { ctaClick, outboundClick } from "../../lib/analytics";
import "../lab/madrona-v2.css";
import "./v3.css";
import "./home-refactor.css";

// /ai-setup (Charlie, 2026-10-05; reworked same day: "it should feel like a
// landing page where people can clearly see the benefit to them"). The
// sendable page for outreach, workshops, and a QR code. Built as a landing
// page, not a site page: a dark hero that leads with the benefit and books
// the call directly, a Monday-morning brief showing what the owner gets, the
// jobs that change as a before/after table, the path as a timed sequence with
// prices, an example command center (Berry Good) in place of a proof list,
// the honest questions, and the ask again.

const CHANGES: { job: string; before: string; after: string }[] = [
  { job: "Getting paid", before: "Chasing late invoices every Friday.", after: "Polite reminders go out on their own. You decide who gets grace." },
  { job: "The inbox", before: "Answering the same questions all day.", after: "Replies drafted in your voice, waiting for a quick okay." },
  { job: "The books", before: "Month-end eats a weekend.", after: "Month-end becomes a review of what was flagged." },
  { job: "Knowing where you stand", before: "Three tabs to find out what is slipping.", after: "One screen shows what ran and what needs you." },
];

const TIMING: Record<string, string> = {
  assessment: "Week 1",
  setup: "Weeks 2 and 3",
  "command-center": "Month 2 onward",
};

const FAQ: { q: string; a: string }[] = [
  { q: "Is my data safe?", a: "We set the AI up on business accounts, review the data settings with you, and connect it only to what the job needs. Anything that sends money or a message to a customer waits for your okay." },
  { q: "Do I need to be technical?", a: "No. If you can use email and a spreadsheet, you can run this. We set it up, teach your team, and leave a short written playbook." },
  { q: "Which AI do you use?", a: SETUP_SPRINT.tools },
  { q: "What if it doesn't work for us?", a: "The assessment tells you before you spend more, and setup is a fixed price and scope agreed in writing. Everything we set up is yours to keep, with no lock-in." },
  { q: "Is the first call really free?", a: "Yes. Thirty minutes, no obligation. If an assessment makes sense, we will say so, and if it doesn't, we will say that too." },
];

function BookButton({ source, light = false }: { source: string; light?: boolean }) {
  return <a className={`v3-btn ${light ? "v3-btn-light" : "v3-btn-primary"} ais-book`} href={bookHref()} target="_blank" rel="noopener noreferrer" data-book-placement={source} {...bookProps()} onClick={bookClick}>Book a free 30-minute call</a>;
}

// What the owner sees on a Monday: the benefit, shown. Illustrative.
// Motion (the week window's settle, 2026-10-05): the markup is the finished
// brief, so reduced motion, no JS, and a still frame all show it complete. JS
// arms the sequence before first paint, holds it until the window is on
// screen, then plays once (~3s): the greeting, each overnight job ticking from
// pending to done, then the one that needs you. Opacity and transform only.
function MondayBrief() {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("ais-play", "ais-hold");
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { el.classList.remove("ais-hold"); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const done: [string, string][] = [
    ["6 invoice reminders sent", "2 already paid"],
    ["14 customer questions answered", "From your own prices and hours"],
    ["Last week's numbers summarized", "Sales up, one slow day flagged"],
  ];
  return <article ref={ref} className="v3-artifact ais-brief" aria-label="An example Monday morning brief">
    <WindowBar path="your business · monday brief" note="Illustrative example" />
    <div className="ais-brief-head"><strong>Good morning.</strong><span>Here is what happened while you were out.</span></div>
    <ul className="ais-brief-done">{done.map(([what, note], i) => <li key={what} style={{ "--i": i } as CSSProperties}><i aria-hidden="true" /><span><b>{what}</b><small>{note}</small></span></li>)}</ul>
    <div className="ais-brief-you"><span className="ais-brief-tag">Needs you</span><b>Reply to a two-star review</b><small>Drafted. Yours to send.</small></div>
  </article>;
}

export default function AiSetupPage() {
  return <div className="m2 v3">
    <LabMeta title="AI for your operations · Madrona Product Studio" />
    <M2Nav active="services" />
    <main id="main">

    <section className="ais-hero">
      <div className="v3-shell ais-hero-grid">
        <div>
          <p className="ais-kicker">AI for small business operations</p>
          <h1>The invoices, inbox, and follow-up, <span>handled.</span> You just approve.</h1>
          <p className="ais-lede">We set AI up on the tools you already use, in two weeks, for a fixed price. It does the routine work; anything that matters waits for you.</p>
          <div className="ais-actions">
            <BookButton source="ai-setup-hero" light />
            <Link className="ais-alt" to="/ai-opportunities" onClick={ctaClick("Find your AI opportunities", "/ai-opportunities", "ai-setup-hero")}>Or take the free two-minute read <span aria-hidden="true">→</span></Link>
          </div>
          <ul className="ais-trust"><li>Free first call</li><li>Fixed price, in writing</li><li>Yours to keep, no lock-in</li></ul>
        </div>
        <MondayBrief />
      </div>
    </section>

    <Reveal as="section" className="v3-shell ais-changes" aria-labelledby="ais-changes-h">
      <div className="ais-head">
        <p className="v3-kicker">What changes for you</p>
        <h2 id="ais-changes-h">Your week, before and after.</h2>
      </div>
      <table className="ais-table">
        <thead><tr><th scope="col">The job</th><th scope="col">Today</th><th scope="col">After setup</th></tr></thead>
        <tbody>{CHANGES.map(c => <tr key={c.job}><th scope="row">{c.job}</th><td className="is-before">{c.before}</td><td className="is-after">{c.after}</td></tr>)}</tbody>
      </table>
    </Reveal>

    <Reveal as="section" className="v3-section ais-path" aria-labelledby="ais-path-h">
      <div className="v3-shell">
        <div className="ais-head">
          <p className="v3-kicker">How it works</p>
          <h2 id="ais-path-h">Start small. Go further only when it pays off.</h2>
        </div>
        <ol className="ais-timeline">{AI_PATH.map(step => <li key={step.id} id={step.id}>
          <p className="ais-when">{TIMING[step.id]}</p>
          <h3>{step.name}</h3>
          <p className="ais-step-line">{step.line}</p>
          <ul>{step.gets.slice(0, 3).map(g => <li key={g}>{g.split(":")[0]}</li>)}</ul>
          <p className="ais-price">{step.price}</p>
        </li>)}</ol>
      </div>
    </Reveal>

    <Reveal as="section" className="v3-shell ais-cc" aria-labelledby="ais-cc-h">
      <div className="ais-head ais-head-row">
        <div><p className="v3-kicker">Step three, up close</p>
        <h2 id="ais-cc-h">One screen for the whole business.</h2></div>
        <p>Here is a command center for Berry Good Berry Farm, our demonstration business. Yours is built around your own work and tools.</p>
      </div>
      <CommandCenter footer={<div className="cc-links">
        <a href={HELM_DEMO_URL} target="_blank" rel="noopener noreferrer" onClick={outboundClick(HELM_DEMO_URL, "ai-setup-cc")}>Click around a live one: the Helm demo <span aria-hidden="true">↗</span></a>
        <Link to="/resources#tools">Try the agents behind it <span aria-hidden="true">→</span></Link>
      </div>} />
    </Reveal>

    <Reveal as="section" className="v3-shell ais-faq" aria-labelledby="ais-faq-h">
      <div className="ais-head">
        <p className="v3-kicker">Fair questions</p>
        <h2 id="ais-faq-h">What owners ask first.</h2>
      </div>
      <div className="ai-faq-list">{FAQ.map(f => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>
    </Reveal>

    <section className="ais-final">
      <div className="v3-shell ais-final-inner">
        <h2>Get the first job off your plate.</h2>
        <p>Thirty minutes, free. We will tell you where AI would help most, and where it would not.</p>
        <BookButton source="ai-setup-final" light />
      </div>
    </section>

    </main>
    <SiteFooter cta={false} />
  </div>;
}
