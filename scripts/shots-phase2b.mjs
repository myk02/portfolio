import { chromium } from "playwright";

const BASE = "http://localhost:5175";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const grab = async (slug, label) => {
  await page.goto(`${BASE}/work/${slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const caption = page.locator("figcaption span", {
    hasText: "wireframe → structured → hi-fi",
  });
  await caption.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const fig = caption.locator("xpath=ancestor::figure");
  await fig.screenshot({
    path: `C:/Users/ADMIN/AppData/Local/Temp/opencode/ladder-${label}.png`,
  });
  console.log(`saved ladder-${label}`);
};

await grab("mobile-banking-redesign", "banking");
await grab("kenyatrace", "kenya");
await grab("gigi-energy", "gigi");
await grab("dashboard-ui-system", "dashboard");
await grab("design-system-creation", "ds");

const page2 = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page2.goto(`${BASE}/work/kenyatrace`, { waitUntil: "networkidle" });
await page2.waitForTimeout(300);
const slot = page2.locator("span", { hasText: "Real paper sketch slot" });
await slot.scrollIntoViewIfNeeded();
await page2.waitForTimeout(500);
const frame = slot.locator("xpath=ancestor::div[contains(@class,'snap-start')]");
await frame.screenshot({
  path: "C:/Users/ADMIN/AppData/Local/Temp/opencode/slot-kenya.png",
});
console.log("saved slot-kenya");

await browser.close();
