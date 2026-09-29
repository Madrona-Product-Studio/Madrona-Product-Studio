// TEMP (2026-09-29): option D, authored by Astra and built verbatim by Claude.
// The homepage as the landing page for Charlie's outreach: about 260 words,
// no imagery beyond the logo, pinned to the warm-paper (day) palette.
// Copy source: docs/positioning-2026-09/astra-option-d.md.
import { Link } from "react-router-dom";
import LabMeta from "../LabMeta";
import "./option-d.css";

export default function OptionD() {
  return <div className="od">
    <LabMeta title="Brand, websites, and practical AI | Madrona Product Studio" noindex />
    <a className="od-skip" href="#od-main">Skip to content</a>
    <header className="od-header"><div className="od-shell od-header-row">
      <Link to="/" className="od-logo" aria-label="Madrona Product Studio home"><img src="/brand/madrona-frond-horizontal.svg" width="571" height="104" alt="" /></Link>
      <nav aria-label="Main"><Link to="/services">How we help</Link><Link to="/about">About</Link><Link className="od-btn od-btn-sm" to="/connect">Get in touch</Link></nav>
    </div></header>

    <main id="od-main">
      <section className="od-intro"><div className="od-shell"><div className="od-intro-col">
        <h1>Better websites. Practical AI. Someone to see it through.</h1>
        <p>Madrona is Charlie Koch’s studio. We help you show people what makes your work good, and make the work behind it easier. You work directly with Charlie, with trusted specialists joining when needed.</p>
        <Link className="od-btn" to="/connect">Get in touch</Link>
        <p className="od-cred">Charlie previously led membership and mobile products at REI and helped launch AI-powered patient guidance at Healthline.</p>
      </div></div></section>

      <section className="od-block"><div className="od-shell od-spread">
        <h2>How we help</h2>
        <div>
          <div className="od-row"><h3>Brand and web</h3><p>Clear messaging, a distinctive identity, and a website that makes it easy to understand what you offer and take the next step.</p></div>
          <div className="od-row"><h3>AI in your workflow</h3><p>Put AI to work on repetitive tasks, from organizing information to drafting follow-up, with your team reviewing what matters.</p></div>
          <p className="od-also">We also build new products, offer paid strategy sprints that can end in “don’t build,” and work alongside teams as an ongoing product partner.</p>
          <Link className="od-link" to="/services">More about working together</Link>
        </div>
      </div></section>

      <section className="od-block"><div className="od-shell od-spread">
        <h2>Start here</h2>
        <div>
          <p>Tell us what you’ve been meaning to improve. We’ll start with a free 30-minute conversation, then send a short written recommendation. If there’s a fit, we’ll agree on a small first project and what success looks like.</p>
          <Link className="od-btn" to="/connect">Get in touch</Link>
        </div>
      </div></section>
    </main>

    <footer className="od-footer"><div className="od-shell od-footer-row">
      <span>Bellingham, Washington. Working with people near and far.</span>
      <a href="mailto:hello@madronaproduct.com">hello@madronaproduct.com</a>
      <span>© 2026 Madrona Product Studio</span>
    </div></footer>
  </div>;
}
