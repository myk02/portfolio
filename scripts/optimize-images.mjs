/**
 * Phase 1 image slimming pipeline.
 *
 * Converts the heavy, actually-loaded PNGs to WebP (resized where the native
 * resolution is far above what the UI renders) and removes dead assets that
 * are not referenced anywhere in client/src.
 *
 * - `process/home/*.png`         → `*.webp` (only home is loaded, via ProcessShot)
 * - `profile.png`                → `profile.webp` (BrandEdgeAbout)
 * - `refs/kenya-hero.png`        → `refs/kenya-hero.webp` (caseJourneys)
 * - `refs/gigi-can.png`          → `refs/gigi-can.webp`     (caseJourneys)
 *
 * Deletes (dead / not referenced):
 * - `brand1.png`, `favicon.png`            (unused; favicon.svg is the real one)
 * - `thumbnails/four.mp4`, `thumbnails/five.mp4`
 * - `thumbnails/gigi-energy.png`, `thumbnails/kenya-tourism.png`  (webp variants already served)
 * - `thumbnails/gmautomation/**`, `thumbnails/gmdesign/**`
 * - `process/{kenyatrace,gigi-energy,mobile-banking-redesign}/**` (never loaded)
 *
 * Run: `node scripts/optimize-images.mjs`
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "..", "client", "public");

const Q = 78;

function toWebP(rel, { width } = {}) {
  const file = path.join(PUBLIC, rel);
  const out = file.replace(/\.png$/i, ".webp");
  return sharp(file)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: Q })
    .toFile(out)
    .then((info) =>
      console.log(
        `  ✔ webp  ${rel.replace(/\.png$/i, ".webp")}  (${fileSizeKB(file)}KB → ${(info.size / 1024).toFixed(0)}KB)`,
      ),
    )
    .catch((err) => console.error(`  ✖ ${rel}: ${err.message}`));
}

function fileSizeKB(file) {
  return Math.round(fs.statSync(file).size / 1024);
}

async function convert() {
  console.log("— Converting used PNGs → WebP —");
  const home = fs.readdirSync(path.join(PUBLIC, "process", "home")).filter((f) => f.endsWith(".png"));
  for (const f of home) {
    const desktop = f.includes("-desktop");
    await toWebP(`process/home/${f}`, desktop ? { width: 1600 } : undefined);
  }
  await toWebP("profile.png", { width: 480 });
  await toWebP("refs/kenya-hero.png", { width: 720 });
  await toWebP("refs/gigi-can.png", { width: 560 });

  console.log("— Removing converted source PNGs —");
  for (const f of home) del(`process/home/${f}`, false);
  del("profile.png", false);
  del("refs/kenya-hero.png", false);
  del("refs/gigi-can.png", false);
}

function del(rel, quiet = true) {
  const file = path.join(PUBLIC, rel);
  if (!fs.existsSync(file)) return;
  const kb = fileSizeKB(file);
  fs.rmSync(file, { recursive: true, force: true });
  if (!quiet) console.log(`  ✔ del   ${rel}  (${kb}KB)`);
}

function delDir(rel) {
  const dir = path.join(PUBLIC, rel);
  if (!fs.existsSync(dir)) return;
  const kb = (fs.readdirSync(dir, { recursive: true }).length ?? 0);
  console.log(`  ✔ rmdir ${rel}/`);
  fs.rmSync(dir, { recursive: true, force: true });
}

function clean() {
  console.log("— Removing dead assets —");
  del("brand1.png");
  del("favicon.png");
  del("thumbnails/four.mp4");
  del("thumbnails/five.mp4");
  del("thumbnails/gigi-energy.png");
  del("thumbnails/kenya-tourism.png");
  delDir("thumbnails/gmautomation");
  delDir("thumbnails/gmdesign");
  delDir("process/kenyatrace");
  delDir("process/gigi-energy");
  delDir("process/mobile-banking-redesign");
}

await convert();
clean();
console.log("\nDone.");
