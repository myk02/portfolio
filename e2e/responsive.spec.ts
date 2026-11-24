import { expect, test } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const vp of viewports) {
  test.describe(`responsive ${vp.name}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const route of ["/", "/videos"]) {
      test(`${route} has no horizontal overflow`, async ({ page }) => {
        await page.goto(route);
        await page.waitForLoadState("domcontentloaded");
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth + 2
        );
        expect(overflow).toBe(false);
      });
    }

    test("landing page proof teaser shows 3 videos", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator('#proof button[aria-label^="Play "]')).toHaveCount(3);
    });
  });
}
