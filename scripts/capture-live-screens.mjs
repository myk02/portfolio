/**
 * Captures DISTINCT screens from the two live products so every case-study
 * chapter can show a different artifact (Phase 1.4 — no duplicated images).
 *
 * Output: client/public/shots/<slug>/<name>-<viewport>.jpg
 * Run:    node scripts/capture-live-screens.mjs
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "..", "client", "public", "shots");

const MOBILE = { width: 390, height: 844 };
const TABLET = { width: 834, height: 1112 };
const DESKTOP = { width: 1440, height: 900 };

/** name → url (+ optional scrollTo in px, or a heading marker to scroll into view) */
const TARGETS = [
  {
    slug: "kenyatrace",
    base: "https://kenyatrace.vercel.app",
    screens: [
      { name: "home", path: "/", viewports: ["mobile", "tablet", "desktop"] },
      {
        name: "home-cards",
        path: "/",
        marker: "Places worth the detour",
        viewports: ["mobile", "tablet", "desktop"],
      },
      {
        name: "discover",
        path: "/discover",
        viewports: ["mobile", "tablet", "desktop"],
      },
      {
        name: "plan",
        path: "/plan",
        viewports: ["mobile", "tablet", "desktop"],
      },
      {
        name: "trips",
        path: "/trips",
        viewports: ["mobile", "tablet", "desktop"],
      },
      {
        name: "stays",
        path: "/discover/stays",
        viewports: ["mobile", "tablet", "desktop"],
      },
    ],
  },
  {
    slug: "gigi-energy",
    base: "https://gigiflavours.vercel.app",
    screens: [
      { name: "home", path: "/", viewports: ["mobile", "tablet", "desktop"] },
      {
        name: "home-products",
        path: "/",
        marker: "CHOOSE YOUR FUEL",
        viewports: ["mobile", "tablet", "desktop"],
      },
      {
        name: "flavours",
        path: "/flavours",
        viewports: ["mobile", "tablet", "desktop"],
      },
      {
        name: "events",
        path: "/events",
        viewports: ["mobile", "tablet", "desktop"],
      },
      {
        name: "home-scroll",
        path: "/",
        scroll: 1100,
        viewports: ["mobile", "tablet", "desktop"],
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
      const viewport =
        vp === "mobile" ? MOBILE : vp === "tablet" ? TABLET : DESKTOP;
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
