import { Link } from "react-router-dom";
import { AutomationMap } from "./showcase/AutomationMap";
import { InspectionShowcase } from "./showcase/InspectionShowcase";
import { BrandShowcase } from "./showcase/BrandShowcase";
import { ProductsShowcase } from "./showcase/ProductsShowcase";

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
interface Built {
  what: string;
  source: string;
  to?: string; // internal route, when the thing itself can be opened on this site
}

interface Area {
  id: string;
  name: string;
  question: string;
  does: string;
  built: Built[];
  builtLabel?: string; // defaults to "Work and examples"
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
      { what: "Field notes and photos into draft reports", source: "Illustrative · marine survey" },
      { what: "Bookkeeping, invoicing, and month-end agents", source: "Demo", to: "/tools" },
      { what: "Customer inbox triage", source: "Demo", to: "/tools/customer-inbox" },
      { what: "Operations dashboards", source: "Berry Good demo · Helm beta" },
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
      { what: "Brand systems and packaging", source: "Berry Good · demo business" },
      { what: "Storefronts and online ordering", source: "Berry Good · demo business" },
      { what: "Local guides with maps and live conditions", source: "San Juan Boating Guide · live" },
      { what: "Sign-up and checkout flows", source: "Lila Trips · live" },
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
      { what: "Booking, reminder, review, and win-back automations", source: "Illustrative" },
      { what: "Guides built on your own content, every claim cited", source: "Lila Yoga · beta" },
      { what: "Onboarding flows", source: "Aria beta · Lila Trips live" },
      { what: "Review requests and post-sale follow-up", source: "Demo", to: "/tools/review-requests" },
    ],
    route: "/services/growth-retention",
    Showcase: AutomationMap,
  },
  {
    id: "new-products",
    name: "New Products",
    question: "Have an idea that deserves to become real?",
    does: "From prototype to launched product. We build and run our own, so we know what launching takes.",
    // Integration pass (2026-09-29): the brief's four built items for this
    // area (Lila Trips, San Juan, Plainly, Aria) are exactly what
    // ProductsShowcase shows, capability first, in the same words; listing
    // them here too read as the same section twice, worst on mobile. So the
    // rail names the rest of the portfolio instead, stages straight from
    // studioProducts.ts. To restore the brief's list, swap this array back.
    builtLabel: "Also ours",
    built: [
      { what: "A command center people and agents both read", source: "Helm · beta" },
      { what: "A yoga practice built on the original texts", source: "Lila Yoga · beta" },
      { what: "A true-to-scale map for planning a food garden", source: "Garden HQ · in development" },
    ],
    route: "/services/new-products",
    Showcase: ProductsShowcase,
  },
];

function BuiltList({ items, label = "Work and examples" }: { items: Built[]; label?: string }) {
  return <div className="ar-built">
    <p className="ar-built-label">{label}</p>
    <ul>{items.map(item => <li key={item.what}>
      {item.to
        ? <Link to={item.to}>{item.what} <i aria-hidden="true">→</i></Link>
        : <span>{item.what}</span>}
      <small>{item.source}</small>
    </li>)}</ul>
  </div>;
}

export function AreasSection() {
  return <div className="ar-areas">
    {areas.map((area, index) => {
      const { Showcase } = area;
      const number = String(index + 1).padStart(2, "0");
      return <section key={area.id} id={`area-${area.id}`} className={`v3-section ar-area ${index % 2 ? "ar-area-flip v3-band-light" : ""}`} aria-labelledby={`area-${area.id}-q`}>
        <div className="v3-shell">
          {index === 0 && <header className="ar-intro">
            <div><p className="v3-kicker">What we build</p>
            <h2>Four areas, and the work behind each.</h2></div>
            <p className="v3-help-lede">Our own products, our demonstration business, working demos, and a few illustrative examples, each labeled for what it is.</p>
          </header>}
          <div className="ar-spread">
            <div className="ar-rail">
              <p className="v3-kicker ar-kicker"><span>{number}</span>{area.name}</p>
              <h2 id={`area-${area.id}-q`}>{area.question}</h2>
              <p className="ar-does">{area.does}</p>
              <BuiltList items={area.built} label={area.builtLabel} />
              <Link className="v3-practice-link" to={area.route}>More on {area.name} <span aria-hidden="true">→</span></Link>
            </div>
            <div className="ar-showcase"><Showcase /></div>
          </div>
        </div>
      </section>;
    })}
  </div>;
}
