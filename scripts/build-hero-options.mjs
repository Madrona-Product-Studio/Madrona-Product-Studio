import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDirectory = path.resolve(
  "docs/madrona-v2-build-kit/hero-options",
);

const options = [
  {
    input: "public/images/IMG_0739.jpeg",
    output: "hero-mountain-dawn.webp",
    modulate: { brightness: 1.035, saturation: 0.82 },
  },
  {
    input: "public/images/IMG_2301.jpeg",
    output: "hero-coastal-sunset.webp",
    modulate: { brightness: 1.025, saturation: 0.78 },
  },
  {
    input: "public/images/895141C7-A18D-4E88-9E03-F6697F22C5D5_1_105_c.jpeg",
    output: "hero-island-natural.webp",
    modulate: { brightness: 1.08, saturation: 0.84 },
    linear: [1.025, 2],
  },
  {
    input: "public/images/895141C7-A18D-4E88-9E03-F6697F22C5D5_1_105_c.jpeg",
    output: "hero-island-editorial.webp",
    modulate: { brightness: 1.12, saturation: 0.72 },
    linear: [1.04, 4],
    recomb: [
      [1.055, 0.018, 0],
      [0.012, 1.01, 0],
      [0, 0.012, 0.955],
    ],
  },
  {
    input: "docs/madrona-v2-build-kit/hero-options/hero-island-ai-enhanced-source.png",
    output: "hero-island-ai-enhanced.webp",
    modulate: { brightness: 1, saturation: 0.9 },
  },
];

await mkdir(outputDirectory, { recursive: true });

for (const option of options) {
  const outputPath = path.join(outputDirectory, option.output);

  let image = sharp(option.input)
    .rotate()
    .resize({ width: 2200, height: 1650, fit: "cover" })
    .modulate(option.modulate);

  if (option.recomb) image = image.recomb(option.recomb);
  if (option.linear) image = image.linear(...option.linear);

  await image
    .sharpen({ sigma: 0.45 })
    .webp({ quality: 88, effort: 5 })
    .toFile(outputPath);

  console.log(outputPath);
}
