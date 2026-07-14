import type { Architecture, FlowNode } from "../data/caseStudies";

/* ---- layout constants (SVG user units ≈ px at full width) ---- */
const W = 760;
const MAIN_X = 250;
const MAIN_W = 300;
const MAIN_CX = MAIN_X + MAIN_W / 2;
const NODE_H = 94;
const GAP = 48; // vertical space for the connector arrow
const TOP = 14;
const SP = NODE_H + GAP; // per-node vertical stride

const nodeY = (i: number) => TOP + i * SP;

/** Greedy word-wrap to a max character count per line. */
function wrap(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    if (!line) line = w;
    else if ((line + " " + w).length <= maxChars) line += " " + w;
    else {
      lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export default function ArchitectureDiagram({
  architecture,
}: {
  architecture: Architecture;
}) {
  const {
    intro,
    path,
    connectors,
    branch,
    loopback,
    platformConnector,
    platformLabel,
    platform,
  } = architecture;

  const pathBottom = nodeY(path.length - 1) + NODE_H;

  // a branch (with optional feeder) can hang lower than the main column
  let branchBottom = 0;
  if (branch) {
    const cy = nodeY(branch.intoIndex) + NODE_H / 2;
    const bh = 78;
    branchBottom = branch.feeder
      ? cy - bh / 2 + bh + 30 + 78 // feeder box bottom
      : cy + bh / 2;
  }

  // platform boundary geometry — sits below both the path and any branch column
  const platConnY1 = pathBottom;
  const platConnY2 = Math.max(pathBottom + 44, branchBottom + 16);
  const groupY = platConnY2;
  const lastBottom = Math.max(pathBottom, branchBottom);
  const hasPlatform = platform && platform.length > 0;
  const groupH = hasPlatform ? 178 : 0;
  const totalH = hasPlatform ? groupY + groupH + 8 : lastBottom + 8;

  return (
    <section className="max-w-3xl">
      <h2 className="text-xl font-serif font-medium mb-4 text-ink">
        How it works
      </h2>
      {intro && (
        <p className="text-ink70 text-lg leading-relaxed max-w-2xl mb-8">
          {intro}
        </p>
      )}

      <div className="overflow-x-auto -mx-1 px-1">
        <svg
          viewBox={`0 0 ${W} ${totalH}`}
          className="w-full min-w-[660px] h-auto"
          role="img"
          aria-label="Architecture and data-flow diagram"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0L10 5L0 10z" fill="var(--color-madrona)" />
            </marker>
          </defs>

          {/* platform boundary (drawn first so it sits behind connectors) */}
          {hasPlatform && (
            <>
              <rect
                x={8}
                y={groupY}
                width={W - 16}
                height={groupH}
                rx={10}
                fill="var(--color-cream-dark)"
                fillOpacity={0.28}
                stroke="var(--color-cream-dark)"
                strokeDasharray="5 4"
              />
              <text
                x={28}
                y={groupY + 26}
                fontSize={11}
                letterSpacing={1.2}
                fill="var(--color-ink-light)"
                style={{ textTransform: "uppercase", fontWeight: 600 }}
              >
                {platformLabel}
              </text>
              {platform!.map((svc, i) => {
                const cols = platform!.length;
                const pad = 24;
                const innerW = W - 16 - pad * 2;
                const gap = 14;
                const bw = (innerW - gap * (cols - 1)) / cols;
                const bx = 8 + pad + i * (bw + gap);
                const by = groupY + 42;
                const bh = groupH - 42 - 18;
                return (
                  <g key={svc.label}>
                    <rect
                      x={bx}
                      y={by}
                      width={bw}
                      height={bh}
                      rx={8}
                      fill="var(--color-cream)"
                      stroke="var(--color-cream-dark)"
                    />
                    <text
                      x={bx + 14}
                      y={by + 24}
                      fontSize={13}
                      fontWeight={600}
                      fill="var(--color-ink)"
                    >
                      {svc.label}
                    </text>
                    {wrap(svc.body, Math.floor(bw / 6.6)).map((ln, k) => (
                      <text
                        key={k}
                        x={bx + 14}
                        y={by + 44 + k * 16}
                        fontSize={12}
                        fill="var(--color-ink-light)"
                      >
                        {ln}
                      </text>
                    ))}
                  </g>
                );
              })}
            </>
          )}

          {/* connector from path into platform */}
          {hasPlatform && (
            <Arrow
              x1={MAIN_CX}
              y1={platConnY1}
              x2={MAIN_CX}
              y2={platConnY2 - 2}
              label={platformConnector}
              labelSide="right"
            />
          )}

          {/* arrows between path nodes */}
          {path.slice(0, -1).map((_, i) => (
            <Arrow
              key={i}
              x1={MAIN_CX}
              y1={nodeY(i) + NODE_H}
              x2={MAIN_CX}
              y2={nodeY(i + 1) - 2}
              label={connectors[i]}
              labelSide="right"
            />
          ))}

          {/* branch input */}
          {branch && (
            <BranchNode branch={branch} />
          )}

          {/* loopback */}
          {loopback && (
            <Loopback
              fromY={nodeY(loopback.fromIndex) + NODE_H / 2}
              toY={nodeY(loopback.toIndex) + NODE_H / 2}
              label={loopback.label}
            />
          )}

          {/* path nodes (drawn last, on top) */}
          {path.map((node, i) => (
            <NodeBox key={node.label} node={node} x={MAIN_X} y={nodeY(i)} w={MAIN_W} />
          ))}
        </svg>
      </div>

      {/* legend */}
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-ink70">
        <span className="flex items-center gap-2">
          <svg width="22" height="8" aria-hidden="true">
            <line
              x1="0"
              y1="4"
              x2="16"
              y2="4"
              stroke="var(--color-madrona)"
              strokeWidth="1.5"
            />
            <path d="M14 1l4 3-4 3z" fill="var(--color-madrona)" />
          </svg>
          Data flow
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-3 w-4 rounded-sm border border-line border-dashed" />
          Platform boundary
        </span>
      </div>
    </section>
  );
}

/* ---- node box (title + optional tech chip + wrapped body) ---- */
function NodeBox({
  node,
  x,
  y,
  w,
}: {
  node: FlowNode;
  x: number;
  y: number;
  w: number;
}) {
  const bodyLines = wrap(node.body, Math.floor((w - 36) / 6.6));
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={NODE_H}
        rx={9}
        fill="var(--color-cream)"
        stroke="var(--color-cream-dark)"
      />
      <text
        x={x + 18}
        y={y + 24}
        fontSize={12}
        letterSpacing={1.2}
        fontWeight={600}
        fill="var(--color-madrona)"
        style={{ textTransform: "uppercase" }}
      >
        {node.label}
      </text>
      {node.tech && <TechChip x={x + w - 14} y={y + 14} text={node.tech} />}
      {bodyLines.map((ln, k) => (
        <text
          key={k}
          x={x + 18}
          y={y + 44 + k * 17}
          fontSize={13}
          fill="var(--color-ink-light)"
        >
          {ln}
        </text>
      ))}
    </g>
  );
}

/* right-aligned spec chip */
function TechChip({ x, y, text }: { x: number; y: number; text: string }) {
  const w = text.length * 6.2 + 16;
  return (
    <g>
      <rect
        x={x - w}
        y={y}
        width={w}
        height={20}
        rx={5}
        fill="var(--color-cream-dark)"
        fillOpacity={0.8}
      />
      <text
        x={x - w / 2}
        y={y + 14}
        fontSize={11}
        textAnchor="middle"
        fill="var(--color-ink-light)"
      >
        {text}
      </text>
    </g>
  );
}

/* ---- straight vertical arrow with a side label ---- */
function Arrow({
  x1,
  y1,
  x2,
  y2,
  label,
  labelSide,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  labelSide?: "left" | "right";
}) {
  const midY = (y1 + y2) / 2;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--color-madrona)"
        strokeWidth={1.5}
        strokeOpacity={0.85}
        markerEnd="url(#arrow)"
      />
      {label && (
        <text
          x={labelSide === "left" ? x1 - 12 : x1 + 12}
          y={midY + 4}
          fontSize={11}
          letterSpacing={0.6}
          textAnchor={labelSide === "left" ? "end" : "start"}
          fill="var(--color-ink-light)"
          style={{ textTransform: "uppercase" }}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/* ---- a small left-side box (used for branch + its feeder) ---- */
function SideBox({
  node,
  x,
  y,
  w,
  h,
}: {
  node: FlowNode;
  x: number;
  y: number;
  w: number;
  h: number;
}) {
  const bodyLines = wrap(node.body, Math.floor((w - 28) / 6.0));
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={9}
        fill="var(--color-cream)"
        stroke="var(--color-cream-dark)"
      />
      <text
        x={x + 14}
        y={y + 20}
        fontSize={11}
        letterSpacing={1}
        fontWeight={600}
        fill="var(--color-madrona)"
        style={{ textTransform: "uppercase" }}
      >
        {node.label}
      </text>
      {bodyLines.map((ln, k) => (
        <text
          key={k}
          x={x + 14}
          y={y + 38 + k * 14}
          fontSize={11}
          fill="var(--color-ink-light)"
        >
          {ln}
        </text>
      ))}
    </g>
  );
}

/* ---- branch: a box to the left feeding into a path node, with an optional upstream feeder ---- */
function BranchNode({
  branch,
}: {
  branch: NonNullable<Architecture["branch"]>;
}) {
  const cy = nodeY(branch.intoIndex) + NODE_H / 2;
  const bx = 8;
  const bw = 170;
  const bh = 78;
  const by = cy - bh / 2;

  // feeder box sits below, feeding up into the branch box
  const fh = 78;
  const fy = by + bh + 30;
  const colCx = bx + bw / 2;

  return (
    <g>
      {/* branch → path node */}
      <line
        x1={bx + bw}
        y1={cy}
        x2={MAIN_X - 2}
        y2={cy}
        stroke="var(--color-madrona)"
        strokeWidth={1.5}
        strokeOpacity={0.85}
        markerEnd="url(#arrow)"
      />
      {branch.label && (
        <text
          x={(bx + bw + MAIN_X) / 2}
          y={cy - 7}
          fontSize={10}
          letterSpacing={0.5}
          textAnchor="middle"
          fill="var(--color-ink-light)"
          style={{ textTransform: "uppercase" }}
        >
          {branch.label}
        </text>
      )}

      {/* feeder → branch */}
      {branch.feeder && (
        <>
          <line
            x1={colCx}
            y1={fy}
            x2={colCx}
            y2={by + bh + 2}
            stroke="var(--color-madrona)"
            strokeWidth={1.5}
            strokeOpacity={0.85}
            markerEnd="url(#arrow)"
          />
          {branch.feeder.label && (
            <text
              x={colCx + 10}
              y={fy - (fy - (by + bh)) / 2 + 4}
              fontSize={10}
              letterSpacing={0.5}
              fill="var(--color-ink-light)"
              style={{ textTransform: "uppercase" }}
            >
              {branch.feeder.label}
            </text>
          )}
          <SideBox node={branch.feeder.node} x={bx} y={fy} w={bw} h={fh} />
        </>
      )}

      <SideBox node={branch.node} x={bx} y={by} w={bw} h={bh} />
    </g>
  );
}

/* ---- loopback: out the right side of `from`, up, and into `to` ---- */
function Loopback({
  fromY,
  toY,
  label,
}: {
  fromY: number;
  toY: number;
  label: string;
}) {
  const rightEdge = MAIN_X + MAIN_W; // 530
  const bulge = rightEdge + 64; // 594
  const d = `M ${rightEdge} ${fromY} H ${bulge} V ${toY} H ${rightEdge}`;
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="var(--color-madrona)"
        strokeWidth={1.5}
        strokeOpacity={0.85}
        markerEnd="url(#arrow)"
      />
      <text
        x={bulge + 8}
        y={(fromY + toY) / 2 + 4}
        fontSize={11}
        letterSpacing={0.6}
        fill="var(--color-ink-light)"
        style={{ textTransform: "uppercase" }}
      >
        {label}
      </text>
    </g>
  );
}
