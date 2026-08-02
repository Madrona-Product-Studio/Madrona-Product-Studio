import MadronaLogo from "./MadronaLogo";

type NavKey = "apps" | "consulting" | "thinking" | "about";

export default function M2Nav({ active }: { active?: NavKey }) {
  return (
    <header className="m2-nav">
      <a className="m2-logo-link" href="/" aria-label="Madrona Product Studio home"><MadronaLogo decorative /></a>
      <nav aria-label="Primary">
        <a href="/apps" aria-current={active === "apps" ? "page" : undefined}>Products</a>
        <a href="/consulting" aria-current={active === "consulting" ? "page" : undefined}>How we help</a>
        <a href="/about" aria-current={active === "about" ? "page" : undefined}>About</a>
      </nav>
      <a className="m2-button m2-nav-cta" href="/connect">Get in touch</a>
    </header>
  );
}
