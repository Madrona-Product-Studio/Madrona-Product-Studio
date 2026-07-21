import { Label } from "../../components/swiss";

/**
 * Shared pieces for the versioned /brief page. Convention: every revision
 * of the brief is a NEW frozen file (V3.tsx, V4.tsx, ...) registered in
 * StudioBrief.tsx — old versions are never edited, so the trail stays
 * honest.
 */

export function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="max-w-2xl">
      <Label className="block mb-3">{label}</Label>
      <div className="space-y-4 text-ink70 leading-relaxed">{children}</div>
    </section>
  );
}

export function Open({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-madrona/40 pl-5 py-0.5">
      <span className="text-[11px] font-medium uppercase tracking-wider text-madrona/70 block mb-1.5">
        Open — needs Charlie's call
      </span>
      <div className="space-y-3 text-ink70 leading-relaxed">{children}</div>
    </div>
  );
}
