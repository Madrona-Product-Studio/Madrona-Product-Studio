// Checkup archetype plates — the POV illustration system applied to the
// /checkup owner archetypes. Same language as PovThumb.tsx (abstract,
// diagrammatic, one idea, one bark accent, lab tokens), on a square canvas
// sized for the small reveal slot (~72–96px), so weights run bolder than the
// 16:9 POV plates.
import type { ArchetypeId } from "./MadronaV2Checkup";

const FOREST = "var(--forest)";
const BARK = "var(--bark)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg className="ck-arch-svg" viewBox="0 0 900 900" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {children}
    </svg>
  );
}

// The Best-Kept Secret — a bright center glimpsed through misaligned gaps.
function Secret() {
  const c = 450;
  return (
    <Frame>
      <circle cx={c} cy={c} r={330} fill="none" stroke={FOREST} strokeOpacity={0.35} strokeWidth={10}
        strokeDasharray="1450 260" strokeDashoffset={80} strokeLinecap="round" />
      <circle cx={c} cy={c} r={240} fill="none" stroke={FOREST} strokeOpacity={0.6} strokeWidth={11}
        strokeDasharray="1050 190" strokeDashoffset={620} strokeLinecap="round" />
      <circle cx={c} cy={c} r={150} fill="none" stroke={FOREST} strokeWidth={12}
        strokeDasharray="640 130" strokeDashoffset={310} strokeLinecap="round" />
      <circle cx={c} cy={c} r={52} fill={BARK} />
    </Frame>
  );
}

// The Duct-Tape Operator — everything converges on one node; two runs spliced.
function Ducttape() {
  const c = 450;
  const arms: [number, number][] = [
    [120, 150], [700, 130], [110, 640], [760, 700], [430, 90], [450, 810],
  ];
  // short double-tick splice across a line at point (x,y), angle a (deg)
  const splice = (x: number, y: number, a: number) => {
    const rad = ((a + 90) * Math.PI) / 180;
    const dx = Math.cos(rad) * 34;
    const dy = Math.sin(rad) * 34;
    const off = { x: Math.cos((a * Math.PI) / 180) * 20, y: Math.sin((a * Math.PI) / 180) * 20 };
    return (
      <g stroke={FOREST} strokeWidth={12} strokeLinecap="round">
        <line x1={x - dx - off.x} y1={y - dy - off.y} x2={x + dx - off.x} y2={y + dy - off.y} />
        <line x1={x - dx + off.x} y1={y - dy + off.y} x2={x + dx + off.x} y2={y + dy + off.y} />
      </g>
    );
  };
  return (
    <Frame>
      <g stroke={FOREST} strokeOpacity={0.55} strokeWidth={10} strokeLinecap="round">
        {arms.map(([x, y], i) => <line key={i} x1={x} y1={y} x2={c} y2={c} />)}
      </g>
      {splice(285, 300, 42)}
      {splice(605, 575, 39)}
      <g fill={FOREST}>
        {arms.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={26} />)}
      </g>
      <circle cx={c} cy={c} r={56} fill={BARK} />
    </Frame>
  );
}

// The Curious Skeptic — a patient lens holding one small claim to the light.
function Skeptic() {
  const c = 450;
  return (
    <Frame>
      <circle cx={c} cy={c} r={310} fill="none" stroke={FOREST} strokeWidth={11}
        strokeOpacity={0.55} strokeDasharray="26 30" />
      <circle cx={c} cy={c} r={200} fill="none" stroke={FOREST} strokeWidth={12} />
      {/* the claim under inspection */}
      <rect x={c - 52} y={c - 52} width={104} height={104} rx={20} fill="none" stroke={BARK} strokeWidth={13} />
      {/* the gaze */}
      <line x1={c + 145} y1={c + 145} x2={790} y2={790} stroke={FOREST} strokeWidth={13} strokeLinecap="round" />
    </Frame>
  );
}

// The One-Visit Wonder — the loop that doesn't close; the visit departs.
function Onevisit() {
  const c = 450;
  const r = 250;
  return (
    <Frame>
      {/* the would-be return path */}
      <circle cx={c} cy={c} r={r} fill="none" stroke={FOREST} strokeOpacity={0.25} strokeWidth={9}
        strokeDasharray="24 30" />
      {/* the actual visit: three quarters of the loop, then gone */}
      <path d={`M ${c + r} ${c} A ${r} ${r} 0 1 1 ${c} ${c - r}`} fill="none" stroke={FOREST}
        strokeWidth={13} strokeLinecap="round" />
      <circle cx={c + r} cy={c} r={30} fill={FOREST} />
      {/* departure, tangent, bark */}
      <line x1={c} y1={c - r} x2={c + 265} y2={c - r - 88} stroke={BARK} strokeWidth={13} strokeLinecap="round" />
      <circle cx={c + 285} cy={c - r - 95} r={34} fill={BARK} />
    </Frame>
  );
}

// The Kitchen-Table Founder — a small real thing, and the structure it implies.
function Founder() {
  return (
    <Frame>
      {/* the implied structure, dashed, growing up and right */}
      <g fill="none" stroke={FOREST} strokeWidth={10} strokeOpacity={0.55} strokeDasharray="24 26">
        <rect x={330} y={330} width={240} height={240} rx={22} />
        <rect x={470} y={130} width={310} height={310} rx={26} />
      </g>
      {/* construction lines */}
      <g stroke={FOREST} strokeOpacity={0.35} strokeWidth={8} strokeLinecap="round">
        <line x1={300} y1={620} x2={470} y2={440} />
        <line x1={445} y1={620} x2={630} y2={440} />
        <line x1={300} y1={765} x2={780} y2={285} />
      </g>
      {/* the small real thing, shipped */}
      <rect x={165} y={620} width={145} height={145} rx={18} fill={BARK} />
    </Frame>
  );
}

export default function ArchPlate({ id }: { id: ArchetypeId }) {
  switch (id) {
    case "secret": return <Secret />;
    case "ducttape": return <Ducttape />;
    case "skeptic": return <Skeptic />;
    case "onevisit": return <Onevisit />;
    case "founder": return <Founder />;
  }
}
