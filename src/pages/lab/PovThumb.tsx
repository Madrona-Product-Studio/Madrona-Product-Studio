// POV thumbnail illustrations — the "Madrona POV" illustration system.
// Minimal, diagrammatic, editorial: abstract product-thinking turned into
// image form. Built as SVG on the lab tokens (--forest / --bark / --paper)
// so they stay crisp, tiny, and themeable. One idea per image; one accent.
//
// Motif → meaning (see the madrona-pov-thumbnail skill for the full system):
//   target    — focus / alignment / thesis / center of gravity
//   modules   — platform / architecture / under the hood
//   flow      — inputs → orchestration → outputs / agents / operations
//   structure — framework / scaffold / how to start building
//
// Design canvas is 1600×900 (16:9). Stroke widths are in viewBox units and
// tuned to read at small card size (~1px–2px rendered).

export type PovMotif = "target" | "modules" | "flow" | "structure" | "source" | "inventory";

const FOREST = "var(--forest)";
const BARK = "var(--bark)";
// Masking fills must match the plate background (.m2-pov-plate) so shapes that
// sit on top of rails/lines read cleanly. Keep this in sync with that CSS.
const PLATE = "var(--color-card)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg className="m2-pov-svg" viewBox="0 0 1600 900" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {/* Background is owned by the .m2-pov-plate wrapper so the plate color
          can be tuned in one place; keep the SVG itself transparent. */}
      {children}
    </svg>
  );
}

// ── Target — concentric focus, a single center of gravity ──────────────────
function Target() {
  const cx = 800;
  const cy = 450;
  return (
    <Frame>
      {/* faint grid */}
      <g stroke={FOREST} strokeOpacity={0.05} strokeWidth={2}>
        <line x1={300} y1={60} x2={300} y2={840} />
        <line x1={1300} y1={60} x2={1300} y2={840} />
        <line x1={130} y1={230} x2={1470} y2={230} />
        <line x1={130} y1={670} x2={1470} y2={670} />
      </g>
      {/* crosshairs */}
      <line x1={140} y1={cy} x2={1460} y2={cy} stroke={FOREST} strokeOpacity={0.3} strokeWidth={2.5} strokeDasharray="9 13" />
      <line x1={cx} y1={95} x2={cx} y2={805} stroke={BARK} strokeOpacity={0.4} strokeWidth={2.5} strokeDasharray="9 13" />
      {/* rings */}
      <circle cx={cx} cy={cy} r={330} fill="none" stroke={BARK} strokeOpacity={0.6} strokeWidth={3.5} strokeDasharray="11 15" />
      <circle cx={cx} cy={cy} r={250} fill="none" stroke={FOREST} strokeWidth={4} />
      <circle cx={cx} cy={cy} r={150} fill="none" stroke={FOREST} strokeOpacity={0.45} strokeWidth={3.5} strokeDasharray="9 13" />
      {/* cardinal markers on the outer ring / crosshair ends */}
      <circle cx={cx} cy={120} r={11} fill={FOREST} />
      <circle cx={cx} cy={780} r={11} fill={FOREST} />
      <circle cx={150} cy={cy} r={11} fill={FOREST} />
      <circle cx={1450} cy={cy} r={11} fill={FOREST} />
      {/* the center of gravity */}
      <circle cx={cx} cy={cy} r={16} fill={BARK} />
    </Frame>
  );
}

// ── Modules — a chain of components, one active, held inside a system ───────
function Modules() {
  const cy = 450;
  const centers = [380, 590, 800, 1010, 1220];
  const w = 148;
  const h = 96;
  const r = 18;
  return (
    <Frame>
      {/* faint grid */}
      <g stroke={FOREST} strokeOpacity={0.05} strokeWidth={2}>
        <line x1={250} y1={70} x2={250} y2={830} />
        <line x1={800} y1={70} x2={800} y2={830} />
        <line x1={1350} y1={70} x2={1350} y2={830} />
        <line x1={140} y1={250} x2={1460} y2={250} />
        <line x1={140} y1={650} x2={1460} y2={650} />
      </g>
      {/* overlapping system rings behind the active module */}
      <ellipse cx={700} cy={cy} rx={150} ry={215} fill="none" stroke={FOREST} strokeOpacity={0.32} strokeWidth={2.5} strokeDasharray="6 10" />
      <ellipse cx={900} cy={cy} rx={150} ry={215} fill="none" stroke={FOREST} strokeOpacity={0.32} strokeWidth={2.5} strokeDasharray="6 10" />
      {/* connecting rail */}
      <line x1={240} y1={cy} x2={1360} y2={cy} stroke={FOREST} strokeWidth={3} />
      {/* modules */}
      {centers.map((x) => {
        const active = x === 800;
        return (
          <rect
            key={x}
            x={x - w / 2}
            y={cy - h / 2}
            width={w}
            height={h}
            rx={r}
            fill={active ? BARK : PLATE}
            stroke={active ? "none" : FOREST}
            strokeWidth={active ? 0 : 3.5}
          />
        );
      })}
    </Frame>
  );
}

// ── Flow — many signals converge through a gate and resolve to outputs ─────
function Flow() {
  const cy = 450;
  const rows = [165, 300, 600, 735];
  const gateL = 748;
  const gateR = 852;
  return (
    <Frame>
      {/* the resolved center path */}
      <line x1={150} y1={cy} x2={1450} y2={cy} stroke={FOREST} strokeWidth={2.5} />
      {/* converging + diverging dashed signals */}
      <g fill="none" stroke={FOREST} strokeOpacity={0.42} strokeWidth={2.5} strokeDasharray="7 9">
        {rows.map((y) => (
          <path key={`l${y}`} d={`M 168 ${y} C 470 ${y}, 540 ${cy}, ${gateL} ${cy}`} />
        ))}
        {rows.map((y) => (
          <path key={`r${y}`} d={`M ${gateR} ${cy} C 1060 ${cy}, 1130 ${y}, 1432 ${y}`} />
        ))}
      </g>
      {/* left input nodes */}
      {rows.map((y) => (
        <circle key={`ln${y}`} cx={165} cy={y} r={10} fill={FOREST} />
      ))}
      {/* right output nodes */}
      {rows.map((y) => (
        <circle key={`rn${y}`} cx={1435} cy={y} r={10} fill={FOREST} />
      ))}
      {/* the source and the resolved output */}
      <circle cx={150} cy={cy} r={22} fill={FOREST} />
      <circle cx={1450} cy={cy} r={22} fill={BARK} />
      {/* the gate */}
      <circle cx={800} cy={cy} r={48} fill="none" stroke={BARK} strokeWidth={3} />
      <circle cx={800} cy={cy} r={15} fill={BARK} />
    </Frame>
  );
}

// ── Structure — a system object under construction toward a vanishing point ─
function Structure() {
  // Front face square
  const fTL = [520, 340];
  const fTR = [880, 340];
  const fBR = [880, 700];
  const fBL = [520, 700];
  // Vanishing point (upper right)
  const vp = [1255, 235];
  const t = 0.42;
  const toVP = ([x, y]: number[]) => [x + (vp[0] - x) * t, y + (vp[1] - y) * t];
  const bTL = toVP(fTL);
  const bTR = toVP(fTR);
  const bBR = toVP(fBR);
  const bBL = toVP(fBL);
  const line = (a: number[], b: number[], extra = {}) => (
    <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={FOREST} strokeWidth={2.5} {...extra} />
  );
  return (
    <Frame>
      {/* faint perspective construction lines from the vanishing point */}
      <g stroke={FOREST} strokeOpacity={0.06} strokeWidth={2}>
        <line x1={vp[0]} y1={vp[1]} x2={120} y2={820} />
        <line x1={vp[0]} y1={vp[1]} x2={120} y2={560} />
        <line x1={vp[0]} y1={vp[1]} x2={420} y2={840} />
        <line x1={vp[0]} y1={vp[1]} x2={860} y2={840} />
      </g>
      {/* vanishing-point sunburst */}
      <g stroke={BARK} strokeOpacity={0.5} strokeWidth={2.5} strokeDasharray="3 10" fill="none">
        <line x1={vp[0]} y1={vp[1]} x2={vp[0]} y2={90} />
        <line x1={vp[0]} y1={vp[1]} x2={1470} y2={130} />
        <line x1={vp[0]} y1={vp[1]} x2={1500} y2={355} />
        <line x1={vp[0]} y1={vp[1]} x2={vp[0]} y2={560} />
        <path d={`M ${vp[0] + 210} ${vp[1] - 120} A 240 240 0 0 1 ${vp[0] + 150} ${vp[1] + 190}`} />
      </g>
      <circle cx={vp[0]} cy={vp[1]} r={15} fill={BARK} />

      {/* filled inner cell — a solid piece within the frame */}
      <polygon points={`690,500 855,500 855,665 690,665`} fill={FOREST} />
      <polyline points={`690,582 772,582 772,500`} fill="none" stroke={PLATE} strokeOpacity={0.5} strokeWidth={2} />

      {/* back face */}
      {line(bTL, bTR)}
      {line(bTR, bBR)}
      {line(bBR, bBL)}
      {line(bBL, bTL)}
      {/* connecting edges */}
      {line(fTL, bTL)}
      {line(fTR, bTR)}
      {line(fBR, bBR)}
      {line(fBL, bBL)}
      {/* front face */}
      {line(fTL, fTR)}
      {line(fTR, fBR)}
      {line(fBR, fBL)}
      {line(fBL, fTL)}
    </Frame>
  );
}

// ── Source — one upstream node feeds a surface of outputs; fix it, all rise ──
function Source() {
  const outputs = [400, 600, 800, 1000, 1200];
  const surfaceY = 235;
  const srcX = 800;
  const srcY = 700;
  return (
    <Frame>
      {/* faint grid */}
      <g stroke={FOREST} strokeOpacity={0.05} strokeWidth={2}>
        <line x1={300} y1={70} x2={300} y2={830} />
        <line x1={1300} y1={70} x2={1300} y2={830} />
        <line x1={140} y1={235} x2={1460} y2={235} />
        <line x1={140} y1={640} x2={1460} y2={640} />
      </g>
      {/* branches from the source up to each surface output */}
      <g fill="none" stroke={FOREST} strokeOpacity={0.4} strokeWidth={2.5} strokeDasharray="7 10">
        {outputs.map((x) => (
          <path key={x} d={`M ${srcX} ${srcY - 28} C ${srcX} 470, ${x} 500, ${x} ${surfaceY + 26}`} />
        ))}
      </g>
      {/* the surface line and its output nodes */}
      <line x1={330} y1={surfaceY} x2={1270} y2={surfaceY} stroke={FOREST} strokeWidth={3} />
      {outputs.map((x) => (
        <circle key={`o${x}`} cx={x} cy={surfaceY} r={11} fill={FOREST} />
      ))}
      {/* the symptom: the one output you were tempted to fix */}
      <circle cx={800} cy={surfaceY} r={30} fill="none" stroke={BARK} strokeOpacity={0.55} strokeWidth={3} strokeDasharray="6 8" />
      {/* the source: the point of leverage, fix here and everything above rises */}
      <circle cx={srcX} cy={srcY} r={46} fill="none" stroke={FOREST} strokeOpacity={0.4} strokeWidth={3} />
      <circle cx={srcX} cy={srcY} r={22} fill={BARK} />
    </Frame>
  );
}

// ── Inventory — a stocked shelf of ready capabilities; pick the one that
// matters first. Twelve slots (the twelve jobs), one accent, the last slot
// dashed: the shelf keeps growing. ────────────────────────────────────────────
function Inventory() {
  const cols = [0, 1, 2, 3];
  const rows = [0, 1, 2];
  const w = 200;
  const h = 132;
  const gap = 48;
  const x0 = (1600 - (4 * w + 3 * gap)) / 2;
  const y0 = (900 - (3 * h + 2 * gap)) / 2;
  const cellX = (c: number) => x0 + c * (w + gap);
  const cellY = (r: number) => y0 + r * (h + gap);
  return (
    <Frame>
      {/* faint grid */}
      <g stroke={FOREST} strokeOpacity={0.05} strokeWidth={2}>
        <line x1={300} y1={70} x2={300} y2={830} />
        <line x1={1300} y1={70} x2={1300} y2={830} />
        <line x1={140} y1={y0 - 54} x2={1460} y2={y0 - 54} />
        <line x1={140} y1={y0 + 3 * h + 2 * gap + 54} x2={1460} y2={y0 + 3 * h + 2 * gap + 54} />
      </g>
      {/* shelf rails behind each row */}
      <g stroke={FOREST} strokeOpacity={0.3} strokeWidth={2.5} strokeDasharray="9 13">
        {rows.map((r) => (
          <line key={r} x1={200} y1={cellY(r) + h / 2} x2={1400} y2={cellY(r) + h / 2} />
        ))}
      </g>
      {/* the twelve slots */}
      {rows.map((r) =>
        cols.map((c) => {
          const active = r === 1 && c === 1;
          const open = r === 2 && c === 3;
          return (
            <rect
              key={`${r}-${c}`}
              x={cellX(c)}
              y={cellY(r)}
              width={w}
              height={h}
              rx={18}
              fill={active ? BARK : PLATE}
              stroke={active ? "none" : FOREST}
              strokeOpacity={open ? 0.45 : 1}
              strokeWidth={3.5}
              strokeDasharray={open ? "9 13" : undefined}
            />
          );
        })
      )}
      {/* the pick: a quiet ring around the active slot */}
      <rect
        x={cellX(1) - 26}
        y={cellY(1) - 26}
        width={w + 52}
        height={h + 52}
        rx={30}
        fill="none"
        stroke={BARK}
        strokeOpacity={0.55}
        strokeWidth={3}
        strokeDasharray="11 15"
      />
    </Frame>
  );
}

export default function PovThumb({ motif }: { motif: PovMotif }) {
  if (motif === "target") return <Target />;
  if (motif === "modules") return <Modules />;
  if (motif === "flow") return <Flow />;
  if (motif === "source") return <Source />;
  if (motif === "inventory") return <Inventory />;
  return <Structure />;
}
