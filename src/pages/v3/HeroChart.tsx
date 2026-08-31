import { useEffect, useRef } from "react";
import { THEME_EVENT } from "../../lib/theme";

// The hero's "chart of the bay" — variant B1 from the hero-art lab
// (Charlie's pick, 2026-08-29; ported from madrona-hero-art
// HeroArtLab.tsx). Drifting nautical-chart contours over the warm paper:
// ink survey lines with bark index contours every fifth level, and the
// Bellingham Bay coordinates stamped in the corner. Colors come from the
// live theme tokens so the chart follows the day/dusk/night sky states.
const FALLBACK = { ink: "#1a1714", bark: "#c4553a", muted: "#8c8378" };

function chartColors(el: HTMLElement) {
  const cs = getComputedStyle(el);
  const read = (name: string, fb: string) => cs.getPropertyValue(name).trim() || fb;
  return {
    ink: read("--v3-ink", FALLBACK.ink),
    bark: read("--v3-bark", FALLBACK.bark),
    muted: read("--v3-muted", FALLBACK.muted),
  };
}

function makeNoise(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  const rand = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const base = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [base[i], base[j]] = [base[j], base[i]];
  }
  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = base[i & 255];
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const grad = (h: number, x: number, y: number, z: number) => {
    const g = h & 15;
    const u = g < 8 ? x : y;
    const v = g < 4 ? y : g === 12 || g === 14 ? x : z;
    return ((g & 1) === 0 ? u : -u) + ((g & 2) === 0 ? v : -v);
  };
  return (x: number, y: number, z: number) => {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
    x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
    const u = fade(x), v = fade(y), w = fade(z);
    const A = perm[X] + Y, AA = perm[A] + Z, AB = perm[A + 1] + Z;
    const B = perm[X + 1] + Y, BA = perm[B] + Z, BB = perm[B + 1] + Z;
    return lerp(
      lerp(
        lerp(grad(perm[AA], x, y, z), grad(perm[BA], x - 1, y, z), u),
        lerp(grad(perm[AB], x, y - 1, z), grad(perm[BB], x - 1, y - 1, z), u),
        v),
      lerp(
        lerp(grad(perm[AA + 1], x, y, z - 1), grad(perm[BA + 1], x - 1, y, z - 1), u),
        lerp(grad(perm[AB + 1], x, y - 1, z - 1), grad(perm[BB + 1], x - 1, y - 1, z - 1), u),
        v),
      w);
  };
}

const LEVELS = 14;
const chartIso = (l: number) => -1.0 + (2.0 * l) / (LEVELS - 1);

function createChart(canvas: HTMLCanvasElement, w: number, h: number, dpr: number, colors: { ink: string; bark: string; muted: string }) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { draw: (_t: number) => {} };
  const noise = makeNoise(23);
  const step = Math.max(6, Math.round(7 * dpr));
  const gx = Math.ceil(w / step) + 1, gy = Math.ceil(h / step) + 1;
  const field = new Float32Array(gx * gy);
  const seg = (px: number, py: number, qx: number, qy: number) => { ctx.moveTo(px, py); ctx.lineTo(qx, qy); };
  const march = (iso: number) => {
    ctx.beginPath();
    for (let j = 0; j < gy - 1; j++) {
      for (let i = 0; i < gx - 1; i++) {
        const a = field[j * gx + i] - iso;
        const b = field[j * gx + i + 1] - iso;
        const c = field[(j + 1) * gx + i + 1] - iso;
        const d = field[(j + 1) * gx + i] - iso;
        const code = (a > 0 ? 8 : 0) | (b > 0 ? 4 : 0) | (c > 0 ? 2 : 0) | (d > 0 ? 1 : 0);
        if (code === 0 || code === 15) continue;
        const x = i * step, y = j * step;
        const tx = x + step * (a / (a - b)), ty = y;
        const rx = x + step, ry = y + step * (b / (b - c));
        const bx = x + step * (d / (d - c)), by = y + step;
        const lx = x, ly = y + step * (a / (a - d));
        switch (code) {
          case 1: case 14: seg(lx, ly, bx, by); break;
          case 2: case 13: seg(bx, by, rx, ry); break;
          case 3: case 12: seg(lx, ly, rx, ry); break;
          case 4: case 11: seg(tx, ty, rx, ry); break;
          case 5: seg(tx, ty, lx, ly); seg(bx, by, rx, ry); break;
          case 10: seg(tx, ty, rx, ry); seg(lx, ly, bx, by); break;
          case 6: case 9: seg(tx, ty, bx, by); break;
          case 7: case 8: seg(tx, ty, lx, ly); break;
        }
      }
    }
    ctx.stroke();
  };
  const draw = (t: number) => {
    const z = t * 0.00004;
    const scale = w * 0.55;
    for (let j = 0; j < gy; j++) {
      for (let i = 0; i < gx; i++) {
        const nx = (i * step) / scale, ny = (j * step) / scale;
        let v = noise(nx * 1.6, ny * 2.1, z);
        v += 0.5 * noise(nx * 3.2, ny * 4.2, z * 1.6 + 11);
        v += 0.25 * noise(nx * 6.4, ny * 8.4, z * 2.2 + 37);
        field[j * gx + i] = v;
      }
    }
    ctx.clearRect(0, 0, w, h);
    for (let l = 0; l < LEVELS; l++) {
      const isIndex = l % 5 === 2;
      ctx.strokeStyle = isIndex ? colors.bark : colors.ink;
      ctx.globalAlpha = isIndex ? 0.5 : 0.26;
      ctx.lineWidth = (isIndex ? 1.4 : 0.7) * dpr;
      march(chartIso(l));
    }
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = colors.muted;
    ctx.font = `500 ${Math.round(9 * dpr)}px ui-monospace, "SF Mono", Menlo, monospace`;
    ctx.textAlign = "right";
    ctx.fillText("48.7461° N", w - 26 * dpr, h - 40 * dpr);
    ctx.fillText("122.4787° W", w - 26 * dpr, h - 26 * dpr);
    ctx.globalAlpha = 1;
  };
  return { draw };
}

export function HeroChart() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const boot = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(2, Math.round(rect.width * dpr));
      canvas.height = Math.max(2, Math.round(rect.height * dpr));
      const art = createChart(canvas, canvas.width, canvas.height, dpr, chartColors(parent));
      if (reduced) { art.draw(8000); return; }
      const start = performance.now();
      const loop = (now: number) => { art.draw(now - start); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    };
    boot();
    let tid = 0;
    let lastW = canvas.width;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(tid);
      tid = window.setTimeout(() => {
        const parent = canvas.parentElement;
        if (!parent) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const wNow = Math.round(parent.getBoundingClientRect().width * dpr);
        if (Math.abs(wNow - lastW) < 4) return;
        lastW = wNow;
        cancelAnimationFrame(raf);
        boot();
      }, 150);
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    const onTheme = () => { cancelAnimationFrame(raf); boot(); };
    window.addEventListener(THEME_EVENT, onTheme);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); window.clearTimeout(tid); window.removeEventListener(THEME_EVENT, onTheme); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}
