import { expect, test } from "@playwright/test"

import { basePath } from "@/config"

test.describe("navigation", () => {
  test.beforeEach(async ({ page }) => await page.goto(basePath))

  test("should navigate to home page", async ({ page }) => {
    await page.getByRole("link", { name: "DHARMAMITRA" }).click()

    await expect(page).toHaveURL(basePath)
  })

  test("should navigate to about page", async ({ page }) => {
    await page.getByRole("link", { name: "About" }).click()

    await expect(page).toHaveURL(basePath + "/about")
  })

  test("should navigate to team page", async ({ page }) => {
    await page.getByRole("link", { name: "Team" }).click()

    await expect(page).toHaveURL(basePath + "/team")
  })
})
