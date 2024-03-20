import { expect, test } from "@playwright/test"

import { basePath } from "@/config"

test.describe("search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(basePath)
  })

  test("should have a h1", async ({ page }) => {
    await expect(page.locator("h1")).toContainText(/Welcome/)
  })

  // test("advanced search mode option should be visible", async ({ page }) => {
  // "bilingual search spec:" https://docs.google.com/document/d/1ZKQpER4vS4XjSU-fMHxCCi5AXFtR8lpbdeTExpLpDrs/edit
  // A sort of ‘advanced mode’ for the main search function sounds like a good idea. There should be some switch/filter option ‘search only in bilingual aligned reference data’ or the like. Also the presentation of the results should be slightly different as described above.
  //  I agree that this is a specific feature that will only be interesting to a certain group of ‘pro users’, that is to say translators and researchers, not the general public initially.
  // })
})
