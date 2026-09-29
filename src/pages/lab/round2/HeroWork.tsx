// TEMP round-2 option (2026-09-29). H3 · The work itself.
// Brief: docs/positioning-2026-09/round2-brief.md
// The hero's image is the work: three real things we built, composed as one
// still collage (no motion). Berry Good's storefront and San Juan's live map
// stack on the left; Lila Trips' phone view runs the full height on the right,
// so the three pieces read at three different scales, never as three equal
// cards. Each caption names the piece plainly and links out to it where it
// lives. Berry Good is labeled as our demonstration business.
import { Link } from "react-router-dom";
import { ctaClick, outboundClick } from "../../../lib/analytics";
import { imgProps, type ResponsiveImage } from "../../../lib/responsiveImage";
import { BERRY_URL } from "../../../data/proof";
import berryImage from "../../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-storefront-desktop.webp?w=640;960;1280&format=webp&as=img";
import sanJuanImage from "../../../../docs/madrona-v2-build-kit/site-assets/sjbg-artifact.webp?w=640;960;1240&format=webp&as=img";
import lilaImage from "../../../../docs/madrona-v2-build-kit/product-proof/lila/lila-edge-of-the-continent-mobile.webp?w=390&format=webp&as=img";
import "./hero-work.css";

type Piece = {
  id: "berry" | "sanjuan" | "lila";
  name: string;
  what: string;
  image: ResponsiveImage;
  alt: string;
  href: string;
  sizes: string;
};

const PIECES: Piece[] = [
  {
    id: "berry",
    name: "Berry Good Berry Farm",
    what: "Brand and storefront · our demonstration business",
    image: berryImage,
    alt: "Berry Good storefront: raspberries in a pint box, what’s ripe today, and berries to order",
    href: BERRY_URL,
    sizes: "(max-width: 600px) calc(100vw - 32px), (max-width: 900px) 60vw, 340px",
  },
  {
    id: "sanjuan",
    name: "San Juan Boating Guide",
    what: "Live maps and conditions · live",
    image: sanJuanImage,
    alt: "San Juan Boating Guide: a map of the islands with marinas, parks, and anchorages",
    href: "https://www.sjiboating.com/",
    sizes: "(max-width: 600px) 55vw, (max-width: 900px) 60vw, 340px",
  },
  {
    id: "lila",
    name: "Lila Trips",
    what: "AI-planned itineraries · live",
    image: lilaImage,
    alt: "Lila Trips on a phone: a five-day Big Sur itinerary called Edge of the Continent",
    href: "https://lilatrips.com",
    sizes: "(max-width: 600px) 40vw, 250px",
  },
];

function hostOf(href: string) {
  try { return new URL(href).host.replace(/^www\./, ""); } catch { return href; }
}

function Figure({ piece }: { piece: Piece }) {
  return <figure className={`hw-piece hw-piece--${piece.id}`}>
    <a className="hw-link" href={piece.href} target="_blank" rel="noreferrer" onClick={outboundClick(piece.href, `r2-hero-work-${piece.id}`)}>
      <span className="v3-artifact hw-frame">
        <img {...imgProps(piece.image, piece.sizes)} alt={piece.alt} decoding="async" />
      </span>
      <figcaption>
        <strong>{piece.name} <span aria-hidden="true">↗︎</span></strong>
        <span>{piece.what}</span>
        <span className="hw-sr"> (opens {hostOf(piece.href)} in a new tab)</span>
      </figcaption>
    </a>
  </figure>;
}

export function HeroWork() {
  return <section className="v3-current-hero v3-hero-plain hw">
    <div className="v3-shell v3-current-main hw-main">
      <div className="v3-home-copy v3-experiment-copy hw-copy">
        <h1>A Pacific Northwest studio putting AI to work <span>for businesses that care about the details.</span></h1>
        <p className="v3-lede">We design websites and brands, build new products, and put AI to work inside your business: in your inbox, your paperwork, and your customer follow-up, with a person checking what matters.</p>
        <div className="v3-actions">
          <Link className="v3-btn v3-btn-primary" to="/connect" onClick={ctaClick("Get in touch", "/connect", "r2-hero-work")}>Get in touch</Link>
          <a className="v3-hero-text-link" href="#work" onClick={ctaClick("See the work", "#work", "r2-hero-work")}>See the work <span aria-hidden="true">→</span></a>
        </div>
      </div>
      <div className="hw-collage" aria-label="Some of our work">
        {PIECES.map((piece) => <Figure key={piece.id} piece={piece} />)}
      </div>
    </div>
  </section>;
}
