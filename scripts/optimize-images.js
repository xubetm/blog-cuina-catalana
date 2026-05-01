import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./src/img/original";
const outputDir = "./src/img/optimized";

// crear carpeta si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// SOLO archivos de imagen
const images = fs
  .readdirSync(inputDir)
  .filter(
    (file) =>
      file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png"),
  );

for (const image of images) {
  const inputPath = path.join(inputDir, image);
  const name = path.parse(image).name;

  console.log("Procesando:", image);

  await sharp(inputPath)
    .resize(1200)
    .avif({ quality: 50 })
    .toFile(`${outputDir}/${name}.avif`);

  await sharp(inputPath)
    .resize(1200)
    .webp({ quality: 70 })
    .toFile(`${outputDir}/${name}.webp`);

  await sharp(inputPath)
    .resize(1200)
    .jpeg({ quality: 75 })
    .toFile(`${outputDir}/${name}.jpg`);
}
