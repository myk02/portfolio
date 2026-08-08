import { chromium } from "playwright";

const BASE = "http://localhost:4173";
const routes = [
  "/",
  "/work",
  "/work/mobile-banking-redesign",
  "/work/kenyatrace",
  "/work/gigi-energy",
  "/work/dashboard-ui-system",
  "/work/design-system-creation",
  "/work/mobile-banking-redesign/prototype",
  "/work/dashboard-ui-system/prototype",
  "/work/design-system-creation/prototype",
  "/work/does-not-exist",
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

let failures = 0;
for (const r of routes) {
  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
  await page.goto(BASE + r, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  const status = await page.evaluate(() => document.title);
  const main = await page.$("main, article, header, h1");
  const hasContent = main ? true : false;
  // collect all hrefs and check none are dead (# or empty)
  const links = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
  const dead = links.filter((h) => h === "#" || h === "" || h === null);
  const ok = errors.length === 0 && (r.includes("does-not-exist") ? true : hasContent);
  if (!ok) failures++;
  console.log(
    `${ok ? "OK " : "FAIL"} ${r} | title=${status.slice(0, 40)} | errs=${errors.length} | deadLinks=${dead.length}`,
  );
  errors.slice(0, 3).forEach((e) => console.log("    " + e.slice(0, 120)));
}

// dark theme check on one study + light on another
await page.emulateMedia({ colorScheme: "dark" });
await page.goto(BASE + "/work/kenyatrace", { waitUntil: "networkidle" });
const darkBg = await page.evaluate(() =>
  getComputedStyle(document.body).backgroundColor,
);
await page.emulateMedia({ colorScheme: "light" });
await page.goto(BASE + "/work/kenyatrace", { waitUntil: "networkidle" });
const lightBg = await page.evaluate(() =>
  getComputedStyle(document.body).backgroundColor,
);
console.log(`THEME bg light=${lightBg} dark=${darkBg}`);

await browser.close();
console.log(failures === 0 ? "ALL_ROUTES_OK" : `FAILURES=${failures}`);
