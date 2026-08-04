// Products practice as a CYCLE — its own intention, distinct from the About
// star/hub-and-spoke. Six stages sit on a ring with bark arrows flowing
// clockwise around it: strategy → design → build → operate → respond → improve
// → back again. Square, sized for the right column of the /apps header.

const ICONS = {
  strategy: "M12 12m-8.2 0a8.2 8.2 0 1 0 16.4 0a8.2 8.2 0 1 0-16.4 0M12 12m-3.4 0a3.4 3.4 0 1 0 6.8 0a3.4 3.4 0 1 0-6.8 0",
  design: "M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3zM13.5 6.5l3 3",
  build: "M9 8l-4 4 4 4M15 8l4 4-4 4",
  operate: "M4 8.5h16v11H4zM4 13h16M8 8.5V6a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 16 6v2.5",
  respond: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 8a6 6 0 0 1 12 0M17 11a2.5 2.5 0 1 0 0-5M18 19a5 5 0 0 0-3-4.6",
  improve: "M4 20h16M7 20v-5M12 20V9M17 20v-9M14 6l3-3 3 3",
  loop: "M20 11a8 8 0 0 0-14-4.6L4 8M4 5v3h3M4 13a8 8 0 0 0 14 4.6L20 16M20 19v-3h-3",
} as const;

const I = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

type Place = "top" | "bottom" | "right" | "left";
type Step = { id: string; title: string; tag: string; icon: keyof typeof ICONS; tone: "sage" | "bark" | "slate"; place: Place };

const STEPS: Step[] = [
  { id: "strategy", title: "Strategy", tag: "What to build", icon: "strategy", tone: "sage", place: "top" },
  { id: "design", title: "Design", tag: "The experience", icon: "design", tone: "bark", place: "right" },
  { id: "build", title: "Build", tag: "Shipped software", icon: "build", tone: "slate", place: "right" },
  { id: "operate", title: "Operate", tag: "Run in production", icon: "operate", tone: "sage", place: "bottom" },
  { id: "respond", title: "Respond", tag: "To real users", icon: "respond", tone: "bark", place: "left" },
  { id: "improve", title: "Improve", tag: "Decide what's next", icon: "improve", tone: "slate", place: "left" },
];

const CX = 50, CY = 50, R = 33, TRIM = 17;
const rad = (d: number) => (d * Math.PI) / 180;
const at = (deg: number) => ({ x: CX + R * Math.cos(rad(deg)), y: CY + R * Math.sin(rad(deg)) });
const angle = (i: number) => -90 + i * (360 / STEPS.length);

export default function ProductsCycleDiagram() {
  const segs = STEPS.map((_, i) => {
    const p1 = at(angle(i) + TRIM), p2 = at(angle(i + 1) - TRIM);
    return `M${p1.x} ${p1.y} A ${R} ${R} 0 0 1 ${p2.x} ${p2.y}`;
  });

  return (
    <div className="pcy">
      <svg className="pcy-lines" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <marker id="pcy-arrow" markerWidth="7" markerHeight="7" refX="3.6" refY="3" orient="auto">
            <path d="M0.6 0.8 L4.6 3 L0.6 5.2" fill="none" stroke="var(--bark)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        {segs.map((d, i) => <path key={i} d={d} markerEnd="url(#pcy-arrow)" />)}
      </svg>

      <div className="pcy-hub" aria-hidden="true">
        <span className="pcy-hub-ico"><I d={ICONS.loop} /></span>
        <span className="pcy-hub-label">The loop we run<br />on our own products</span>
      </div>

      {STEPS.map((s, i) => {
        const p = at(angle(i));
        return (
          <div className={`pcy-node pcy-node--${s.place}`} key={s.id} style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            <span className={`pcy-chip pcy-chip--${s.tone}`}><I d={ICONS[s.icon]} /></span>
            <span className="pcy-label"><strong>{s.title}</strong><span>{s.tag}</span></span>
          </div>
        );
      })}
    </div>
  );
}
