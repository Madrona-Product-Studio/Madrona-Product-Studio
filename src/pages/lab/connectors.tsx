/* Connector logos — the tools an agent plugs into, shown as small brand marks.
   Brand paths are single-color glyphs (via simple-icons); generic inputs
   (email, bank feeds, a file) fall back to line icons. Used on the gallery
   cards and the agent spec card so "connects to" reads at a glance. */

import { resolve } from "./connectorMarks";

function Glyph({ name }: { name: string }) {
  const m = resolve(name);
  return m.kind === "brand" ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className="agx-conn-svg" aria-hidden="true"><path d={m.d} /></svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="agx-conn-svg" aria-hidden="true"><path d={m.d} /></svg>
  );
}

// Logo + label chips (spec card, gallery cards).
export function ConnectorRow({ items }: { items: string[] }) {
  return (
    <span className="agx-conns">
      {items.map((n) => (
        <span key={n} className="agx-conn"><Glyph name={n} /><span className="agx-conn-lbl">{n}</span></span>
      ))}
    </span>
  );
}

// Logos only, in tiles (list-view left cluster).
export function ConnectorLogos({ items }: { items: string[] }) {
  return (
    <span className="agx-connlogos">
      {items.map((n) => (
        <span key={n} className="agx-connlogo" title={n}><Glyph name={n} /></span>
      ))}
    </span>
  );
}
