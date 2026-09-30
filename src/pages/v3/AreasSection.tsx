import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { AutomationMap } from "./showcase/AutomationMap";
import { WeekShowcase } from "./showcase/WeekShowcase";
import { BrandShowcase } from "./showcase/BrandShowcase";
import { ProductsShowcase } from "./showcase/ProductsShowcase";

// The four areas (homepage refactor, 2026-09-29; brief in
// docs/positioning-2026-09/refactor-brief.md). This replaced the "Four
// problems" ledger and the Berry Good + apps strip: the studio's own work
// stops being a side section and becomes the proof inside each area. One
// two-column spread per area, alternating sides and grounds: a rail (the
// area, its plain question, what we do, what we've built) and a showcase.
//
// Pull-back, 2026-09-30 (Charlie): the rails were carrying too much detail.
// Each now lists what we make as plain lines, with no source tags or links;
// the showcase shows one example and "More on" leads to the service page,
// which carries the worked examples and demos. Because the lines name kinds
// of work rather than past projects, they need no provenance tag.
interface Area {
  id: string;
  name: string;
  question: string;
  does: string;
  makes: string[];
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
    makes: ["Bookkeeping and invoicing agents", "Customer inbox triage", "Operations dashboards"],
    route: "/services/ai-operations",
    Showcase: WeekShowcase,
  },
  {
    id: "brand-website",
    name: "Brand & Website",
    question: "Website just OK, and not doing the business justice?",
    does: "Brands, websites, and online experiences, designed and built to a high bar.",
    makes: ["Websites, designed and built", "Brand systems and packaging", "Online stores and ordering"],
    route: "/services/brand-website",
    Showcase: BrandShowcase,
  },
  {
    id: "growth-retention",
    name: "Growth & Retention",
    question: "People buy once, then you never hear from them again?",
    does: "The follow-up, reminders, and answers that keep people coming back, whether they’re customers, members, donors, or volunteers. Mostly automated, with a person where it counts.",
    makes: ["Booking, reminder, and win-back automations", "Review requests and post-sale follow-up", "Onboarding flows"],
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
    makes: [],
    extraLink: { label: "See all our products", to: "/apps" },
    route: "/services/new-products",
    Showcase: ProductsShowcase,
  },
];

function MakesList({ items }: { items: string[] }) {
  return <div className="ar-built">
    <p className="ar-built-label">What we make</p>
    <ul>{items.map(item => <li key={item}><span>{item}</span></li>)}</ul>
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
              {area.makes.length > 0 && <MakesList items={area.makes} />}
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
