import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = path.resolve(
  "../..",
  "apps/lilatravel/public/marketing",
);
const outputRoot = path.resolve(
  "docs/madrona-v2-build-kit/product-proof/lila",
);

await mkdir(outputRoot, { recursive: true });

const images = [
  ["compositions/madrona-hero.png", "lila-madrona-hero.webp"],
  ["compositions/generated/lila-destination-intelligence-concept-v1.png", "lila-madrona-supporting.webp"],
  ["screenshots/mobile/edge-of-the-continent-mobile.png", "lila-edge-of-the-continent-mobile.webp"],
];

for (const [source, output] of images) {
  const outputPath = path.join(outputRoot, output);
  await sharp(path.join(sourceRoot, source))
    .resize({ width: 2000, withoutEnlargement: true })
    .webp({ quality: 88, effort: 5 })
    .toFile(outputPath);
  console.log(outputPath);
}

await copyFile(
  path.join(sourceRoot, "brand/lila-wordmark-dark.svg"),
  path.join(outputRoot, "lila-wordmark-dark.svg"),
);
