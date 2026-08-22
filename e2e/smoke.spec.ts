import { expect, test } from "@playwright/test";

const CONCEPTUAL_SLUGS = [
  "mobile-banking-redesign",
  "dashboard-ui-system",
  "design-system-creation",
];

const ALL_SLUGS = ["kenyatrace", "gigi-energy", ...CONCEPTUAL_SLUGS];

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

    // Honest stats: 5 studies, 2 live, 3 concept
    await expect(
      page.getByText("Live products", { exact: true }).first()
    ).toBeVisible();
    await expect(
      page.getByText("Concept studies", { exact: true }).first()
    ).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("features a live product first and labels every card", async ({
    page,
  }) => {
    await page.goto("/");

    // Featured tile is KenyaTrace (live), not the conceptual banking study
    await expect(
      page.getByRole("link", { name: /KenyaTrace — read the case study/i })
    ).toBeVisible();

    // Status badges: exactly 2 "Live production", 3 "Concept study"
    // (exact match avoids counting the longer metadata lines)
    await expect(page.getByText("Live production", { exact: true })).toHaveCount(2);
    await expect(page.getByText("Concept study", { exact: true })).toHaveCount(3);

    // Every card exposes stack metadata and descriptive links
    await expect(page.getByText(/Read the case study/)).toHaveCount(5);
    await expect(page.getByRole("link", { name: /Open kenyatrace\.vercel\.app/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /Open gigiflavours\.vercel\.app/ })).toBeVisible();
  });

  test("engineering evidence section renders verified claim cards", async ({
    page,
  }) => {
    await page.goto("/");
    const section = page.locator("#engineering");
    await expect(section).toBeAttached();
    await expect(
      section.getByRole("heading", { name: "How I build, with proof" })
    ).toBeVisible();
    await expect(section.getByText("Verified in this repo")).toHaveCount(5);
  });
});

test.describe("work page", () => {
  test("groups live products before concept studies with status badges", async ({
    page,
  }) => {
    await page.goto("/work");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Work");

    await expect(page.getByText("Live production (2)")).toBeVisible();
    await expect(page.getByText("Concept studies (3)")).toBeVisible();

    // All five case-study pages are linked (excluding prototype routes)
    const studyLinks = page.locator('a[href^="/work/"]:not([href*="prototype"])');
    const hrefs = await studyLinks.evaluateAll(els =>
      Array.from(new Set(els.map(el => el.getAttribute("href"))))
    );
    expect(hrefs.sort()).toEqual(
      ALL_SLUGS.map(s => `/work/${s}`).sort()
    );

    // Concept cards offer their interactive prototypes distinctly
    for (const slug of CONCEPTUAL_SLUGS) {
      await expect(
        page.locator(`a[href="/work/${slug}/prototype"]`).first()
      ).toBeVisible();
    }
  });
});

test.describe("case study pages", () => {
  test("every case study shows a facts strip under the hero", async ({
    page,
  }) => {
    for (const slug of ALL_SLUGS) {
      await page.goto(`/work/${slug}`);
      for (const label of ["Status", "Stack", "Scope", "Challenge", "Outcome"]) {
        await expect(
          page.getByText(label, { exact: true }).first()
        ).toBeVisible();
      }
      // Outcome line carries real content, not a placeholder
      await expect(page.getByText(/kenyatrace\.vercel\.app|SUS|spec'd end-to-end|collapsed to 3|AA contrast/).first()).toBeVisible();
    }
  });

  test("live product studies expose production engineering notes", async ({
    page,
  }) => {
    for (const slug of ["kenyatrace", "gigi-energy"]) {
      await page.goto(`/work/${slug}`);
      await expect(
        page.getByRole("heading", { name: "Engineering notes" })
      ).toBeVisible();
      await expect(page.getByText("Architecture & components").first()).toBeVisible();
    }
  });

  test("conceptual studies carry clearly-labeled proposed implementation blocks", async ({
    page,
  }) => {
    for (const slug of CONCEPTUAL_SLUGS) {
      await page.goto(`/work/${slug}`);
      await expect(page.getByText("Proposed implementation")).toHaveCount(1);
      await expect(
        page.getByText(/not production evidence/i).first()
      ).toBeVisible();
    }
  });

  test("banking study includes honest engineering considerations", async ({
    page,
  }) => {
    await page.goto("/work/mobile-banking-redesign");
    await expect(
      page.getByRole("heading", { name: "Engineering considerations" })
    ).toBeVisible();
    await expect(
      page.getByText(/listed as proposals, not claims/i)
    ).toBeVisible();
  });

  test("conceptual prototype CTAs point to the in-site prototype", async ({
    page,
  }) => {
    for (const slug of CONCEPTUAL_SLUGS) {
      await page.goto(`/work/${slug}`);
      await expect(page.getByRole("heading", { level: 1 })).not.toBeEmpty();
      const prototypeLinks = page.locator('a[href*="prototype"]');
      await expect(prototypeLinks.first()).toBeVisible();
      for (const link of await prototypeLinks.all()) {
        const href = await link.getAttribute("href");
        expect(href).toBe(`/work/${slug}/prototype`);
      }
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

  test("renders chapter content and at-a-glance rail", async ({ page }) => {
    await page.goto("/work/mobile-banking-redesign");
    await expect(
      page.getByRole("heading", { name: "The problem" })
    ).toBeVisible();
    await expect(page.getByText("At a glance", { exact: true })).toBeVisible();
  });

  test("document titles reflect engineering-led positioning", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Web Developer & Frontend Engineer/);
    await page.goto("/work/kenyatrace");
    await expect(page).toHaveTitle(/live production/);
    await page.goto("/work/dashboard-ui-system");
    await expect(page).toHaveTitle(/concept study/);
  });
});

test.describe("prototype pages", () => {
  for (const slug of CONCEPTUAL_SLUGS) {
    test(`${slug} prototype keeps the not-a-live-product label and adds proof panel`, async ({
      page,
    }) => {
      await page.goto(`/work/${slug}/prototype`);
      await expect(page.getByRole("heading", { level: 1 })).not.toBeEmpty();
      await expect(
        page.getByText("Interactive concept · not a live product")
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "What this demonstrates" })
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
    // Error state is exposed to assistive tech
    await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");
  });
});
