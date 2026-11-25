// DRAFT home page variant, 2026-11-24. Not linked from anywhere, noindex.
// Route: /lab/home-agentic  (?hero=a|b|c picks a hero, ?hero=all stacks the
// three for comparison). The live home page (v3/HomeV3) is untouched.
//
// The page has one idea (Charlie, two calls on 11/24): when you are short on
// people you can hire, or you can make the people you have more effective.
// Madrona builds the tools and agent-run workflows that do the second. Say it
// once, then show it.
//
// Order: hero (the idea, who it is for, one button, work on the first screen)
// · the two options as a picture · what an agent-run workflow is, shown on the
// studio's own setup (the rhythm published in /thinking/the-era-of-agentic-
// operations, without its clock times) · a built-out example (Berry Good's
// command center, or the example week when the hero already carries the
// command center) · how it starts. No prices on this page.
//
// Every claim here is already made elsewhere on the site. The three windows
// are existing components (WeekShowcase, CommandCenter) or a restaging of the
// published rhythm (StudioDay); the two example businesses keep their labels.
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import LabMeta from "./LabMeta";
import M2Nav from "./M2Nav";
import SiteFooter from "./SiteFooter";
import { HeroChart } from "../v3/HeroChart";
import { WindowBar } from "../v3/ReadCard";
import { WeekShowcase } from "../v3/showcase/WeekShowcase";
import { CommandCenter } from "../v3/showcase/CommandCenter";
import { HELM_DEMO_URL, SPRING_LINE_URL } from "../../data/proof";
import { CONTACT_EMAIL } from "../../data/contact";
import { ctaClick, outboundClick } from "../../lib/analytics";
import "./madrona-v2.css";
import "../v3/v3.css";
import "../v3/home-refactor.css";
import "./home-agentic.css";

const BOOK_URL = "https://cal.com/madrona";
const BOOK_LABEL = "Book a conversation";
const ARTICLE = "/thinking/the-era-of-agentic-operations";

const KICKER = "A product studio in Bellingham, Washington";
const LEDE = "We build the tools and AI workflows that take routine work off a small team. For small businesses, non-profits and founders.";

type HeroId = "a" | "b" | "c";
const HEROES: { id: HeroId; name: string; note: string }[] = [
  { id: "a", name: "A", note: "Promise left, a working week right" },
  { id: "b", name: "B", note: "The two fixes are the hero" },
  { id: "c", name: "C", note: "One line, then the work under it" },
];

function Book({ source, className = "v3-btn v3-btn-primary" }: { source: string; className?: string }) {
  return <a className={className} href={BOOK_URL} onClick={ctaClick(BOOK_LABEL, BOOK_URL, source)}>{BOOK_LABEL}</a>;
}

function Actions({ source }: { source: string }) {
  return <div className="ag-actions">
    <Book source={source} />
    <p className="ag-terms">The first conversation is free.</p>
  </div>;
}

// ── The two options, as a picture ───────────────────────────────────────────
// Five bars are the team you have. Hiring adds a sixth bar. The second option
// keeps the five and makes each reach further; the four tints of the one
// orange are the four ways to do that, and the ladder beside them is the key.
const LADDER = [
  { name: "Training", line: "Your team learns the tools they already have." },
  { name: "Process", line: "Fewer steps and fewer handoffs." },
  { name: "Tools", line: "A small tool built for one job." },
  { name: "Agent-run workflows", line: "Routine jobs that run themselves.", lead: true },
];

function Bars({ mode }: { mode: "hire" | "lift" }) {
  return <div className={`ag-bars is-${mode}`} aria-hidden="true">
    {[0, 1, 2, 3, 4].map(i => <span key={i} className="ag-bar"><i className="ag-bar-base" />{mode === "lift" && <i className="ag-bar-lift"><b /><b /><b /><b /></i>}</span>)}
    {mode === "hire" && <span className="ag-bar is-new"><i className="ag-bar-base" /></span>}
  </div>;
}

function TwoOptions() {
  return <figure className="ag-fork" aria-label="Two ways to fix being short on people: hire, or make the people you have more effective through training, process, tools and agent-run workflows">
    <div className="ag-opt">
      <p className="ag-opt-n">Option 1</p>
      <h3>Hire</h3>
      <Bars mode="hire" />
      <p className="ag-opt-cap">One more salary.</p>
    </div>
    <div className="ag-opt ag-opt-us">
      <p className="ag-opt-n">Option 2 <em>What we build</em></p>
      <h3>Make the people you have more effective</h3>
      <Bars mode="lift" />
      <p className="ag-opt-cap">The same five people. Each gets more done.</p>
      <ol className="ag-ladder">{LADDER.map((step, i) => <li key={step.name} className={step.lead ? "is-lead" : undefined}>
        <i className={`ag-swatch is-${i + 1}`} aria-hidden="true" />
        <strong>{step.name}</strong>
        <span>{step.line}</span>
      </li>)}</ol>
    </div>
  </figure>;
}

// ── The studio's own setup ──────────────────────────────────────────────────
// The rhythm from the agentic-operations essay ("how Madrona runs, every
// day"). The essay prints clock times; this window names the part of the day
// instead, so a change to the schedule does not make the home page wrong.
const DAY: { when: string; job: string; does: string; who: "agent" | "person"; mode: string }[] = [
  { when: "Overnight", job: "The sweep", does: "Finds new opportunities and files the ones worth acting on.", who: "agent", mode: "Runs itself" },
  { when: "Early", job: "The morning pulse", does: "Reads email and calendar, then re-ranks the priorities.", who: "agent", mode: "Runs itself" },
  { when: "Morning", job: "The daily brief", does: "What changed overnight, what to approve, today’s top three.", who: "person", mode: "A person decides" },
  { when: "Weekly", job: "The weekly sync", does: "What moved, what slipped, what is owed.", who: "person", mode: "A person decides" },
];

function StudioDay() {
  return <article className="v3-artifact ag-day" aria-label="How Madrona's own operation runs: two jobs run on their own, two wait for a person">
    <WindowBar path="madrona · how the studio runs" note="Our own setup" />
    <ol className="ag-day-list">{DAY.map(row => <li key={row.job} className={row.who === "person" ? "is-person" : undefined}>
      <span className="ag-day-when">{row.when}</span>
      <span className="ag-day-text"><strong>{row.job}</strong><small>{row.does}</small></span>
      <em className="ag-day-mode">{row.mode}</em>
    </li>)}</ol>
    <footer className="ag-day-foot"><span className="is-person">Sending, signing and deciding stay with a person.</span></footer>
  </article>;
}

// ── Three heroes ────────────────────────────────────────────────────────────
// A: promise left, a working week right, on the chart of the bay (the live
// hero's frame with the route swapped for work).
function HeroA() {
  return <section className="v3-current-hero v3-hero-plain hw-hero ag-hero ag-hero-a" data-hero="a">
    <div className="v3-shell v3-current-main">
      <div className="v3-home-copy v3-experiment-copy hw-copy">
        <p className="v3-kicker">{KICKER}</p>
        <h1><span>Short on people?</span> <span>Make the team you have</span> <span className="ag-flash">more effective.</span></h1>
        <p className="v3-lede">{LEDE}</p>
        <Actions source="lab-hero-a" />
      </div>
      <div className="v3-current-images" aria-hidden="true"><HeroChart /></div>
      <div className="ag-hero-work"><WeekShowcase /></div>
    </div>
  </section>;
}

// B: the argument is the hero. The two options sit under one line, and the
// second option runs straight into a week of the work.
function HeroB() {
  return <section className="ag-hero ag-hero-b" data-hero="b">
    <div className="v3-shell">
      <div className="ag-top">
        <div>
          <p className="v3-kicker">{KICKER}</p>
          <h1>Short on people? There are <span>two fixes.</span></h1>
        </div>
        <div className="ag-top-side">
          <p className="v3-lede">{LEDE}</p>
          <Actions source="lab-hero-b" />
        </div>
      </div>
      <div className="ag-b-stage">
        <TwoOptions />
        <div className="ag-b-work">
          <p className="ag-b-label"><i aria-hidden="true" />What an agent-run week looks like</p>
          <WeekShowcase />
        </div>
      </div>
    </div>
  </section>;
}

// C: the plain definition on one line, then the work under it, running off
// the bottom of the first screen. The window is the one a visitor can steer.
function HeroC() {
  return <section className="ag-hero ag-hero-c" data-hero="c">
    <div className="v3-shell">
      <div className="ag-top">
        <div>
          <p className="v3-kicker">{KICKER}</p>
          <h1>Tools and AI workflows that make a small team <span>more effective.</span></h1>
        </div>
        <div className="ag-top-side">
          <p className="v3-lede">For small businesses, non-profits and founders who are short on people. We build it and teach your team to run it.</p>
          <Actions source="lab-hero-c" />
        </div>
      </div>
      <CommandCenter />
    </div>
  </section>;
}

const HERO_VIEW: Record<HeroId, () => ReactNode> = { a: HeroA, b: HeroB, c: HeroC };

// ── Sections ────────────────────────────────────────────────────────────────
function Spread({ id, kicker, title, children, picture, flip = false, light = false }: { id: string; kicker: string; title: string; children?: ReactNode; picture: ReactNode; flip?: boolean; light?: boolean }) {
  return <section id={id} className={`v3-section ar-area ag-section${flip ? " ar-area-flip" : ""}${light ? " v3-band-light" : ""}`} aria-labelledby={`${id}-h`}>
    <div className="v3-shell">
      <div className="ar-spread">
        <div className="ar-rail">
          <p className="v3-kicker ar-kicker">{kicker}</p>
          <h2 id={`${id}-h`}>{title}</h2>
          {children}
        </div>
        <div className="ar-showcase">{picture}</div>
      </div>
    </div>
  </section>;
}

function Choice() {
  return <Spread id="choice" kicker="The choice" title="Two ways to fix being understaffed." picture={<TwoOptions />} light>
    <p className="ar-does">You can add headcount, or make the people you have more effective. We build the second.</p>
  </Spread>;
}

function Workflow() {
  return <Spread id="workflow" kicker="Agent-run workflows" title="A routine job that runs itself, then stops for a person." picture={<StudioDay />} flip>
    <p className="ar-does">An agent is software that reads, sorts and prepares on a schedule. Our own studio runs on them every day.</p>
    <Link className="v3-practice-link" to={ARTICLE}>Read how it works <span aria-hidden="true">→</span></Link>
    <a className="npr-all ar-extra ag-out" href={HELM_DEMO_URL} target="_blank" rel="noopener noreferrer" onClick={outboundClick(HELM_DEMO_URL, "lab-home-agentic")}>Click around the Helm demo <span aria-hidden="true">↗</span></a>
  </Spread>;
}

function Example({ picture }: { picture: "command-center" | "week" }) {
  if (picture === "week") {
    return <Spread id="example" kicker="An example week" title="Four routine jobs. Three never reach you." picture={<WeekShowcase />} light>
      <p className="ar-does">The invoices, the inquiries and the weekly report run on their own. The reply to an unhappy customer waits for you.</p>
    </Spread>;
  }
  return <section id="example" className="v3-section ar-area ag-section v3-band-light" aria-labelledby="example-h">
    <div className="v3-shell">
      <header className="ag-example-head">
        <div>
          <p className="v3-kicker ar-kicker">Built out in full</p>
          <h2 id="example-h">One screen for a whole farm business.</h2>
        </div>
        <p>Berry Good Berry Farm is an example business we built end to end.</p>
      </header>
      <CommandCenter footer={<div className="cc-links">
        <a href={SPRING_LINE_URL} target="_blank" rel="noopener noreferrer" onClick={outboundClick(SPRING_LINE_URL, "lab-home-agentic")}>A second example: a rigging shop <span aria-hidden="true">↗</span></a>
      </div>} />
    </div>
  </section>;
}

const STEPS = [
  { n: "01", name: "A conversation", line: "Tell us where your team’s week goes. It is free." },
  { n: "02", name: "One small piece of work", line: "One workflow, with its win named before we build." },
  { n: "03", name: "Then you decide", line: "Go further only if it paid off." },
];

function Start() {
  return <section id="start" className="v3-section ar-area ag-section ag-start" aria-labelledby="start-h">
    <div className="v3-shell">
      <div className="ar-spread">
        <div className="ar-rail">
          <p className="v3-kicker ar-kicker">How it starts</p>
          <h2 id="start-h">A conversation, then one small piece of work.</h2>
          <div className="ag-start-actions">
            <Book source="lab-close" />
            <a className="ag-mail" href={`mailto:${CONTACT_EMAIL}`}>or write to {CONTACT_EMAIL}</a>
          </div>
        </div>
        <ol className="ag-steps">{STEPS.map(s => <li key={s.n}>
          <span className="ag-step-n">{s.n}</span>
          <div><strong>{s.name}</strong><p>{s.line}</p></div>
        </li>)}</ol>
      </div>
    </div>
  </section>;
}

// The one button, kept in reach once the hero has scrolled away.
function StickyBook() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 760);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className={`ag-sticky${shown ? " is-shown" : ""}`} aria-hidden={!shown}>
    <span>Short on people?</span>
    <Book source="lab-sticky" className="v3-btn v3-btn-primary ag-sticky-btn" />
  </div>;
}

export default function HomeAgentic() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("hero") ?? "a";
  const all = raw === "all";
  const hero: HeroId = raw === "b" || raw === "c" ? raw : "a";
  const topRef = useRef<HTMLDivElement>(null);

  const pick = (id: string) => {
    const next = new URLSearchParams(params);
    next.set("hero", id);
    setParams(next, { replace: true });
    topRef.current?.scrollIntoView({ block: "start" });
  };

  const Hero = HERO_VIEW[hero];
  // The hero's window is not repeated lower down.
  const heroCarriesCommandCenter = !all && hero === "c";
  const heroCarriesChoice = !all && hero === "b";

  return <div className="m2 v3 ag" ref={topRef}>
    <LabMeta title="Draft home page · Madrona Product Studio" noindex />
    <aside className="ag-draft" aria-label="Draft controls">
      <p><b>Draft for review</b><span>24 Nov 2026. Not linked, not indexed.</span></p>
      <div className="ag-draft-pick" role="group" aria-label="Hero option">
        <span>Hero</span>
        {HEROES.map(h => <button key={h.id} type="button" aria-pressed={!all && hero === h.id} title={h.note} onClick={() => pick(h.id)}>{h.name}</button>)}
        <button type="button" aria-pressed={all} onClick={() => pick("all")}>All three</button>
      </div>
    </aside>
    <M2Nav cta={{ label: BOOK_LABEL, href: BOOK_URL }} />
    <main id="main">
      {all
        ? HEROES.map(h => {
          const View = HERO_VIEW[h.id];
          return <div key={h.id} className="ag-compare">
            <p className="ag-compare-label"><b>Hero {h.name}</b><span>{h.note}</span></p>
            <View />
          </div>;
        })
        : <Hero />}
      {!heroCarriesChoice && <Choice />}
      <Workflow />
      <Example picture={heroCarriesCommandCenter ? "week" : "command-center"} />
      <Start />
    </main>
    <SiteFooter cta={false} />
    <StickyBook />
  </div>;
}
