import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://localhost:5175/work/mobile-banking-redesign", { waitUntil: "networkidle" });
await page.waitForTimeout(300);
const cap = page.locator("figcaption span", { hasText: "wireframe → structured → hi-fi" });
await cap.scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
const d = await page.evaluate(() => {
  const span = Array.from(document.querySelectorAll("figcaption span")).find((s) => /wireframe → structured → hi-fi/i.test(String(s.textContent || "")));
  const fig = span.closest("figure");
  const chain = [];
  let el = fig.parentElement;
  for (let i = 0; i < 6 && el; i++) {
    const r = el.getBoundingClientRect();
    chain.push(`${el.tagName.toLowerCase()}${el.className ? "." + String(el.className).trim().replace(/\s+/g, ".").slice(0, 50) : ""} w=${Math.round(r.width)}`);
    el = el.parentElement;
  }
  return chain;
});
console.log(d.join("\n"));
await browser.close();
