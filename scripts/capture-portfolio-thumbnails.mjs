import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(__dirname, "..", "client", "public", "thumbnails");
fs.mkdirSync(out, { recursive: true });

const targets = [
  { name: "kenya-tourism", url: "https://kenyatrace.vercel.app" },
  { name: "gigi-energy", url: "https://gigiflavours.vercel.app/" },
];

const browser = await chromium.launch({ headless: true });

for (const t of targets) {
  console.log(`Capturing ${t.name} (${t.url})...`);
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  try {
    await page.goto(t.url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(4000);
    const png = path.join(out, `${t.name}.png`);
    await page.screenshot({ path: png, fullPage: false, type: "png" });
    console.log(`  ✔ ${png}`);
  } catch (err) {
    console.error(`  ✖ ${t.name}: ${err.message}`);
  } finally {
    await ctx.close();
  }
}

await browser.close();
console.log("Done.");
