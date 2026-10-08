import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { imgProps, SIZES } from "../../../lib/responsiveImage";
import brandImage from "../../../../docs/madrona-v2-build-kit/placeholders/product-proof/berry-good-brand-system-wide.webp?w=640;960;1280&format=webp&as=img";
import storefrontImage from "../../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-storefront-desktop.webp?w=640;960;1280&format=webp&as=img";
import journeyImage from "../../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-customer-journey.webp?w=640;960;1280&format=webp&as=img";
import mobileImage from "../../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-storefront-mobile.webp?w=640;960;1280&format=webp&as=img";
import slSiteImage from "../../../../docs/madrona-v2-build-kit/product-proof/spring-line/spring-line-site-home.webp?w=640;960;1280&format=webp&as=img";
import slRatesImage from "../../../../docs/madrona-v2-build-kit/product-proof/spring-line/spring-line-rates.webp?w=640;960;1280&format=webp&as=img";
import slBrandImage from "../../../../docs/madrona-v2-build-kit/product-proof/spring-line/spring-line-brand-flatlay.webp?w=640;960;1280&format=webp&as=img";
import slBoardImage from "../../../../docs/madrona-v2-build-kit/product-proof/spring-line/spring-line-job-board.webp?w=640;960;1280&format=webp&as=img";
import slStatusImage from "../../../../docs/madrona-v2-build-kit/product-proof/spring-line/spring-line-status-text.webp?w=640;960;1280&format=webp&as=img";
import slEstimateImage from "../../../../docs/madrona-v2-build-kit/product-proof/spring-line/spring-line-estimate.webp?w=640;960;1280&format=webp&as=img";
import slListImage from "../../../../docs/madrona-v2-build-kit/product-proof/spring-line/spring-line-spring-list.webp?w=640;960;1280&format=webp&as=img";
import slNoteImage from "../../../../docs/madrona-v2-build-kit/product-proof/spring-line/spring-line-shop-note.webp?w=640;960;1280&format=webp&as=img";
import { BERRY_URL, SPRING_LINE_KIT_URL, SPRING_LINE_URL } from "../../../data/proof";
import { outboundClick } from "../../../lib/analytics";
import "./brand.css";

// The tabbed work window (2026-09-29 refactor; reworked 2026-10-06). One
// window, a few pieces of real work, crossfading in a fixed-ratio frame so a
// tab switch never shifts the page. Every piece is Berry Good Berry Farm, our
// demonstration business, and is labeled so; links go only to the deployed
// site (BERRY_URL), shown with a plain label rather than its preview-style
// host. The San Juan guide came out of the service pages on 2026-10-06.
// Spring Line Rigging & Canvas, our second demonstration business, joined
// on 2026-10-08: one tab in each homepage window, and a labeled spread of its
// own on each area page (SpringLineSpread below). Its images are screenshots
// of the live demo (spring-line.vercel.app) plus its brand flat lay.

type Tab = { id: string; label: string; project: string; tag: string; image: typeof brandImage; position: string; alt: string; caption: string; href: string; linkLabel: string };

// Brand & Website: the brand system and the site on a phone. Ecommerce:
// the storefront and ordering through pickup.
const BRAND_TABS: Tab[] = [
  {
    id: "brand",
    label: "Brand",
    project: "Berry Good Berry Farm",
    tag: "Our demonstration business",
    image: brandImage,
    position: "50% 50%",
    alt: "Berry Good brand system: logo, color palette, typography, a pint box, a hang tag, and a thank-you card",
    caption: "A brand system for a berry farm: logo, palette, and type, carried onto packaging mockups from the pint box to the thank-you card.",
    href: BERRY_URL,
    linkLabel: "Visit the farm’s site",
  },
  {
    id: "phone",
    label: "On a phone",
    project: "Berry Good Berry Farm",
    tag: "Our demonstration business",
    image: mobileImage,
    position: "50% 0%",
    alt: "The Berry Good website on a phone: what's ripe today and berries to order",
    caption: "The same site on a phone, where most customers find it: what's ripe, what it costs, and one clear way to order.",
    href: BERRY_URL,
    linkLabel: "Visit the farm’s site",
  },
  {
    id: "shop",
    label: "Rigging shop",
    project: "Spring Line Rigging & Canvas",
    tag: "Our demonstration business",
    image: slSiteImage,
    position: "0% 0%",
    alt: "The Spring Line Rigging & Canvas website: rigging and canvas for sailboats in Bellingham, the shop rate, and a button to get an estimate",
    caption: "A site for a rigging and canvas shop: who does the work, the shop rate, and a written estimate request on the first screen.",
    href: SPRING_LINE_URL,
    linkLabel: "Visit the shop’s site",
  },
];

const COMMERCE_TABS: Tab[] = [
  {
    id: "store",
    label: "Storefront",
    project: "Berry Good Berry Farm",
    tag: "Our demonstration business",
    image: storefrontImage,
    position: "50% 0%",
    alt: "Berry Good storefront on desktop: a hero with raspberries, what’s ripe today, and berries to order",
    caption: "The storefront: what’s ripe today, ordering, and pickup, designed and built to sell.",
    href: BERRY_URL,
    linkLabel: "Visit the storefront",
  },
  {
    id: "order",
    label: "Order to pickup",
    project: "Berry Good Berry Farm",
    tag: "Our demonstration business",
    image: journeyImage,
    position: "50% 50%",
    alt: "Berry Good customer order journey on phones: browse, order, confirm, and pickup",
    caption: "Browse, order, confirm, pick up: each step on a phone, with nothing to call about.",
    href: BERRY_URL,
    linkLabel: "Try ordering",
  },
  {
    id: "list",
    label: "Spring List",
    project: "Spring Line Rigging & Canvas",
    tag: "Our demonstration business",
    image: slListImage,
    position: "0% 0%",
    alt: "The Spring List page: $120 a year for reminders, first call in spring, and a lower repair rate",
    caption: "Coming back, for a service business: a yearly list with reminders, first call in spring, and a lower repair rate.",
    href: `${SPRING_LINE_URL}/spring-list/`,
    linkLabel: "See the Spring List",
  },
];

// Spring Line, shown in full on each area page: one tabbed window per area,
// beside a rail that names it as our demonstration business.
const SL_TAG = "Our demonstration business";
const SL_PROJECT = "Spring Line Rigging & Canvas";

const SL_SITE_TABS: Tab[] = [
  {
    id: "site", label: "The site", project: SL_PROJECT, tag: SL_TAG, image: slSiteImage, position: "0% 0%",
    alt: "The Spring Line homepage: rigging and canvas for sailboats, the shop rate, and a button to get an estimate",
    caption: "The first screen answers what a boat owner phones to ask: who does the work, what it costs, and how to start.",
    href: SPRING_LINE_URL, linkLabel: "Visit the shop’s site",
  },
  {
    id: "rates", label: "Rates", project: SL_PROJECT, tag: SL_TAG, image: slRatesImage, position: "0% 0%",
    alt: "The Spring Line rates page: $115 an hour, and current lead times for canvas, rigging, and repairs",
    caption: "Published rates and this week’s lead times, so nobody has to call to find out.",
    href: `${SPRING_LINE_URL}/rates/`, linkLabel: "See the rates page",
  },
  {
    id: "brand", label: "Brand", project: SL_PROJECT, tag: SL_TAG, image: slBrandImage, position: "50% 50%",
    alt: "The Spring Line brand in use: the brand guide, the site on a phone, a sewn canvas label, swatches, and an estimate",
    caption: "The brand on everything the shop touches: the guide, the site, a sewn label, and the estimate.",
    href: SPRING_LINE_KIT_URL, linkLabel: "See the working files",
  },
];

const SL_RETURN_TABS: Tab[] = [
  {
    id: "list", label: "Spring List", project: SL_PROJECT, tag: SL_TAG, image: slListImage, position: "0% 0%",
    alt: "The Spring List page: $120 a year for reminders, first call in spring, and a lower repair rate",
    caption: "A yearly list: a text when the rig check is due, a fall call about canvas, first call in spring, and a lower repair rate.",
    href: `${SPRING_LINE_URL}/spring-list/`, linkLabel: "See the Spring List",
  },
  {
    id: "note", label: "Shop Note", project: SL_PROJECT, tag: SL_TAG, image: slNoteImage, position: "0% 0%",
    alt: "The Shop Note, a seasonal email: the Spring List is open, what is on the bench and in the loft",
    caption: "The seasonal email, drafted from the job list. Mara reads it, adds the boat checks, and sends it.",
    href: `${SPRING_LINE_URL}/kit/shop-note/`, linkLabel: "Read the Shop Note",
  },
];

const SL_OPS_TABS: Tab[] = [
  {
    id: "board", label: "Job board", project: SL_PROJECT, tag: SL_TAG, image: slBoardImage, position: "0% 0%",
    alt: "The Spring Line job board: eight boats, each with its job, material, stage, fit week, and a one-line shop note",
    caption: "The whiteboard by the loft door, put online. Every job, its stage, and the week it fits, updated by a text from the dock.",
    href: `${SPRING_LINE_URL}/board/`, linkLabel: "See the job board",
  },
  {
    id: "status", label: "Status text", project: SL_PROJECT, tag: SL_TAG, image: slStatusImage, position: "50% 0%",
    alt: "A text to a customer with a link to her boat’s status page, and the page it opens: in the loft, fit the week of April 20",
    caption: "When a job moves, the customer gets a text with a link to her boat’s page. Nobody has to call to ask.",
    href: `${SPRING_LINE_URL}/kit/status/`, linkLabel: "See the status link",
  },
  {
    id: "estimate", label: "Estimate", project: SL_PROJECT, tag: SL_TAG, image: slEstimateImage, position: "0% 0%",
    alt: "A written Spring Line estimate for a new dodger, priced line by line from the shop’s rate sheet",
    caption: "The written estimate, built from the same job list and priced from the shop’s own rate sheet.",
    href: `${SPRING_LINE_URL}/kit/estimate/`, linkLabel: "See the estimate",
  },
];

// Autoplay (Charlie, 2026-09-29): once the window is in view, it walks
// through the three tabs on its own, one lap, and rests back on Brand. A thin
// line under the active tab fills while it dwells, and the tab advances when
// the line completes (the CSS animation's end drives the state, so pausing
// the animation pauses the tour). It pauses on hovering or focusing the tab
// strip, when
// scrolled away, or in a background tab, and stops for good the moment the
// visitor picks a tab. Reduced motion: no autoplay, tabs work as normal.
const DWELL_MS = 5200;

// The homepage windows carry a Spring Line tab; an area page that shows
// Spring Line in its own spread passes withSpringLine={false}.
export function BrandShowcase({ withSpringLine = true }: { withSpringLine?: boolean } = {}) {
  const tabs = withSpringLine ? BRAND_TABS : BRAND_TABS.filter(t => t.project !== SL_PROJECT);
  return <TabShowcase tabs={tabs} id="brand" label="Brand and website examples" />;
}

export function CommerceShowcase() {
  return <TabShowcase tabs={COMMERCE_TABS} id="commerce" label="Ecommerce examples" />;
}

// Spring Line as its own labeled spread on an area page: a rail that names it
// openly as our demonstration business, and one tabbed window of its work.
const SL_SPREADS = {
  site: { tabs: SL_SITE_TABS, label: "Spring Line website examples", body: "The site a marine trade needs: services by job, published rates and lead times, and an estimate request that asks the right questions once." },
  return: { tabs: SL_RETURN_TABS, label: "Spring Line repeat-customer examples", body: "Coming back, for a shop that sells work rather than products: the Spring List brings boats back every season, and the Shop Note keeps the shop in mind between jobs." },
  ops: { tabs: SL_OPS_TABS, label: "Spring Line operations examples", body: "The paperwork around every job, from one job list: the board shows what is in the shop, the customer gets a text with a status link, and the written estimate builds itself." },
} as const;

export function SpringLineSpread({ show }: { show: keyof typeof SL_SPREADS }) {
  const spread = SL_SPREADS[show];
  return <div className="sls">
    <div className="sls-rail">
      <p className="v3-kicker">Our second demonstration business</p>
      <h3>Spring Line Rigging &amp; Canvas</h3>
      <p>A demonstration rigging and canvas shop on the Bellingham waterfront. The shop and its six people are made up. The site, the job board, the estimate, and the customer texts are built out in full, so you can click through them.</p>
      <p>{spread.body}</p>
      <ul className="sls-links">
        <li><a href={SPRING_LINE_URL} target="_blank" rel="noreferrer" onClick={outboundClick(SPRING_LINE_URL, `sl-${show}-site`)}>Visit the shop’s site <span aria-hidden="true">↗︎</span><span className="bsc-sr"> (opens in a new tab)</span></a></li>
        <li><a href={SPRING_LINE_KIT_URL} target="_blank" rel="noreferrer" onClick={outboundClick(SPRING_LINE_KIT_URL, `sl-${show}-kit`)}>See the working files <span aria-hidden="true">↗︎</span><span className="bsc-sr"> (opens in a new tab)</span></a></li>
      </ul>
    </div>
    <TabShowcase tabs={[...spread.tabs]} id={`sl-${show}`} label={spread.label} source="sl" />
  </div>;
}

function TabShowcase({ tabs, id, label, source = "home" }: { tabs: Tab[]; id: string; label: string; source?: string }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);
  const [inView, setInView] = useState(false);
  const [held, setHeld] = useState(false);
  const [steps, setSteps] = useState(0);
  const [hidden, setHidden] = useState(false);
  const started = useRef(false);
  const rootRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = tabs[active];

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      // The tour arms the first time the window is seen, never again after.
      if (entry.isIntersecting && !started.current) { started.current = true; setAuto(true); }
    }, { threshold: 0.4 });
    io.observe(el);
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  const playing = auto && inView && !held && !hidden;
  const advance = () => {
    const next = (active + 1) % tabs.length;
    setActive(next);
    // One lap: after the last tab it returns to the first and rests there.
    if (steps + 1 >= tabs.length) setAuto(false); else setSteps(steps + 1);
  };
  const choose = (index: number) => { setAuto(false); setActive(index); };

  // Roving focus for the tablist: arrows move between tabs, Home/End jump.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = tabs.length - 1;
    const next =
      event.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : event.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    choose(next);
    tabRefs.current[next]?.focus();
  };

  return <article
    ref={rootRef}
    className={`v3-artifact bsc${auto ? " is-auto" : ""}${playing ? "" : " is-held"}`}
  >
    <header className="bsc-bar">
      <span className="bsc-dots" aria-hidden="true"><i /><i /><i /></span>
      {/* Only the tab strip pauses the tour: a cursor resting on the image
          while scrolling must not freeze it (Charlie saw it never move). */}
      <div className="bsc-tabs" role="tablist" aria-label={label} onKeyDown={onKeyDown}
        onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld(false); }}>
        {tabs.map((t, index) => <button
          key={t.id}
          ref={(el) => { tabRefs.current[index] = el; }}
          type="button"
          role="tab"
          id={`${id}-tab-${t.id}`}
          aria-controls={`${id}-panel`}
          aria-selected={index === active}
          tabIndex={index === active ? 0 : -1}
          className={index === active ? "is-active" : undefined}
          onClick={() => choose(index)}
        >{t.label}{auto && index === active && <i key={`${t.id}-${steps}`} className="bsc-progress" aria-hidden="true" style={{ animationDuration: `${DWELL_MS}ms` }} onAnimationEnd={advance} />}</button>)}
      </div>
    </header>

    <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${tab.id}`}>
      <div className="bsc-frame">
        {tabs.map((t, index) => <img
          key={t.id}
          {...imgProps(t.image, SIZES.berry)}
          alt={index === active ? t.alt : ""}
          aria-hidden={index !== active}
          className={index === active ? "is-active" : undefined}
          style={{ objectPosition: t.position }}
          loading="lazy"
          decoding="async"
        />)}
      </div>
      <footer className="bsc-foot">
        <p className="bsc-meta"><strong>{tab.project}</strong><span>{tab.tag}</span></p>
        <p className="bsc-caption" key={tab.id}>{tab.caption}</p>
        <a className="bsc-link" href={tab.href} target="_blank" rel="noreferrer" onClick={outboundClick(tab.href, `${source}-${id}-${tab.id}`)}>
          <span>{tab.linkLabel}</span><span aria-hidden="true">↗︎</span><span className="bsc-sr"> (opens in a new tab)</span>
        </a>
      </footer>
    </div>
  </article>;
}
