import { expect, test } from "@playwright/test";

/**
 * IT Support & Security page gate (additive spec: existing suites untouched).
 * Covers render, honesty labels (Template / Learning in progress), the
 * "How I secure this site" proof section, and the 390px viewport pass.
 */

test.describe("it-security page", () => {
  test("renders intro, skills, cases, proof, and templates", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/it-security");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Helpful support");
    await expect(page.getByText("IT Support & Security").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "What I have done" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Where I have done this" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "How I secure this site" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Security templates" })).toBeVisible();
    // Both real-work case studies present.
    await expect(page.getByText("Council of Legal Education").first()).toBeVisible();
    await expect(page.getByText("20+ polling stations").first()).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("templates and learning items are labelled honestly", async ({ page }) => {
    await page.goto("/it-security");
    await expect(page.getByText("Learning in progress").first()).toBeVisible();
    const templateLabels = await page.getByText(/Template · .*\.md/).count();
    expect(templateLabels).toBe(6);
    await expect(
      page.getByText("not records of work done for an employer").first()
    ).toBeVisible();
  });

  test("reachable from the header nav", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "IT Security" })
      .click();
    await expect(page).toHaveURL(/\/it-security/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("no horizontal overflow at 390px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/it-security");
    const overflow = await page.evaluate(() => {
      const el = document.scrollingElement ?? document.documentElement;
      return el.scrollWidth - document.documentElement.clientWidth;
    });
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
