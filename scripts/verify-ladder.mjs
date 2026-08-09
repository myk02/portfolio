import { chromium } from "playwright";

const BASE = "http://localhost:5175";
const browser = await chromium.launch();

for (const slug of ["mobile-banking-redesign", "kenyatrace"]) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(`${BASE}/work/${slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const caption = page.locator("figcaption span", {
    hasText: "wireframe → structured → hi-fi",
  });
  await caption.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const d = await page.evaluate(() => {
    const cap = Array.from(document.querySelectorAll("figcaption span")).find((s) =>
      /wireframe → structured → hi-fi/i.test(String(s.textContent || "")),
    );
    const fig = cap.closest("figure");
    const grid = fig.querySelector('[class*="sm:grid-cols-3"]');
    const gridR = grid.getBoundingClientRect();
    const cards = Array.from(grid.children).map((c) => {
      const r = c.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    });
    const inner = Array.from(grid.querySelectorAll(":scope > div > div")).map((c) => {
      const r = c.getBoundingClientRect();
      return { cls: String(c.className).slice(0, 60), w: Math.round(r.width), h: Math.round(r.height) };
    });
    return {
      fig: Math.round(fig.getBoundingClientRect().height),
      grid: `${Math.round(gridR.width)}x${Math.round(gridR.height)}`,
      cards,
      inner,
      ladders: document.querySelectorAll('[class*="sm:grid-cols-3"]').length,
    };
  });
  console.log(slug, JSON.stringify(d, null, 1));
  await page.close();
}
await browser.close();
