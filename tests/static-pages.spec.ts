import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"

import { basePath, defaultLocale, pathnames, supportedLocales } from "@/config"
import { Messages } from "@/i18n"

import boMessages from "../messages/bo.json"
import enMessages from "../messages/en.json"
import zhMessages from "../messages/zh.json"

const messages = {
  en: enMessages,
  bo: boMessages,
  zh: zhMessages,
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
        const pageMessages = messages[locale][messagePaths[key]]
        // TODO: title
        // await expect(page).toHaveTitle(pageMessages.title)
        await expect(page.locator("h1")).toContainText(pageMessages.h1)
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
