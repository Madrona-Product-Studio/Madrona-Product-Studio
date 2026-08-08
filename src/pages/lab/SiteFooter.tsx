import { Link } from "react-router-dom";
import MadronaLogo from "./MadronaLogo";

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

export default function SiteFooter({ cta = true }: { cta?: boolean }) {
  return (
    <section className="m2-fc" aria-label="Contact and site footer">
      {cta && (
        <div className="m2-fc-cta m2-fc-cta--solo">
          <div className="m2-fc-half m2-fc-talk">
            <div className="m2-fc-solo-inner">
              <div>
                <span className="m2-fc-icon"><I d={P.chat} /></span>
                <h2>Have something worth building?</h2>
                <p>Bring us an important problem, an early idea, or something already in motion. We help you figure out what to build, then build it.</p>
              </div>
              <div className="m2-fc-solo-actions">
                <Link className="m2-fc-btn" to={CONTACT}><I d={P.chat} /> Get in touch <I d={P.arrow} /></Link>
                <ul className="m2-fc-trust">
                  <li><span><I d={P.clock} /></span><p>30 minute call if you’re ready</p></li>
                  <li><span><I d={P.people} /></span><p>Senior team from the start</p></li>
                  <li><span><I d={P.lock} /></span><p>Everything you share stays confidential</p></li>
                </ul>
              </div>
            </div>
            <svg className="m2-fc-trees" viewBox="0 0 260 120" preserveAspectRatio="xMaxYMax slice" aria-hidden="true"><g fill="rgba(255,255,255,.10)"><polygon points="150,120 174,52 198,120" /><polygon points="188,120 218,26 248,120" /><polygon points="228,120 250,58 272,120" /></g></svg>
          </div>
        </div>
      )}

      <div className="m2-fc-foot">
        <div className="m2-fc-foot-main">
          <Link className="m2-fc-logo" to="/" aria-label="Madrona Product Studio home"><MadronaLogo variant="horizontal" decorative /></Link>
          <nav className="m2-fc-nav" aria-label="Footer">
            <Link to="/apps">Products</Link>
            <Link to="/consulting">How we help</Link>
            <Link to="/services">Services</Link>
            <Link to="/thinking">Thinking</Link>
            <Link to="/about">About</Link>
          </nav>
          <div className="m2-fc-contact">
            <p>Pacific Northwest</p>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>
        <div className="m2-fc-foot-legal">
          <span>© 2026 Madrona Product Studio</span>
        </div>
      </div>
    </section>
  );
}
