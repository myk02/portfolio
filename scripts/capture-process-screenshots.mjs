import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(__dirname, "..", "client", "public", "process");
fs.mkdirSync(out, { recursive: true });

const MOBILE = { width: 390, height: 844 };
const DESKTOP = { width: 1280, height: 800 };

/** slug / stage / viewport */
const captures = [
  /* KenyaTrace — live product */
  { slug: "kenyatrace", stage: "brief", url: "https://kenyatrace.vercel.app" },
  { slug: "kenyatrace", stage: "research", url: "https://kenyatrace.vercel.app" },
  { slug: "kenyatrace", stage: "wireframes", url: "https://kenyatrace.vercel.app" },
  { slug: "kenyatrace", stage: "hifi", url: "https://kenyatrace.vercel.app" },
  { slug: "kenyatrace", stage: "ship", url: "https://kenyatrace.vercel.app" },
  /* GiGi — live storefront */
  { slug: "gigi-energy", stage: "brief", url: "https://gigiflavours.vercel.app/" },
  { slug: "gigi-energy", stage: "research", url: "https://gigiflavours.vercel.app/" },
  { slug: "gigi-energy", stage: "wireframes", url: "https://gigiflavours.vercel.app/" },
  { slug: "gigi-energy", stage: "hifi", url: "https://gigiflavours.vercel.app/" },
  { slug: "gigi-energy", stage: "ship", url: "https://gigiflavours.vercel.app/" },
  /* Homepage process section — reuse best shots */
  { slug: "home", stage: "discover", url: "https://kenyatrace.vercel.app" },
  { slug: "home", stage: "define", url: "https://gigiflavours.vercel.app/" },
  { slug: "home", stage: "design", url: "https://gigiflavours.vercel.app/" },
  { slug: "home", stage: "validate", url: "https://kenyatrace.vercel.app" },
];

async function shot(page, filePath) {
  await page.screenshot({ path: filePath, fullPage: false, type: "png" });
  console.log(`  ✔ ${path.relative(out, filePath)}`);
}

const browser = await chromium.launch({ headless: true });

for (const cap of captures) {
  const dir = path.join(out, cap.slug);
  fs.mkdirSync(dir, { recursive: true });
  console.log(`Capturing ${cap.slug}/${cap.stage} (${cap.url})`);

  for (const [label, viewport] of [
    ["mobile", MOBILE],
    ["desktop", DESKTOP],
  ]) {
    const ctx = await browser.newContext({
      viewport,
      deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    try {
      await page.goto(cap.url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(3500);
      const filePath = path.join(dir, `${cap.stage}-${label}.png`);
      await shot(page, filePath);
    } catch (err) {
      console.error(`  ✖ ${cap.slug}/${cap.stage}-${label}: ${err.message}`);
    } finally {
      await ctx.close();
    }
  }
}

/* Banking concept — screenshot local portfolio case study hero if dev server up; else skip */
try {
  const port = process.env.PORT || 3000;
  const bankingUrl = `http://127.0.0.1:${port}/work/mobile-banking-redesign`;
  const dir = path.join(out, "mobile-banking-redesign");
  fs.mkdirSync(dir, { recursive: true });
  console.log(`Capturing banking case study (${bankingUrl})`);
  for (const [label, viewport] of [
    ["mobile", MOBILE],
    ["desktop", DESKTOP],
  ]) {
    const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    try {
      await page.goto(bankingUrl, { waitUntil: "domcontentloaded", timeout: 8000 });
      await page.waitForTimeout(2000);
      for (const stage of ["brief", "research", "wireframes", "hifi", "ship"]) {
        await shot(page, path.join(dir, `${stage}-${label}.png`));
      }
    } catch {
      console.log("  (local dev server not running — banking captures skipped)");
    } finally {
      await ctx.close();
    }
  }
} catch {
  /* optional */
}

await browser.close();
console.log("\nDone.");
