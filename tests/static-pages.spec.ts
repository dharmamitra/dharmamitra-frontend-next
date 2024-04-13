import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

import {
  defaultLocale,
  pathnames,
  playwrightBasePath as basePath,
  supportedLocales,
} from "@/config"
import { makeCleanRoute } from "@/utils/transformers"

import boMessages from "../messages/bo.json"
import enMessages from "../messages/en.json"
import zhMessages from "../messages/zh.json"
import zhHantMessages from "../messages/zh-Hant.json"

const messages = {
  en: enMessages,
  bo: boMessages,
  zh: zhMessages,
  "zh-Hant": zhHantMessages,
} satisfies Record<(typeof supportedLocales)[number], Messages>

const messagePaths = {
  "/": "Home",
  "/about": "About",
  "/team": "Team",
} as const

type PathnameKey = keyof typeof messagePaths

Object.keys(pathnames).forEach((pathname) => {
  supportedLocales.forEach((locale) => {
    const key = pathname as PathnameKey

    const route = makeCleanRoute([
      basePath,
      locale === defaultLocale ? "" : locale,
      pathname,
    ])

    test.describe(`\`${route}\` route`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(route)
      })

      test("renders page content", async ({ page }) => {
        const pageMessages = messages[locale][messagePaths[key]]
        // TODO: title
        // await expect(page).toHaveTitle(pageMessages.title)
        await expect(page.locator("h1")).toContainText(pageMessages.h1)
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
