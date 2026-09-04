import { expect, test } from "@playwright/test";
// Single source of truth: slugs live in client/src/data/projects.ts
import { projects } from "../client/src/data/projects";

const LIVE_SLUGS = projects.map((s) => s.slug);

test.describe("home page", () => {
  test("renders engineering-led hero with primary CTAs", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", e => errors.push(e.message));

    await page.goto("/");
    await expect(page.getByRole("heading", { name: /design, automate/ })).toBeVisible();

    // Hero: hire CTAs + coffee (footer keeps a second instance)
    await expect(
      page.locator("#home").getByRole("button", { name: /buy me a coffee/i })
    ).toBeVisible();
    await expect(
      page.locator("#home").getByRole("button", { name: "View live work" })
    ).toBeVisible();
    await expect(
      page.locator("#home").getByRole("button", { name: "Work with me" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Download CV" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Download CV" })).toHaveCount(0);

    await expect(
      page.getByText(/Live products/).first()
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: "github.com/myk02" })
    ).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("shows three live products with real screenshots", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByText("Live production", { exact: true })).toHaveCount(3);
    await expect(page.getByText("Concept study")).toHaveCount(0);

    const workGrid = page.locator("#work");
    const hrefs = await workGrid
      .locator('a[href^="/work/"]')
      .evaluateAll(els =>
        Array.from(new Set(els.map(el => el.getAttribute("href"))))
      );
    expect(hrefs.sort()).toEqual(LIVE_SLUGS.map(s => `/work/${s}`).sort());

    const tileImages = workGrid.locator('a[href^="/work/"] img');
    await expect(tileImages).toHaveCount(3);
  });

});

test.describe("project data — single source, unique screens", () => {
  test("tile, hero, decisions, and gallery never repeat a src", async () => {
    for (const p of projects) {
      const srcs = [
        p.tileShot,
        p.hero.src,
        ...p.decisions.filter((d) => d.shot).map((d) => d.shot as string),
        ...p.screens.map((s) => s.src),
      ];
      expect(new Set(srcs).size).toBe(srcs.length);
    }
  });

  test("every study has ownership, ordeal, and context", async () => {
    for (const p of projects) {
      expect(p.outcomeTitle.length).toBeGreaterThan(0);
      expect(p.context.length).toBeGreaterThan(0);
      expect(p.ownership).toHaveLength(3);
      expect(p.ordeal.length).toBeGreaterThan(0);
    }
  });
});

test.describe("work page", () => {
  test("lists only the live projects with distinct links", async ({ page }) => {
    await page.goto("/work");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Work");

    const hrefs = await page
      .locator('a[href^="/work/"]')
      .evaluateAll(els =>
        Array.from(new Set(els.map(el => el.getAttribute("href"))))
      );
    expect(hrefs.sort()).toEqual(LIVE_SLUGS.map(s => `/work/${s}`).sort());

    await expect(
      page.getByRole("link", { name: /^Live site/ }).first()
    ).toHaveAttribute("href", "https://kenyatrace.vercel.app");
  });
});

test.describe("case study pages — lean template", () => {
  test("each shows three facts, screens, results, and a live link", async ({
    page,
  }) => {
    for (const slug of LIVE_SLUGS) {
      await page.goto(`/work/${slug}`);
      for (const label of ["Role", "Stack", "Outcome"]) {
        await expect(
          page.getByText(label, { exact: true }).first()
        ).toBeVisible();
      }
      // Real-screenshot gallery + numbers
      await expect(page.getByRole("heading", { name: "Screens" })).toBeVisible();
      await expect(page.getByRole("heading", { name: "Results" })).toBeVisible();
      await expect(page.getByText("Design decisions")).toBeVisible();
      // Live out-link
      const liveLink = page.getByRole("link", { name: /View live product/ });
      await expect(liveLink.first()).toBeVisible();
      // Structured data for the shipped product
      const jsonLd = page.locator(
        'script[type="application/ld+json"][data-jsonld^="creative-work-"]',
      );
      await expect(jsonLd).toHaveCount(1);
      expect(await jsonLd.textContent()).toContain("WebApplication");
    }
  });

  test("kenyatrace links to its shipped product", async ({ page }) => {
    await page.goto("/work/kenyatrace");
    await expect(
      page.getByRole("link", { name: /View live product/ }).first()
    ).toHaveAttribute("href", "https://kenyatrace.vercel.app");
  });

  test("removed conceptual studies no longer resolve", async ({ page }) => {
    for (const slug of [
      "mobile-banking-redesign",
      "dashboard-ui-system",
      "design-system-creation",
    ]) {
      await page.goto(`/work/${slug}`);
      await expect(page.getByText("404").first()).toBeVisible();
    }
  });

  test("document titles reflect positioning", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Developer, Designer/);
    await page.goto("/work/kenyatrace");
    await expect(page).toHaveTitle(/live product/);
  });
});

test.describe("image lightbox", () => {
  test("device screenshots open full-size and close with Esc", async ({
    page,
  }) => {
    await page.goto("/work/kenyatrace");
    const zoom = page.getByRole("button", { name: /View full size/ });
    await expect(zoom.first()).toBeVisible();
    await zoom.first().click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("img")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });
});

test.describe("404 page", () => {
  test("shows brand-styled 404 with a link home", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("404");
    const home = page.getByRole("link", { name: /Back home/ });
    await expect(home).toHaveAttribute("href", "/");
  });
});

test.describe("contact form", () => {
  test("validates empty submission without network errors", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByRole("alert")).toContainText(
      "Please fill in all fields"
    );
    await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");
  });
});

test.describe("buy me a coffee", () => {
  test("footer shows buy-me-a-coffee and opens the tip dialog", async ({
    page,
  }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(
      footer.getByRole("button", { name: /buy me a coffee/i })
    ).toBeVisible();
    await footer.getByRole("button", { name: /buy me a coffee/i }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
  });
});