import { expect, test } from "@playwright/test";

const CONCEPTUAL_SLUGS = [
  "mobile-banking-redesign",
  "dashboard-ui-system",
  "design-system-creation",
];

test.describe("home page", () => {
  test("renders hero, stats, and all five case-study tiles", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", e => errors.push(e.message));

    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        name: "Visual design thinker for digital products.",
      })
    ).toBeVisible();

    // Four honest stats: 5 case studies, 3 live, 2 conceptual, Figma
    await expect(
      page.getByText("Live products shipped", { exact: true }).first()
    ).toBeVisible();
    await expect(
      page.getByText("Conceptual studies", { exact: true }).first()
    ).toBeVisible();

    // Five work tiles link to case studies
    const tiles = page.locator('a[href^="/work/"]');
    await expect(tiles).toHaveCount(5);
    await expect(tiles.first()).toContainText("View case");

    expect(errors).toEqual([]);
  });
});

test.describe("work page", () => {
  test("lists all five case studies", async ({ page }) => {
    await page.goto("/work");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Work");
    await expect(page.locator('a[href^="/work/"]')).toHaveCount(5);
  });
});

test.describe("case study pages", () => {
  for (const slug of CONCEPTUAL_SLUGS) {
    test(`${slug} prototype CTAs point to the in-site prototype`, async ({
      page,
    }) => {
      await page.goto(`/work/${slug}`);
      await expect(page.getByRole("heading", { level: 1 })).not.toBeEmpty();

      const prototypeLinks = page.locator('a[href*="prototype"]');
      await expect(prototypeLinks.first()).toBeVisible();
      for (const link of await prototypeLinks.all()) {
        const href = await link.getAttribute("href");
        expect(href).toBe(`/work/${slug}/prototype`);
      }
    });
  }

  test("live product studies link out to their shipped products", async ({
    page,
  }) => {
    await page.goto("/work/kenyatrace");
    // Hero CTA — the ship-stage CTA repeats the same href at the end of the study
    const live = page.getByRole("link", { name: /View live product/ }).first();
    await expect(live).toHaveAttribute("href", "https://kenyatrace.vercel.app");
    await expect(
      page.locator("#chapter-ship").getByRole("link", { name: /View live product/ })
    ).toHaveAttribute("href", "https://kenyatrace.vercel.app");
  });

  test("case study renders chapter content and at-a-glance rail", async ({
    page,
  }) => {
    await page.goto("/work/mobile-banking-redesign");
    await expect(
      page.getByRole("heading", { name: "The problem" })
    ).toBeVisible();
    await expect(page.getByText("At a glance", { exact: true })).toBeVisible();
  });
});

test.describe("prototype pages", () => {
  for (const slug of CONCEPTUAL_SLUGS) {
    test(`${slug} prototype page renders`, async ({ page }) => {
      await page.goto(`/work/${slug}/prototype`);
      await expect(page.getByRole("heading", { level: 1 })).not.toBeEmpty();
      await expect(
        page.getByText("Interactive concept · not a live product")
      ).toBeVisible();
    });
  }
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
  });
});
