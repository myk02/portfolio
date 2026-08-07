import { chromium } from 'playwright';

const b = await chromium.launch({ headless: true });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:5173', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(4000);
const sizes = await p.evaluate(() => {
  const gs = (sel, prop) => {
    const el = document.querySelector(sel);
    return el ? getComputedStyle(el)[prop] : null;
  };
  return {
    rootFont: getComputedStyle(document.documentElement).fontSize,
    body: getComputedStyle(document.body).fontSize,
    heroH1: gs('#home h1', 'fontSize'),
    heroIntro: gs('#home p', 'fontSize'),
    viewWorkBtn: gs('#home .btn-primary', 'fontSize'),
    navLink: gs('nav button', 'fontSize'),
    projectTitle: gs('#work h3', 'fontSize'),
    projectDesc: gs('#work p', 'fontSize'),
    tagPill: gs('.tag-pill', 'fontSize'),
    processTitle: gs('#process h3', 'fontSize'),
    sectionHeading: gs('#work h2', 'fontSize'),
  };
});
console.log(JSON.stringify(sizes, null, 2));
await b.close();
