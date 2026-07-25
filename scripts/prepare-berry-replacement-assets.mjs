import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const [
  storefrontDesktopSource,
  storefrontMobileSource,
  operationsCardSource,
  journeySource,
  operationsTabSource,
  aiSource,
] = process.argv.slice(2);
if (
  !storefrontDesktopSource ||
  !storefrontMobileSource ||
  !operationsCardSource ||
  !journeySource ||
  !operationsTabSource ||
  !aiSource
) {
  console.error(
    "Usage: node scripts/prepare-berry-replacement-assets.mjs <storefront-desktop.png> <storefront-mobile.png> <operations-card.png> <journey.png> <operations-tab.png> <ai.png>",
  );
  process.exit(1);
}

const outputRoot = path.resolve(
  "docs/madrona-v2-build-kit/product-proof/berry-good",
);
await mkdir(outputRoot, { recursive: true });

const assets = [
  {
    source: storefrontDesktopSource,
    output: "berry-storefront-desktop.webp",
    width: 1600,
  },
  {
    source: storefrontMobileSource,
    output: "berry-storefront-mobile.webp",
    width: 1060,
  },
  {
    source: operationsCardSource,
    output: "berry-operations-card.webp",
    width: 1161,
  },
  {
    source: journeySource,
    output: "berry-customer-journey.webp",
    width: 1448,
  },
  {
    source: operationsTabSource,
    output: "berry-operations-dashboard.webp",
    width: 1448,
  },
  {
    source: aiSource,
    output: "berry-ai-assistance.webp",
    width: 1448,
  },
];

for (const asset of assets) {
  const outputPath = path.join(outputRoot, asset.output);
  await sharp(asset.source)
    .resize({
      width: asset.width,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 90, effort: 5 })
    .toFile(outputPath);
  console.log(outputPath);
}
