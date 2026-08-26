import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";
import { nowItem } from "../data/now";
import { track } from "../lib/analytics";

// Mirrors the V2 nav vocabulary (M2Nav) so the one legacy-chrome page
// doesn't advertise retired routes.
const navLinks = [
  { to: "/apps", label: "Products" },
  { to: "/consulting", label: "Consulting" },
  { to: "/tools", label: "Tools" },
  { to: "/thinking", label: "Articles" },
  { to: "/about", label: "About" },
];

// Tailwind twin of the V2 NowStrip (src/pages/lab/NowStrip.tsx) — same data
// file, same layout, rendered with the legacy chrome's tokens.
function NowBar() {
  if (!nowItem) return null;
  const item = nowItem;
  const onClick = () => track("now_click", { href: item.href });
  const body = (
    <>
      <span className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-madrona whitespace-nowrap">{item.tag}</span>
      <span className="truncate">{item.text}</span>
      <span className="text-madrona" aria-hidden="true">→</span>
    </>
  );
  return (
    <div className="bg-card border-b border-line-soft">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 min-h-[38px] py-1.5 flex items-center justify-center md:justify-between gap-4">
        <p className="hidden md:block text-xs text-muted m-0">Bellingham, Washington · Pacific Northwest and beyond</p>
        {item.external ? (
          <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={onClick} className="inline-flex items-baseline gap-2.5 text-xs font-semibold text-ink no-underline min-w-0">{body}</a>
        ) : (
          <Link to={item.href} onClick={onClick} className="inline-flex items-baseline gap-2.5 text-xs font-semibold text-ink no-underline min-w-0">{body}</Link>
        )}
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-line">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <Wordmark size="md" as="a" />

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `text-sm tracking-wide no-underline transition-colors ${
                    isActive
                      ? "text-madrona font-medium"
                      : "text-ink70 hover:text-ink"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 bg-transparent border-none cursor-pointer p-1"
          aria-label="Toggle navigation"
        >
          <span
            className={`block h-0.5 w-full bg-ink transition-[transform,opacity] duration-200 ease-snap ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-ink transition-[transform,opacity] duration-200 ease-snap ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-ink transition-[transform,opacity] duration-200 ease-snap ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-line/50 bg-paper/95 backdrop-blur-sm">
          <ul className="list-none m-0 p-0 px-6 py-4 space-y-4">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block text-base no-underline transition-colors ${
                      isActive
                        ? "text-madrona font-medium"
                        : "text-ink70 hover:text-ink"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line mt-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-ink70">
          <div className="space-y-3">
            <Wordmark size="sm" />
            <p>Pacific Northwest</p>
          </div>
          <div className="space-y-2">
            <p>
              <a href="mailto:hello@madronaproduct.com" className="hover:text-ink transition-colors">
                hello@madronaproduct.com
              </a>
            </p>
            <p>
              <a href="https://github.com/Madrona-Product-Studio" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                GitHub
              </a>
            </p>
            <p>
              <a href="https://www.linkedin.com/company/madrona-product-studio" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                LinkedIn
              </a>
            </p>
          </div>
          <div className="md:text-right">
            <p>&copy; {new Date().getFullYear()} Madrona Product Studio</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <NowBar />
      <Nav />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 md:py-24">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
