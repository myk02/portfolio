import { expect, test } from "@playwright/test";

/**
 * Partner & Proposal Intelligence Assistant — review-flow gate (mock mode).
 * Additive spec: existing suites are untouched.
 */

test.describe("ai-solutions page", () => {
  test("renders intro, skills, and demo form", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.goto("/ai-solutions");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Tools that read"
    );
    await expect(
      page.getByText("AI Solutions & Automation").first()
    ).toBeVisible();
    await expect(page.locator("#demo-heading")).toBeVisible();
    await expect(page.getByLabel("Funding call / request text")).toBeVisible();
    await expect(
      page.getByLabel("Partner / organisation profile")
    ).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("review flow: analyze sample, approve all, export simulated", async ({
    page,
  }) => {
    await page.goto("/ai-solutions");
    await page.getByRole("button", { name: "Load sample" }).click();
    await page.getByRole("button", { name: "Analyze", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Deadline" })).toBeVisible();
    await expect(page.getByText(/per 1,000/).first()).toBeVisible();

    // Export locked until every field is approved.
    const exportBtn = page.getByRole("button", {
      name: "Export approved summary",
    });
    await expect(exportBtn).toBeDisabled();
    for (const name of [
      "Deadline",
      "Eligibility rules",
      "Required documents",
      "Budget range",
      "Key requirements",
      "Fit assessment",
    ]) {
      await page
        .getByText(name, { exact: true })
        .first()
        .scrollIntoViewIfNeeded();
    }
    const boxes = page.getByLabel("Approve this field");
    await expect(boxes).toHaveCount(6);
    for (let i = 0; i < 6; i++) await boxes.nth(i).check();
    await expect(exportBtn).toBeEnabled();
    await exportBtn.click();
    await expect(
      page.getByText(/Export is OFF in this demo/).first()
    ).toBeVisible();
  });

  test("attack sample is flagged and fit is capped", async ({ page }) => {
    await page.goto("/ai-solutions");
    await page.getByRole("button", { name: "Load attack sample" }).click();
    await page.getByRole("button", { name: "Analyze", exact: true }).click();
    await expect(page.getByRole("alert").first()).toContainText(
      /instruction-like text/i
    );
  });

  test("no horizontal overflow at 390px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/ai-solutions");
    const overflow = await page.evaluate(() => {
      const el = document.scrollingElement ?? document.documentElement;
      return el.scrollWidth - document.documentElement.clientWidth;
    });
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
