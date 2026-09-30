// The homepage hero (Charlie picked round-2 option H2, 2026-09-29): AI at
// work, the week handled. Brief: docs/positioning-2026-09/round2-brief.md
//
// The right-hand window is a "this week" list for an example business. On
// load the routine jobs tick over one day at a time, queued → working → done,
// and the last one (a reply to an unhappy review) stops on "Needs you" and
// stays there. The motion concept is a list settling into done, not a
// conversation (H1 owns the thread).
//
// Motion rules (madrona-motion): the markup renders the settled week, so a
// still frame, no-JS, and reduced motion all show the finished state. JS arms
// the sequence before first paint (useLayoutEffect) and holds it paused until
// the window is on screen, then it plays once (~5s) and rests. Opacity and
// transform only; ease-out; no layout shift (the three status labels share
// one grid cell).
import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ctaClick } from "../../lib/analytics";
import { HeroChart } from "./HeroChart";
import { WindowBar } from "./ReadCard";
import { markHeroSettled, resetHeroSequence } from "./heroSequence";
import "./hero-week.css";

// Length of the this-week sequence once it starts: the last row settles at
// 400 + 3 x 850 + 520 ms and its bar segment fills 360 ms after that.
const SEQUENCE_MS = 400 + 3 * 850 + 520 + 360;

type Job = { day: string; title: string; detail: string; working: string; done: string; needsYou?: boolean };

// An example week for a small service business. No counts, no time claims:
// the story is which work runs on its own and which waits for a person.
const WEEK: Job[] = [
  { day: "Mon", title: "Invoices sent", detail: "Built from the job log", working: "Drafting…", done: "Sent" },
  { day: "Tue", title: "New inquiries answered", detail: "From your own prices and hours", working: "Replying…", done: "Replied" },
  { day: "Wed", title: "Weekly report drafted", detail: "Sales, bookings, what changed", working: "Drafting…", done: "Ready" },
  { day: "Thu", title: "Reply to a two-star review", detail: "Drafted. Yours to send.", working: "Drafting…", done: "Needs you", needsYou: true },
];

function Check() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 8.4 7 10.8l4.6-5.3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function WeekPanel() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    resetHeroSequence();
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { markHeroSettled(); return; }
    // Arm before paint so the settled frame never flashes, hold until seen.
    el.classList.add("hw-play", "hw-hold");
    let timer = 0;
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        el.classList.remove("hw-hold"); io.disconnect();
        // The last bar segment fills at ~3.5s (see hero-week.css timings);
        // then the bridge below may make its entrance (heroSequence.ts).
        timer = window.setTimeout(markHeroSettled, SEQUENCE_MS);
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);

  const handled = WEEK.filter(j => !j.needsYou).length;
  const waiting = WEEK.length - handled;

  return <article ref={ref} className="v3-artifact hw-panel" aria-label="An example week: routine jobs handled, one waiting for a person">
    <WindowBar path="ops / this week" note="Illustrative example" />
    <div className="hw-head">
      <strong>This week</strong>
      <span className="hw-swap hw-summary">
        <em className="hw-sum-a" aria-hidden="true">Working through the week</em>
        <em className="hw-sum-b">{handled} handled · <b>{waiting} needs you</b></em>
      </span>
    </div>
    <ol className="hw-list">
      {WEEK.map((job, i) => <li key={job.title} className={job.needsYou ? "hw-row is-you" : "hw-row"} style={{ "--i": i } as React.CSSProperties}>
        <i className="hw-rule" aria-hidden="true" />
        <span className="hw-day">{job.day}</span>
        <span className="hw-mark" aria-hidden="true">
          <i className="hw-ring" />
          {job.needsYou ? <i className="hw-dot" /> : <i className="hw-check"><Check /></i>}
        </span>
        <span className="hw-text"><strong>{job.title}</strong><small>{job.detail}</small></span>
        <span className="hw-swap hw-state">
          <em className="hw-s-q" aria-hidden="true">Queued</em>
          <em className="hw-s-w" aria-hidden="true">{job.working}</em>
          <em className="hw-s-d">{job.done}</em>
        </span>
      </li>)}
    </ol>
    <footer className="hw-foot">
      <span className="hw-bar" aria-hidden="true">{WEEK.map((job, i) => <i key={job.title} className={job.needsYou ? "is-you" : ""} style={{ "--i": i } as React.CSSProperties} />)}</span>
      <p><span>Runs on its own</span><span className="is-you">You decide what matters</span></p>
    </footer>
  </article>;
}

export function Hero() {
  return <section className="v3-current-hero v3-hero-plain hw-hero">
    <div className="v3-shell v3-current-main">
      <div className="v3-home-copy v3-experiment-copy hw-copy">
        <p className="v3-kicker">A Pacific Northwest studio</p>
        <h1>Great digital work, <span>with AI built in.</span></h1>
        <p className="v3-lede">We design websites and brands, build new products, and put AI to work inside your business: in your inbox, your paperwork, and your customer follow-up, with a person checking what matters.</p>
        <div className="v3-actions">
          <Link className="v3-btn v3-btn-primary" to="/connect" onClick={ctaClick("Get in touch", "/connect", "home-hero")}>Get in touch</Link>
          <a className="v3-hero-text-link" href="#area-ai-operations" onClick={ctaClick("See the work", "#area-ai-operations", "home-hero")}>See the work <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <div className="v3-current-images" aria-hidden="true"><HeroChart /></div>
      <div className="v3-hero-panel-wrap"><WeekPanel /></div>
    </div>
  </section>;
}
