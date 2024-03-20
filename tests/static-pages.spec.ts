import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

import { basePath, defaultLocale, pathnames, supportedLocales } from "@/config"

Object.keys(pathnames).forEach((pathname) => {
  supportedLocales.forEach((locale) => {
    const route = [basePath, locale === defaultLocale ? "" : locale, pathname]
      .filter(Boolean)
      .join("/")
      .replace(/\/{2,}/g, "/")
      .replace(/\/$/, "")

    test.describe(`\`${route}\` route`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(route)
      })

      test("renders page content", async ({ page }) => {
        await expect(page).toHaveScreenshot(
          `${route.slice(1).replace(/\//g, "-")}.png`,
          {
            fullPage: true,
            maxDiffPixelRatio: 0.8,
          },
        )
      })
      test(`has no auto-detected accessibility violations`, async ({
        page,
      }) => {
        const accessibilityScanResults = await new AxeBuilder({
          page,
        }).analyze()
        expect(accessibilityScanResults.violations).toEqual([])
      })
    })
  })
})
