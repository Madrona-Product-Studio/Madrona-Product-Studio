import { useState } from "react";

import { berryViews, ViewVisual, type BerryViewId } from "./BerryGoodCaseStudy";

// Short pill labels for the narrow home slot; the full labels live in the
// worked example on /consulting.
const SHORT_LABEL: Record<BerryViewId, string> = {
  brand: "Brand",
  storefront: "Storefront",
  journey: "Journey",
  operations: "Operations",
  ai: "AI",
};

// A condensed, interactive version of the Berry Good worked example, sized for
// the Home "What we do" column. It teases the end-to-end system (brand →
// storefront → journey → operations → AI); the full module lives on /consulting.
export default function BerryGoodTeaser() {
  const [active, setActive] = useState<BerryViewId>("brand");
  const view = berryViews.find((v) => v.id === active) ?? berryViews[0];

  return (
    <figure className="berry-teaser" aria-label="Example: Berry Good Berry Farm, one business improved end to end">
      <figcaption className="berry-teaser-head">
        <span className="m2-chip">Example experience</span>
        <p>Berry Good Berry Farm — one business, improved end to end.</p>
      </figcaption>
      <div className="berry-teaser-tabs" role="tablist" aria-label="Berry Good business system">
        {berryViews.map((v) => (
          <button
            aria-controls="berry-teaser-panel"
            aria-selected={active === v.id}
            className={active === v.id ? "is-active" : ""}
            id={`berry-teaser-tab-${v.id}`}
            key={v.id}
            onClick={() => setActive(v.id)}
            role="tab"
            tabIndex={active === v.id ? 0 : -1}
            type="button"
          >
            <span>{v.number}</span>
            {SHORT_LABEL[v.id]}
          </button>
        ))}
      </div>
      <div
        aria-labelledby={`berry-teaser-tab-${view.id}`}
        className={`berry-teaser-panel berry-teaser-panel-${view.id}`}
        id="berry-teaser-panel"
        role="tabpanel"
      >
        <div className="berry-teaser-visual"><ViewVisual id={view.id} /></div>
        <div className="berry-teaser-narrative">
          <p>{view.eyebrow}</p>
          <h3>{view.headline}</h3>
          <span>{view.description}</span>
        </div>
      </div>
    </figure>
  );
}
