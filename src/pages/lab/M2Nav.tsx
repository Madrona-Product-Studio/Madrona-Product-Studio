import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MadronaLogo from "./MadronaLogo";
import SkySwitcher from "./SkySwitcher";
import { bookHref, bookProps, bookClick } from "./useCalEmbed";
import { ctaClick } from "../../lib/analytics";
import { useFocusTrap } from "./useFocusTrap";

type NavKey = "apps" | "tools" | "services" | "pov" | "open" | "about";

// Functional labels: Apps · Services · Tools · Articles. ("Products" became
// "Apps" 2026-09-10, Charlie — the /apps route always matched.)
// "Tools" is the deployable-agent gallery (moved from /agents). Nav links stay
// ink; only the active page carries the bark accent.
const LINKS: { href: string; label: string; key: NavKey; primary?: boolean }[] = [
  { href: "/apps", label: "Apps", key: "apps" },
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
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // The drawer is a modal: focus lands on its close button, Tab stays
  // inside, and the burger gets focus back on close.
  useFocusTrap(menuRef, open, { initial: ".m2-navmenu-close", returnTo: burgerRef });

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
        <a className="m2-skip" href="#main">Skip to content</a>
        <Link className="m2-logo-link" to="/" aria-label="Madrona Product Studio home"><MadronaLogo decorative /></Link>
        <nav aria-label="Primary">
          {LINKS.map((l) => l.key === "services" ? (
            <div ref={servicesRef} className={`m2-nav-dd${servicesOpen ? " is-open" : ""}`} key={l.key} onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)} onBlur={(e) => { if (!servicesRef.current?.contains(e.relatedTarget as Node)) setServicesOpen(false); }}>
              <button className={`m2-nav-dd-trigger${active === "services" ? " is-active" : ""}`} type="button" aria-expanded={servicesOpen} aria-controls="m2-nav-services" onClick={() => setServicesOpen(o => !o)}>Services <span className="m2-nav-caret" aria-hidden="true">⌄</span></button>
              <div className="m2-nav-dd-menu" id="m2-nav-services">{SERVICE_LINKS.map(item => <Link to={item.href} key={item.href} tabIndex={servicesOpen ? 0 : -1} onClick={() => setServicesOpen(false)}>{item.label}</Link>)}<Link className="m2-nav-dd-all" to="/services" tabIndex={servicesOpen ? 0 : -1} onClick={() => setServicesOpen(false)}>All services <span aria-hidden="true">→</span></Link></div>
            </div>
          ) : <Link key={l.key} to={l.href} className={l.primary ? "is-primary" : undefined} aria-current={active === l.key ? "page" : undefined}>{l.label}</Link>)}
        </nav>
        <SkySwitcher />
        <Link className="m2-button m2-nav-cta" to="/connect" onClick={ctaClick("Get in touch", "/connect", "nav")}>Get in touch</Link>
        <button ref={burgerRef} className="m2-nav-burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
          <span className="m2-burger" aria-hidden="true"><span /><span /><span /></span>
        </button>
      </header>

      <div ref={menuRef} className={`m2-navmenu${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
        <div className="m2-navmenu-bar">
          <Link className="m2-navmenu-logo" to="/" aria-label="Madrona Product Studio home" onClick={() => setOpen(false)}><MadronaLogo decorative /></Link>
          <button className="m2-navmenu-close" aria-label="Close menu" onClick={() => setOpen(false)}>
            <span className="m2-burger is-x" aria-hidden="true"><span /><span /><span /></span>
          </button>
        </div>
        <nav className="m2-navmenu-links" aria-label="Menu">
          <Link className="m2-navmenu-parent" to="/apps" aria-current={active === "apps" ? "page" : undefined} onClick={() => setOpen(false)}>Apps</Link>
          <Link className="m2-navmenu-parent" to="/services" aria-current={active === "services" ? "page" : undefined} onClick={() => setOpen(false)}>Services</Link>
          <div className="m2-navmenu-children">{SERVICE_LINKS.map(item => <Link to={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}</div>
          <Link className="m2-navmenu-parent" to="/tools" aria-current={active === "tools" ? "page" : undefined} onClick={() => setOpen(false)}>Tools</Link>
          <Link className="m2-navmenu-parent" to="/thinking" aria-current={active === "pov" ? "page" : undefined} onClick={() => setOpen(false)}>Articles</Link>
          <Link className="m2-navmenu-parent" to="/about" aria-current={active === "about" ? "page" : undefined} onClick={() => setOpen(false)}>About</Link>
        </nav>
        <div className="m2-navmenu-foot">
          <h2 className="m2-navmenu-title">Let’s connect.</h2>
          <p className="m2-navmenu-invite">Tell us what you’re working on, or schedule a free 30-minute call. We reply within two business days.</p>
          <Link className="m2-button m2-navmenu-primary" to="/connect#send" onClick={() => { ctaClick("Send a message", "/connect#send", "nav-drawer")(); setOpen(false); }}>Send a message</Link>
          {/* Same booking wiring as every other "Schedule" CTA: bookClick tracks
              book_click {source: pathname}; the placement attribute tells the
              drawer apart from the page body in the event stream. */}
          <a className="m2-button m2-button-secondary m2-navmenu-secondary" href={bookHref()} {...bookProps()} data-book-placement="nav-drawer" onClick={(e) => { bookClick(e); setOpen(false); }}>Schedule a 30-minute call <ArrowUpRight /></a>
        </div>
      </div>
    </>
  );
}
