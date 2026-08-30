import { Link } from "react-router-dom";
import { bookClick, bookHref, bookProps } from "../lab/useCalEmbed";

// Section 3: how we work — output-first (Charlie, 2026-08-29): each step
// leads with the thing you walk away with; the process name becomes the
// label, and price/terms read as first-class pills instead of faint mono.
const steps = [
  ["01", "Talk it through", "A clear read on where to start", "A free 30-minute conversation with a published agenda, and a clear first move by the end.", "Free · 30 minutes"],
  ["02", "Get it in writing", "A written point of view, yours to keep", "A short, honest read on where we can help, and where we can't.", "Free · yours either way"],
  ["03", "Start small", "The smallest useful build, live", "A scoped first project with its win named up front, and visible payback.", "Paid · only if it makes sense"],
];

export function PracticeSection() {
  return <section className="v3-section v3-band-light v3-practice"><div className="v3-shell">
    <div className="v3-help-head">
      <p className="v3-kicker">How we work</p><h2>We figure out what to build. <span>Then we build it.</span></h2>
      <p className="v3-help-lede">The doors are different. The practice behind them is the same: find the highest-leverage move, start small, and let the work compound.</p>
    </div>
    <ol className="v3-practice-steps">
      {steps.map(([number, label, output, detail, terms]) => <li key={number}>
        <div className="v3-practice-label"><span>{number}</span><em>{label}</em></div>
        <h3>{output}</h3>
        <p>{detail}</p>
        <strong className="v3-practice-terms">{terms}</strong>
      </li>)}
    </ol>
    <div className="v3-practice-ctas">
      <a className="v3-btn v3-btn-primary v3-btn-compact" href={bookHref()} {...bookProps()} onClick={bookClick}>Get in touch</a>
      <Link className="v3-practice-link" to="/how-it-works">See how an engagement runs <span aria-hidden="true">→</span></Link>
    </div>
  </div></section>;
}
