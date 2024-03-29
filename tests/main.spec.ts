import { expect, test } from "@playwright/test"

import { basePath } from "@/config"

test.describe("search & translation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(basePath)
  })

  test("search and translation navigate to correct tabs", async ({ page }) => {
    await page.getByRole("tab", { name: /translation/i }).click()
    await expect(page).toHaveURL(/.*view=translation/)
    await expect(page.getByText(/Translate something/i)).toBeVisible()
    await page.getByRole("tab", { name: /search/i }).click()
    await expect(page).toHaveURL(/.*view=search/)
    await expect(page.getByPlaceholder("Search for something")).toBeVisible()
  })

  // search box
  // options toggle button & popover
  // placeholder options
  // search button
  // example search chips
  // sticky tabs & search box on scroll
  // results placeholder

  // test("advanced search mode option should be visible", async ({ page }) => {
  // "bilingual search spec:" https://docs.google.com/document/d/1ZKQpER4vS4XjSU-fMHxCCi5AXFtR8lpbdeTExpLpDrs/edit
  // A sort of ‘advanced mode’ for the main search function sounds like a good idea. There should be some switch/filter option ‘search only in bilingual aligned reference data’ or the like. Also the presentation of the results should be slightly different as described above.
  //  I agree that this is a specific feature that will only be interesting to a certain group of ‘pro users’, that is to say translators and researchers, not the general public initially.
  // })
})
