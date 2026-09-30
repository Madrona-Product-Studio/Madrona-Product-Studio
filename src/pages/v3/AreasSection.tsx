import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { AutomationMap } from "./showcase/AutomationMap";
import { InspectionShowcase } from "./showcase/InspectionShowcase";
import { BrandShowcase } from "./showcase/BrandShowcase";
import { ProductsShowcase } from "./showcase/ProductsShowcase";
import { BERRY_URL, HELM_DEMO_URL } from "../../data/proof";
import { studioProducts } from "../../data/studioProducts";
import { outboundClick } from "../../lib/analytics";

// The four areas (homepage refactor, 2026-09-29; brief in
// docs/positioning-2026-09/refactor-brief.md). This replaced the "Four
// problems" ledger and the Berry Good + apps strip: the studio's own work
// stops being a side section and becomes the proof inside each area. One
// two-column spread per area, alternating sides and grounds: a rail (the
// area, its plain question, what we do, what we've built) and a showcase.
//
// Honesty rules live in the source tags. Every built item says where it comes
// from: one of our products (with its stage), our demonstration business
// (Berry Good), a scripted demo on /tools, or an illustrative example. Nothing
// here is presented as a client result. Review pass (same day): tags carry
// the stage or the kind of example ("demo business", "beta", "live"), since a
// bare "Berry Good" read like a client; the list label says "Work and
// examples", because an illustrative item is not something we've built; claims
// were checked against the products (Lila Trips has a paid unlock and sign-up,
// not booking; Lila Yoga is a cited corpus, not an assistant).
//
// Round 2 (2026-09-29, Charlie): the source tags link to the example wherever
// one can be opened. External tags open in a new tab with an ↗; internal /tools
// demos take a →. Illustrative items stay plain text, on purpose: there is
// nothing to open. Berry Good's storefront is the one Berry Good surface a
// visitor can use, so it backs the brand and storefront rows; its operations
// row points at /tools, where the Berry Good agent runs live. Helm always goes
// to the public demo (HELM_DEMO_URL), never the real instance.
interface Source {
  label: string;
  href?: string; // "/..." is an internal route; anything else opens in a new tab
}

interface Built {
  what: string;
  sources: Source[];
}

// Product links come from studioProducts.ts so the homepage never drifts from
// the /apps page. Helm is the exception: its product link is the marketing
// site, and the proof here is the public demo.
function productHref(id: string): string | undefined {
  return studioProducts.find(product => product.id === id)?.primaryAction?.href;
}

const src = {
  illustrative: (detail?: string): Source => ({ label: detail ? `Illustrative · ${detail}` : "Illustrative" }),
  // One tag pattern everywhere (final cold read): "Name · status".
  demo: (name: string, slug?: string): Source => ({ label: `${name} · demo`, href: slug ? `/tools/${slug}` : "/tools" }),
  berry: (label = "Berry Good · demo business", href = BERRY_URL): Source => ({ label, href }),
  helm: (label = "Helm · beta"): Source => ({ label, href: HELM_DEMO_URL }),
  product: (id: string, label: string): Source => ({ label, href: productHref(id) }),
};

interface Area {
  id: string;
  name: string;
  question: string;
  does: string;
  built: Built[];
  builtLabel?: string; // defaults to "Work and examples"
  extraLink?: { label: string; to: string };
  route: string;
  Showcase: () => React.ReactElement;
}

// Canon door order (AI & Operations leads), numbered to match.
const areas: Area[] = [
  {
    id: "ai-operations",
    name: "AI & Operations",
    question: "Losing hours to work software should be doing?",
    does: "Practical AI and tools built on your real workflows, with a person checking anything that matters.",
    built: [
      { what: "Field notes and photos into draft reports", sources: [src.illustrative("marine survey")] },
      { what: "Bookkeeping, invoicing, and month-end agents", sources: [src.demo("Finance agents")] },
      { what: "Customer inbox triage", sources: [src.demo("Customer inbox", "customer-inbox")] },
      { what: "Operations dashboards", sources: [src.berry(), src.helm()] },
    ],
    route: "/services/ai-operations",
    Showcase: InspectionShowcase,
  },
  {
    id: "brand-website",
    name: "Brand & Website",
    question: "Website just OK, and not doing the business justice?",
    does: "Brands, websites, and online experiences, designed and built to a high bar.",
    built: [
      { what: "Brand systems and packaging", sources: [src.berry()] },
      { what: "Storefronts and online ordering", sources: [src.berry()] },
      { what: "Local guides with maps and live conditions", sources: [src.product("san-juan-boating-guide", "San Juan Boating Guide · live")] },
      { what: "Sign-up and checkout flows", sources: [src.product("lila-trips", "Lila Trips · live")] },
    ],
    route: "/services/brand-website",
    Showcase: BrandShowcase,
  },
  {
    id: "growth-retention",
    name: "Growth & Retention",
    question: "People buy once, then you never hear from them again?",
    does: "The follow-up, reminders, and answers that keep people coming back, whether they’re customers, members, donors, or volunteers. Mostly automated, with a person where it counts.",
    built: [
      { what: "Booking, reminder, review, and win-back automations", sources: [src.illustrative()] },
      { what: "Guides built on your own content, every claim cited", sources: [src.product("lila-yoga", "Lila Yoga · beta")] },
      { what: "Onboarding flows", sources: [src.product("aria-health", "Aria · beta"), src.product("lila-trips", "Lila Trips · live")] },
      { what: "Review requests and post-sale follow-up", sources: [src.demo("Review requests", "review-requests")] },
    ],
    route: "/services/growth-retention",
    Showcase: AutomationMap,
  },
  {
    id: "new-products",
    name: "New Products",
    question: "Have an idea that deserves to become real?",
    does: "From prototype to launched product. We build and run our own, so we know what launching takes.",
    // Charlie (2026-09-29): the rail no longer lists products; the showcase
    // carries Helm, Lila Trips, and San Juan, and the rail links to the rest.
    built: [],
    extraLink: { label: "See all our products", to: "/apps" },
    route: "/services/new-products",
    Showcase: ProductsShowcase,
  },
];

function SourceTag({ source }: { source: Source }) {
  const { label, href } = source;
  if (!href) return <span className="ar-src">{label}</span>;
  if (href.startsWith("/")) {
    return <Link className="ar-src ar-src-link" to={href}>{label}<i aria-hidden="true">→</i></Link>;
  }
  return <a className="ar-src ar-src-link" href={href} target="_blank" rel="noreferrer" onClick={outboundClick(href, "home-areas-tag")}>
    {label}<i aria-hidden="true">↗</i><span className="ar-sr"> (opens in a new tab)</span>
  </a>;
}

function BuiltList({ items, label = "Work and examples" }: { items: Built[]; label?: string }) {
  return <div className="ar-built">
    <p className="ar-built-label">{label}</p>
    <ul>{items.map(item => <li key={item.what}>
      <span>{item.what}</span>
      <small>{item.sources.map((source, i) => <span key={source.label}>
        {i > 0 && <span className="ar-src-sep" aria-hidden="true"> · </span>}
        <SourceTag source={source} />
      </span>)}</small>
    </li>)}</ul>
  </div>;
}

// `intro` replaces the default section header; `firstClassName` adds a class
// to area 01 (the homepage uses it to sit area 01 under the bridge).
export function AreasSection({ intro, firstClassName = "" }: { intro?: ReactNode; firstClassName?: string } = {}) {
  return <div className="ar-areas">
    {areas.map((area, index) => {
      const { Showcase } = area;
      const number = String(index + 1).padStart(2, "0");
      return <section key={area.id} id={`area-${area.id}`} className={`v3-section ar-area ${index % 2 ? "ar-area-flip v3-band-light" : ""} ${index === 0 ? firstClassName : ""}`} aria-labelledby={`area-${area.id}-q`}>
        <div className="v3-shell">
          {index === 0 && (intro !== undefined ? intro : <header className="ar-intro" id="work">
            <div><p className="v3-kicker">The work</p>
            <h2>Here’s what we build.</h2></div>
          </header>)}
          <div className="ar-spread">
            <div className="ar-rail">
              <p className="v3-kicker ar-kicker"><span>{number}</span>{area.name}</p>
              <h2 id={`area-${area.id}-q`}>{area.question}</h2>
              <p className="ar-does">{area.does}</p>
              {area.built.length > 0 && <BuiltList items={area.built} label={area.builtLabel} />}
              <Link className="v3-practice-link" to={area.route}>More on {area.name} <span aria-hidden="true">→</span></Link>
              {area.extraLink && <Link className="npr-all ar-extra" to={area.extraLink.to}>{area.extraLink.label} <span aria-hidden="true">→</span></Link>}
            </div>
            <div className="ar-showcase"><Showcase /></div>
          </div>
        </div>
      </section>;
    })}
  </div>;
}
