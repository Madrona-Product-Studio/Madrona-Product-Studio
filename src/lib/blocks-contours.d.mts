// Types for blocks-contours.mjs (vendored generator, plain ESM so the OG
// script can import it in Node). Keep the two files in step.
export type BcPalette = {
  bg: string; ink: string; muted: string; line: string; bark: string;
  companion: string; tint: string; slab: string; slabInk: string;
};
export type BcSize = { w: number; h: number; k: number };
export type BcArrangement = "cover" | "step" | "hang" | "cut" | "bleed";
export type BcMotif = "rings" | "ridge" | "saddle" | "route" | "spot";
export type BcOptions = {
  option: "A" | "B" | "C" | "D";
  size: keyof typeof SIZES | BcSize;
  seed: string;
  arrangement: BcArrangement;
  motif: BcMotif;
  spots?: number;
  buried?: boolean;
  sky?: "day" | "dusk" | "night";
  palette?: BcPalette;
  mode?: "frame" | "art" | "thumb";
  slabFrac?: number;
  noGround?: boolean;
  id?: string;
  title?: string;
  kicker?: string;
  meta?: string;
  site?: string;
  measure?: (text: string, px: number, weight: number, family: string, ls?: number) => number;
};
export const PALETTE: Record<"day" | "dusk" | "night", BcPalette>;
export const SIZES: Record<"header" | "og" | "thumb" | "linkedin" | "hub" | "deck", BcSize>;
export function render(o: BcOptions): string;
export function artLeft(o: BcOptions): number;
export function canvasMeasure(): NonNullable<BcOptions["measure"]>;
