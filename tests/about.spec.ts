import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

test.describe("about page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dmnext/about")
  })

  test("has core content", async ({ page }) => {
    // await expect(page).toHaveTitle(/About/)
    await expect(page.locator("h1")).toContainText(/About/)
  })

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })
})
