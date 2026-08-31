/**
 * Generate the site's Open Graph cards (1200×630) on the frond identity.
 * Direction I (Charlie's pick, 2026-08-30): Evergreen Charcoal field, big
 * centered side-stack lockup, tagline beneath, static topo contours drifting
 * in the corners — everything sized to read at mobile-feed width first
 * ("simple is best" doctrine, same as make-agent-og.mjs).
 *
 * Outputs: public/og-main.png (site default), public/og-thinking.png,
 * public/og-pov-*.png (article family: lockup up top, kicker + big title).
 * Run manually when the brand or article set changes:
 *   node scripts/make-og.mjs
 */
import fs from "fs";
import path from "path";
// Playwright lives in the screenshot toolbelt, not the site's node_modules.
const { chromium } = await import(process.env.HOME + "/.claude-tools/screenshot/node_modules/playwright/index.mjs");

const OUT = path.resolve("public");
const MARK = fs.readFileSync(path.resolve("public/brand/madrona-frond-mark.svg"), "utf8");

// ---- static topo field (the hero chart's language, frozen) ----
function mulberry(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function blob(cx, cy, r, wob, seed) {
  const rnd = mulberry(seed);
  const n = 14;
  const offs = Array.from({ length: n }, () => (rnd() * 2 - 1) * wob);
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (2 * Math.PI * i) / n;
    const rr = r + offs[i];
    return [cx + rr * Math.cos(a), cy + rr * 0.72 * Math.sin(a)];
  });
  let d = `M${pts[0][0].toFixed(0)} ${pts[0][1].toFixed(0)}`;
  for (let i = 1; i <= n; i++) {
    const [x0, y0] = pts[(i - 1) % n];
    const [x1, y1] = pts[i % n];
    d += ` Q${x0.toFixed(0)} ${y0.toFixed(0)} ${((x0 + x1) / 2).toFixed(0)} ${((y0 + y1) / 2).toFixed(0)}`;
  }
  return d + " Z";
}
function cluster(cx, cy, base, levels, seed) {
  let out = "";
  for (let l = 0; l < levels; l++) {
    const index = l % 3 === 2;
    out += `<path d="${blob(cx, cy, base + l * 34, 26, seed * 100 + l)}" stroke="${index ? "#E55728" : "#F7EDE4"}" stroke-opacity="${index ? ".30" : ".11"}" stroke-width="${index ? "1.6" : "1"}"/>`;
  }
  return out;
}
const TOPO =
  `<svg viewBox="0 0 1200 630" fill="none" preserveAspectRatio="xMidYMid slice" style="position:absolute;inset:0;pointer-events:none">` +
  cluster(1050, 130, 60, 7, 3) + cluster(1180, 520, 80, 6, 7) + cluster(120, 600, 70, 5, 11) +
  `</svg>`;

const HEAD = `<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@600;700&family=Hanken+Grotesk:wght@400;500&display=swap" rel="stylesheet">`;

const lockup = (markPx, namePx, subPx) => `
  <div style="position:relative;display:flex;align-items:center;gap:${Math.round(markPx * 0.24)}px;font-family:Figtree">
    <span style="display:inline-flex;width:${markPx}px;height:${markPx}px">${MARK.replace("<svg ", `<svg width="${markPx}" height="${markPx}" `)}</span>
    <b style="font-size:${namePx}px;font-weight:600;letter-spacing:.16em;color:#F7EDE4">MADRONA</b>
    <i style="width:2.5px;height:${Math.round(namePx * 1.3)}px;background:rgba(247,237,228,.32)"></i>
    <span style="display:flex;flex-direction:column;font-size:${subPx}px;font-weight:600;letter-spacing:.2em;line-height:1.5;color:#E55728">PRODUCT<br>STUDIO</span>
  </div>`;

const mainCard = () => `<!doctype html><html><head>${HEAD}<style>*{margin:0;box-sizing:border-box}</style></head><body>
<div style="width:1200px;height:630px;position:relative;overflow:hidden;background:#2F3135;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:52px;font-family:'Hanken Grotesk',sans-serif">
  ${TOPO}${lockup(148, 76, 32)}
  <p style="position:relative;font-size:44px;font-weight:400;letter-spacing:-.01em;color:rgba(247,237,228,.85)">A senior digital product studio <em style="font-style:normal;color:#E55728">built for the AI&nbsp;era.</em></p>
</div></body></html>`;

const articleCard = (kicker, title) => `<!doctype html><html><head>${HEAD}<style>*{margin:0;box-sizing:border-box}</style></head><body>
<div style="width:1200px;height:630px;position:relative;overflow:hidden;background:#2F3135;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:38px;padding:0 90px;font-family:'Hanken Grotesk',sans-serif;text-align:center">
  ${TOPO}${lockup(56, 28, 12.5)}
  <div style="position:relative">
    <p style="font-family:Figtree;font-size:21px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#E55728;margin-bottom:26px">${kicker}</p>
    <h1 style="font-size:${title.length > 42 ? 66 : 78}px;font-weight:500;line-height:1.04;letter-spacing:-.025em;color:#F7EDE4;max-width:20ch;margin:0 auto">${title}</h1>
  </div>
</div></body></html>`;

const articles = [
  { file: "og-thinking.png", kicker: "Thinking", title: "Notes from building the studio we want to work with." },
  { file: "og-pov-thesis.png", kicker: "A working theory", title: "The Madrona Product Thesis" },
  { file: "og-pov-under-the-hood.png", kicker: "Inside the practice", title: "The engine behind everything we ship." },
  { file: "og-pov-agentic-operations.png", kicker: "Operations and AI", title: "The era of agentic operations." },
  { file: "og-pov-starter-guide.png", kicker: "Getting started", title: "A starter guide to building real software with AI." },
  { file: "og-pov-solve-the-system.png", kicker: "Product systems", title: "Solve the system, not the symptom." },
  { file: "og-pov-ai-tools-inventory.png", kicker: "Operations and AI", title: "The 12 jobs AI tools already do for small businesses." },
];

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(mainCard(), { waitUntil: "networkidle" });
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(OUT, "og-main.png") });
console.log("og-main.png");
for (const a of articles) {
  await page.setContent(articleCard(a.kicker, a.title), { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, a.file) });
  console.log(a.file);
}
await browser.close();
