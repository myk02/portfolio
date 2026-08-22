import { expect, test } from "@playwright/test";

const LIVE_SLUGS = ["kenyatrace", "gigi-energy"];

test.describe("home page", () => {
  test("renders engineering-led hero with primary CTAs", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", e => errors.push(e.message));

    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        name: "I build reliable web products from design to deployment.",
      })
    ).toBeVisible();
    await expect(
      page.getByText("Web Developer · Frontend Engineer · Nairobi, Kenya")
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "View live work" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Download CV" }).first()
    ).toHaveAttribute("href", "/CV.pdf");

    await expect(
      page.getByText("Live products", { exact: true }).first()
    ).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("shows exactly the two live projects with real screenshots", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("link", { name: /KenyaTrace — case study/i })
    ).toBeVisible();
    await expect(page.getByText("Live production", { exact: true })).toHaveCount(2);
    await expect(page.getByText("Concept study")).toHaveCount(0);

    // Distinct descriptive links per tile
    await expect(page.getByRole("link", { name: /^Case study$/ })).toHaveCount(2);
    await expect(page.getByRole("link", { name: /^Live site/ })).toHaveCount(2);

    // Real screenshots in tiles (desktop + phone per project)
    const tileImages = page.locator('a[aria-label*="case study"] img');
    await expect(tileImages).toHaveCount(4);
  });

  test("compact evidence section renders five proof cards", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#engineering");
    for (const card of [
      "Frontend",
      "APIs & data",
      "Testing",
      "Delivery",
      "A11y & security",
    ]) {
      await expect(section.getByRole("heading", { name: card })).toBeVisible();
    }
  });
});

test.describe("work page", () => {
  test("lists only the live projects with distinct links", async ({ page }) => {
    await page.goto("/work");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Work");

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
      // Live out-link
      const liveLink = page.getByRole("link", { name: /View live product/ });
      await expect(liveLink.first()).toBeVisible();
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
      await expect(page.getByText("404")).toBeVisible();
    }
  });

  test("document titles reflect positioning", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Web Developer & Frontend Engineer/);
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
