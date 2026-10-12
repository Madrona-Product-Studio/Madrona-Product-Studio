// The kinds of sites we build, sorted by what the business sells (Charlie,
// 2026-10-12: "organize them by the type of site", then "by what you sell").
// A store, a schedule, and an estimate form are different sites, so each kind
// gets a labeled spread: what it needs and its example on the left, a window
// with the example's pages on the right. Honesty stays, quietly: every
// built-out example is tagged; the two kinds without one show a homepage
// for a made-up business (names checked) without calling it out.
import { useState } from "react";
import { Link } from "react-router-dom";
import { imgProps, type ResponsiveImage } from "../../../lib/responsiveImage";
import { BERRY_URL, SPRING_LINE_URL } from "../../../data/proof";
import { CONTACT_PATH } from "../../../data/contact";
import { ctaClick, outboundClick } from "../../../lib/analytics";
import { WindowBar } from "../ReadCard";
import bgHome from "../../../../docs/madrona-v2-build-kit/product-proof/berry-good/tour-home.webp?w=640;960;1440&format=webp&as=img";
import bgShop from "../../../../docs/madrona-v2-build-kit/product-proof/berry-good/tour-berries.webp?w=640;960;1440&format=webp&as=img";
import bgOrder from "../../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-customer-journey.webp?w=640;960;1440&format=webp&as=img";
import bgPhone from "../../../../docs/madrona-v2-build-kit/product-proof/berry-good/tour-phone.webp?w=390;780&format=webp&as=img";
import slHome from "../../../../docs/madrona-v2-build-kit/product-proof/spring-line/tour-home.webp?w=640;960;1440&format=webp&as=img";
import slRates from "../../../../docs/madrona-v2-build-kit/product-proof/spring-line/tour-rates.webp?w=640;960;1440&format=webp&as=img";
import slEst from "../../../../docs/madrona-v2-build-kit/product-proof/spring-line/tour-estimate.webp?w=640;960;1440&format=webp&as=img";
import slPhone from "../../../../docs/madrona-v2-build-kit/product-proof/spring-line/tour-phone.webp?w=390;780&format=webp&as=img";
import fwHome from "../../../../docs/madrona-v2-build-kit/product-proof/concepts/fernway-home.webp?w=640;960;1440&format=webp&as=img";
import scHome from "../../../../docs/madrona-v2-build-kit/product-proof/concepts/saltchuck-home.webp?w=640;960;1440&format=webp&as=img";
import "./sites-we-build.css";

type Page = { name: string; img: ResponsiveImage; line: string; alt: string; phone?: boolean };
type Kind = {
  id: string;
  label: string;         // what you sell, as an owner would say it
  hero: string;          // the short label on the hero window
  head: string;
  forWho: string;
  needs: string[];
  site: string;
  concept?: boolean;     // a concept homepage, not a built-out example
  href?: string;
  pages: Page[];
};

const KINDS: Kind[] = [
  {
    id: "products", label: "Products", hero: "products",
    head: "A store that keeps itself current.",
    forWho: "For farms, food, and makers selling things people can hold.",
    needs: ["Stock and prices you update in a minute", "Order ahead, pickup, or shipping", "Checkout that works on a phone"],
    site: "Berry Good Berry Farm", href: BERRY_URL,
    pages: [
      { name: "Home", img: bgHome, line: "What is in stock sits up top, kept current by the owner in a minute.", alt: "A farm store homepage with what is ripe today" },
      { name: "Shop", img: bgShop, line: "Every product with its price and how much is left, so nobody has to call.", alt: "The farm's shop page" },
      { name: "Order to pickup", img: bgOrder, line: "Order ahead, pick a pickup time, and check in from the car.", alt: "The order to pickup flow, step by step" },
      { name: "On a phone", img: bgPhone, phone: true, line: "Most customers find it on a phone, so the store is built for one first.", alt: "The farm store on a phone" },
    ],
  },
  {
    id: "jobs", label: "Jobs and projects", hero: "jobs and projects",
    head: "Estimate requests with the right details.",
    forWho: "For trades, repair, and service shops that quote the work.",
    needs: ["Services in your customers’ words", "Rates and lead times in plain view", "A request form that asks the right questions once"],
    site: "Spring Line Rigging & Canvas", href: SPRING_LINE_URL,
    pages: [
      { name: "Home", img: slHome, line: "Who does the work, what it costs per hour, and how fast the estimate comes back.", alt: "A rigging and canvas shop homepage" },
      { name: "Rates", img: slRates, line: "Rates and lead times in plain view, so customers know before they call.", alt: "The shop's rates page" },
      { name: "Estimate request", img: slEst, line: "A request form that asks the right questions once, and shows what comes back.", alt: "The shop's estimate request page" },
      { name: "On a phone", img: slPhone, phone: true, line: "The phone number and the estimate button never leave the screen.", alt: "The shop site on a phone" },
    ],
  },
  {
    id: "time", label: "Classes and appointments", hero: "classes and appointments",
    head: "A schedule people book themselves.",
    forWho: "For health and wellness: yoga and movement studios, massage, coaching, and clinics that sell an hour at a time.",
    needs: ["Today’s schedule with spots left", "Booking and waitlists without a phone call", "First-visit offers and memberships up front"],
    site: "Fernway Studio", concept: true,
    pages: [
      { name: "Home", img: fwHome, line: "Today’s schedule with spots left, prices in plain view, and the first-week offer right up front.", alt: "A movement studio concept homepage with today's class schedule" },
    ],
  },
  {
    id: "seats", label: "Trips, tours, and events", hero: "trips and tours",
    head: "Dates, seats left, and a way to book.",
    forWho: "For guides, outfitters, and anyone selling a spot on a date.",
    needs: ["Upcoming dates with seats left", "Book, pay, and get the details in one go", "Weather calls and changes sent out for you"],
    site: "Saltchuck Paddle Co.", concept: true,
    pages: [
      { name: "Home", img: scHome, line: "This weekend’s trips with seats left, a waitlist when they fill, and the weather call made before anyone drives out.", alt: "A sea kayak tour concept homepage with this weekend's trips" },
    ],
  },
];

const SIZES_WIN = "(max-width: 900px) calc(100vw - 32px), 760px";
const SIZES_PHONE = "(max-width: 900px) 46vw, 220px";
const SIZES_HERO = "(max-width: 900px) 80vw, 460px";
const NOTE_TO = `${CONTACT_PATH}?from=sites-we-build`;

// The hero: three kinds fanned out, each labeled by what it sells.
export function SitesHero() {
  return <div className="swb-hero" aria-label="Three kinds of sites we build">
    {KINDS.slice(0, 3).map((k, i) => <figure key={k.id} className={`v3-artifact swb-hero-win swb-hero-${i}`}>
      <WindowBar path={k.hero} />
      <img {...imgProps(k.pages[0].img, SIZES_HERO)} alt={k.pages[0].alt} decoding="async" />
    </figure>)}
  </div>;
}

// The gallery: pills for what you sell, then a spread for the chosen kind.
export function SitesWeBuild() {
  const [ki, setKi] = useState(0);
  const [pi, setPi] = useState(0);
  const k = KINDS[ki];
  const p = k.pages[pi];
  return <div className="swb">
    <div className="swb-pills" role="tablist" aria-label="What you sell">
      {KINDS.map((x, i) => <button key={x.id} type="button" role="tab" aria-selected={i === ki} aria-controls="swb-panel"
        className={i === ki ? "is-on" : ""} onClick={() => { setKi(i); setPi(0); }}>{x.label}</button>)}
    </div>
    <div className="swb-spread" id="swb-panel" role="tabpanel" aria-label={k.label}>
      <div className="swb-info">
        <h3>{k.head}</h3>
        <p className="swb-for">{k.forWho}</p>
        <ul className="swb-needs">{k.needs.map(n => <li key={n}>{n}</li>)}</ul>
        <div className="swb-example">
          <p className="swb-meta"><span>{k.site}</span>{!k.concept && <em>Example build</em>}</p>
          {k.href && <a className="v3-btn v3-btn-primary" href={k.href} target="_blank" rel="noreferrer" onClick={outboundClick(k.href, `sites-${k.id}`)}>
            Click through the full demo <span aria-hidden="true">↗︎</span><span className="swb-sr"> (opens in a new tab)</span>
          </a>}
          <Link className="swb-more" to={NOTE_TO} onClick={ctaClick("Send us a note about yours", NOTE_TO, `sites-${k.id}`)}>
            Send us a note about yours <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <figure className="swb-stage">
        <article className="v3-artifact swb-win">
          <div className="swb-winbar">
            <span className="swb-dots" aria-hidden="true"><i /><i /><i /></span>
            <div className="swb-tabs">{k.pages.map((x, i) => <button key={x.name} type="button" aria-pressed={i === pi}
              className={i === pi ? "is-on" : ""} onClick={() => setPi(i)}>{x.name}</button>)}</div>
          </div>
          <div className={`swb-screen${p.phone ? " is-phone" : ""}`}>
            <img {...imgProps(p.img, p.phone ? SIZES_PHONE : SIZES_WIN)} alt={p.alt} loading="lazy" decoding="async" />
          </div>
        </article>
        <figcaption className="swb-line">{p.line}</figcaption>
      </figure>
    </div>
    <p className="swb-note">The businesses shown are made up, so you can see how each kind of site works. Every site comes with the brand behind it: the name, colors, type, and the words.</p>
  </div>;
}
