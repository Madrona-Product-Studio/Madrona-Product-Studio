import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const navLinks = [
  { to: "/work", label: "Work" },
  { to: "/approach", label: "Approach" },
  // { to: "/writing", label: "Writing" },  // Hidden until content is ready
  { to: "/about", label: "About" },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close mobile menu on navigation
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-madrona/20">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <Link
          to="/"
          className="font-serif text-xl font-medium text-ink no-underline hover:text-madrona transition-colors"
        >
          Madrona Product Studio
        </Link>

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
                      : "text-ink-light hover:text-ink"
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
            className={`block h-0.5 w-full bg-ink transition-all duration-200 ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-ink transition-all duration-200 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-ink transition-all duration-200 ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-cream-dark/50 bg-cream/95 backdrop-blur-sm">
          <ul className="list-none m-0 p-0 px-6 py-4 space-y-4">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `block text-base no-underline transition-colors ${
                      isActive
                        ? "text-madrona font-medium"
                        : "text-ink-light hover:text-ink"
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
    <footer className="border-t border-madrona/15 mt-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-ink-light">
          <div className="space-y-2">
            <p className="font-serif font-medium text-ink text-lg">
              Madrona Product Studio
            </p>
            <p>Pacific Northwest</p>
          </div>
          <div className="space-y-2">
            <p>
              <a href="mailto:hello@madronaproduct.com" className="hover:text-ink transition-colors">
                hello@madronaproduct.com
              </a>
            </p>
            <p>
              <a
                href="https://github.com/Madrona-Product-Studio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink transition-colors"
              >
                GitHub
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
