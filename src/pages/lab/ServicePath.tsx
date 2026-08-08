import type { ServiceId } from "../../data/services";

// The service "path" graphic — each door's three-stage journey (from the
// pathSteps data) drawn as an editorial rail that lands on a bark node.
// One motif per door (shared with ServiceIcon), one bark accent. On the
// PovThumb / ServiceIcon visual family: --forest lines on a paper plate.
// Replaces the photo-collage artifact on the /services sections (T7).

const FOREST = "var(--forest)";
const BARK = "var(--bark)";

// Per-door motif glyph (scaled from ServiceIcon), drawn centered at (cx,cy).
function Motif({ id, cx, cy, s }: { id: ServiceId; cx: number; cy: number; s: number }) {
  const t = `translate(${cx} ${cy}) scale(${s * 4}) translate(-12 -12)`;
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (id === "brand-and-web")
    return <g transform={t} {...p}><rect x={4} y={5.5} width={16} height={13} rx={2} /><path d="M4 9.3h16" /><path d="M7 12.6h6.4M7 15.4h4" /></g>;
  if (id === "customers-and-growth")
    return <g transform={t} {...p}><path d="M4.5 17 11 10.5l3 3L19.5 8" /><path d="M15.6 7.6h3.9v3.9" /></g>;
  if (id === "operations-and-ai")
    return <g transform={t} {...p}><circle cx={12} cy={12} r={3.2} /><path d="M12 2.8v2.6M12 18.6v2.6M4.2 7.5l2.2 1.3M17.6 15.2l2.2 1.3M4.2 16.5l2.2-1.3M17.6 8.8l2.2-1.3" /></g>;
  return <g transform={t} {...p}><path d="M12 3.6 4.6 7.8v8.4L12 20.4l7.4-4.2V7.8L12 3.6Z" /><path d="M4.6 7.8 12 12l7.4-4.2" /><path d="M12 12v8.4" /></g>;
}

export function ServicePath({ id, steps }: { id: ServiceId; steps: string[] }) {
  const xs = [360, 800, 1240];
  const cy = 560;
  return (
    <svg viewBox="0 0 1600 1100" role="img" aria-label={`Path: ${steps.join(" to ")}`} preserveAspectRatio="xMidYMid meet" style={{ display: "block", width: "100%", aspectRatio: "16 / 11" }}>
      {/* faint construction grid */}
      <g stroke={FOREST} strokeOpacity={0.05} strokeWidth={2}>
        <line x1={330} y1={70} x2={330} y2={1030} />
        <line x1={800} y1={70} x2={800} y2={1030} />
        <line x1={1270} y1={70} x2={1270} y2={1030} />
        <line x1={150} y1={300} x2={1450} y2={300} />
        <line x1={150} y1={800} x2={1450} y2={800} />
      </g>
      {/* the rail + dashed lead-in */}
      <line x1={xs[0]} y1={cy} x2={xs[2]} y2={cy} stroke={FOREST} strokeWidth={3} />
      <line x1={190} y1={cy} x2={xs[0]} y2={cy} stroke={FOREST} strokeOpacity={0.35} strokeWidth={2.5} strokeDasharray="7 11" />
      {/* progression arrowheads between nodes */}
      {[590, 1030].map((x) => (
        <path key={x} d={`M ${x} ${cy} l -22 -14 M ${x} ${cy} l -22 14`} fill="none" stroke={FOREST} strokeOpacity={0.5} strokeWidth={3} strokeLinecap="round" />
      ))}
      {xs.map((x, i) => {
        const last = i === xs.length - 1;
        return (
          <g key={x}>
            <circle cx={x} cy={cy} r={56} fill={last ? BARK : "var(--card, #fff)"} stroke={last ? "none" : FOREST} strokeWidth={last ? 0 : 3.5} />
            <g style={{ color: last ? "#fff" : FOREST }}>
              <Motif id={id} cx={x} cy={cy} s={0.64} />
            </g>
            <text x={x} y={cy - 100} textAnchor="middle" fill={FOREST} fillOpacity={0.4} style={{ font: "700 28px Inter, sans-serif", letterSpacing: "0.14em" }}>
              {`0${i + 1}`}
            </text>
            <text x={x} y={cy + 158} textAnchor="middle" fill={FOREST} style={{ font: "600 47px Inter, sans-serif", letterSpacing: "-0.01em" }}>
              {steps[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
