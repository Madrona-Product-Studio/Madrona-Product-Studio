import sharp from "sharp";
import path from "node:path";

const [input, output, width = "780", height = "1688"] = process.argv.slice(2);

if (!input || !output) {
  console.error("Usage: node scripts/crop-montage-capture.mjs <input> <output> [width] [height]");
  process.exit(1);
}

const image = sharp(input).extract({
  left: 0,
  top: 0,
  width: Number(width),
  height: Number(height),
});
const encoder = path.extname(output).toLowerCase() === ".webp"
  ? image.webp({ quality: 88, smartSubsample: true })
  : image.png({ compressionLevel: 9 });

await encoder.toFile(output);

console.log(`Cropped ${input} -> ${output}`);
