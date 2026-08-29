import { Link } from "react-router-dom";

// Section 3 of the v3 architecture: "One practice" — the how-we-work
// narrative plus the three steps that used to live in the hero's next-steps
// band (talk → written point of view → smallest useful build).
const steps = [
  ["01", "Talk it through", "A free 30-minute conversation with a published agenda: where you're at, where the opportunities are, and what better would look like.", "Free 30 minutes"],
  ["02", "A written point of view", "A short, honest read on where we can help and where we can't. You keep it either way.", "Free, you keep it"],
  ["03", "The smallest useful build", "A scoped first project with its win named up front, in your terms, with visible payback.", "Paid, only if it makes sense"],
];

export function PracticeSection() {
  return <section className="v3-section v3-band-light v3-practice"><div className="v3-shell">
    <div className="v3-help-head">
      <p className="v3-kicker">How we work</p><h2>We figure out what to build. <span>Then we build it.</span></h2>
      <p className="v3-help-lede">The doors are different. The practice behind them is the same: find the highest-leverage move, start small, and let the work compound.</p>
    </div>
    <ol className="v3-practice-steps">
      {steps.map(([number, title, detail, note]) => <li key={number}>
        <span className="v3-practice-num">{number}</span>
        <h3>{title}</h3>
        <p>{detail}</p>
        <small>{note}</small>
      </li>)}
    </ol>
    <Link className="v3-practice-link" to="/how-it-works">See how an engagement runs <span aria-hidden="true">→</span></Link>
  </div></section>;
}
