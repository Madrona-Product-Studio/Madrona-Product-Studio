import path from "node:path";
import sharp from "sharp";

const [output, ...inputs] = process.argv.slice(2);
if (!output || inputs.length === 0) {
  console.error("Usage: node scripts/create-photo-contact-sheet.mjs <output> <image...>");
  process.exit(1);
}

const width = 420;
const imageHeight = 290;
const labelHeight = 38;
const gap = 14;
const columns = 3;
const rows = Math.ceil(inputs.length / columns);
const canvasWidth = columns * width + (columns + 1) * gap;
const canvasHeight = rows * (imageHeight + labelHeight) + (rows + 1) * gap;

const composite = [];
for (const [index, input] of inputs.entries()) {
  const left = gap + (index % columns) * (width + gap);
  const top = gap + Math.floor(index / columns) * (imageHeight + labelHeight + gap);
  const image = await sharp(input)
    .resize(width, imageHeight, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82 })
    .toBuffer();
  const label = path.basename(input).replace(/[&<>]/g, "");
  const text = Buffer.from(
    `<svg width="${width}" height="${labelHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#fffdf8"/>
      <text x="10" y="24" font-family="Arial, sans-serif" font-size="14" fill="#222">${label}</text>
    </svg>`,
  );
  composite.push({ input: image, left, top });
  composite.push({ input: text, left, top: top + imageHeight });
}

await sharp({
  create: {
    width: canvasWidth,
    height: canvasHeight,
    channels: 3,
    background: "#eee8df",
  },
}).composite(composite).jpeg({ quality: 88 }).toFile(output);

console.log(`Created ${output}`);
