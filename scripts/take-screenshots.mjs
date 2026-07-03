import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, '..', 'attached_assets');

const projects = [
  { name: 'legalflow', url: 'https://law-five-eta.vercel.app/' },
  { name: 'codemaster', url: 'https://codemaster-ten.vercel.app/' },
  { name: 'carsoko', url: 'https://car-nu-ten.vercel.app/' },
  { name: 'nora-designs', url: 'https://design-sigma-beryl.vercel.app/' },
  { name: 'gigi-energy', url: 'https://drink-sand.vercel.app/' },
  { name: 'purematch254', url: 'https://www.purematch254.com/' },
];

const browser = await chromium.launch({
  headless: true,
  ignoreHTTPSErrors: true,
});
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
});

for (const project of projects) {
  console.log(`Capturing ${project.name} (${project.url})...`);
  const page = await context.newPage();
  try {
    await page.goto(project.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Wait a bit for lazy-loaded content
    await page.waitForTimeout(4000);
    const filePath = path.join(outputDir, `${project.name}.png`);
    await page.screenshot({ path: filePath, fullPage: false, type: 'png' });
    console.log(`  ✔ Saved to attached_assets/${project.name}.png`);
  } catch (err) {
    console.error(`  ✖ Navigation error: ${err.message}`);
    try {
      const filePath = path.join(outputDir, `${project.name}.png`);
      await page.screenshot({ path: filePath, type: 'png' });
      console.log(`  ✔ Partial screenshot saved`);
    } catch (ssErr) {
      console.error(`  ✖ Screenshot also failed: ${ssErr.message}`);
    }
  } finally {
    await page.close();
  }
}

await browser.close();
console.log('\nDone!');
