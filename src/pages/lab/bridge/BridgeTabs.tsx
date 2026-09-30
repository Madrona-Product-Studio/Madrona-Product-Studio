// TEMP motion option D (2026-09-29): Index tabs. Delete with the harness.
// Brief: docs/positioning-2026-09/bridge-motion-brief.md
//
// The idea: the work below is a drawer, and the four areas are its dividers.
// A single hairline runs across the page as the drawer's front edge (it
// stands in for the first area section's top rule), and four 1/4-cut index
// tabs stand up behind it into the bottom of the hero. Everything below the
// edge is clipped, so a tab can only ever be seen rising out of the drawer.
//
// Motion (madrona-motion):
// - Entrance: when the strip enters the viewport the tabs rise out from
//   behind the edge one after another, 01 to 04. Transform only, ease-out,
//   80ms stagger, done in about 1.1s. JS arms the hidden state before first
//   paint (useLayoutEffect), so no-JS, a still frame, and reduced motion all
//   show the tabs standing in place.
// - Hover or focus: the tab pulls up out of the drawer just far enough to
//   show the rest of its card, the short capability words that sat hidden
//   behind the edge. The lift is translateY(tab height - card height), so it
//   is exact whether the words take one line or two. Hover is gated to fine
//   pointers; focus always lifts.
// - Phones: two rows of dividers at two depths (01 and 02 behind, 03 and 04
//   in front), no words, the same rise, back row first.
import { useLayoutEffect, useRef } from "react";
import { areas } from "../../v3/AreasSection";
import "./bridge-tabs.css";

// The short capability words, keyed by area id (brief: "Content").
const WORDS: Record<string, string> = {
  "ai-operations": "Reports, finance agents, inbox triage",
  "brand-website": "Brands, storefronts, local guides",
  "growth-retention": "Follow-up, reviews, onboarding",
  "new-products": "Prototype to launched product",
};

export function BridgeTabs() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("bt-armed");
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        el.classList.remove("bt-armed");
        el.classList.add("bt-in");
        io.disconnect();
      }
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); el.classList.remove("bt-armed", "bt-in"); };
  }, []);

  return <nav ref={ref} className="bt" aria-label="The four areas of work">
    <div className="v3-shell bt-drawer">
      <ol className="bt-tabs">
        {areas.map((area, i) => <li key={area.id} className="bt-tab" style={{ "--i": i } as React.CSSProperties}>
          <a className="bt-card" href={`#area-${area.id}`}>
            <span className="bt-head"><span className="bt-num">{String(i + 1).padStart(2, "0")}</span><strong>{area.name}</strong></span>
            <em className="bt-words">{WORDS[area.id]}</em>
          </a>
        </li>)}
      </ol>
    </div>
    <i className="bt-edge" aria-hidden="true" />
  </nav>;
}
