import { Link } from "react-router-dom";
import MadronaLogo from "./MadronaLogo";
import { track, ctaClick } from "../../lib/analytics";
import { bookClick, bookHref, bookProps } from "./useCalEmbed";

const EMAIL = "hello@madronaproduct.com";
const CONTACT = "/connect";

function I({ d }: { d: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
}

const P = {
  chat: "M5 5h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H9l-4 3.5V6a1 1 0 0 1 1-1z",
  upload: "M12 15V4m0 0L8 8m4-4 4 4M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2",
  clock: "M12 12V8m0 4 2.5 2.5M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  lock: "M7 10V8a5 5 0 0 1 10 0v2M6 10h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z",
  people: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 8a6 6 0 0 1 12 0M17 11a2.5 2.5 0 1 0 0-5M18 19a5 5 0 0 0-3-4.6",
  mail: "M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 1.5 8 5.5 8-5.5",
  clip: "M20 11.5 12 19.5a5 5 0 0 1-7-7l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7L9.4 16.6a1.6 1.6 0 0 1-2.3-2.3L15 6.4",
  arrow: "M5 12h13m-5-6 6 6-6 6",
};

// The closing ask, back in the dark rounded box joined to the footer
// (Charlie, 2026-09-30), carrying the simplified homepage close: one
// conversation, one button, and the three steps on the right, each with its
// line and its terms. 2026-10-06 (Charlie): the first call is free, a written
// quote is free, and a recommendations assessment (AI) is paid; the main
// button books the call, matching the landing pages, with a message as the
// quieter alternative.
const STEPS = [
  { n: "01", name: "Talk it through", line: "A free 30-minute call. You leave with a clear first move.", terms: "Free · 30 min" },
  { n: "02", name: "Get a quote in writing", line: "Scope and price, in writing. For AI work, an optional paid assessment maps your week first.", terms: "Free · yours to keep" },
  { n: "03", name: "Start small", line: "A scoped first project with its win named up front, like a two-week AI setup.", terms: "Paid · only if it makes sense" },
];

export default function SiteFooter({ cta = true }: { cta?: boolean }) {
  return (
    <footer className="m2-fc" aria-label="Contact and site footer">
      {cta && (
        <div className="m2-fc-cta m2-fc-cta--solo">
          <div className="m2-fc-half m2-fc-talk">
            <div className="m2-fc-solo-inner fc-close">
              <div>
                <p className="fc-kicker">Get started</p>
                <h2>It starts with <span>one conversation.</span></h2>
                <p>Free, and it takes 30 minutes. Tell us where the friction is, or what you’d like to exist next.</p>
                <div className="fc-actions">
                  <a className="m2-fc-btn" href={bookHref()} target="_blank" rel="noopener noreferrer" data-book-placement="footer" {...bookProps()} onClick={bookClick}>Book a free 30-minute call <I d={P.arrow} /></a>
                  <Link className="fc-alt" to={CONTACT} onClick={ctaClick("Send a message", CONTACT, "footer")}>Or send a message</Link>
                </div>
              </div>
              <ol className="fc-steps">{STEPS.map(s => <li key={s.n}><span>{s.n}</span><div><strong>{s.name}</strong><p>{s.line}</p></div><em>{s.terms}</em></li>)}</ol>
            </div>
          </div>
        </div>
      )}

      <div className="m2-fc-foot">
        <div className="m2-fc-foot-main">
          <Link className="m2-fc-logo" to="/" aria-label="Madrona Product Studio home"><MadronaLogo variant="horizontal" decorative /></Link>
          {/* Same vocabulary as the header nav, plus the two footer-only doors. */}
          <nav className="m2-fc-nav" aria-label="Footer">
            <Link to="/services">Services</Link>
            <Link to="/apps">Apps</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/about">About</Link>
            <Link to="/ai-opportunities">AI opportunity assessment</Link>
            <Link to="/connect">Contact</Link>
          </nav>
          <div className="m2-fc-contact">
            <p>PNW, USA</p>
            <a href={`mailto:${EMAIL}`} onClick={() => track("email_click", { source: "footer" })}>{EMAIL}</a>
          </div>
        </div>
        <div className="m2-fc-foot-legal">
          <span>© 2026 Madrona Product Studio</span>
        </div>
      </div>
    </footer>
  );
}
