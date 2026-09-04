/**
 * Image pipeline (Phase 3).
 *
 * Converts every JPG under client/public/shots to .webp (quality 78,
 * 1600, skips outputs newer than their source). After a clean convert,
 * update refs in client/src/data/projects.ts (.jpg → .webp) and delete
 * the JPGs — every shots/ path in the app lives in that one file.
 *
 * Left alone on purpose: client/public/profile.webp (already WebP),
 * client/public/og-cover.png (social cards want PNG/JPG).
 *
 * Run: pnpm images  (or: node scripts/optimize-images.mjs)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHOTS = path.resolve(__dirname, "..", "client", "public", "shots");

const Q = 78;
const MAX_WIDTH = 1600;

function* jpgs(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* jpgs(full);
    else if (/\.jpe?g$/i.test(entry.name)) yield full;
  }
}

let converted = 0;
let skipped = 0;
for (const file of jpgs(SHOTS)) {
  const out = file.replace(/\.jpe?g$/i, ".webp");
  const outStat = fs.existsSync(out) ? fs.statSync(out) : null;
  if (outStat && outStat.mtimeMs >= fs.statSync(file).mtimeMs) {
    skipped++;
    continue;
  }
  try {
    const info = await sharp(file)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: Q })
      .toFile(out);
    const before = Math.round(fs.statSync(file).size / 1024);
    console.log(
      `  ok  ${path.relative(SHOTS, out)}  (${before}KB → ${Math.round(info.size / 1024)}KB)`,
    );
    converted++;
  } catch (err) {
    console.error(`  FAIL ${path.relative(SHOTS, file)}: ${err.message}`);
  }
}
console.log(`Done. converted=${converted} skipped=${skipped}`);
console.log("Next: sed .jpg→.webp refs in client/src/data/projects.ts, then delete the JPGs.");
