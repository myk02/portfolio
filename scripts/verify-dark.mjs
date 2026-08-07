import { chromium } from 'playwright';

const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(3000);
await p.click('button[aria-label="Switch to dark theme"]');
await p.waitForTimeout(400);
const c = await p.evaluate(() => {
  const h2 = document.querySelector('#process h2');
  const step = document.querySelector('#process .border');
  const stepTitle = step?.querySelector('h3');
  const stepDesc = step?.querySelector('p');
  const num = step?.querySelector('span');
  return {
    h2Color: h2 ? getComputedStyle(h2).color : null,
    stepTitle: stepTitle ? getComputedStyle(stepTitle).color : null,
    stepDesc: stepDesc ? getComputedStyle(stepDesc).color : null,
    stepBorder: step ? getComputedStyle(step).borderColor : null,
    numColor: num ? getComputedStyle(num).color : null,
  };
});
console.log(JSON.stringify(c, null, 2));
await b.close();
