// Blocks & Contours on the site (shared helpers; components in BcArt.tsx) (Charlie's pick, option B "Spread", 2026-10-28).
// One generator (src/lib/blocks-contours.mjs, vendored from the studio kit)
// draws every article's art from its composition in src/data/thinking.ts:
//   - BcThumb: the text-free feed/related thumbnail. Fixed palette by type
//     (Essay night, Guide day, Artifact dusk) so the feed reads as a rhythm,
//     and it matches the OG card.
//   - bcCoverArt: the article header art. Drawn in the page's own sky tokens,
//     so the slab is always the CTA fill and the blocks hang from the nav line
//     in day, dusk and night alike.
import { useId, useMemo } from "react";
import { render, artLeft, SIZES, type BcOptions, type BcPalette } from "../../lib/blocks-contours.mjs";
import { thinkingEntries, type ThinkingEntry, type ThinkingType } from "../../data/thinking";

export const SKY_BY_TYPE: Partial<Record<ThinkingType, "day" | "dusk" | "night">> = { Essay: "night", Guide: "day", Artifact: "dusk" };

// The live sky, as custom properties (madrona-v2.css day/dusk/night ramps).
const LIVE: BcPalette = {
  bg: "var(--paper)", ink: "var(--ink)", muted: "var(--muted)", line: "var(--art-hair)",
  bark: "var(--bark)", companion: "var(--bark-dark)", tint: "var(--color-madrona-light)",
  slab: "var(--forest)", slabInk: "var(--paper)",
};

const seedOf = (href: string) => href.split("/").filter(Boolean).pop() || "madrona";
export const base = (e: ThinkingEntry) => ({ option: "B" as const, seed: seedOf(e.href), ...e.bc });
export const cleanId = (id: string) => `bc${id.replace(/[^a-zA-Z0-9]/g, "")}`;

const entryFor = (href: string) => thinkingEntries.find((e) => e.href === href);

// The header frame (1600 x 640, art only) and the phone strip (a shorter frame
// with chunkier blocks and half the width given to the slab).
const STRIP = { w: 780, h: 360, k: 0.75 };

export function useBcCover(href: string | undefined) {
  const id = cleanId(useId());
  return useMemo(() => {
    const e = href ? entryFor(href) : undefined;
    if (!e) return null;
    const wide: BcOptions = { ...base(e), size: "header", mode: "art", palette: LIVE, noGround: true, id: `${id}w` };
    const strip: BcOptions = { ...base(e), size: STRIP, mode: "art", palette: LIVE, noGround: true, slabFrac: 0.5, id: `${id}s` };
    const F = SIZES.header;
    return {
      entry: e,
      wide: render(wide),
      strip: render(strip),
      // How wide the art is, in units of the band's height: the copy and its
      // rails stop where the blocks begin.
      artRatio: (F.w - artLeft(wide)) / F.h,
      frameRatio: F.w / F.h,
    };
  }, [href, id]);
}
