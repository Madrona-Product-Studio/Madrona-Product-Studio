import sharp from "sharp";
import { fileURLToPath } from "node:url";

const assetDirectory = new URL("../docs/madrona_static_logo_assets/", import.meta.url);
const offWhite = [253, 249, 246];

async function createReversedAsset(sourceName, outputName, width) {
  const source = sharp(fileURLToPath(new URL(sourceName, assetDirectory)));
  const { data, info } = await source.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let index = 0; index < data.length; index += info.channels) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const alpha = data[index + 3];
    if (alpha === 0) continue;

    const isOrange = red > green * 1.15 && green > blue * 1.04;
    if (!isOrange) {
      data[index] = offWhite[0];
      data[index + 1] = offWhite[1];
      data[index + 2] = offWhite[2];
    }
  }

  let output = sharp(data, { raw: info });
  if (width) output = output.resize({ width, withoutEnlargement: true });
  await output.png({ compressionLevel: 9 }).toFile(fileURLToPath(new URL(outputName, assetDirectory)));
}

await Promise.all([
  createReversedAsset("madrona-approved-logo-transparent.png", "madrona-approved-logo-reversed-transparent.png"),
  createReversedAsset("madrona-approved-emblem-transparent.png", "madrona-approved-emblem-reversed-transparent.png"),
  createReversedAsset("madrona-approved-logo-transparent.png", "madrona-logo-reversed-220px-at-2x.png", 440),
  createReversedAsset("madrona-approved-logo-transparent.png", "madrona-logo-reversed-280px-at-2x.png", 560),
]);

console.log("Generated static reversed logo assets.");
