// Blocks & Contours thumbnail (see bcCover.ts for the system notes).
import { useId, useMemo } from "react";
import { render } from "../../lib/blocks-contours.mjs";
import type { ThinkingEntry } from "../../data/thinking";
import { SKY_BY_TYPE, base, cleanId } from "./bcCover";
import "./bc-art.css";

export function BcThumb({ entry }: { entry: ThinkingEntry }) {
  const id = cleanId(useId());
  const svg = useMemo(
    () => render({ ...base(entry), size: "thumb", mode: "thumb", sky: SKY_BY_TYPE[entry.type] || "night", id }),
    [entry, id],
  );
  return <div className="bc-thumb" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />;
}

