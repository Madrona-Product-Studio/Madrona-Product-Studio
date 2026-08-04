import { useEffect, useState } from "react";
import MadronaLogo from "./MadronaLogo";

type NavKey = "apps" | "consulting" | "thinking" | "about";

const LINKS: { href: string; label: string; key: NavKey }[] = [
  { href: "/apps", label: "Products", key: "apps" },
  { href: "/consulting", label: "How we help", key: "consulting" },
  { href: "/about", label: "About", key: "about" },
];

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
        <a className="m2-logo-link" href="/" aria-label="Madrona Product Studio home"><MadronaLogo decorative /></a>
        <nav aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.key} href={l.href} aria-current={active === l.key ? "page" : undefined}>{l.label}</a>
          ))}
        </nav>
        <a className="m2-button m2-nav-cta" href="/connect">Get in touch</a>
        <button className="m2-nav-burger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
          <span className="m2-burger" aria-hidden="true"><span /><span /><span /></span>
        </button>
      </header>

      <div className={`m2-navmenu${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="m2-navmenu-bar">
          <a className="m2-navmenu-logo" href="/" aria-label="Madrona Product Studio home"><MadronaLogo decorative /></a>
          <button className="m2-navmenu-close" aria-label="Close menu" onClick={() => setOpen(false)}>
            <span className="m2-burger is-x" aria-hidden="true"><span /><span /><span /></span>
          </button>
        </div>
        <nav className="m2-navmenu-links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.key} href={l.href} aria-current={active === l.key ? "page" : undefined} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </nav>
        <div className="m2-navmenu-foot">
          <a className="m2-button" href="/connect" onClick={() => setOpen(false)}>Get in touch</a>
          <p className="m2-navmenu-meta">hello@madronaproduct.com</p>
        </div>
      </div>
    </>
  );
}
