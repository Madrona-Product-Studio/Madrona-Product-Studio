// Sync Codex-generated app device composites into the site as production webp.
// Source: madrona-creative-system product-marketing/<folder>/compositions/generated/<folder>-tile-devices-1600.png
// Output: docs/madrona-v2-build-kit/site-assets/<folder>-tile.webp
import { readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const CS = "/Users/charliekoch/Developer/studio/madrona-creative-system/product-marketing";
const OUT = path.resolve("docs/madrona-v2-build-kit/site-assets");
const folders = ["lila-yoga", "aria-health", "helm", "garden-hq", "plainly", "hiker-link"];

for (const folder of folders) {
  const genDir = path.join(CS, folder, "compositions/generated");
  let src = path.join(genDir, `${folder}-tile-devices-1600.png`);
  if (!existsSync(src)) {
    // fall back to any *-1600.png, then any *-master.png
    const files = existsSync(genDir) ? await readdir(genDir) : [];
    const pick =
      files.find((f) => f.endsWith("-1600.png")) ||
      files.find((f) => f.endsWith("-master.png")) ||
      files.find((f) => f.endsWith(".png") && f.includes("tile"));
    if (!pick) { console.log(`SKIP ${folder}: no composite found in ${genDir}`); continue; }
    src = path.join(genDir, pick);
  }
  const dest = path.join(OUT, `${folder}-tile.webp`);
  const meta = await sharp(src).metadata();
  await sharp(src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 84, effort: 5 }).toFile(dest);
  const outMeta = await sharp(dest).metadata();
  console.log(`OK ${folder}: ${path.basename(src)} (${meta.width}x${meta.height}) -> ${path.basename(dest)} (${outMeta.width}x${outMeta.height})`);
}
