import { chromium } from 'playwright';

const BASE = 'http://localhost:5173';
const browser = await chromium.launch({ headless: true });

async function rowsOf(page, selector) {
  return page.evaluate((sel) => {
    const els = [...document.querySelectorAll(sel)];
    const rows = new Map();
    for (const el of els) {
      const r = el.getBoundingClientRect();
      const key = Math.round(r.top);
      const row = rows.get(key) ?? [];
      row.push({ left: Math.round(r.left), width: Math.round(r.width), right: Math.round(r.right) });
      rows.set(key, row);
    }
    return [...rows.values()].map((row) => row.length);
  }, selector);
}

for (const vp of [{ name: '375', width: 375 }, { name: '768', width: 768 }, { name: '1024', width: 1024 }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: 900 } });
  const page = await ctx.newPage();
  const httpFailures = [];
  page.on('response', (res) => {
    if (res.status() >= 400) httpFailures.push(`${res.status()} ${res.url()}`);
  });
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('text=KenyaTrace', { timeout: 30000 });
  await page.waitForTimeout(2000);

  const results = { vp: vp.name };

  const firstProject = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('#work h3')].map((h) => h.textContent);
    return cards;
  });
  results.projectOrder = firstProject;

  const badge = await page.evaluate(() => {
    const el = [...document.querySelectorAll('#work span')].find((s) => s.textContent === 'Live Product');
    return !!el;
  });
  results.liveBadge = badge;

  results.projectRows = await rowsOf(page, '#work .group');
  results.processRows = await rowsOf(page, '#process .grid > div');
  results.testimonialRows = await rowsOf(page, '#reviews .grid > div');
  results.statRows = await rowsOf(page, '#home .grid-cols-2, #home .sm\\:grid-cols-3');

  const heroVisual = await page.evaluate(() => {
    const el = document.querySelector('#home svg[role="img"]');
    if (!el) return { present: false };
    const r = el.getBoundingClientRect();
    const hero = document.getElementById('home').getBoundingClientRect();
    return { present: true, x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), heroW: Math.round(hero.width) };
  });
  results.heroVisual = heroVisual;

  // stats layout
  const stats = await page.evaluate(() => {
    const div = document.querySelector('#home .grid-cols-2');
    const kids = div ? [...div.children].map((c) => { const r = c.getBoundingClientRect(); return { top: Math.round(r.top), left: Math.round(r.left), w: Math.round(r.width) }; }) : [];
    return kids;
  });
  results.stats = stats;

  // contact inputs
  const inputs = await page.evaluate(() => {
    const els = [...document.querySelectorAll('#contact input, #contact textarea')];
    return els.map((el) => ({
      h: Math.round(el.getBoundingClientRect().height),
      labelFor: el.id && document.querySelector(`label[for="${el.id}"]`) ? true : false,
      fontSize: getComputedStyle(el).fontSize,
    }));
  });
  results.inputs = inputs;

  results.httpFailures = httpFailures;

  console.log(JSON.stringify(results, null, 2));
  await ctx.close();
}

// keyboard focus check
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { tag: el.tagName, cls: el.className, outline: cs.outline, outlineColor: cs.outlineColor, outlineStyle: cs.outlineStyle };
  });
  console.log(JSON.stringify({ focus: focused }, null, 2));
  await ctx.close();
}

await browser.close();
