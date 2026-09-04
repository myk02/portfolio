/**
 * Captures DISTINCT screens from the live products for the case studies.
 *
 * Output: client/public/shots/<slug>/<name>-<viewport>.jpg
 * Run:    node scripts/capture-live-screens.mjs
 *
 * Viewports: desktop only by default — nothing in client/src references
 * mobile/tablet captures (Phase 0 media diet). Add "mobile" to a screen's
 * viewports only when Phase 2 needs an annotated desktop/mobile pair for
 * the money flow, and wire the file into the data the same commit.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "client", "public", "shots");

const DESKTOP = { width: 1440, height: 900 };

/** name → url (+ optional scrollTo in px, or a heading marker to scroll into view) */
const TARGETS = [
  {
    slug: "kenyatrace",
    base: "https://kenyatrace.vercel.app",
    screens: [
      { name: "home", path: "/", viewports: ["desktop"] },
      {
        name: "home-cards",
        path: "/",
        marker: "Places worth the detour",
        viewports: ["desktop"],
      },
      {
        name: "discover",
        path: "/discover",
        viewports: ["desktop"],
      },
      {
        name: "plan",
        path: "/plan",
        viewports: ["desktop"],
      },
      {
        name: "trips",
        path: "/trips",
        viewports: ["desktop"],
      },
      {
        name: "stays",
        path: "/discover/stays",
        viewports: ["desktop"],
      },
    ],
  },
  {
    slug: "gigi-energy",
    base: "https://gigiflavours.vercel.app",
    screens: [
      { name: "home", path: "/", viewports: ["desktop"] },
      {
        name: "home-products",
        path: "/",
        marker: "CHOOSE YOUR FUEL",
        viewports: ["desktop"],
      },
      {
        name: "flavours",
        path: "/flavours",
        viewports: ["desktop"],
      },
      {
        name: "events",
        path: "/events",
        viewports: ["desktop"],
      },
      {
        name: "home-scroll",
        path: "/",
        scroll: 1100,
        viewports: ["desktop"],
      },
    ],
  },
  {
    slug: "legalflow",
    base: "https://law-ten-iota.vercel.app",
    screens: [
      { name: "home", path: "/", viewports: ["desktop"] },
      {
        name: "home-scroll",
        path: "/",
        scroll: 900,
        viewports: ["desktop"],
      },
      {
        name: "home-features",
        path: "/",
        scroll: 1900,
        viewports: ["desktop"],
      },
    ],
  },
];

const browser = await chromium.launch({ headless: true });

for (const target of TARGETS) {
  const dir = path.join(OUT, target.slug);
  fs.mkdirSync(dir, { recursive: true });

  for (const screen of target.screens) {
    for (const vp of screen.viewports) {
      const viewport = DESKTOP;
      const ctx = await browser.newContext({
        viewport,
        deviceScaleFactor: 2,
        reducedMotion: "reduce",
      });
      const page = await ctx.newPage();
      const url = `${target.base}${screen.path}`;
      const file = path.join(dir, `${screen.name}-${vp}.jpg`);
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
        await page.waitForTimeout(2500);
        if (screen.marker) {
          await page.evaluate(marker => {
            const el = [...document.querySelectorAll("h1,h2,h3,p,span")].find(
              e => e.textContent.includes(marker)
            );
            el?.scrollIntoView({ block: "start" });
          }, screen.marker);
          await page.waitForTimeout(1200);
        } else if (screen.scroll) {
          await page.evaluate(y => window.scrollTo(0, y), screen.scroll);
          await page.waitForTimeout(1200);
        }
        await page.screenshot({
          path: file,
          type: "jpeg",
          quality: 80,
          fullPage: false,
        });
        const kb = Math.round(fs.statSync(file).size / 1024);
        console.log(
          `  ok  ${target.slug}/${screen.name}-${vp}.jpg  (${kb} KB)`
        );
      } catch (err) {
        console.error(
          `  FAIL ${target.slug}/${screen.name}-${vp}: ${err.message}`
        );
      } finally {
        await ctx.close();
      }
    }
  }
}

await browser.close();
console.log("Done.");
