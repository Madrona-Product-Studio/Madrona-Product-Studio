import { Link } from "react-router-dom";
import { imgProps } from "../../../lib/responsiveImage";
import { studioProducts, STAGE_META, type ProductStage, type StudioProduct } from "../../../data/studioProducts";
import { outboundClick } from "../../../lib/analytics";
import "./products.css";

// New Products showcase (2026-09-29 refactor). The studio's own products,
// each shown as the capability it proves a business could buy. One lead
// product with the large artifact, the rest as a compact hairline list, so
// the column never becomes three identical boxed cards. Stages come straight
// from studioProducts.ts so they stay honest as products move.

// Review pass (same day): Lila Trips has a one-time paid unlock, not a
// subscription; its detail now bridges to what a client could commission, as
// San Juan's caption does. Plainly's "read in a minute" was never measured.
const LEAD = { id: "lila-trips", capability: "AI-planned itineraries, with a paid unlock", detail: "An open-ended idea becomes a day-by-day trip. Planning, sign-up, and checkout in one product, the kind a tour operator or travel brand could offer." };

const REST = [
  { id: "san-juan-boating-guide", capability: "Live maps and conditions", detail: "Tides, wind, and anchorages on one map for boaters." },
  { id: "plainly", capability: "Voice-first intake", detail: "A short spoken conversation becomes a concise profile for a therapist." },
  { id: "aria-health", capability: "Stage-aware guidance with guardrails", detail: "Menopause guidance that adapts to each person and stays grounded in evidence." },
];

const SIZES_LEAD = "(max-width: 900px) calc(100vw - 32px), 620px";
const SIZES_THUMB = "120px";

function product(id: string): StudioProduct {
  const p = studioProducts.find((x) => x.id === id);
  if (!p) throw new Error(`ProductsShowcase: unknown product ${id}`);
  return p;
}

function Stage({ stage }: { stage: ProductStage }) {
  return <span className={`ps-stage ps-stage--${stage}`}><i aria-hidden="true" />{STAGE_META[stage].label}</span>;
}

function hostOf(href: string) {
  try { return new URL(href).host.replace(/^www\./, ""); } catch { return href; }
}

export function ProductsShowcase() {
  const lead = product(LEAD.id);
  const leadHref = lead.primaryAction?.href;
  return <div className="ps">
    <article className="ps-lead">
      {lead.artifact.src && <div className="ps-lead-frame">
        <img {...imgProps(lead.artifact.src, SIZES_LEAD)} alt={lead.artifact.alt} loading="lazy" decoding="async" />
      </div>}
      <div className="ps-lead-copy">
        <p className="ps-meta"><strong>{lead.name}</strong><Stage stage={lead.stage} /></p>
        <h3>{LEAD.capability}</h3>
        <p className="ps-detail">{LEAD.detail}</p>
        {leadHref && <a className="ps-out" href={leadHref} target="_blank" rel="noreferrer" onClick={outboundClick(leadHref, "home-products")}>
          {hostOf(leadHref)} <span aria-hidden="true">↗︎</span><span className="ps-sr"> (opens in a new tab)</span>
        </a>}
      </div>
    </article>

    <ul className="ps-list" aria-label="More products of ours">
      {REST.map(({ id, capability, detail }) => {
        const p = product(id);
        const href = p.primaryAction?.href;
        const body = <>
          {p.artifact.src && <span className="ps-thumb"><img {...imgProps(p.artifact.src, SIZES_THUMB)} alt="" loading="lazy" decoding="async" /></span>}
          <span className="ps-row-copy">
            <span className="ps-meta"><strong>{p.name}</strong><Stage stage={p.stage} /></span>
            <b className="ps-cap">{capability}</b>
            <span className="ps-row-detail">{detail}</span>
          </span>
          {href && <span className="ps-arrow" aria-hidden="true">↗︎</span>}
        </>;
        return <li key={id}>
          {href
            ? <a className="ps-row" href={href} target="_blank" rel="noreferrer" onClick={outboundClick(href, "home-products")}>{body}<span className="ps-sr"> (opens in a new tab)</span></a>
            : <div className="ps-row">{body}</div>}
        </li>;
      })}
    </ul>

    <Link className="ps-all" to="/apps">See all our products <span aria-hidden="true">→</span></Link>
  </div>;
}
