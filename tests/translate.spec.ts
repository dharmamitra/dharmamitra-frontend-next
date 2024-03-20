import { expect, test } from "@playwright/test"

import { basePath } from "@/config"

test.describe("main app functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(basePath)
  })

  test("search and translate tab buttons are visible", async ({ page }) => {
    // TODO: this is a dummy test
    await expect(page.locator("h1")).toContainText(/Welcome/)
  })
})
