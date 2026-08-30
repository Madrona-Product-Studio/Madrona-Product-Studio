import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MadronaLogo from "./MadronaLogo";
import { CAL_LINK, BOOKING_URL } from "../../data/booking";
import { track } from "../../lib/analytics";

type NavKey = "apps" | "tools" | "services" | "pov" | "open" | "about";

// Direct booking link (matches bookHref() without pulling the Cal embed into
// the global nav bundle — booking.ts is just string constants).
const SCHEDULE_HREF = CAL_LINK ? `https://cal.com/${CAL_LINK}` : (BOOKING_URL ?? "/connect");

// Functional labels: Products · Services · Tools · Articles.
// "Tools" is the deployable-agent gallery (moved from /agents). Nav links stay
// ink; only the active page carries the bark accent.
const LINKS: { href: string; label: string; key: NavKey; primary?: boolean }[] = [
  { href: "/apps", label: "Products", key: "apps" },
  { href: "/services", label: "Services", key: "services" },
  { href: "/tools", label: "Tools", key: "tools" },
  { href: "/thinking", label: "Articles", key: "pov" },
  // "Open" is out of the nav while the /open page gets redesigned (2026-08-15).
  // The page stays live — /thinking essays and /services still deep-link it.
  { href: "/about", label: "About", key: "about" },
];

const SERVICE_LINKS = [
  { href: "/services/ai-operations", label: "AI & Operations" },
  { href: "/services/brand-website", label: "Brand & Website" },
  { href: "/services/growth-retention", label: "Growth & Retention" },
  { href: "/services/new-products", label: "New Products" },
];

const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
);

export default function M2Nav({ active }: { active?: NavKey }) {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      <header className="m2-nav">
        <Link className="m2-logo-link" to="/" aria-label="Madrona Product Studio home"><MadronaLogo decorative /></Link>
        <nav aria-label="Primary">
          {LINKS.map((l) => l.key === "services" ? (
            <div ref={servicesRef} className={`m2-nav-dd${servicesOpen ? " is-open" : ""}`} key={l.key} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button className={`m2-nav-dd-trigger${active === "services" ? " is-active" : ""}`} type="button" aria-expanded={servicesOpen} aria-haspopup="menu" onClick={() => setServicesOpen(true)}>Services <span className="m2-nav-caret" aria-hidden="true">⌄</span></button>
              <div className="m2-nav-dd-menu" role="menu">{SERVICE_LINKS.map(item => <Link role="menuitem" to={item.href} key={item.href} onClick={() => setServicesOpen(false)}>{item.label}</Link>)}<Link className="m2-nav-dd-all" role="menuitem" to="/services" onClick={() => setServicesOpen(false)}>All services <span aria-hidden="true">→</span></Link></div>
            </div>
          ) : <Link key={l.key} to={l.href} className={l.primary ? "is-primary" : undefined} aria-current={active === l.key ? "page" : undefined}>{l.label}</Link>)}
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
          <Link className="m2-navmenu-parent" to="/apps" aria-current={active === "apps" ? "page" : undefined} onClick={() => setOpen(false)}>Products</Link>
          <Link className="m2-navmenu-parent" to="/services" aria-current={active === "services" ? "page" : undefined} onClick={() => setOpen(false)}>Services</Link>
          <div className="m2-navmenu-children">{SERVICE_LINKS.map(item => <Link to={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}</div>
          <Link className="m2-navmenu-parent" to="/tools" aria-current={active === "tools" ? "page" : undefined} onClick={() => setOpen(false)}>Tools</Link>
          <Link className="m2-navmenu-parent" to="/thinking" aria-current={active === "pov" ? "page" : undefined} onClick={() => setOpen(false)}>Articles</Link>
          <Link className="m2-navmenu-parent" to="/about" aria-current={active === "about" ? "page" : undefined} onClick={() => setOpen(false)}>About</Link>
        </nav>
        <div className="m2-navmenu-foot">
          <h2 className="m2-navmenu-title">Let’s connect.</h2>
          <p className="m2-navmenu-invite">Tell us what you’re working on, or book a free 30-minute chat. We usually reply within a day.</p>
          <Link className="m2-button m2-navmenu-primary" to="/connect#send" onClick={() => setOpen(false)}>Send a message</Link>
          <a className="m2-button m2-button-secondary m2-navmenu-secondary" href={SCHEDULE_HREF} target="_blank" rel="noopener noreferrer" onClick={() => { track("book_click", { source: "nav-menu" }); setOpen(false); }}>Schedule a 30-minute call <ArrowUpRight /></a>
        </div>
      </div>
    </>
  );
}
