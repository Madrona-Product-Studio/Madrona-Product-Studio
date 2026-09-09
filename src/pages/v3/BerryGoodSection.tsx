import { useState } from "react";
import { Link } from "react-router-dom";
import { imgProps, SIZES, type ResponsiveImage } from "../../lib/responsiveImage";
import storefrontImage from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-storefront-desktop.webp?w=640;960;1280&format=webp&as=img";
import brandImage from "../../../docs/madrona-v2-build-kit/placeholders/product-proof/berry-good-brand-system-wide.webp?w=640;960;1280&format=webp&as=img";
import journeyImage from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-customer-journey.webp?w=640;960;1280&format=webp&as=img";
import operationsImage from "../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-operations-dashboard.webp?w=640;960;1280&format=webp&as=img";
import helmImage from "../../../docs/madrona-v2-build-kit/site-assets/helm-tile.webp?w=640;960;1280&format=webp&as=img";
import lilaImage from "../../../docs/madrona-v2-build-kit/product-proof/lila/lila-tile-devices.webp?w=640;960;1280&format=webp&as=img";
import sanJuanImage from "../../../docs/madrona-v2-build-kit/site-assets/sjbg-composite.webp?w=640;960;1280&format=webp&as=img";
import { BERRY_URL, BERRY_HOST } from "../../data/proof";
import { outboundClick } from "../../lib/analytics";

// The homepage proof section. Berry Good (the worked example) and the product
// grid were two separate full sections until the 2026-09-09 density pass —
// two kicker/headline/lede set-ups making the same argument, with Berry Good
// appearing in both. They are now one section: the worked example leads, the
// live products follow as a quiet strip. Berry Good is openly framed as our
// demonstration business (canon); the window chrome shows the real host so
// nothing on the page claims a domain that does not resolve.

const tabs = [
  { id: "brand", label: "Brand", image: brandImage, alt: "Berry Good brand system: logo, palette, typography, and packaging", caption: "A cohesive identity on every touchpoint, from the berry box to the roadside sign." },
  { id: "website", label: "Website", image: storefrontImage, alt: "Berry Good storefront website on desktop", caption: "The storefront itself: ordering, pickup times, and the farm stand, live on the web." },
  { id: "journey", label: "Journey", image: journeyImage, alt: "Berry Good customer ordering journey across four phone screens", caption: "An ordering experience that makes it easy to buy, and easy to come back." },
  { id: "operations", label: "Operations", image: operationsImage, alt: "Berry Good operations dashboard", caption: "The dashboard and agents that run the day, from orders to inventory." },
];

// The live products. Berry Good is no longer a card here — it is the worked
// example directly above.
const proof: { image: ResponsiveImage; name: string; status: string; href: string; external: boolean }[] = [
  { image: helmImage, name: "Helm", status: "Beta · Our command center", href: "/apps", external: false },
  { image: lilaImage, name: "Lila Trips", status: "Live · Adventure travel", href: "https://lilatrips.com", external: true },
  { image: sanJuanImage, name: "San Juan Boating Guide", status: "Live · Salish Sea routes", href: "https://www.sjiboating.com/", external: true },
];

export function BerryGoodSection() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  return <section className="v3-section v3-shell v3-proof-section">
    <div className="v3-berry">
      <div className="v3-berry-rail">
        <p className="v3-kicker">Proof in the work</p>
        <h2>One business, improved <span>end to end.</span></h2>
        <p className="v3-help-lede">Berry Good Berry Farm is our demonstration business: a real operation where we build and run everything we sell, from the brand to the storefront to the agents behind the counter.</p>
        <div className="v3-berry-links">
          <a className="v3-btn v3-btn-primary v3-btn-compact" href={BERRY_URL} target="_blank" rel="noreferrer" onClick={outboundClick(BERRY_URL, "home-berry")}>Visit the live storefront <span aria-hidden="true">↗︎</span></a>
          <Link className="v3-practice-link" to="/services/ai-operations">See the operations work <span aria-hidden="true">→</span></Link>
        </div>
      </div>
      <article className="v3-artifact v3-berry-window">
        <header className="v3-window-bar v3-berry-bar">
          <span className="v3-window-dots" aria-hidden="true"><i /><i /><i /></span>
          <code>{BERRY_HOST}</code>
          <div className="v3-berry-tabs" role="tablist" aria-label="Berry Good example areas">
            {tabs.map((t, index) => <button key={t.id} type="button" role="tab" aria-selected={index === active} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}>{t.label}</button>)}
          </div>
        </header>
        {/* All four images stay mounted in one fixed-ratio frame and crossfade —
            remounting on tab change refetched the image with nothing holding
            the space, so the page jumped (Charlie, launch night). */}
        <div className="v3-berry-frame">
          {tabs.map((t, index) => <img key={t.id} {...imgProps(t.image, SIZES.berry)} alt={index === active ? t.alt : ""} aria-hidden={index !== active} className={index === active ? "is-active" : undefined} loading="lazy" decoding="async" />)}
        </div>
        <footer><p>{tab.caption}</p></footer>
      </article>
    </div>

    <div className="v3-proof-strip">
      <p className="v3-proof-strip-label">We build products, and we run them. Our own apps keep our product judgment close to real users.</p>
      <div className="v3-proof-grid">{proof.map(({ image, name, status, href, external }) => external
        ? <a className="v3-proof-card" key={name} href={href} target="_blank" rel="noreferrer" onClick={outboundClick(href, "home-proof")}><img {...imgProps(image, SIZES.tile3)} alt={`${name} product interface`} loading="lazy" decoding="async" /><figcaption><div><strong>{name}</strong><span>{status}</span></div><i aria-hidden="true">↗︎</i></figcaption></a>
        : <Link className="v3-proof-card" key={name} to={href}><img {...imgProps(image, SIZES.tile3)} alt={`${name} product interface`} loading="lazy" decoding="async" /><figcaption><div><strong>{name}</strong><span>{status}</span></div><i aria-hidden="true">→</i></figcaption></Link>)}</div>
      <Link className="v3-practice-link v3-proof-all" to="/apps">See all products <span aria-hidden="true">→</span></Link>
    </div>
  </section>;
}
