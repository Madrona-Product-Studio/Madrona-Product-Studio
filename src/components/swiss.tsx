// ────────────────────────────────────────────────────────────────────────────
// swiss/zen primitives, adapted for Madrona.
// Faithful to the studio system (uppercase micro-labels, the section-signature
// Marker, the one Breath line, hairlines) but using Madrona's bark accent and
// the madrona dot as the mark, not the travel/garden glyph family.
// ────────────────────────────────────────────────────────────────────────────
import type { ReactNode } from "react";

/** Uppercase, tracked micro-label — the system's quiet caption/eyebrow. */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`text-[11px] font-semibold uppercase tracking-[0.16em] text-muted ${className}`}>
      {children}
    </span>
  );
}

/** Hairline rule. */
export function Hairline({ soft = false, className = "" }: { soft?: boolean; className?: string }) {
  return <div className={`h-px w-full ${soft ? "bg-line-soft" : "bg-line"} ${className}`} />;
}

/** A small bordered, slightly-rotated stamp — the section index mark. */
export function Seal({ label, className = "" }: { label: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-[30px] h-[30px] rounded-[3px] border-[1.5px] border-madrona/70 text-madrona text-[11px] font-bold shrink-0 ${className}`}
      style={{ transform: "rotate(-2deg)" }}
    >
      {label}
    </span>
  );
}

/** The recurring section-header signature: a short madrona accent rule. */
export function Marker({ index: _index }: { index?: string }) {
  return <span className="block h-[3px] w-12 bg-madrona" aria-hidden="true" />;
}

/** The single emotional line per section — a touch larger, calmer than body. */
export function Breath({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`m-0 text-clay text-[18px] sm:text-[21px] leading-[1.5] ${className}`}>
      {children}
    </p>
  );
}
