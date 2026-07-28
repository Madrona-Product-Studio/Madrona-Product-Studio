import { useState } from "react";
import MadronaLogo from "./MadronaLogo";

// Consulting is the umbrella; Services (and the rest of the consulting depth)
// folds into this dropdown. Nav links are hidden below 760px by CSS, so the
// dropdown is a desktop-only affordance.
const consultingMenu = [
  { label: "Consulting overview", href: "/consulting" },
  { label: "Services", href: "/services" },
  { label: "Agentic operations", href: "/services/agentic-operations" },
  { label: "How it works", href: "/how-it-works" },
];

type NavKey = "apps" | "consulting" | "about";

export default function M2Nav({ active }: { active?: NavKey }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="m2-nav">
      <a className="m2-logo-link" href="/" aria-label="Madrona Product Studio home"><MadronaLogo decorative /></a>
      <nav aria-label="Primary">
        <a href="/apps" aria-current={active === "apps" ? "page" : undefined}>Our apps</a>
        <div
          className={`m2-nav-dd${open ? " is-open" : ""}`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <button
            type="button"
            className="m2-nav-dd-trigger"
            aria-expanded={open}
            aria-haspopup="true"
            aria-current={active === "consulting" ? "page" : undefined}
            onClick={() => setOpen((o) => !o)}
          >
            Consulting <span className="m2-nav-caret" aria-hidden="true">▾</span>
          </button>
          <div className="m2-nav-dd-menu" role="menu" onClick={() => setOpen(false)}>
            {consultingMenu.map((i) => (
              <a key={i.href} href={i.href} role="menuitem">{i.label}</a>
            ))}
          </div>
        </div>
        <a href="/about" aria-current={active === "about" ? "page" : undefined}>About</a>
      </nav>
      <a className="m2-button m2-nav-cta" href="/connect">Book a chat</a>
    </header>
  );
}
