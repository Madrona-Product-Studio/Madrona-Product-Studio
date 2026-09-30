import { Link } from "react-router-dom";
import { imgProps } from "../../../lib/responsiveImage";
import { studioProducts, STAGE_META, type ProductStage, type StudioProduct } from "../../../data/studioProducts";
import { HELM_DEMO_URL } from "../../../data/proof";
import { outboundClick } from "../../../lib/analytics";
import "./np-rows.css";

// TEMP showcase option N2 · Three equal rows (2026-09-29).
// Brief: docs/positioning-2026-09/showcase-motion-brief.md
//
// The whole New Products spread, rail and showcase, in the homepage's flipped
// position (showcase left, rail right). One column, one reading order: Helm,
// Lila Trips, San Juan as three rows of equal weight. Each row is one link:
// image left, then name + stage, the capability it proves, a line of detail,
// and where it lives. No card boxes; hairlines separate the rows. Plainly and
// Aria are off the homepage, and the rail's "Also ours" list is gone. Static
// on purpose; the only motion is the site's usual hover response.
//
// Honesty: stages come straight from studioProducts.ts; Helm links to the
// public demo (HELM_DEMO_URL), never the real instance.

interface Row {
  id: string;
  capability: string;
  detail: string;
  href?: string; // overrides the product's primary link (Helm → public demo)
  focus?: string; // object-position for the image crop
}

const ROWS: Row[] = [
  {
    id: "helm",
    capability: "A command center people and AI agents both work from",
    detail: "Projects, priorities, and notes that people and agents read and write together. We run our own work on it.",
    href: HELM_DEMO_URL,
    focus: "50% 30%",
  },
  {
    id: "lila-trips",
    capability: "AI-planned itineraries, with a paid unlock",
    detail: "An open-ended idea becomes a day-by-day trip, with sign-up and checkout built in.",
    focus: "78% 50%",
  },
  {
    id: "san-juan-boating-guide",
    capability: "Live maps and conditions for boaters",
    detail: "Tides, wind, and anchorages across the San Juan Islands on one map.",
    focus: "50% 45%",
  },
];

// Measured from the CSS: the image column is 40% of a ~640px showcase column
// at 1440 (~250px), ~38% of the full width between 600 and 900, and a 116px
// thumbnail on phones.
const SIZES = "(max-width: 600px) 116px, (max-width: 900px) 38vw, 260px";

function product(id: string): StudioProduct {
  const p = studioProducts.find((x) => x.id === id);
  if (!p) throw new Error(`NpRows: unknown product ${id}`);
  return p;
}

function hostOf(href: string) {
  try {
    const u = new URL(href);
    return u.host.replace(/^www\./, "") + u.pathname.replace(/\/$/, "");
  } catch { return href; }
}

function Stage({ stage }: { stage: ProductStage }) {
  return <span className={`npr-stage npr-stage--${stage}`}><i aria-hidden="true" />{STAGE_META[stage].label}</span>;
}

function ProductRow({ row }: { row: Row }) {
  const p = product(row.id);
  const href = row.href ?? p.primaryAction?.href;
  const inner = <>
    <span className="npr-frame">
      {p.artifact.src && <img {...imgProps(p.artifact.src, SIZES)} alt={p.artifact.alt} loading="lazy" decoding="async" style={row.focus ? { objectPosition: row.focus } : undefined} />}
    </span>
    <span className="npr-copy">
      <span className="npr-meta"><strong>{p.name}</strong><Stage stage={p.stage} /></span>
      <span className="npr-cap">{row.capability}</span>
      <span className="npr-detail">{row.detail}</span>
      {href && <span className="npr-out">{hostOf(href)} <i aria-hidden="true">↗</i></span>}
    </span>
  </>;
  if (!href) return <div className="npr-row">{inner}</div>;
  return <a className="npr-row" href={href} target="_blank" rel="noreferrer" onClick={outboundClick(href, "home-products")}>
    {inner}<span className="npr-sr"> (opens in a new tab)</span>
  </a>;
}

export function NpRowsShowcase() {
  return <div className="npr">
    <p className="npr-label">Built and run by us</p>
    <ul className="npr-list">
      {ROWS.map((row) => <li key={row.id}><ProductRow row={row} /></li>)}
    </ul>
  </div>;
}

export function NpRowsRail() {
  return <div className="ar-rail npr-rail">
    <p className="v3-kicker ar-kicker"><span>04</span>New Products</p>
    <h2 id="area-new-products-q-n2">Have an idea that deserves to become real?</h2>
    <p className="ar-does">From prototype to launched product. We build and run our own, so we know what launching takes.</p>
    <div className="npr-ways">
      <Link className="v3-practice-link" to="/services/new-products">More on New Products <span aria-hidden="true">→</span></Link>
      <Link className="npr-all" to="/apps">See all our products <span aria-hidden="true">→</span></Link>
    </div>
  </div>;
}

export function NpRows() {
  return <div className="ar-area-flip npr-area" role="region" aria-labelledby="area-new-products-q-n2">
    <div className="ar-spread">
      <NpRowsRail />
      <div className="ar-showcase"><NpRowsShowcase /></div>
    </div>
  </div>;
}
