// The AI & Operations showcase: the week, handled. This was the homepage
// hero's window (round-2 option H2, 2026-09-29); Charlie moved it down to
// area 01 on 2026-09-30 because it reads as AI operations across the whole
// week, where the marine-survey before/after it replaced showed one job.
//
// A "this week" list for an example business. When the window scrolls into
// view the routine jobs tick over one day at a time, queued → working → done,
// and the last one (a reply to an unhappy review) stops on "Needs you" and
// stays there. The motion concept is a list settling into done.
//
// Motion rules (madrona-motion): the markup renders the settled week, so a
// still frame, no-JS, and reduced motion all show the finished state. JS arms
// the sequence before first paint (useLayoutEffect) and holds it paused until
// the window is on screen, then it plays once (~5s) and rests. Opacity and
// transform only; ease-out; no layout shift (the three status labels share
// one grid cell).
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import { WindowBar } from "../ReadCard";
import "./week.css";

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

export function WeekShowcase() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Arm before paint so the settled frame never flashes, hold until seen.
    el.classList.add("hw-play", "hw-hold");
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { el.classList.remove("hw-hold"); io.disconnect(); }
    }, { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
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
      {WEEK.map((job, i) => <li key={job.title} className={job.needsYou ? "hw-row is-you" : "hw-row"} style={{ "--i": i } as CSSProperties}>
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
      <span className="hw-bar" aria-hidden="true">{WEEK.map((job, i) => <i key={job.title} className={job.needsYou ? "is-you" : ""} style={{ "--i": i } as CSSProperties} />)}</span>
      <p><span>Runs on its own</span><span className="is-you">You decide what matters</span></p>
    </footer>
  </article>;
}
