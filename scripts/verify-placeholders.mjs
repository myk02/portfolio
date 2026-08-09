import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:5173";
const slugs = [
  "mobile-banking-redesign",
  "kenyatrace",
  "gigi-energy",
  "dashboard-ui-system",
  "design-system-creation",
];

const browser = await chromium.launch();
let failures = 0;

for (const slug of slugs) {
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
  await page.goto(`${BASE}/work/${slug}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);

  const result = await page.evaluate(() => {
    const text = (el) => String((el && el.textContent) || "").replace(/\s+/g, " ").trim();
    const badges = Array.from(document.querySelectorAll("span")).filter((s) =>
      /Real .* slot/i.test(text(s)),
    );
    const ladderCaption = Array.from(document.querySelectorAll("figcaption span")).find((s) =>
      /wireframe → structured → hi-fi/i.test(text(s)),
    );
    const ladder = Array.from(document.querySelectorAll("span"))
      .map((s) => text(s))
      .filter((t) => ["Wireframe", "Structured", "Hi-fi"].includes(t));
    const broken = Array.from(document.querySelectorAll("img")).filter(
      (img) => img.complete && img.naturalWidth === 0,
    );
    return {
      badges: badges.map((s) => text(s)),
      ladderCaption: ladderCaption ? text(ladderCaption) : null,
      ladderSteps: ladder,
      brokenImages: broken.map((img) => img.getAttribute("src")),
      pageTitle: document.title,
    };
  });

  const ok =
    errors.length === 0 &&
    result.badges.length >= 2 &&
    result.brokenImages.length === 0 &&
    result.ladderCaption !== null &&
    result.ladderSteps.length >= 3;

  if (!ok) failures++;
  console.log(
    `${ok ? "OK  " : "FAIL"} ${slug} | slots=${result.badges.length} | ladder="${result.ladderCaption}" steps=${result.ladderSteps.join("/")} | brokenImgs=${result.brokenImages.length} | errs=${errors.length}`,
  );
  result.badges.slice(0, 8).forEach((b) => console.log(`      slot: ${b}`));
  result.brokenImages.slice(0, 3).forEach((b) => console.log(`      BROKEN: ${b}`));
  errors.slice(0, 3).forEach((e) => console.log("      err: " + e.slice(0, 140)));
  await page.close();
}

await browser.close();
console.log(failures === 0 ? "ALL_SLOTS_OK" : `FAILURES=${failures}`);
