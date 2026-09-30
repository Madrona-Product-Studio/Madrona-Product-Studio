import { Link } from "react-router-dom";
import { imgProps } from "../../../lib/responsiveImage";
import { studioProducts, STAGE_META, type ProductStage, type StudioProduct } from "../../../data/studioProducts";
import { HELM_DEMO_URL } from "../../../data/proof";
import { outboundClick } from "../../../lib/analytics";
import "./np-feature.css";

// TEMP showcase option N1 · One lead, two beside (2026-09-29).
// Brief: docs/positioning-2026-09/showcase-motion-brief.md
//
// The whole New Products spread, rail and showcase, in the homepage's flipped
// position (showcase left, rail right). One reading order, no competing
// column: Helm leads large, Lila Trips and San Juan sit beneath it as two
// equal, smaller tiles. Plainly and Aria are off the homepage; the rail's
// "Also ours" list is gone, and the rail carries both ways out (the service
// page, then the full portfolio). Static on purpose; the only motion is the
// hover nudge the rest of the site uses.
//
// Honesty: stages come straight from studioProducts.ts; Helm links to the
// public demo (HELM_DEMO_URL), never the real instance.

interface Pick {
  id: string;
  capability: string;
  detail: string;
  href?: string; // overrides the product's primary link (Helm → public demo)
}

const LEAD: Pick = {
  id: "helm",
  capability: "A command center people and AI agents both work from",
  detail: "Projects, priorities, and daily notes in plain text that people and agents read and write together. We run our own work on it.",
  href: HELM_DEMO_URL,
};

const BESIDE: Pick[] = [
  { id: "lila-trips", capability: "AI-planned itineraries, with a paid unlock", detail: "An open-ended idea becomes a day-by-day trip, with sign-up and checkout built in." },
  { id: "san-juan-boating-guide", capability: "Live maps and conditions for boaters", detail: "Tides, wind, and anchorages across the San Juan Islands on one map." },
];

// Measured from the CSS: the showcase column is ~640px at 1440 (1.14fr of a
// 1240 shell less the gap), full width under 900px; tiles are half that, and
// a 120px thumbnail on phones.
const SIZES_LEAD = "(max-width: 900px) calc(100vw - 32px), 660px";
const SIZES_TILE = "(max-width: 600px) 120px, (max-width: 900px) 50vw, 320px";

function product(id: string): StudioProduct {
  const p = studioProducts.find((x) => x.id === id);
  if (!p) throw new Error(`NpFeature: unknown product ${id}`);
  return p;
}

function hostOf(href: string) {
  try {
    const u = new URL(href);
    const path = u.pathname.replace(/\/$/, "");
    return u.host.replace(/^www\./, "") + path;
  } catch { return href; }
}

function Stage({ stage }: { stage: ProductStage }) {
  return <span className={`npf-stage npf-stage--${stage}`}><i aria-hidden="true" />{STAGE_META[stage].label}</span>;
}

function Item({ pick, lead = false }: { pick: Pick; lead?: boolean }) {
  const p = product(pick.id);
  const href = pick.href ?? p.primaryAction?.href;
  const inner = <>
    {p.artifact.src && <span className="npf-frame">
      <img {...imgProps(p.artifact.src, lead ? SIZES_LEAD : SIZES_TILE)} alt={p.artifact.alt} loading="lazy" decoding="async" />
    </span>}
    <span className="npf-copy">
      <span className="npf-meta"><strong>{p.name}</strong><Stage stage={p.stage} /></span>
      <span className="npf-cap">{pick.capability}</span>
      <span className="npf-detail">{pick.detail}</span>
      {href && <span className="npf-out">{hostOf(href)} <i aria-hidden="true">↗</i></span>}
    </span>
  </>;
  const cls = lead ? "npf-item npf-lead" : "npf-item npf-tile";
  if (!href) return <div className={cls}>{inner}</div>;
  return <a className={cls} href={href} target="_blank" rel="noreferrer" onClick={outboundClick(href, "home-products")}>
    {inner}<span className="npf-sr"> (opens in a new tab)</span>
  </a>;
}

export function NpFeatureShowcase() {
  return <div className="npf">
    <Item pick={LEAD} lead />
    <ul className="npf-beside" aria-label="Also live">
      {BESIDE.map((pick) => <li key={pick.id}><Item pick={pick} /></li>)}
    </ul>
  </div>;
}

export function NpFeatureRail() {
  return <div className="ar-rail npf-rail">
    <p className="v3-kicker ar-kicker"><span>04</span>New Products</p>
    <h2 id="area-new-products-q">Have an idea that deserves to become real?</h2>
    <p className="ar-does">From prototype to launched product. We build and run our own, so we know what launching takes.</p>
    <div className="npf-ways">
      <Link className="v3-practice-link" to="/services/new-products">More on New Products <span aria-hidden="true">→</span></Link>
      <Link className="npf-all" to="/apps">See all our products <span aria-hidden="true">→</span></Link>
    </div>
  </div>;
}

export function NpFeature() {
  return <div className="ar-area-flip npf-area" aria-labelledby="area-new-products-q" role="region">
    <div className="ar-spread">
      <NpFeatureRail />
      <div className="ar-showcase"><NpFeatureShowcase /></div>
    </div>
  </div>;
}
