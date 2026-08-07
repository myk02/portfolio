import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const OUT = 'C:/Users/ADMIN/AppData/Local/Temp/opencode/shots';
import fs from 'fs';
fs.mkdirSync(OUT, { recursive: true });

const viewports = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 768 },
  { name: '1440', width: 1440, height: 900 },
];

const browser = await chromium.launch({ headless: true });
const report = [];

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => pageErrors.push(String(err)));

  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  try {
    await page.waitForSelector('text=KenyaTrace', { timeout: 30000 });
  } catch {
    // data may not have loaded; record but continue
  }
  await page.waitForTimeout(2500);

  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > window.innerWidth + 1;
  });

  await page.screenshot({ path: `${OUT}/${vp.name}-hero.png` });
  await page.screenshot({ path: `${OUT}/${vp.name}-full.png`, fullPage: true });

  // Mobile menu check
  let menuOk = 'n/a';
  if (vp.width < 768) {
    await page.click('button[aria-controls="mobile-nav"]');
    await page.waitForTimeout(400);
    const menuVisible = await page.isVisible('#mobile-nav');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    const menuClosed = !(await page.isVisible('#mobile-nav').catch(() => false));
    menuOk = `open=${menuVisible}, escClosed=${menuClosed}`;
  }

  report.push({
    vp: vp.name,
    overflow: overflow ? 'YES (BUG)' : 'no',
    consoleErrors,
    pageErrors,
    menuOk,
  });
  await ctx.close();
}

// Interaction checks at desktop width
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(4000);

  // theme toggle
  const before = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  await page.click('button[aria-label*="theme" i]');
  await page.waitForTimeout(400);
  const after = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  report.push({ vp: 'theme', before, after, ok: before !== after });
  // toggle back
  await page.click('button[aria-label*="theme" i]');

  // contact form button state
  await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
  await page.waitForTimeout(600);
  const sendBtn = page.locator('button[type="submit"]');
  const btnBg = await sendBtn.evaluate((el) => getComputedStyle(el).backgroundColor);
  const btnColor = await sendBtn.evaluate((el) => getComputedStyle(el).color);
  report.push({ vp: 'send-btn', bg: btnBg, color: btnColor });

  // hero visual present + stray box check
  const heroBoxes = await page.evaluate(() => {
    const hero = document.getElementById('home');
    if (!hero) return null;
    return hero.querySelectorAll('.absolute').length;
  });
  report.push({ vp: 'hero-absolute-elements', count: heroBoxes });

  // check horizontal scroll inside hero
  const heroOverflow = await page.evaluate(() => {
    const hero = document.getElementById('home');
    return hero ? hero.scrollWidth > hero.clientWidth + 1 : null;
  });
  report.push({ vp: 'hero-overflow', overflow: heroOverflow });

  await ctx.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
