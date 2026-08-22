import sharp from "sharp";
import path from "path";
const dir = path.resolve("client/public/thumbnails");
for (const name of ["kenya-tourism", "gigi-energy"]) {
  const src = path.join(dir, `${name}.png`);
  for (const w of [320, 640, 960, 1200]) {
    await sharp(src).resize({ width: w }).jpeg({ quality: 80 }).toFile(path.join(dir, `${name}-${w}.jpg`));
  }
  for (const w of [640, 1200]) {
    await sharp(src).resize({ width: w }).webp({ quality: 78 }).toFile(path.join(dir, `${name}-${w}.webp`));
  }
  console.log(`variants done: ${name}`);
}
