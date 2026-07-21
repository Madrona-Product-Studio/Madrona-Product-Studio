import { useSearchParams } from "react-router-dom";
import PageMeta from "../components/PageMeta";
import V1 from "./brief/V1";
import V1_1 from "./brief/V1_1";
import V2 from "./brief/V2";
import V3 from "./brief/V3";

/**
 * Internal working page — the one-page positioning brief with a version
 * trail. Convention: each revision is a NEW frozen file under ./brief/
 * (V3.tsx, V4.tsx, ...) added to the registry below, newest first. Old
 * versions are never edited. Not in nav, not prerendered.
 */

const versions = [
  {
    id: "3",
    label: "v3",
    stamp: "Jul 20, night",
    note: "Homepage session settlements: the problem voice lands (spoken register, Charlie-approved) and the hero headline is set.",
    Body: V3,
  },
  {
    id: "2",
    label: "v2",
    stamp: "Jul 20, evening",
    note: "Option A ingested: horizontal scope, symptom language, three problem voices, three verbs, referral sentence, agenda over free.",
    Body: V2,
  },
  {
    id: "1.1",
    label: "v1.1",
    stamp: "Jul 20, midday",
    note: "Charlie's first reactions: retention proposed as a fourth bucket; REI/Healthline/Microsoft proof points mapped.",
    Body: V1_1,
  },
  {
    id: "1",
    label: "v1",
    stamp: "Jul 20, morning",
    note: "First render: the canon and workshop strawmen on the page.",
    Body: V1,
  },
];

export default function StudioBrief() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("v");
  const current = versions.find((v) => v.id === requested) ?? versions[0];
  const isLatest = current.id === versions[0].id;

  return (
    <div className="space-y-12">
      <PageMeta title="Studio brief (internal)" description="Internal working brief." />

      <section className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-widest text-muted mb-4">
          Internal · the one-page brief · canonized in charlie-hq
        </p>
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-line pb-4">
          <span className="text-xs font-medium uppercase tracking-wider text-muted">Versions</span>
          {versions.map((v) => (
            <button
              key={v.id}
              onClick={() => setSearchParams(v.id === versions[0].id ? {} : { v: v.id })}
              className={`press bg-transparent border-none cursor-pointer p-0 text-sm font-medium transition-colors ${
                v.id === current.id
                  ? "text-ink border-b-2 border-madrona"
                  : "text-madrona hover:text-madrona-dark"
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted mt-3">
          <span className="font-medium text-ink70">{current.label}</span> · {current.stamp} — {current.note}
        </p>
        {!isLatest && (
          <div className="mt-4 border-l-2 border-madrona/40 pl-4 py-1 text-sm text-ink70">
            You're reading an older version.{" "}
            <button
              onClick={() => setSearchParams({})}
              className="bg-transparent border-none cursor-pointer p-0 text-sm font-medium text-madrona hover:text-madrona-dark"
            >
              Jump to {versions[0].label} (current) &rarr;
            </button>
          </div>
        )}
      </section>

      <current.Body />
    </div>
  );
}
