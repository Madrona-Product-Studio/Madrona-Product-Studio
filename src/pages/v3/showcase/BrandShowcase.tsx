import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { imgProps, SIZES } from "../../../lib/responsiveImage";
import brandImage from "../../../../docs/madrona-v2-build-kit/placeholders/product-proof/berry-good-brand-system-wide.webp?w=640;960;1280&format=webp&as=img";
import storefrontImage from "../../../../docs/madrona-v2-build-kit/product-proof/berry-good/berry-storefront-desktop.webp?w=640;960;1280&format=webp&as=img";
import sanJuanImage from "../../../../docs/madrona-v2-build-kit/site-assets/sjbg-composite.webp?w=640;960;1280&format=webp&as=img";
import { BERRY_URL } from "../../../data/proof";
import { outboundClick } from "../../../lib/analytics";
import "./brand.css";

// Brand & Website showcase (2026-09-29 refactor). One window, three pieces of
// work across two very different businesses, so the range reads at a glance:
// a farm's brand system, the same farm's storefront, and a live regional
// guide. Berry Good is named as our demonstration business on its tabs; San
// Juan is a live product of ours, pitched as the kind of guide a marina,
// outfitter, or tourism group could have. The footer links carry only real,
// resolving hosts (BERRY_URL is the deployed storefront; sjiboating.com is
// the guide), never an invented domain. All three images stay mounted in one
// fixed-ratio frame and crossfade, so switching tabs never shifts the page.

// Review pass (same day): Berry Good's storefront still lives on a Vercel
// preview-style host with a random suffix, which read as a throwaway deploy in
// orange mono. The links now carry a plain label and keep the real href; the
// host is still what the browser shows on hover. San Juan's own domain is
// clean, so its label names it.
const SJ_URL = "https://www.sjiboating.com/";

const tabs = [
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
    linkLabel: "Visit the storefront",
  },
  {
    id: "storefront",
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
    id: "guide",
    label: "Local guide",
    project: "San Juan Boating Guide",
    tag: "Live, our own product",
    image: sanJuanImage,
    position: "50% 50%",
    alt: "San Juan Boating Guide on a tablet map of the islands and a phone showing live wind and tides",
    caption: "Marinas, parks, and dining on one map, with live wind and tides. The kind of guide a marina, outfitter, or tourism group could offer.",
    href: SJ_URL,
    linkLabel: "Visit sjiboating.com",
  },
];

// Autoplay (Charlie, 2026-09-29): once the window is in view, it walks
// through the three tabs on its own, one lap, and rests back on Brand. A thin
// line under the active tab fills while it dwells, and the tab advances when
// the line completes (the CSS animation's end drives the state, so pausing
// the animation pauses the tour). It pauses on hover, keyboard focus, when
// scrolled away, or in a background tab, and stops for good the moment the
// visitor picks a tab. Reduced motion: no autoplay, tabs work as normal.
const DWELL_MS = 5200;

export function BrandShowcase() {
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
    // One lap: after the last tab it returns to Brand and rests there.
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
    onPointerEnter={() => setHeld(true)}
    onPointerLeave={() => setHeld(false)}
    onFocus={() => setHeld(true)}
    onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld(false); }}
  >
    <header className="bsc-bar">
      <span className="bsc-dots" aria-hidden="true"><i /><i /><i /></span>
      <div className="bsc-tabs" role="tablist" aria-label="Brand and website examples" onKeyDown={onKeyDown}>
        {tabs.map((t, index) => <button
          key={t.id}
          ref={(el) => { tabRefs.current[index] = el; }}
          type="button"
          role="tab"
          id={`bsc-tab-${t.id}`}
          aria-controls="bsc-panel"
          aria-selected={index === active}
          tabIndex={index === active ? 0 : -1}
          className={index === active ? "is-active" : undefined}
          onClick={() => choose(index)}
        >{t.label}{auto && index === active && <i key={`${t.id}-${steps}`} className="bsc-progress" aria-hidden="true" style={{ animationDuration: `${DWELL_MS}ms` }} onAnimationEnd={advance} />}</button>)}
      </div>
    </header>

    <div id="bsc-panel" role="tabpanel" aria-labelledby={`bsc-tab-${tab.id}`}>
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
        <a className="bsc-link" href={tab.href} target="_blank" rel="noreferrer" onClick={outboundClick(tab.href, `home-brand-${tab.id}`)}>
          <span>{tab.linkLabel}</span><span aria-hidden="true">↗︎</span><span className="bsc-sr"> (opens in a new tab)</span>
        </a>
      </footer>
    </div>
  </article>;
}
