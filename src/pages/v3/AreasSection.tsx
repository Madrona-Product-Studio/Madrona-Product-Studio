import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { WeekShowcase } from "./showcase/WeekShowcase";
import { BrandShowcase, CommerceShowcase } from "./showcase/BrandShowcase";
import { ProductsShowcase } from "./showcase/ProductsShowcase";
import { AREAS } from "../../data/areas";

// The four areas (homepage refactor, 2026-09-29; brief in
// docs/positioning-2026-09/refactor-brief.md). This replaced the "Four
// problems" ledger and the Berry Good + apps strip: the studio's own work
// stops being a side section and becomes the proof inside each area. One
// two-column spread per area, alternating sides and grounds: a rail (the
// area, its headline, what we do, what we make) and a showcase.
//
// Pull-back, 2026-09-30 (Charlie): the rails were carrying too much detail.
// Each now lists what we make as plain lines, with no source tags or links;
// the showcase shows one example and the rail link leads to the area page,
// which carries the worked examples and demos. Because the lines name kinds
// of work rather than past projects, they need no provenance tag.
// Copy comes from data/areas.ts (shared with the service pages); this file
// adds each area's showcase and any extra link.
const SHOWCASES: Record<string, () => React.ReactElement> = {
  "ai-operations": WeekShowcase,
  "brand-website": BrandShowcase,
  "ecommerce-loyalty": CommerceShowcase,
  "new-products": () => <ProductsShowcase without={["san-juan-boating-guide"]} />,
};

// Charlie (2026-09-29): the New Products rail lists no products; the
// showcase carries Helm and Lila Trips (San Juan out, 2026-10-06), and the
// rail links to the rest.
const EXTRA_LINKS: Record<string, { label: string; to: string }> = {
  "new-products": { label: "See all our products", to: "/apps" },
};

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
    {AREAS.map((area, index) => {
      const Showcase = SHOWCASES[area.slug];
      const extraLink = EXTRA_LINKS[area.slug];
      const number = String(index + 1).padStart(2, "0");
      return <section key={area.slug} id={`area-${area.slug}`} className={`v3-section ar-area ${index % 2 ? "ar-area-flip v3-band-light" : ""} ${index === 0 ? firstClassName : ""}`} aria-labelledby={`area-${area.slug}-q`}>
        <div className="v3-shell">
          {index === 0 && (intro !== undefined ? intro : <header className="ar-intro" id="work">
            <div><p className="v3-kicker">The work</p>
            <h2>Here’s what we build.</h2></div>
          </header>)}
          <div className="ar-spread">
            <div className="ar-rail">
              <p className="v3-kicker ar-kicker"><span>{number}</span>{area.name}</p>
              <h2 id={`area-${area.slug}-q`}>{area.headline}</h2>
              <p className="ar-does">{area.does}</p>
              {area.makes.length > 0 && <MakesList items={area.makes} />}
              <Link className="v3-practice-link" to={area.route} aria-label={`${area.name}: see how it works and what it costs`}>See how it works and what it costs <span aria-hidden="true">→</span></Link>
              {extraLink && <Link className="npr-all ar-extra" to={extraLink.to}>{extraLink.label} <span aria-hidden="true">→</span></Link>}
            </div>
            <div className="ar-showcase"><Showcase /></div>
          </div>
        </div>
      </section>;
    })}
  </div>;
}
