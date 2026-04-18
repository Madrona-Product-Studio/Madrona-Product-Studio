import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const navLinks = [
  { to: "/work", label: "Work" },
  { to: "/approach", label: "Approach" },
  { to: "/writing", label: "Writing" },
  { to: "/about", label: "About" },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-cream-dark/50">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
        <Link
          to="/"
          className="font-serif text-xl font-medium text-ink no-underline hover:text-madrona transition-colors"
        >
          Madrona Product Studio
        </Link>
        <ul className="flex gap-8 list-none m-0 p-0">
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
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-cream-dark mt-32">
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
              {/* TODO: Replace with real LinkedIn URL */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink transition-colors"
              >
                LinkedIn
              </a>
            </p>
            <p>
              {/* TODO: Replace with real GitHub repo URL */}
              <a
                href="https://github.com/charliekoch/madrona-product-studio"
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
