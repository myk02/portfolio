import { chromium } from "playwright";
const BASE = "http://localhost:4173";
const browser = await chromium.launch();

async function shot(path, file, w, h) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: file, fullPage: false });
  await page.close();
}

await shot("/work/kenyatrace", "/tmp/kc-desktop.png", 1280, 900);
await shot("/work/mobile-banking-redesign", "/tmp/bank-desktop.png", 1280, 900);
await shot("/work/mobile-banking-redesign/prototype", "/tmp/bank-proto.png", 1280, 900);
await shot("/work", "/tmp/work.png", 1280, 900);
await shot("/work/kenyatrace", "/tmp/kc-mobile.png", 390, 780);
await browser.close();
console.log("done");
