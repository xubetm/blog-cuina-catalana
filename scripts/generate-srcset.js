import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./src/img/original";
const outputDir = "./src/img/optimized";

const sizes = [400, 800, 1200];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const images = fs
  .readdirSync(inputDir)
  .filter(
    (file) =>
      file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png"),
  );

for (const image of images) {
  const inputPath = path.join(inputDir, image);
  const name = path.parse(image).name;

  let webpSrcset = [];
  let avifSrcset = [];

  console.log("\n====================");
  console.log("📸 Imagen:", name);

  for (const size of sizes) {
    const webpPath = `${outputDir}/${name}-${size}.webp`;
    const avifPath = `${outputDir}/${name}-${size}.avif`;
    const jpgPath = `${outputDir}/${name}-${size}.jpg`;

    // WEBP
    await sharp(inputPath).resize(size).webp({ quality: 70 }).toFile(webpPath);

    // AVIF
    await sharp(inputPath).resize(size).avif({ quality: 50 }).toFile(avifPath);

    // JPG fallback
    await sharp(inputPath).resize(size).jpeg({ quality: 75 }).toFile(jpgPath);

    webpSrcset.push(`./img/optimized/${name}-${size}.webp ${size}w`);
    avifSrcset.push(`./img/optimized/${name}-${size}.avif ${size}w`);
  }

  console.log("\n👉 AVIF srcset:");
  console.log(avifSrcset.join(",\n"));

  console.log("\n👉 WEBP srcset:");
  console.log(webpSrcset.join(",\n"));
}
