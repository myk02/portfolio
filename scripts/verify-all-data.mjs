import { chromium } from "playwright";

const BASE = process.env.SITE_URL ?? "http://localhost:4173";

async function countVisible(page, selector) {
  return page.locator(selector).count();
}

async function verifyViewport(width, height, label) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height } });

  await page.goto(BASE, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(4000);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);

  const sections = {
    home: await page.locator("#home").isVisible(),
    about: await page.locator("#about").isVisible(),
    skills: await page.locator("#skills").isVisible(),
    services: await page.locator("#services").isVisible(),
    work: await page.locator("#work").isVisible(),
    pricing: await page.locator("#pricing").isVisible(),
    reviews: await page.locator("#reviews").count(),
    contact: await page.locator("#contact").isVisible(),
  };

  await page.locator("#skills").scrollIntoViewIfNeeded();
  const skillCards = await countVisible(page, "#skills .minimal-card");

  await page.locator("#services").scrollIntoViewIfNeeded();
  const serviceCards = await countVisible(page, "#services .services-grid .minimal-card");

  await page.locator("#pricing").scrollIntoViewIfNeeded();
  const pricingRows = await countVisible(page, "#pricing .pricing-row");

  await page.locator("#work").scrollIntoViewIfNeeded();
  const tabs = ["GMDesign", "GM Marketing", "GMCode"];
  let totalProjects = 0;
  for (const tab of tabs) {
    await page.getByRole("button", { name: new RegExp(tab) }).click();
    await page.waitForTimeout(500);
    totalProjects += await countVisible(page, "#work .projects-grid article");
  }

  await page.locator("#reviews").scrollIntoViewIfNeeded().catch(() => {});
  const reviewCards = await countVisible(page, "#reviews .marquee-card");

  const lineClamps = await page.evaluate(() =>
    [...document.querySelectorAll("[class*='line-clamp']")].length,
  );

  await browser.close();

  return {
    label,
    overflow,
    sections,
    skillCards,
    serviceCards,
    pricingRows,
    totalProjects,
    reviewCards,
    lineClamps,
  };
}

const results = await Promise.all([
  verifyViewport(390, 844, "mobile"),
  verifyViewport(834, 1112, "tablet"),
  verifyViewport(1440, 900, "desktop"),
]);

const failures = [];

for (const r of results) {
  if (r.overflow) failures.push(`${r.label}: horizontal overflow`);
  if (!r.sections.home || !r.sections.about || !r.sections.skills || !r.sections.services || !r.sections.work || !r.sections.pricing || !r.sections.contact) {
    failures.push(`${r.label}: missing core section`);
  }
  if (r.skillCards !== 6) failures.push(`${r.label}: expected 6 skill groups, got ${r.skillCards}`);
  if (r.serviceCards !== 9) failures.push(`${r.label}: expected 9 services, got ${r.serviceCards}`);
  if (r.pricingRows !== 6) failures.push(`${r.label}: expected 6 pricing rows, got ${r.pricingRows}`);
  if (r.totalProjects < 20) failures.push(`${r.label}: expected >=20 projects across tabs, got ${r.totalProjects}`);
  if (r.reviewCards < 20) failures.push(`${r.label}: expected >=20 review cards in marquee, got ${r.reviewCards}`);
  if (r.lineClamps > 0) failures.push(`${r.label}: found ${r.lineClamps} line-clamp elements`);
}

console.log(JSON.stringify({ results, failures, pass: failures.length === 0 }, null, 2));
process.exit(failures.length === 0 ? 0 : 1);
