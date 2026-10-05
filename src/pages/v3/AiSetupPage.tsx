import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { WindowBar } from "./ReadCard";
import { AI_PATH, SETUP_SPRINT } from "../../data/offer";
import { HELM_DEMO_URL } from "../../data/proof";
import { CommandCenter } from "./showcase/CommandCenter";
import { outboundClick } from "../../lib/analytics";
import LandingPage, { type LandingConfig } from "./LandingPage";

// The AI & Operations page, /services/ai-operations (Charlie, 2026-10-05:
// it began as the sendable /ai-setup landing page and replaced the service
// page the same day; /ai-setup 301s here). Reworked once: "it should feel like a
// landing page where people can clearly see the benefit to them"). The
// sendable page for outreach, workshops, and a QR code. Built as a landing
// page, not a site page: a dark hero that leads with the benefit and books
// the call directly, a Monday-morning brief showing what the owner gets, the
// jobs that change as a before/after table, the path as a timed sequence with
// prices, an example command center (Berry Good) in place of a proof list,
// the honest questions, and the ask again.

const CHANGES = [
  { job: "Getting paid", before: "Chasing late invoices every Friday.", after: "Polite reminders go out on their own. You decide who gets grace." },
  { job: "The inbox", before: "Answering the same questions all day.", after: "Replies drafted in your voice, waiting for a quick okay." },
  { job: "The books", before: "Month-end eats a weekend.", after: "Month-end becomes a review of what was flagged." },
  { job: "Knowing where you stand", before: "Three tabs to find out what is slipping.", after: "One screen shows what ran and what needs you." },
];

const TIMING: Record<string, string> = {
  assessment: "Week 1",
  setup: "Weeks 2 and 3",
  "command-center": "After setup",
};

const FAQ: { q: string; a: string }[] = [
  { q: "Is my data safe?", a: "We set the AI up on business accounts, review the data settings with you, and connect it only to what the job needs. Anything that sends money or a message to a customer waits for your okay." },
  { q: "Do I need to be technical?", a: "No. If you can use email and a spreadsheet, you can run this. We set it up, teach your team, and leave a short written playbook." },
  { q: "Which AI do you use?", a: SETUP_SPRINT.tools },
  { q: "What if it doesn't work for us?", a: "The assessment tells you before you spend more, and setup is a fixed price and scope agreed in writing. Everything we set up is yours to keep, with no lock-in." },
  { q: "Is the first call really free?", a: "Yes. Thirty minutes, no obligation. If an assessment makes sense, we will say so, and if it doesn't, we will say that too." },
];

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

const CONFIG: LandingConfig = {
  slug: "ai-setup",
  title: "AI & Operations · Madrona Product Studio",
  kicker: "AI & Operations",
  headline: <>The invoices, inbox, and follow-up, <span>handled.</span> You just approve.</>,
  lede: "We set AI up on the tools you already use, in about two weeks. It does the routine work; anything that matters waits for you.",
  worksWith: ["Google Workspace", "Microsoft 365", "Gmail", "QuickBooks", "Square", "Gusto"],
  alt: { label: "Or take the free two-minute read", to: "/ai-opportunities" },
  heroVisual: <MondayBrief />,
  changes: { heading: "Your week, before and after.", colAfter: "After setup", rows: CHANGES },
  path: { heading: "Start small. Go further only when it pays off.", steps: AI_PATH, timing: TIMING },
  showcase: {
    kicker: "Step three, up close",
    heading: "One screen for the whole business.",
    intro: "Here is a command center for Berry Good Berry Farm, our demonstration business. Yours is built around your own work and tools, and it is yours to keep.",
    node: <CommandCenter footer={<div className="cc-links">
      <a href={HELM_DEMO_URL} target="_blank" rel="noopener noreferrer" onClick={outboundClick(HELM_DEMO_URL, "ai-setup-cc")}>Click around a live one: the Helm demo <span aria-hidden="true">↗</span></a>
      <Link to="/resources#tools">Try the agents behind it <span aria-hidden="true">→</span></Link>
    </div>} />,
  },
  faq: FAQ,
  faqNote: <>New to AI? <Link to="/thinking/getting-started-with-ai">Read the owner’s guide</Link>, <Link to="/thinking/ai-prompt-starter-pack">copy the prompt pack</Link>, or <Link to="/resources#tools">try the tool demos</Link>.</>,
  final: { heading: "Get the busywork off your plate.", line: "Thirty minutes, free. We will tell you where AI would help most, and where it would not." },
};

export default function AiSetupPage() {
  return <LandingPage c={CONFIG} />;
}
