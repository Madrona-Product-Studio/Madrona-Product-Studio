import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MadronaLogo from "./MadronaLogo";
import { CAL_LINK, BOOKING_URL } from "../../data/booking";

type NavKey = "apps" | "consulting" | "current" | "about";

// Direct booking link (matches bookHref() without pulling the Cal embed into
// the global nav bundle — booking.ts is just string constants).
const SCHEDULE_HREF = CAL_LINK ? `https://cal.com/${CAL_LINK}` : (BOOKING_URL ?? "/connect");

// "How we help" leads (the front door), then our own products, then about.
// It carries the bark accent as the primary way in.
const LINKS: { href: string; label: string; key: NavKey; primary?: boolean }[] = [
  { href: "/consulting", label: "How we help", key: "consulting", primary: true },
  { href: "/apps", label: "Our products", key: "apps" },
  { href: "/current", label: "Current", key: "current" },
  { href: "/about", label: "About Us", key: "about" },
];

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
);

export default function M2Nav({ active }: { active?: NavKey }) {
  const [open, setOpen] = useState(false);

  // Lock body scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="m2-nav">
        <Link className="m2-logo-link" to="/" aria-label="Madrona Product Studio home"><MadronaLogo decorative /></Link>
        <nav aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.key} to={l.href} className={l.primary ? "is-primary" : undefined} aria-current={active === l.key ? "page" : undefined}>{l.label}</Link>
          ))}
        </nav>
        <Link className="m2-button m2-nav-cta" to="/connect">Get in touch</Link>
        <button className="m2-nav-burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
          <span className="m2-burger" aria-hidden="true"><span /><span /><span /></span>
        </button>
      </header>

      <div className={`m2-navmenu${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="m2-navmenu-bar">
          <Link className="m2-navmenu-logo" to="/" aria-label="Madrona Product Studio home" onClick={() => setOpen(false)}><MadronaLogo decorative /></Link>
          <button className="m2-navmenu-close" aria-label="Close menu" onClick={() => setOpen(false)}>
            <span className="m2-burger is-x" aria-hidden="true"><span /><span /><span /></span>
          </button>
        </div>
        <nav className="m2-navmenu-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.key} to={l.href} className={l.primary ? "is-primary" : undefined} aria-current={active === l.key ? "page" : undefined} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
        </nav>
        <div className="m2-navmenu-foot">
          <h2 className="m2-navmenu-title">Let’s connect.</h2>
          <p className="m2-navmenu-invite">Tell us what you’re working on, or book a free 30-minute chat. We usually reply within a day.</p>
          <Link className="m2-button m2-navmenu-primary" to="/connect#send" onClick={() => setOpen(false)}>Send a message</Link>
          <a className="m2-button m2-button-secondary m2-navmenu-secondary" href={SCHEDULE_HREF} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Schedule a 30-min call <ArrowUpRight /></a>
        </div>
      </div>
    </>
  );
}
