// SCAFFOLD (2026-09-29 refactor): minimal wiring so each showcase renders on
// the homepage while agents build. The scaffold agent owns this file and
// replaces it. See docs/positioning-2026-09/refactor-brief.md.
import { AutomationMap } from "./showcase/AutomationMap";
import { InspectionShowcase } from "./showcase/InspectionShowcase";
import { BrandShowcase } from "./showcase/BrandShowcase";
import { ProductsShowcase } from "./showcase/ProductsShowcase";

const areas = [
  { id: "ai-operations", name: "AI & Operations", Showcase: InspectionShowcase },
  { id: "brand-website", name: "Brand & Website", Showcase: BrandShowcase },
  { id: "growth-retention", name: "Growth & Retention", Showcase: AutomationMap },
  { id: "new-products", name: "New Products", Showcase: ProductsShowcase },
];

export function AreasSection() {
  return <>{areas.map(({ id, name, Showcase }) => <section key={id} id={`area-${id}`} className="v3-section v3-shell">
    <p className="v3-kicker">{name}</p>
    <div style={{ maxWidth: 640 }}><Showcase /></div>
  </section>)}</>;
}
