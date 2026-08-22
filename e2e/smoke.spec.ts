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

    // Primary actions
    await expect(
      page.getByRole("button", { name: "View live work" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "See engineering evidence" })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Download CV" }).first()
    ).toHaveAttribute("href", "/CV.pdf");

    // Honest, compact stats
    await expect(
      page.getByText("Live products", { exact: true }).first()
    ).toBeVisible();
    await expect(
      page.getByText("e2e tests passing", { exact: true }).first()
    ).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("shows exactly the two live projects with real screenshots and labels", async ({
    page,
  }) => {
    await page.goto("/");

    // Featured tile is KenyaTrace
    await expect(
      page.getByRole("link", { name: /KenyaTrace — read the case study/i })
    ).toBeVisible();

    // Exactly 2 live badges, no concept-study leftovers
    await expect(page.getByText("Live production", { exact: true })).toHaveCount(2);
    await expect(page.getByText("Concept study")).toHaveCount(0);

    // Descriptive links + external live-site links
    await expect(page.getByText(/Read the case study/)).toHaveCount(2);
    await expect(
      page.getByRole("link", { name: /Open kenyatrace\.vercel\.app/ })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Open gigiflavours\.vercel\.app/ })
    ).toBeVisible();

    // Tiles render real screenshots (not code-art placeholders)
    const tileImages = page.locator('a[aria-label*="read the case study"] img');
    await expect(tileImages).toHaveCount(4); // desktop + phone per tile
  });

  test("compact evidence section renders five proof cards", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#engineering");
    await expect(section).toBeAttached();
    await expect(
      section.getByRole("heading", { name: "Proof, not claims" })
    ).toBeVisible();
    for (const card of [
      "Frontend",
      "APIs & data",
      "Testing & quality",
      "Delivery",
      "Accessibility & security",
    ]) {
      await expect(section.getByRole("heading", { name: card })).toBeVisible();
    }
  });
});

test.describe("work page", () => {
  test("lists only the live production projects", async ({ page }) => {
    await page.goto("/work");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Work");

    await expect(page.getByText("Live production (2)")).toBeVisible();
    await expect(page.getByText(/Concept studies/)).toHaveCount(0);

    const hrefs = await page
      .locator('a[href^="/work/"]:not([href*="prototype"])')
      .evaluateAll(els =>
        Array.from(new Set(els.map(el => el.getAttribute("href"))))
      );
    expect(hrefs.sort()).toEqual(LIVE_SLUGS.map(s => `/work/${s}`).sort());

    // External links are distinct from internal ones
    await expect(
      page.getByRole("link", { name: "Open live site" }).first()
    ).toHaveAttribute("href", "https://kenyatrace.vercel.app");
  });
});

test.describe("case study pages", () => {
  test("every case study shows a facts strip under the hero", async ({
    page,
  }) => {
    for (const slug of LIVE_SLUGS) {
      await page.goto(`/work/${slug}`);
      for (const label of ["Status", "Stack", "Scope", "Challenge", "Outcome"]) {
        await expect(
          page.getByText(label, { exact: true }).first()
        ).toBeVisible();
      }
      await expect(
        page.getByText(/kenyatrace\.vercel\.app|AA contrast/).first()
      ).toBeVisible();
    }
  });

  test("live product studies expose production engineering notes", async ({
    page,
  }) => {
    for (const slug of LIVE_SLUGS) {
      await page.goto(`/work/${slug}`);
      await expect(
        page.getByRole("heading", { name: "Engineering notes" })
      ).toBeVisible();
      await expect(
        page.getByText("Architecture & components").first()
      ).toBeVisible();
    }
  });

  test("live product studies link out to their shipped products", async ({
    page,
  }) => {
    await page.goto("/work/kenyatrace");
    const live = page.getByRole("link", { name: /View live product/ }).first();
    await expect(live).toHaveAttribute("href", "https://kenyatrace.vercel.app");
    await expect(
      page.locator("#chapter-ship").getByRole("link", { name: /View live product/ })
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
    await expect(page).toHaveTitle(/live production/);
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
