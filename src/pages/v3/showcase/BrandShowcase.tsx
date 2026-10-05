import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { imgProps, SIZES } from "../../../lib/responsiveImage";
import brandImage from "../../../../docs/madrona-v2-build-kit/placeholders/product-proof/berry-good-brand-system-wide.webp?w=640;960;1280&format=webp&as=img";
import storefrontImage from "../../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-storefront-desktop.webp?w=640;960;1280&format=webp&as=img";
import journeyImage from "../../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-customer-journey.webp?w=640;960;1280&format=webp&as=img";
import mobileImage from "../../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-storefront-mobile.webp?w=640;960;1280&format=webp&as=img";
import { BERRY_URL } from "../../../data/proof";
import { outboundClick } from "../../../lib/analytics";
import "./brand.css";

// The tabbed work window (2026-09-29 refactor; reworked 2026-10-06). One
// window, a few pieces of real work, crossfading in a fixed-ratio frame so a
// tab switch never shifts the page. Every piece is Berry Good Berry Farm, our
// demonstration business, and is labeled so; links go only to the deployed
// site (BERRY_URL), shown with a plain label rather than its preview-style
// host. The San Juan guide came out of the service pages on 2026-10-06.

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

export function BrandShowcase() {
  return <TabShowcase tabs={BRAND_TABS} id="brand" label="Brand and website examples" />;
}

export function CommerceShowcase() {
  return <TabShowcase tabs={COMMERCE_TABS} id="commerce" label="Ecommerce examples" />;
}

function TabShowcase({ tabs, id, label }: { tabs: Tab[]; id: string; label: string }) {
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
        <a className="bsc-link" href={tab.href} target="_blank" rel="noreferrer" onClick={outboundClick(tab.href, `home-${id}-${tab.id}`)}>
          <span>{tab.linkLabel}</span><span aria-hidden="true">↗︎</span><span className="bsc-sr"> (opens in a new tab)</span>
        </a>
      </footer>
    </div>
  </article>;
}
