import type { ThinkingType } from "../../data/thinking";

// Type marks — one small glyph per /thinking content type, in the brand's
// line language (1.7 stroke, one concept per mark, abstract over literal):
//   Essay    — a ring with a center dot: a held position, a point of view.
//   Guide    — an ascending stair: step by step, you end up higher.
//   Artifact — corner brackets framing a solid block: a made thing.
// Types without a mark yet (Learning, Announcement) fall back to no icon.

const PATHS: Partial<Record<ThinkingType, { stroke: string; fill?: string }>> = {
  Essay: {
    stroke: "M12 12m-7.2 0a7.2 7.2 0 1 0 14.4 0a7.2 7.2 0 1 0-14.4 0",
    fill: "M12 12m-2.2 0a2.2 2.2 0 1 0 4.4 0a2.2 2.2 0 1 0-4.4 0",
  },
  Guide: {
    stroke: "M3.5 19.5h5.4v-5.4h5.4V8.7h6.2M17.5 5.7l3 3-3 3",
  },
  Artifact: {
    stroke: "M4 8.2V6a2 2 0 0 1 2-2h2.2M15.8 4H18a2 2 0 0 1 2 2v2.2M20 15.8V18a2 2 0 0 1-2 2h-2.2M8.2 20H6a2 2 0 0 1-2-2v-2.2",
    fill: "M9.4 9.4h5.2a0 0 0 0 1 0 0v5.2a0 0 0 0 1 0 0H9.4a0 0 0 0 1 0 0V9.4a0 0 0 0 1 0 0Z",
  },
};

export default function TypeMark({ type }: { type: ThinkingType }) {
  const p = PATHS[type];
  if (!p) return null;
  return (
    <svg className="m2-typemark" viewBox="0 0 24 24" aria-hidden="true">
      <path d={p.stroke} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      {p.fill && <path d={p.fill} fill="currentColor" stroke="none" />}
    </svg>
  );
}

// The chosen presentation (Charlie, 2026-08-18): the Product Thesis idiom —
// a small tinted circle per type. Sage = essay, slate = guide, bark = artifact.
const TYPE_TONE: Partial<Record<ThinkingType, string>> = {
  Essay: "sprout",
  Guide: "layers",
  Artifact: "storefront",
};

export function TypeCircle({ type }: { type: ThinkingType }) {
  if (!PATHS[type]) return null;
  return (
    <span className="m2-ab4-ico m2-tm-circle" data-tone={TYPE_TONE[type] ?? "sprout"}>
      <TypeMark type={type} />
    </span>
  );
}
