import { Link } from "react-router-dom";

// Why us (positioning clarity pass, 2026-09-29): the depth behind the wedge,
// placed on the homepage for the first time. Both reviewers flagged that
// Charlie's background only surfaced on About. Figures come from the resume
// baseline (v8) and match what /about already publishes; Microsoft work is
// attributed through Iconmobile, as it happened. Healthline (refactor,
// 2026-09-29): the launch stands on its own; the portfolio's audience is not
// tied to it, per the honesty rule in the refactor brief. Integration pass
// (same day): no career-total year count in the heading, the shifts named
// instead, and the REI figures in the wording of record (charlie-hq
// positioning handoff, 2026-09-29).
const chapters = [
  ["Agency years", "E-commerce platforms and digital campaigns for national brands."],
  ["Microsoft, via Iconmobile", "Mobile strategy, and Microsoft’s first responsive mobile web platform."],
  ["REI", "Relaunched membership for 22M+ members. Led a $200M+ annual mobile P&L."],
  ["Healthline", "Launched Healthline’s first AI patient guidance."],
  ["Madrona", "Our own apps, agents, and client tools, built with a small senior team."],
];

export function DepthSection() {
  return <section className="v3-section v3-shell v3-depth">
    <div className="v3-depth-rail">
      <p className="v3-kicker">Why us</p>
      <h2>Mobile, then membership, then AI. Now Madrona.</h2>
      <p className="v3-help-lede">Madrona is led by Charlie Koch, Founder &amp; Head of Product. His career covers both halves of what we offer: the brand, web, and product craft, and now the daily practice of putting AI to work. That is how we can tell you what will actually help.</p>
      <Link className="v3-practice-link" to="/about">More about Charlie <span aria-hidden="true">→</span></Link>
    </div>
    <ol className="v3-depth-list">{chapters.map(([where, what]) => <li key={where}><strong>{where}</strong><p>{what}</p></li>)}</ol>
  </section>;
}
