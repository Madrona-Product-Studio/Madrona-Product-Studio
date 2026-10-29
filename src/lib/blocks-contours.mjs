// VENDORED from madrona-studio kit/styles/blocks-contours/blocks-contours.js
// (branch style/blocks-contours, 93579a4). Rules: that folder's RULES.md.
// Edit the kit first, then re-copy; do not fork the grammar here.
// Blocks & Contours: Madrona's house graphic style, as a deterministic generator.
//
//   import { render, SIZES } from "./blocks-contours.js";
//   const svg = render({ option: "A", size: "header", sky: "night", seed: "thesis",
//                        arrangement: "cover", motif: "rings", title: "...", kicker: "Essay", meta: "Aug 2026" });
//
// Same inputs, same SVG, every time (seeded PRNG, no Math.random, no clock).
// The rules this encodes live in RULES.md beside this file. Grounds and inks are
// the site's sky tokens (kit/tokens.css, DS tokens.css); sizes come from the
// spacing system: column U = spread-gap 80 + door-pad 32 = 112, contour pitch
// P = gutter 24 + door-pad 32 = 56, every block edge lands on P (8 for fine trims).
//
// Text is set as SVG <text>. Pass `measure(text, px, weight, family, lsEm)` from a
// page with the fonts loaded (canvas measureText) for exact wrapping; the Node
// fallback estimates widths.

export const PALETTE = {
  // bg / ink / muted / line from --sky-*; slab = the CTA fill on that sky (--cta),
  // slabInk = --cta-text; companion = --madrona-dark for that sky; tint = --madrona-light.
  day:   { bg: "#f5f1ea", ink: "#1a1714", muted: "#766d62", line: "rgba(26,23,20,.16)", bark: "#E55728", companion: "#BC431D", tint: "#e8a999", slab: "#2F3135", slabInk: "#F7EDE4" },
  dusk:  { bg: "#4C3843", ink: "#F7EDE4", muted: "#C8B6BD", line: "rgba(247,237,228,.16)", bark: "#E55728", companion: "#F09C80", tint: "#e8a999", slab: "#F7EDE4", slabInk: "#4C3843" },
  night: { bg: "#2F3135", ink: "#F7EDE4", muted: "#ADA79B", line: "rgba(247,237,228,.15)", bark: "#E55728", companion: "#ED8A69", tint: "#e8a999", slab: "#F7EDE4", slabInk: "#2F3135" },
};

// k scales the whole system (U, P, type) to the frame.
export const SIZES = {
  header:   { w: 1600, h: 640,  k: 1 },
  og:       { w: 1200, h: 630,  k: 1 },
  thumb:    { w: 640,  h: 360,  k: 0.75 },
  linkedin: { w: 1584, h: 396,  k: 0.75 },
  hub:      { w: 1600, h: 560,  k: 1 },
  deck:     { w: 1920, h: 1080, k: 1.5 },
};

export const ARRANGEMENTS = ["cover", "step", "hang", "cut", "bleed"];
export const MOTIFS = ["rings", "ridge", "saddle", "route", "spot"];

const DISPLAY = "'Hanken Grotesk', 'Inter', sans-serif";
const SANS = "'Inter', sans-serif";

// ---------- determinism ----------
function hash(s) { let h = 2166136261 >>> 0; for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; } return h; }
function rng(seed) { let a = hash(seed); return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
const snap = (v, step) => Math.max(step, Math.round(v / step) * step);
const n = (v) => Math.round(v * 100) / 100;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---------- text ----------
const fallbackMeasure = (text, px, weight, family, ls = 0) => text.length * px * (family === DISPLAY ? 0.5 : 0.54) + ls * px * text.length;

function wrap(text, maxW, px, m, family, weight, ls) {
  const words = text.split(/\s+/); const lines = []; let cur = "";
  for (const w of words) {
    const t = cur ? cur + " " + w : w;
    if (cur && m(t, px, weight, family, ls) > maxW) { lines.push(cur); cur = w; } else cur = t;
  }
  if (cur) lines.push(cur);
  // No widows: a lone short word on the last line pulls one word down with it.
  const L = lines.length;
  if (L > 1 && !lines[L - 1].includes(" ") && lines[L - 2].includes(" ")) {
    const prev = lines[L - 2].split(" "); const moved = prev.pop();
    const last = `${moved} ${lines[L - 1]}`;
    if (m(last, px, weight, family, ls) <= maxW) { lines[L - 2] = prev.join(" "); lines[L - 1] = last; }
  }
  return lines;
}
function fit(text, maxW, sizes, maxLines, m, family = DISPLAY, weight = 550, ls = -0.035) {
  for (const px of sizes) {
    const lines = wrap(text, maxW, px, m, family, weight, ls);
    if (lines.length <= maxLines && lines.every((l) => m(l, px, weight, family, ls) <= maxW)) return { px, lines };
  }
  const px = sizes[sizes.length - 1];
  return { px, lines: wrap(text, maxW, px, m, family, weight, ls) };
}
function title(t, x, yLast, fill, extra = "") {
  // Bottom-aligned block: yLast is the last baseline.
  const lh = t.px * 0.96;
  const y0 = yLast - (t.lines.length - 1) * lh;
  return `<text x="${n(x)}" y="${n(y0)}" font-family="${DISPLAY}" font-weight="550" font-size="${n(t.px)}" letter-spacing="${n(-0.035 * t.px)}" fill="${fill}" ${extra}>${t.lines
    .map((l, i) => `<tspan x="${n(x)}" dy="${i ? n(lh) : 0}">${esc(l)}</tspan>`).join("")}</text>`;
}
const titleTop = (t, yLast) => yLast - (t.lines.length - 1) * t.px * 0.96 - t.px * 0.74;
function label(s, x, y, px, fill, anchor = "start", weight = 500) {
  return `<text x="${n(x)}" y="${n(y)}" font-family="${SANS}" font-weight="${weight}" font-size="${n(px)}" letter-spacing="${n(0.01 * px)}" fill="${fill}" text-anchor="${anchor}">${esc(s)}</text>`;
}
function signature(x, y, px, fill, anchor = "start") {
  return `<text x="${n(x)}" y="${n(y)}" font-family="${DISPLAY}" font-weight="600" font-size="${n(px)}" letter-spacing="${n(-0.03 * px)}" fill="${fill}" text-anchor="${anchor}">Madrona</text>`;
}

// ---------- primitives ----------
const rect = (x, y, w, h, fill, extra = "") => `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${fill}" ${extra}/>`;
const hline = (x1, x2, y, c) => `<line x1="${n(x1)}" y1="${n(y) + 0.5}" x2="${n(x2)}" y2="${n(y) + 0.5}" stroke="${c}" stroke-width="1"/>`;
const vline = (x, y1, y2, c) => `<line x1="${n(x) + 0.5}" y1="${n(y1)}" x2="${n(x) + 0.5}" y2="${n(y2)}" stroke="${c}" stroke-width="1"/>`;
const ell = (cx, cy, rx, ry, rot = 0) => `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}"${rot ? ` transform="rotate(${rot} ${n(cx)} ${n(cy)})"` : ""}/>`;

// ---------- contours ----------
// Returns { cold: [svg...], hot: svg, marks: svg } in frame coordinates.
// Exactly one hot line per composition (RULES 4.2). k scales pitch.
export function contours(motif, c, k, r, o = {}) {
  const cold = []; let hot = ""; let marks = ""; let hp = { x: c.x, y: c.y };
  const scale = (o.scale || 1) * k;
  const rings = o.rings || 6;
  const hotI = o.hotI ?? (1 + Math.floor(r() * 2));
  if (motif === "rings") {
    for (let i = 0; i < rings; i++) {
      const s = ell(c.x, c.y, (72 + 56 * i) * scale, (56 + 48 * i) * scale);
      if (i === hotI) hot = s; else cold.push(s);
    }
  } else if (motif === "ridge") {
    const rot = o.rot ?? -12;
    for (let i = 0; i < rings; i++) {
      const s = ell(c.x, c.y, (150 + 92 * i) * scale, (26 + 40 * i) * scale, rot);
      if (i === hotI) hot = s; else cold.push(s);
    }
  } else if (motif === "saddle") {
    // Two summits: the system (larger, hot) and the symptom (smaller), joined by enclosing contours.
    const d = (o.gap || 300) * scale, dir = o.dir || 1;
    const A = { x: c.x, y: c.y }, B = { x: c.x - dir * d, y: c.y + d * 0.28 };
    for (let i = 0; i < 3; i++) { const s = ell(A.x, A.y, (56 + 44 * i) * scale, (44 + 38 * i) * scale); if (i === 1) hot = s; else cold.push(s); }
    for (let i = 0; i < 2; i++) cold.push(ell(B.x, B.y, (36 + 36 * i) * scale, (28 + 30 * i) * scale));
    const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2, rot = Math.atan2(A.y - B.y, A.x - B.x) * 180 / Math.PI;
    for (let j = 0; j < 4; j++) cold.push(ell(mx, my, d / 2 + (130 + 56 * j) * scale, (104 + 48 * j) * scale, n(rot)));
  } else if (motif === "route") {
    // A course of straight legs from the frame edge to a marked summit, drawn as
    // a cold trail; the hot line is the ring around the summit you reach. (The
    // first route was the hot line itself, and a bright zigzag climbing to a
    // square read as a growth chart in the cold read, 2026-10-28.)
    for (let i = 0; i < Math.min(rings, 5); i++) {
      const s = ell(c.x, c.y, (60 + 56 * i) * scale, (48 + 48 * i) * scale);
      if (i === 1) hot = s; else cold.push(s);
    }
    const from = o.from || { x: c.x - 520 * scale, y: c.y + 420 * scale };
    const bend = 0.3 + r() * 0.2;
    const p1 = { x: from.x + (c.x - from.x) * bend, y: from.y - (from.y - c.y) * 0.18 };
    const p2 = { x: from.x + (c.x - from.x) * 0.62, y: from.y - (from.y - c.y) * 0.72 };
    cold.push(`<polyline points="${[from, p1, p2, c].map((p) => `${n(p.x)},${n(p.y)}`).join(" ")}" stroke-dasharray="${n(6 * scale)} ${n(6 * scale)}"/>`);
  } else if (motif === "spot") {
    // Spot heights on a grid: one per item; one hot.
    const count = o.spots || 9, cols = count === 12 ? 4 : 3, rows = Math.ceil(count / cols);
    const gx = (o.gx || 112) * scale, gy = (o.gy || 96) * scale;
    const x0 = c.x - ((cols - 1) * gx) / 2, y0 = c.y - ((rows - 1) * gy) / 2;
    const hs = Math.floor(r() * count);
    for (let j = 0; j < 2; j++) cold.push(ell(c.x, c.y, ((cols - 1) * gx) / 2 + (110 + 64 * j) * scale, ((rows - 1) * gy) / 2 + (90 + 56 * j) * scale));
    for (let i = 0; i < count; i++) {
      const x = x0 + (i % cols) * gx, y = y0 + Math.floor(i / cols) * gy;
      cold.push(ell(x, y, 10 * scale, 8 * scale));
      const outer = ell(x, y, 26 * scale, 21 * scale);
      if (i === hs) { hot = outer; hp = { x, y }; } else cold.push(outer);
    }
  }
  return { cold, hot, marks, hp };
}
function drawContours(ct, coldColor, coldOpacity, clip, k) {
  const sw = Math.max(1, k);
  const cp = clip ? ` clip-path="url(#${clip})"` : "";
  return `<g${cp} fill="none" stroke-linejoin="miter">
    <g stroke="${coldColor}" stroke-width="${n(sw)}" opacity="${coldOpacity}">${ct.cold.join("")}</g>
    <g stroke="var(--bc-bark)" stroke-width="${n(sw * 1.5)}" opacity=".9">${ct.hot}</g>
  </g>${ct.marks ? `<g${cp}>${ct.marks}</g>` : ""}`;
}

// ---------- block arrangements (option A grammar, reused by B and the extensions) ----------
// field: the art region { x0, x1, y0, y1 }. Returns blocks (drawn above contours),
// the slab (drawn below), and a suggested contour center.
//
// The HANGING family (2026-10-28, after Charlie picked B): every block is anchored
// to the TOP edge, the way the DS cover hangs its bark column, or sits directly
// beneath a block that is. Nothing rises from the bottom edge; bottom-anchored
// steps read as a bar chart. The only thing allowed at the foot is the tint
// satellite, and only cut INTO the slab's foot (it belongs to the slab, not the
// ground). Variety comes from how the column hangs, not which edge it stands on.
function arrange(name, f, U, P, pal, r, slabFrac) {
  const H = f.y1 - f.y0;
  const slabW = snap((f.x1 - f.x0) * slabFrac, P);
  const sx = f.x1 - slabW;
  const slab = { x: sx, y: f.y0, w: slabW, h: H };
  const B = [];
  const hP = (fr) => snap(H * fr, P);
  const foot = (x, fr) => { const t = hP(fr); B.push([x, f.y1 - t, U, t, pal.tint]); };
  let center = { x: f.x1 - P * 2, y: f.y0 + P * 1.5 };
  if (name === "cover") {
    // The canonical cover: a full-height split column (bark hung from the top,
    // companion beneath it to the foot), tint cut into the slab's foot.
    const a = hP(0.58);
    B.push([sx - U, f.y0, U, a, pal.bark], [sx - U, f.y0 + a, U, H - a, pal.companion]);
    foot(sx, 0.28);
    center = { x: f.x1 - P * 2, y: f.y0 + P * 1.5 };
  } else if (name === "step" || name === "stair") {
    // Eaves: a long bark column against the slab, a shorter half-column of
    // companion hung outside it, so the edge steps up away from the slab.
    const a = hP(0.66), b = hP(0.36);
    B.push([sx - U, f.y0, U, a, pal.bark], [sx - U - U / 2, f.y0, U / 2, b, pal.companion]);
    foot(f.x1 - U, 0.26);
    center = { x: sx + slabW * 0.55, y: f.y0 + H * 0.42 };
  } else if (name === "hang") {
    // A short column that ends in the air: bark from the top, companion beneath.
    const a = hP(0.44), b = hP(0.2);
    B.push([sx - U, f.y0, U, a, pal.bark], [sx - U, f.y0 + a, U, b, pal.companion]);
    foot(f.x1 - U, 0.3);
    center = { x: sx + slabW * 0.5, y: f.y0 + H * 0.55 };
  } else if (name === "cut") {
    // Built into the slab: bark cut into its top-left corner, a companion
    // half-column hung just outside it.
    const a = hP(0.46), b = hP(0.28);
    B.push([sx, f.y0, U, a, pal.bark], [sx - U / 2, f.y0, U / 2, b, pal.companion]);
    center = { x: sx + slabW * 0.58, y: f.y0 + H * 0.56 };
  } else if (name === "bleed") {
    // The quietest: one bark column hung beside the slab, tint at the slab's foot.
    const a = hP(0.4);
    B.push([sx - U, f.y0, U, a, pal.bark]);
    foot(f.x1 - U, 0.3);
    center = { x: sx + slabW * 0.62, y: f.y0 + H * 0.4 };
  }
  const minX = Math.min(sx, ...B.map((b) => b[0]));
  return { slab, blocks: B, center, minX };
}

// ---------- the four interpretations ----------
// Slab, contours clipped to it, then the blocks on top. Shared by A and B.
function slabAndContours(o, a, pal, r, k, U, P, H) {
  let center = a.center;
  if (o.buried) { const b = a.blocks.find((x) => x[4] === pal.bark); center = { x: b[0] + b[2] / 2, y: b[1] + b[3] * 0.6 }; }
  if (o.motif === "spot") center = { x: a.slab.x + a.slab.w / 2, y: H * 0.5 };
  const fit = o.motif === "spot" ? Math.min(1, (a.slab.w - 40 * k) / ((o.spots === 12 ? 3 : 2) * 112 * k + 52 * k + 120 * k)) : 1;
  const ct = contours(o.motif, center, k * fit, r, { spots: o.spots, gap: 260, dir: 1, from: { x: a.slab.x + U * 0.5, y: H + P } });
  let out = `<defs><clipPath id="${o.id}-s">${rect(a.slab.x, a.slab.y, a.slab.w, a.slab.h, "#000")}</clipPath></defs>`;
  out += rect(a.slab.x, a.slab.y, a.slab.w, a.slab.h, pal.slab);
  // Thumb: the one hot line and nothing else. A spot grid's hot ring is a speck at
  // card size, so the inventory's inner boundary carries the heat instead.
  if (o.hotOnly) { if (o.motif === "spot") ct.hot = ct.cold[0]; ct.cold = []; }
  out += drawContours(ct, pal.slabInk, 0.32, `${o.id}-s`, k);
  out += a.blocks.map((b) => rect(...b)).join("");
  return out;
}

const OPTIONS = {};

// A. Faithful to the cover. Text panel on the ground, slab + column + satellite at
// the right edge, contours only inside the slab.
OPTIONS.A = function (o, F, pal, r, m) {
  const { w: W, h: H, k } = F, U = 112 * k, P = 56 * k, M = 64 * k;
  const thumb = !o.title;
  const a = arrange(o.arrangement, { x0: 0, y0: 0, x1: W, y1: H }, U, P, pal, r, thumb ? 0.62 : W / H > 2.3 ? 0.3 : W < 1400 ? 0.27 : 0.36);
  let out = slabAndContours(o, a, pal, r, k, U, P, H);
  if (!thumb) {
    const maxW = a.minX - M - 80 * k;
    const og = W < 1400;
    const t = fit(o.title, maxW, (og ? [64, 60, 56, 52, 48] : [96, 88, 80, 72, 64]).map((s) => s * k), og ? 4 : 3, m);
    const yLast = H - 56 * k;
    out += signature(M, M + 6 * k, 26 * k, pal.ink);
    out += label(`${o.kicker}${o.meta ? "  ·  " + o.meta : ""}`, M, titleTop(t, yLast) - 28 * k, 17 * k, pal.muted);
    out += title(t, M - 4 * k, yLast, pal.ink);
  }
  return out;
};

// B. Spread. A's block grammar (slab, split column, satellite) with the copy set as
// a labeled spread: a top rail (signature, type) and a bottom rail (month, site) on
// hairlines that stop where the blocks begin. Revised after the cold read: the
// first B (visible column grid, rising terrace, outlined empty blocks) read as a bar
// chart and a wireframe, so the grid now lives only in the measurements.
OPTIONS.B = function (o, F, pal, r, m) {
  const { w: W, h: H, k } = F, U = 112 * k, P = 56 * k, M = 64 * k;
  // Modes: "frame" (copy set in the SVG: header, OG), "art" (the same frame with
  // no copy, for pages that set the copy in HTML over it), "thumb" (text-free,
  // more ground, blocks plus the one hot line and nothing else; both critics
  // found B's busy thumbs the weakest and preferred C's quiet balance).
  const mode = o.mode || (o.title ? "frame" : "thumb");
  const frac = o.slabFrac || (mode === "thumb" ? 0.5 : W / H > 2.3 ? 0.3 : W < 1400 ? 0.3 : 0.36);
  const a = arrange(o.arrangement, { x0: 0, y0: 0, x1: W, y1: H }, U, P, pal, r, frac);
  let out = slabAndContours({ ...o, hotOnly: mode === "thumb" }, a, pal, r, k, U, P, H);
  if (mode === "frame") {
    const L = (o.safeLeft || 0) * k, X = L + M;
    const top = 88 * k, bot = H - 88 * k, right = a.minX - 56 * k;
    const site = o.site ?? "madronaproduct.com";
    out += hline(L, a.minX, top, pal.line) + hline(L, a.minX, bot, pal.line);
    if (o.signature !== false) out += signature(X, top - 32 * k, 26 * k, pal.ink);
    out += label(o.kicker, o.signature === false ? X : right, top - 34 * k, 16 * k, pal.muted, o.signature === false ? "start" : "end", 600);
    out += label(o.meta || "", X, bot + 50 * k, 16 * k, pal.muted);
    if (site) out += label(site, right, bot + 50 * k, 16 * k, pal.muted, "end");
    const og = W < 1400;
    const sizes = o.titleSizes || (og ? [60, 56, 52, 48] : [80, 72, 64, 58]);
    const t = fit(o.title, right - X, sizes.map((s) => s * k), o.maxLines || (og ? 4 : 3), m);
    out += title(t, X - 3 * k, bot - (o.titleGap ?? 44) * k, pal.ink);
  }
  return out;
};

// Where the blocks begin in a B frame (px, frame coordinates): pages that set the
// copy in HTML use it to stop their rails and measure where the art does.
export function artLeft(o) {
  const F = typeof o.size === "string" ? SIZES[o.size] : o.size;
  const k = F.k, U = 112 * k, P = 56 * k;
  const mode = o.mode || (o.title ? "frame" : "thumb");
  const frac = o.slabFrac || (mode === "thumb" ? 0.5 : F.w / F.h > 2.3 ? 0.3 : F.w < 1400 ? 0.3 : 0.36);
  return arrange(o.arrangement, { x0: 0, y0: 0, x1: F.w, y1: F.h }, U, P, PALETTE[o.sky || "night"], () => 0.5, frac).minX;
}

// C. Contour-led. The terrain runs the whole frame; blocks shrink to a survey
// station (one bark square + its companion) at the hot point. The copy panel masks
// the terrain behind a hairline.
OPTIONS.C = function (o, F, pal, r, m) {
  const { w: W, h: H, k } = F, U = 112 * k, P = 56 * k, M = 64 * k;
  const thumb = !o.title;
  const panelW = thumb ? 0 : snap(W * (W / H > 2.3 ? 0.46 : 0.5), 8 * k);
  const ax = panelW + (W - panelW) * 0.5;
  const cfg = {
    rings: { c: { x: ax + U * 0.6, y: H * 0.44 }, s: 1.25 },
    ridge: { c: { x: ax, y: H * 0.5 }, s: 1.15 },
    saddle: { c: { x: ax + U * 0.9, y: H * 0.4 }, s: 1.15 },
    route: { c: { x: ax + U * 0.7, y: H * 0.36 }, s: 1.15 },
    spot: { c: { x: ax, y: H * 0.5 }, s: 1.15 },
  }[o.motif];
  const center = { x: cfg.c.x + (r() - 0.5) * U * 1.5, y: cfg.c.y + (r() - 0.5) * P };
  const sc = cfg.s * (thumb ? 0.9 : 1);
  const ct = contours(o.motif, center, k * sc, r, { spots: o.spots, rings: 9, gap: 300, from: { x: panelW + P, y: H + P } });
  ct.marks = "";
  let out = drawContours(ct, pal.ink, 0.22, null, k);
  // survey station: square at the hot point, companion stepped off it
  const hp = ct.hp;
  const s = o.motif === "spot" ? U / 4 : U / 2;
  if (o.buried) out += rect(hp.x - U * 0.75, hp.y - U * 0.5, U, U * 0.75, pal.bark) + rect(hp.x + U * 0.25, hp.y + U * 0.25, U / 2, U / 4, pal.companion);
  else out += rect(hp.x - s / 2, hp.y - s / 2, s, s, pal.bark) + rect(hp.x + s / 2, hp.y + s / 2, s / 2, s / 2, pal.companion);
  if (!thumb) {
    out += rect(0, 0, panelW, H, pal.bg) + vline(panelW, 0, H, pal.line);
    const top = 88 * k;
    out += hline(0, panelW, top, pal.line);
    out += signature(M, top - 30 * k, 26 * k, pal.ink);
    out += label(o.kicker, panelW - 40 * k, top - 32 * k, 16 * k, pal.muted, "end", 600);
    const t = fit(o.title, panelW - M - 56 * k, [84, 76, 68, 62, 56, 50, 44].map((x) => x * k), 4, m);
    const yLast = H - 64 * k;
    out += title(t, M - 3 * k, yLast, pal.ink);
    if (o.meta) out += label(o.meta, M, titleTop(t, yLast) - 30 * k, 16 * k, pal.muted);
  }
  return out;
};

// D. Editorial. A slab carries large type; the line runs past the slab's edge and
// flips ink as it crosses. A bark column stands on the slab; contours on the ground.
OPTIONS.D = function (o, F, pal, r, m) {
  const { w: W, h: H, k } = F, U = 112 * k, P = 56 * k, M = 64 * k;
  const thumb = !o.title;
  const wide = W / H > 2.3;
  const sTop = snap(H * (thumb ? 0.5 : wide ? 0.34 : 0.4), P / 2);
  const sR = snap(W * (thumb ? 0.5 : 0.56), U / 2);
  const variant = { cover: "stand", stair: "stand2", hang: "hang", cut: "cut", bleed: "stand" }[o.arrangement] || "stand";
  const cc = { x: snap(W * 0.8, P), y: snap(H * (wide ? 0.3 : 0.3), P / 2) };
  const ct = contours(o.motif, cc, k * (thumb ? 0.85 : 1), r, { spots: o.spots, rings: 8, gap: 260, from: { x: W + P, y: H * 0.78 } });
  let out = drawContours(ct, pal.ink, 0.24, null, k);
  out += rect(0, sTop, sR, H - sTop, pal.slab);
  if (variant === "stand") out += rect(sR - U, sTop - 2 * P, U, 2 * P, pal.bark);
  if (variant === "stand2") out += rect(sR - U, sTop - 2 * P, U, 2 * P, pal.bark) + rect(sR - 2 * U, sTop - P, U, P, pal.companion);
  if (variant === "hang") out += rect(sR, 0, U, sTop + P, pal.bark) + rect(sR, sTop + P, U, P, pal.companion);
  if (variant === "cut") out += rect(sR - U, sTop, U, P, pal.bark) + rect(sR, sTop + P, U / 2, P / 2, pal.companion);
  if (o.buried) out += rect(cc.x - U / 2, cc.y - U / 2, U, U, pal.bark);
  if (!thumb) {
    out += signature(M, 72 * k, 26 * k, pal.ink);
    out += label(`${o.kicker}${o.meta ? "  ·  " + o.meta : ""}`, M, 72 * k + 34 * k, 16 * k, pal.muted);
    const maxW = W - M - U * 1.25;
    const yLast = H - 56 * k;
    let t = fit(o.title, maxW, [128, 116, 104, 96, 88, 80, 72].map((x) => x * k), 3, m);
    // the title must start inside the slab
    const floor = sTop + (variant === "cut" ? P + 24 * k : 24 * k);
    while (titleTop(t, yLast) < floor && t.px > 40 * k) t = fit(o.title, maxW, [t.px - 8 * k], 3, m);
    out += `<defs><clipPath id="${o.id}-t">${rect(0, sTop, sR, H - sTop, "#000")}</clipPath></defs>`;
    out += title(t, M - 4 * k, yLast, pal.ink);
    out += title(t, M - 4 * k, yLast, pal.slabInk, `clip-path="url(#${o.id}-t)"`);
  }
  return out;
};

export const OPTION_INFO = {
  A: { name: "Cover", verdict: "Runner-up", line: "Faithful to the DS cover: text panel on the ground, slab + split column + satellite at the edge, contours only in the slab. Both critics rated it the closest to the cover; it lacks the labeled-spread structure." },
  B: { name: "Spread", verdict: "Recommended", line: "The cover's block grammar with the copy as a labeled spread: signature and type on a top rail, month and site on a bottom rail, hairlines that stop where the blocks begin. Revised after the cold read: the first B (a visible grid and rising terrace) read as a bar chart." },
  C: { name: "Terrain", verdict: "Killed", line: "Contour-led: the terrain runs the frame, blocks shrink to one survey station. Killed: it drops the stepped blocks Charlie liked, and the square-in-a-target reads as a generic tech logo. Its textless thumbnail balance is worth borrowing." },
  D: { name: "Editorial", verdict: "Killed", line: "Large type on a slab, the line flips ink as it crosses the slab edge. Killed: the flip lands mid-word and breaks legibility, worst at OG size." },
};

// ---------- entry point ----------
export function render(o) {
  const F = typeof o.size === "string" ? SIZES[o.size] : o.size;
  // A page can pass its own palette (e.g. CSS custom properties, so the art
  // follows the live sky); fills and strokes then go out as style, not attributes.
  const pal = o.palette || PALETTE[o.sky || "night"];
  const r = rng(`${o.seed}|${o.option}|${F.w}x${F.h}`);
  const m = o.measure || fallbackMeasure;
  const id = o.id || `bc${hash(`${o.seed}${o.option}${F.w}${o.sky}`).toString(36)}`;
  const body = OPTIONS[o.option]({ ...o, id }, F, pal, r, m);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${F.w} ${F.h}" width="${F.w}" height="${F.h}" style="--bc-bark:${pal.bark}" role="img" aria-label="${esc(o.title || o.seed)}">${o.noGround ? "" : rect(0, 0, F.w, F.h, pal.bg)}${body}</svg>`;
  // var() is not reliable inside presentation attributes; move those into style.
  return o.palette ? svg.replace(/ (fill|stroke)="(var\([^"]*\))"/g, ' style="$1:$2"') : svg;
}

// A canvas-backed measure for pages with the fonts loaded.
export function canvasMeasure() {
  const ctx = document.createElement("canvas").getContext("2d");
  return (text, px, weight, family, ls = 0) => {
    ctx.font = `${weight} ${px}px ${family}`;
    return ctx.measureText(text).width + ls * px * Math.max(0, text.length - 1);
  };
}
