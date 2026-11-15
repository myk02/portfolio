import { expect, test } from "@playwright/test";
// Single source of truth: slugs live in client/src/data/projects.ts
import { projects } from "../client/src/data/projects";

const LIVE_SLUGS = projects.map(s => s.slug);
const LIVE_PROJECTS = projects.filter(p => p.liveUrl);

test.describe("home page", () => {
  test("renders the hero with primary CTAs", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", e => errors.push(e.message));

    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Mike Waitindi"
    );
    await expect(
      page.getByText(
        "AI Automation · Payments Integration · Marketing · Software Testing"
      )
    ).toBeVisible();

    const hero = page.locator("#home");
    await expect(
      hero.getByRole("button", { name: "View work" })
    ).toBeVisible();
    await expect(
      hero.getByRole("button", { name: /buy me a coffee/i })
    ).toBeVisible();
    await expect(hero.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "mailto:mikegary201@gmail.com"
    );
    await expect(page.getByRole("button", { name: "Download CV" })).toHaveCount(
      0
    );

    // Capabilities live in #skills
    await expect(
      page.locator("#skills").getByRole("heading", { name: "What I do" })
    ).toBeVisible();
    await expect(
      page
        .locator("#skills")
        .getByRole("heading", { name: "Software Development" })
    ).toBeVisible();
    await expect(
      page.locator("#skills").getByRole("heading", { name: "FinTech & Payments" })
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: "github.com/myk02", exact: true })
    ).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("shows every project, linking live ones straight to their sites", async ({
    page,
  }) => {
    await page.goto("/");

    const workGrid = page.locator("#work");
    for (const p of projects) {
      await expect(
        workGrid.getByRole("heading", { name: p.name })
      ).toBeVisible();
    }

    // Cards link out to the live product sites — no internal case-study pages.
    const hrefs = await workGrid
      .locator('a[href^="https://"]')
      .evaluateAll(els =>
        Array.from(new Set(els.map(el => el.getAttribute("href"))))
      );
    for (const p of LIVE_PROJECTS) expect(hrefs).toContain(p.liveUrl);

    const tileImages = workGrid.locator('a[href^="https://"] img');
    await expect(tileImages).toHaveCount(LIVE_PROJECTS.length);
  });
});

test.describe("project data — single source, unique screens", () => {
  test("tile, hero, decisions, and gallery never repeat a src", async () => {
    for (const p of projects) {
      const srcs = [
        p.tileShot,
        p.hero.src,
        ...p.decisions.filter(d => d.shot).map(d => d.shot as string),
        ...p.screens.map(s => s.src),
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
  test("lists the live projects linking straight out", async ({ page }) => {
    await page.goto("/work");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Selected projects"
    );

    for (const p of projects) {
      await expect(
        page.getByRole("heading", { name: p.name })
      ).toBeVisible();
    }

    await expect(
      page.getByRole("link", { name: /KenyaTrace — open demo/i })
    ).toHaveAttribute("href", "https://kenyatrace.vercel.app");
    await expect(
      page.getByRole("link", { name: "Visit site" }).first()
    ).toHaveAttribute("href", "https://kenyatrace.vercel.app");
  });
});

test.describe("removed case-study pages", () => {
  test("per-project subpages no longer exist — cards link out instead", async ({
    page,
  }) => {
    for (const slug of LIVE_SLUGS) {
      await page.goto(`/work/${slug}`);
      await expect(page.getByText("404").first()).toBeVisible();
    }
  });

  test("removed conceptual studies still 404", async ({ page }) => {
    for (const slug of [
      "mobile-banking-redesign",
      "dashboard-ui-system",
      "design-system-creation",
    ]) {
      await page.goto(`/work/${slug}`);
      await expect(page.getByText("404").first()).toBeVisible();
    }
  });

  test("document title reflects current positioning", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Software Developer/);
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
    await expect(page.locator("#email")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
    await expect(page.locator("#message")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  test("clears the invalid state once the field is edited", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");

    await page.locator("#name").fill("QA Reviewer");
    await expect(page.locator("#name")).not.toHaveAttribute(
      "aria-invalid",
      "true"
    );
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
