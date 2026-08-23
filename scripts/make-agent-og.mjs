/**
 * Generate per-agent Open Graph images (1200×630) for the /agents gallery.
 * "Simple is best": brand color field, one bold agent name, small wordmark.
 *
 * Requires Playwright + system Chrome. Run manually when agents change:
 *   node scripts/make-agent-og.mjs
 * (Uses the Playwright install from ~/.claude-tools/screenshot if the site
 *  doesn't vendor one; outputs PNGs into public/og-agents/.)
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT = path.resolve("public/og-agents");
fs.mkdirSync(OUT, { recursive: true });

// Keep in sync with src/data/agents.ts (id, name, category) + the gallery card.
const cards = [
  { id: "index", name: "Agents you can deploy", category: "Madrona · Agents", sub: "Interactive demos you can run" },
  { id: "month-end-close", name: "Month-end close", category: "Bookkeeping & finance" },
  { id: "invoice-chasing", name: "Invoice chasing", category: "Bookkeeping & finance" },
  { id: "cash-position", name: "Cash position", category: "Bookkeeping & finance" },
  { id: "payroll-planning", name: "Payroll planning", category: "Bookkeeping & finance" },
  { id: "customer-inbox", name: "Customer email", category: "Customer & retention" },
  { id: "post-sale-followup", name: "Post-sale follow-up", category: "Customer & retention" },
  { id: "review-requests", name: "Review requests", category: "Customer & retention" },
  { id: "best-customers", name: "Best customers", category: "Sales & intelligence" },
  { id: "industry-brief", name: "Industry intelligence", category: "Market intelligence" },
  { id: "contract-review", name: "Contract review", category: "Admin & legal" },
];

const html = (c) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;600;700&family=Inter:wght@600;700&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1200px; height:630px; }
  .og {
    width:1200px; height:630px; position:relative;
    background:#f7f4ef; color:#222;
    padding:76px 80px; display:flex; flex-direction:column; justify-content:space-between;
    font-family:Inter, system-ui, sans-serif; overflow:hidden;
  }
  .og::before { content:""; position:absolute; left:0; top:0; bottom:0; width:14px; background:#c86a3d; }
  .head { display:flex; align-items:center; gap:14px; }
  .head b { font-size:26px; font-weight:700; letter-spacing:.02em; color:#1f3b33; }
  .head span { font-size:15px; font-weight:600; letter-spacing:.22em; text-transform:uppercase; color:#6d706a; }
  .body { margin-top:auto; }
  .tag { display:inline-block; font-size:19px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:#c86a3d; margin-bottom:22px; }
  h1 { font-family:"Hanken Grotesk", Inter, sans-serif; font-weight:600; font-size:${c.name.length > 16 ? 86 : 104}px; line-height:1.02; letter-spacing:-.02em; color:#222; max-width:19ch; }
  .sub { font-size:26px; color:#3a3c39; margin-top:24px; }
  .foot { display:flex; align-items:center; justify-content:space-between; }
  .foot span { font-size:20px; font-weight:600; color:#6d706a; }
  .berry { display:flex; gap:9px; }
  .berry i { width:20px; height:20px; border-radius:50%; display:block; }
  .berry i:nth-child(1){ background:#c86a3d; } .berry i:nth-child(2){ background:#1f3b33; } .berry i:nth-child(3){ background:#e3dac5; }
</style></head>
<body><div class="og">
  <div class="head"><b>Madrona</b><span>Product Studio</span></div>
  <div class="body">
    <span class="tag">${c.id === "index" ? "Madrona · Agents" : "Agent · " + c.category}</span>
    <h1>${c.name}.</h1>
    <div class="sub">${c.sub || "An interactive demo you can run."}</div>
  </div>
  <div class="foot">
    <span>madronaproduct.com/agents</span>
    <span class="berry"><i></i><i></i><i></i></span>
  </div>
</div></body></html>`;

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const c of cards) {
  await page.setContent(html(c), { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(OUT, `${c.id}.png`) });
  console.log("og:", c.id);
}
await browser.close();
console.log(`\nGenerated ${cards.length} OG images in public/og-agents/`);
