import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
// Single source of truth: slugs live in client/src/data/projects.ts
import { projects } from "../client/src/data/projects";
import { proofVideos } from "../client/src/data/videos";

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
    const hero = page.locator("#home");
    await expect(
      hero.getByText("Founder · Cybersecurity · Marketing · Sales")
    ).toBeVisible();

    await expect(hero.getByRole("button", { name: "View work" })).toBeVisible();
    await expect(
      hero.getByRole("button", { name: /buy me a coffee/i })
    ).toHaveCount(0);
    await expect(hero.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "mailto:mikekagera1@gmail.com"
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
        .getByRole("heading", { name: "Cybersecurity & Systems Protection" })
    ).toBeVisible();
    await expect(
      page
        .locator("#skills")
        .getByRole("heading", { name: "Marketing & Content Creation" })
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

test.describe("proof videos", () => {
  test("landing page shows a short video teaser with thumbnails", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("#proof");
    await expect(
      section.getByRole("heading", { name: "Watch the work" })
    ).toBeVisible();

    await expect(section.getByRole("button", { name: /Play / })).toHaveCount(3);
    await expect(
      section.getByRole("link", { name: /View all \d+ videos/i })
    ).toBeVisible();

    const posters = await section.locator("img[alt='']").evaluateAll(els =>
      els.map(el => el.getAttribute("src"))
    );
    expect(posters).toEqual(proofVideos.slice(0, 3).map(v => v.poster));
  });

  test("videos page renders every proof video with a thumbnail", async ({
    page,
  }) => {
    await page.goto("/videos");
    await expect(
      page.getByRole("heading", { name: "Watch the work" })
    ).toBeVisible();

    await expect(page.locator("main button[aria-label^='Play ']")).toHaveCount(proofVideos.length);

    const posters = await page.locator("main img[alt='']").evaluateAll(els =>
      els.map(el => el.getAttribute("src"))
    );
    expect(posters).toEqual(proofVideos.map(video => video.poster));
  });

  test("video files and posters exist in public assets", () => {
    for (const video of proofVideos) {
      for (const asset of [video.src, video.poster]) {
        const file = path.join(
          process.cwd(),
          "client",
          "public",
          asset.replace(/^\//, "")
        );
        expect(fs.existsSync(file), `${asset} should exist`).toBe(true);
      }
    }
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
      await expect(page.getByRole("heading", { name: p.name })).toBeVisible();
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
    await expect(page).toHaveTitle(/Founder · Cybersecurity/);
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

  test("clears the invalid state once the field is edited", async ({
    page,
  }) => {
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

test.describe("buy me a coffee button removed", () => {
  test("footer and hero do not render buy-me-a-coffee button", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: /buy me a coffee/i })
    ).toHaveCount(0);
  });
});
