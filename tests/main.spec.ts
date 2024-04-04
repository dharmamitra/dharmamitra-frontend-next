import { expect, test } from "@playwright/test"

import { basePath } from "@/config"
import { apiParamsNames, inputEncodings } from "@/utils/api/params"
import { translationRequests } from "@/utils/tests"

import enMessages from "../messages/en.json"

const {
  translation: { encodings: encodingLabels, translateBtnLabel },
} = enMessages

test.describe("main features functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(basePath, { waitUntil: "networkidle" })
  })

  test("translation box renders correctly", async ({ page }) => {
    await expect(page.getByTestId("translation-input")).toBeVisible()
    await expect(
      page.getByRole("button", { name: translateBtnLabel }),
    ).toBeVisible()
    await expect(page.getByTestId("translation-results")).toBeVisible()
  })

  test("submits basic translation request", async ({ page, browserName }) => {
    test.skip(
      browserName === "webkit",
      "Playwright bug in `fill` method on webkit",
    )

    const translationRequest1 =
      translationRequests[
        Math.floor(Math.random() * translationRequests.length)
      ]!

    // This only checks the first word of the translation request is updated in the URL to avoid issues with differnt punctuation encodings given by Next.js and `encodeURI`
    const inputParamTest = new RegExp(
      `.*${apiParamsNames.translation.input_sentence}=${encodeURI(translationRequest1.split(" ")[0]!)}`,
      "i",
    )

    await page.getByTestId("translation-input").fill(translationRequest1)
    await expect(page).toHaveURL(inputParamTest)
    await page.getByRole("button", { name: translateBtnLabel }).click()
    await page.waitForTimeout(200)
    await expect(page.getByTestId("translation-loading")).toBeVisible()
  })

  test("input encoding selector updates query params correctly", async ({
    page,
  }) => {
    Object.entries(inputEncodings).forEach(([option, encoding]) => {
      const encodingParamTest = new RegExp(
        `.*${apiParamsNames.translation.input_encoding}=${encoding}`,
        "i",
      )
      page
        .getByTestId("encoding-selector")
        .getByRole("button", {
          name: encodingLabels[option as keyof typeof encodingLabels],
        })
        .click()
      expect(page).toHaveURL(encodingParamTest)
    })
  })
})
