// TEMP motion option C · Peek (2026-09-29). Delete with the /lab/bridge harness.
// Brief: docs/positioning-2026-09/bridge-motion-brief.md
//
// No slab: the strip is the hero's own baseline, a hairline with the four
// areas hung from it, sitting on the contour ground. Each area carries a small
// line glyph drawn from its showcase (a notes page, swatches and a tile, a
// fork, a phone), replacing the four identical ↓ arrows. With a mouse, hover
// or focus lifts the area a few pixels, lights its stretch of the line, and a
// tiny window drops out of the glyph into the space below: a simplified
// rendition of the showcase that's waiting further down. A taste of what's
// below. Touch devices keep just the glyphs.
//
// Motion (madrona-motion): the markup renders the settled strip, so a still
// frame, no-JS, and reduced motion all show the finished state. JS arms the
// entrance before first paint and holds it until the strip is on screen: the
// line draws from the left, then the four areas rise into place, staggered.
// Transform and opacity only; ease-out; the peek is a CSS transition, so it
// retargets mid-flight when the pointer sweeps across the strip.
import { useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { areas } from "../../v3/AreasSection";
import { WindowBar } from "../../v3/ReadCard";
import "./bridge-peek.css";

const WORDS: Record<string, string> = {
  "ai-operations": "Reports, finance agents, inbox triage",
  "brand-website": "Brands, storefronts, local guides",
  "growth-retention": "Follow-up, reviews, onboarding",
  "new-products": "Prototype to launched product",
};

/* ── Glyphs: 24px line drawings, one per showcase ─────────────────────── */
const GLYPHS: Record<string, ReactNode> = {
  // A field-notes page: ruled lines, one flagged.
  "ai-operations": <>
    <path d="M6 3.5h9l3.5 3.5v13.5H6z" />
    <path d="M15 3.5V7h3.5" />
    <path d="M8.8 10.5h6.4M8.8 13.5h4.4M8.8 16.5h5.6" />
    <circle className="bp-g-accent" cx="16.4" cy="13.5" r="1.1" />
  </>,
  // Swatches over a storefront tile.
  "brand-website": <>
    <rect x="3.5" y="4" width="4.6" height="4.6" rx=".6" />
    <rect x="9.7" y="4" width="4.6" height="4.6" rx=".6" />
    <rect className="bp-g-accent" x="15.9" y="4" width="4.6" height="4.6" rx=".6" />
    <rect x="3.5" y="11.5" width="17" height="9" rx="1" />
    <path d="M6.5 17.5h5M15 17.5h2.5" />
  </>,
  // Three nodes and a fork.
  "growth-retention": <>
    <circle cx="4.5" cy="12" r="2" />
    <circle cx="11" cy="12" r="2" />
    <path d="M6.5 12h2.5M13 12h1.5l3-5M14.5 12l3 5" />
    <circle cx="19.5" cy="6" r="2" />
    <circle className="bp-g-accent" cx="19.5" cy="18" r="2" />
  </>,
  // A device tile.
  "new-products": <>
    <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
    <path d="M10.5 5h3" />
    <path d="M9.5 9h5M9.5 11.5h3.5" />
    <path className="bp-g-accent" d="M9.6 17.6c1.3-2.4 3-.4 4.8-2.4" />
  </>,
};

function Glyph({ id }: { id: string }) {
  return <svg className="bp-glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">{GLYPHS[id]}</svg>;
}

/* ── Peeks: tiny, simplified renditions of each showcase ──────────────── */
function PeekNotes() {
  return <>
    <WindowBar path="field notes → report" note="Illustrative" />
    <div className="bp-pk bp-pk-notes">
      <div className="bp-notes">
        <span>hull: crazing stbd</span><span>fuel line corr.</span><span>bilge pump ok</span><span>aft seacock ?</span>
      </div>
      <i className="bp-arrow">→</i>
      <div className="bp-report">
        <b>Findings <small>Draft</small></b>
        <span><em>1</em>Hull</span><span><em>2</em>Fuel system</span><span><em>3</em>Bilge</span>
      </div>
    </div>
  </>;
}

function PeekBrand() {
  return <>
    <WindowBar path="berry good / brand" note="Demo business" />
    <div className="bp-pk bp-pk-brand">
      <div className="bp-spec">
        <strong>Berry Good</strong>
        <span className="bp-swatches"><i className="is-plum" /><i className="is-fir" /><i className="is-moss" /><i className="is-copper" /><i className="is-stone" /></span>
        <small>Logo, palette, type</small>
      </div>
      <div className="bp-tile">
        <span className="bp-tile-img">Berry Good</span>
        <span className="bp-tile-name">Fresh pint</span>
        <b>Add to order</b>
      </div>
    </div>
  </>;
}

function PeekJourney() {
  return <>
    <WindowBar path="journey / one customer" note="Illustrative" />
    <div className="bp-pk bp-pk-journey">
      <svg viewBox="0 4 220 60" aria-hidden="true" focusable="false">
        <path className="bp-j-edge" d="M50 34h14M110 34h22M144 34v-17h8M144 34v17h8" />
        <rect className="bp-j-node" x="4" y="25" width="46" height="18" rx="9" />
        <text x="27" y="37.3">Booked</text>
        <rect className="bp-j-node is-auto" x="64" y="25" width="46" height="18" rx="3" />
        <text x="87" y="37.3">Reminder</text>
        <path className="bp-j-fork" d="M138 28l6 6-6 6-6-6z" />
        <rect className="bp-j-node is-auto" x="152" y="8" width="62" height="18" rx="3" />
        <text x="183" y="20.3">Review ask</text>
        <rect className="bp-j-node is-you" x="152" y="42" width="62" height="18" rx="3" />
        <text x="183" y="54.3">You call</text>
      </svg>
    </div>
  </>;
}

function PeekDevice() {
  return <>
    <WindowBar path="lila trips" note="Live" />
    <div className="bp-pk bp-pk-device">
      <div className="bp-phone">
        <b>Day 1</b>
        <i /><i className="is-short" />
        <svg viewBox="0 0 44 26" aria-hidden="true" focusable="false"><path d="M4 21c6-10 12 2 18-6s10-7 18-10" /><circle cx="4" cy="21" r="2" /><circle cx="40" cy="5" r="2" /></svg>
      </div>
      <div className="bp-dev-copy">
        <strong>Lila Trips</strong>
        <span>AI-planned itineraries, with a paid unlock</span>
        <small><i />Live</small>
      </div>
    </div>
  </>;
}

const PEEKS: Record<string, () => React.ReactElement> = {
  "ai-operations": PeekNotes,
  "brand-website": PeekBrand,
  "growth-retention": PeekJourney,
  "new-products": PeekDevice,
};

export function BridgePeek() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Arm before paint so the settled strip never flashes, then hold until seen.
    el.classList.add("bp-arm");
    let raf = 0;
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      io.disconnect();
      // One frame at the armed state so the transitions have a start point.
      raf = requestAnimationFrame(() => { raf = requestAnimationFrame(() => el.classList.add("bp-in")); });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return <nav ref={ref} className="bp v3-shell" aria-label="What we build">
    <i className="bp-rule" aria-hidden="true" />
    <ol>
      {areas.map((area, i) => {
        const Peek = PEEKS[area.id];
        return <li key={area.id} style={{ "--i": i } as CSSProperties}>
          <i className="bp-seg" aria-hidden="true" />
          <a href={`#area-${area.id}`}>
            <Glyph id={area.id} />
            <span className="bp-text">
              <span className="bp-num">{String(i + 1).padStart(2, "0")}</span>
              <strong>{area.name}</strong>
              <em>{WORDS[area.id]}</em>
            </span>
            {Peek && <div className="bp-peek v3-artifact" aria-hidden="true"><Peek /></div>}
          </a>
        </li>;
      })}
    </ol>
  </nav>;
}
