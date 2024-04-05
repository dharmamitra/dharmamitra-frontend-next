import { expect, test } from "@playwright/test"

import { basePath } from "@/config"
import { apiParamsNames, inputEncodings } from "@/utils/api/params"
import { translationRequests } from "@/utils/tests"
import {
  otherEncodingOptions,
  // encodingKeys,
  primaryEncodingOptions,
} from "@/utils/ui"

import enMessages from "../messages/en.json"

const {
  translation: { translateBtnLabel },
} = enMessages

test.describe("main features functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(basePath)
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

    // This only checks the first word of the translation request is updated in the URL to avoid issues with different punctuation encodings given by Next.js and `encodeURI`
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

  test("primary input encoding selector updates query params correctly", async ({
    page,
  }) => {
    for (const option of primaryEncodingOptions) {
      const encodingParamTest = new RegExp(
        `.*${apiParamsNames.translation.input_encoding}=${inputEncodings[option]}`,
        "i",
      )
      // `getByText` is used as the selector's radio buttons have been visually hidden for custom styling and are not clickable.
      const optionBtn = page.getByText(option)
      await expect(optionBtn).toBeVisible()
      await optionBtn.click()
      await expect(page).toHaveURL(encodingParamTest)
    }
  })

  test("secondary input encoding selector updates query params correctly", async ({
    page,
  }) => {
    for (const option of otherEncodingOptions) {
      const encodingParamTest = new RegExp(
        `.*${apiParamsNames.translation.input_encoding}=${inputEncodings[option]}`,
        "i",
      )
      const optionBtn = page.getByTestId(`${option}-input-encoding-option`)
      await page.getByTestId("other-input-encoding-options").click()
      await expect(optionBtn).toBeVisible()
      await optionBtn.click()
      await expect(page).toHaveURL(encodingParamTest)
    }
  })

  //   for (const [option, encoding] of Object.entries(inputEncodings)) {
  //     const encodingParamTest = new RegExp(
  //       `.*${apiParamsNames.translation.input_encoding}=${encoding}`,
  //       "i",
  //     )
  //     const optionBtn = page.getByTestId(`${option}-input-encoding-option`)
  //     await optionBtn.click()
  //     expect(page).toHaveURL(encodingParamTest)
  //   }
  // })
})
