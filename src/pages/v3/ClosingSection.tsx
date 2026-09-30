import { Link } from "react-router-dom";
import { ctaClick } from "../../lib/analytics";

// The homepage close (Charlie picked option B, 2026-09-30). One section
// replaced "How we work" and the dark final CTA band, which asked for the
// same thing twice. A labeled spread: the ask in the rail (one conversation,
// free, 30 minutes, one button), the three steps on the right with their
// terms. Get in touch is the one action (Charlie: the section is about getting
// started, and the contact page is enough), so there is no link deeper.
const STEPS = [
  { n: "01", name: "Talk it through", line: "A free 30-minute call. You leave with a clear first move.", terms: "Free · 30 min" },
  { n: "02", name: "Get it in writing", line: "A short written read on where we can help, and where we can’t.", terms: "Free · yours to keep" },
  { n: "03", name: "Start small", line: "A scoped first project with its win named up front.", terms: "Paid · only if it makes sense" },
];

export function ClosingSection() {
  return <section className="v3-section v3-close"><div className="v3-shell v3-close-grid">
    <div className="v3-close-rail">
      <p className="v3-kicker">Get started</p>
      <h2>It starts with <span>one conversation.</span></h2>
      <p className="v3-close-lede">Free, and it takes 30 minutes. Tell us where the friction is, or what you’d like to exist next.</p>
      <Link className="v3-btn v3-btn-primary v3-close-btn" to="/connect" onClick={ctaClick("Get in touch", "/connect", "home-close")}>Get in touch</Link>
    </div>
    <ol className="v3-close-steps">{STEPS.map(s => <li key={s.n}><span>{s.n}</span><div><strong>{s.name}</strong><p>{s.line}</p></div><em>{s.terms}</em></li>)}</ol>
  </div></section>;
}
