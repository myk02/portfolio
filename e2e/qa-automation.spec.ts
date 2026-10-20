import { expect, test } from "@playwright/test";

/**
 * End-to-end demonstration suite — this portfolio is the system under test.
 * Mirrors a real release gate: functional cases, regression sweep, UI-consistency
 * checks, accessibility basics, and a 360px viewport pass. The portfolio itself
 * ships production-grade quality gates. Run with: pnpm test
 *
 * Project cards link straight out to the live product sites, so the only
 * routes under test are the portfolio's own pages.
 */

const ROUTES = ["/", "/work"];

test.describe("QA gate — functional: contact form validation", () => {
  test("empty submission is rejected with inline errors (no network call)", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("alert")).toContainText(
      "Please fill in all fields"
    );
    await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#email")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  test("invalid email is rejected with a specific message", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("#name").fill("QA Reviewer");
    await page.locator("#email").fill("not-an-email");
    await page.locator("#message").fill("Regression check — ignore.");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("alert")).toContainText("valid email");
  });
});

test.describe("QA gate — regression: every route resolves cleanly", () => {
  test("all routes render h1 with zero page errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", e => errors.push(e.message));
    for (const route of ROUTES) {
      await page.goto(route);
      await expect(
        page.getByRole("heading", { level: 1 }).first()
      ).toBeVisible();
    }
    expect(errors).toEqual([]);
  });

  test("roles section is reachable from the header nav", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("button", { name: "Roles" })
      .click();
    await expect(page.locator("#skills")).toBeInViewport();
    await expect(
      page.getByRole("heading", { name: "What I do" })
    ).toBeVisible();
    await expect(
      page
        .locator("#skills")
        .getByRole("heading", { name: "Full-Stack Software Engineer" })
    ).toBeVisible();
  });
});

test.describe("QA gate — UI consistency across viewports", () => {
  test("header, main landmark, and footer present on every route", async ({
    page,
  }) => {
    for (const route of ROUTES) {
      await page.goto(route);
      await expect(page.getByRole("banner").first()).toBeVisible();
      await expect(page.locator("#main, main").first()).toBeVisible();
      await expect(page.getByRole("contentinfo").first()).toBeVisible();
    }
  });

  test("no horizontal overflow at 360px (low-end Android pass)", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 800 });
    for (const route of ["/", "/work"]) {
      await page.goto(route);
      const overflow = await page.evaluate(() => {
        const el = document.scrollingElement ?? document.documentElement;
        return el.scrollWidth - document.documentElement.clientWidth;
      });
      expect(overflow).toBeLessThanOrEqual(1);
    }
  });

  test("every work tile image carries alt text (UI validation)", async ({
    page,
  }) => {
    await page.goto("/");
    const alts = await page
      .locator('#work a[href^="https://"] img')
      .evaluateAll(els => els.map(el => el.getAttribute("alt")));
    expect(alts.length).toBeGreaterThan(0);
    for (const alt of alts) expect(alt?.trim().length).toBeGreaterThan(0);
  });
});

test.describe("QA gate — external contracts (API-link reliability)", () => {
  test("live product out-links are absolute https URLs", async ({ page }) => {
    await page.goto("/work");
    const liveLinks = page.getByRole("link", { name: /Open demo/ });
    await expect(liveLinks.first()).toBeVisible();
    const hrefs = await liveLinks.evaluateAll(els =>
      els.map(el => el.getAttribute("href"))
    );
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) expect(href).toMatch(/^https:\/\//);
  });
});
