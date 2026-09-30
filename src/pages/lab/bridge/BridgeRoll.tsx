// TEMP motion option B · Rolling capabilities (2026-09-29). Delete with the
// /lab/bridge harness. Brief: docs/positioning-2026-09/bridge-motion-brief.md
//
// A quiet ruled strip instead of a cream slab: one hairline across the foot
// of the hero, four columns hanging from it, no fill, so the contour ground
// shows through in every sky. Each area's second line rolls through real
// things we've built in that area, one at a time, as a slow wave that crosses
// the four columns left to right and then rests for about four seconds. The
// meaning: there is more behind each area than one line can hold.
//
// Motion rules (madrona-motion): the markup renders the settled strip with
// each column's first built item showing, so a still frame, no-JS, and reduced
// motion all show a complete strip. JS arms the entrance before first paint
// (useLayoutEffect) and holds it until the strip is on screen and the hero's
// this-week sequence has settled (heroSequence.ts, Charlie's choreography
// note), or at once if the hero is mostly scrolled away. Then the rule draws
// left to right, each column divider drops as the rule reaches it, and the
// columns settle in (about 1.1s total). The roll starts after a ~3s rest. It pauses on
// hover or keyboard focus anywhere in the strip, when the strip is offscreen,
// and when the tab is hidden; resuming always waits a full rest first.
// Transform and opacity only; the rolling lines share one grid cell, so no
// layout shift. CSS transitions (not keyframes) so a pause mid-roll settles.
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { areas } from "../../v3/AreasSection";
import { afterHero } from "../../v3/heroSequence";
import "./bridge-roll.css";

// Short forms of each area's built items (areas[i].built in AreasSection.tsx),
// same order, trimmed to fit one line in a column. New Products uses the four
// products its showcase leads with (ProductsShowcase.tsx), since that area's
// rail lists the rest of the portfolio instead.
const ROLL: Record<string, string[]> = {
  "ai-operations": ["Field notes into draft reports", "Bookkeeping and month-end agents", "Customer inbox triage", "Operations dashboards"],
  "brand-website": ["Brand systems and packaging", "Storefronts and online ordering", "Local guides with live conditions", "Sign-up and checkout flows"],
  "growth-retention": ["Reminder and win-back automations", "Guides that cite their sources", "Onboarding flows", "Review requests and follow-up"],
  "new-products": ["AI-planned trip itineraries", "Live maps and conditions", "Voice-first intake", "Health guidance with guardrails"],
};

// Screen readers get one steady phrase per link instead of a moving line.
const SUMMARY: Record<string, string> = {
  "ai-operations": "Reports, finance agents, inbox triage",
  "brand-website": "Brands, storefronts, local guides",
  "growth-retention": "Follow-up, reviews, onboarding",
  "new-products": "Prototype to launched product",
};

const FIRST_ROLL = 4200; // from the entrance: ~1.1s entrance, then a ~3s rest
const CYCLE = 5400; // roll to roll: the wave takes ~1.1s, then a ~4.3s rest

const pad = (i: number) => String(i + 1).padStart(2, "0");

export function BridgeRoll() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  // One effect runs the whole choreography. It arms before first paint so the
  // settled frame never flashes, then: entrance once the strip is in view and
  // the hero has settled (or the hero is mostly scrolled away), then the roll.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("brr-armed");
    const hero = el.previousElementSibling;
    let heroDone = false;
    let visible = false;
    let entered = false;
    let held = false; // hover or keyboard focus inside the strip
    let started = false;
    let timer = 0;

    const heroGone = () => {
      if (!hero) return true;
      const r = hero.getBoundingClientRect();
      const seen = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
      return seen < r.height * 0.4;
    };
    // The roll: a timer that only runs after the entrance, while the strip is
    // seen and left alone. Resuming always waits a full rest.
    const run = () => {
      window.clearTimeout(timer);
      if (!entered || !visible || held || document.hidden) return;
      timer = window.setTimeout(() => { started = true; setStep(s => s + 1); run(); }, started ? CYCLE : FIRST_ROLL);
    };
    const maybeEnter = () => {
      if (entered || !visible || !(heroDone || heroGone())) return;
      entered = true;
      el.classList.add("brr-in");
      window.removeEventListener("scroll", maybeEnter);
      run();
    };
    const stopWaiting = afterHero(() => { heroDone = true; maybeEnter(); });
    window.addEventListener("scroll", maybeEnter, { passive: true });
    const io = new IntersectionObserver(entries => {
      visible = entries.some(e => e.isIntersecting);
      maybeEnter();
      run();
    }, { threshold: 0.4 });
    io.observe(el);

    const hold = () => { held = true; run(); };
    const release = () => { held = el.matches(":hover") || el.contains(document.activeElement); run(); };
    const onFocusOut = (e: FocusEvent) => { if (!el.contains(e.relatedTarget as Node | null)) release(); };
    el.addEventListener("pointerenter", hold);
    el.addEventListener("pointerleave", release);
    el.addEventListener("focusin", hold);
    el.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", run);
    return () => {
      window.clearTimeout(timer);
      stopWaiting();
      io.disconnect();
      window.removeEventListener("scroll", maybeEnter);
      el.removeEventListener("pointerenter", hold);
      el.removeEventListener("pointerleave", release);
      el.removeEventListener("focusin", hold);
      el.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", run);
    };
  }, []);

  return <nav ref={ref} className="brr v3-shell" aria-label="What we build">
    <i className="brr-rule" aria-hidden="true" />
    <ol>
      {areas.map((a, i) => {
        const items = ROLL[a.id] ?? a.built.map(b => b.what);
        const on = step % items.length;
        const prev = (step - 1 + items.length) % items.length;
        return <li key={a.id} className="brr-col" style={{ "--i": i } as CSSProperties}>
          <a href={`#area-${a.id}`}>
            <span className="brr-num" aria-hidden="true">{pad(i)}<span className="brr-ticks">{items.map((t, j) => <i key={t} className={j === on ? "is-on" : undefined} />)}</span></span>
            <strong className="brr-name">{a.name}<i className="brr-arrow" aria-hidden="true">↓</i></strong>
            <span className="brr-roll" aria-hidden="true">
              {items.map((t, j) => <em key={t} className={j === on ? "is-on" : step > 0 && j === prev ? "is-gone" : undefined}>{t}</em>)}
            </span>
            <span className="brr-sr">: {SUMMARY[a.id]}</span>
          </a>
        </li>;
      })}
    </ol>
  </nav>;
}
