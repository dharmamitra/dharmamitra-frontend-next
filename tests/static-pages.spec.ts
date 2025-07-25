import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

import { defaultLocale, SUPPORTED_LOCALES } from "@/i18n"
import { makeCleanRoute } from "@/utils/transformers"

// import enMessages from "../messages/en.json"
// import zhHansMessages from "../messages/zh-Hans .json"
// import zhHantMessages from "../messages/zh-Hant.json"
// import { getBasePath } from "../next.config.mjs"

// const messages = {
//   en: enMessages,
//   "zh-Hans": zhMessages,
//   "zh-Hant": zhHantMessages,
// } satisfies Record<(typeof SUPPORTED_LOCALES)[number], Messages>

const pathnames = {
  "/": "Home",
  "/about": "About",
  "/team": "Team",
} as const

Object.entries(pathnames).forEach(([pathname /*pagename */]) => {
  SUPPORTED_LOCALES.forEach((locale) => {
    const route = makeCleanRoute([
      // getBasePath(),
      locale === defaultLocale ? "" : locale,
      pathname,
    ])

    test.describe(`\`${route}\` route`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(route)
      })

      test("renders page content", async ({ page }) => {
        // TODO: title
        // const pageMessages = messages[locale][pagename]
        // await expect(page).toHaveTitle(pageMessages.title)
        await expect(page.locator("h1")).toBeVisible()
      })
      test(`has no auto-detected accessibility violations`, async ({
        page,
      }) => {
        await page.waitForTimeout(1000)
        const accessibilityScanResults = await new AxeBuilder({
          page,
        })
          // TODO: the current client inititalization handling triggers a false positive error that does not affect the user (a loading opacity is set and removed on hydration). However, client state initialization needs to be refactored anyway and the problem with this test should be resolved automatically. It can be reinstated after the refactor.
          .disableRules(["color-contrast"])
          .analyze()

        expect(accessibilityScanResults.violations).toEqual([])
      })
    })
  })
})
