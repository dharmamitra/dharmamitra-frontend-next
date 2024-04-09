import { expect, test } from "@playwright/test"

import { basePath } from "@/config"
import {
  apiParamsNames,
  // TODO: encoding tests have been temporarily commented pending API param updates
  // inputEncodings,
  // targetLanguages,
} from "@/utils/api/params"
import { translationRequests } from "@/utils/tests"
import {} from // getSettingPriotiryGroups,
// otherEncodingOptions,
// primaryEncodingOptions,
"@/utils/ui"

import enMessages from "../messages/en.json"

const {
  translation: {
    translate: translateMsg,
    // encodings: encodingsMsgs,
    // targetLanguages: targetLanguagesMsgs,
  },
} = enMessages

// const [primaryLanguageOptions, otherLanguageOptions] = getSettingPriotiryGroups(
//   {
//     setting: targetLanguages,
//     noOfPrimaryItems: 3,
//   },
// )

test.describe("main features functionality", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(basePath)
  })

  test("translation box renders correctly", async ({ page }) => {
    await expect(page.getByTestId("translation-input")).toBeVisible()
    await expect(page.getByRole("button", { name: translateMsg })).toBeVisible()
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
    await page.getByRole("button", { name: translateMsg }).click()
    await page.waitForTimeout(200)
    await expect(page.getByTestId("translation-loading")).toBeVisible()
  })

  /**
   * TODO: redraft translation feature tests following page updates.
   */

  // test("primary input encoding selector updates query params correctly", async ({
  //   page,
  // }) => {
  //   const inputEncodingsSelector = page.getByTestId("input-encoding-selector")

  //   for (const option of primaryEncodingOptions) {
  //     const encodingParamTest = new RegExp(
  //       `.*${apiParamsNames.translation.input_encoding}=${inputEncodings[option]}`,
  //       "i",
  //     )

  //     if (option === inputEncodings.auto) {
  //       //TODO: update to check auto is in param once BE has de-multi-mapped option->param
  //       // await expect(page).toHaveURL(encodingParamTest)
  //       continue
  //     }

  //     // `getByText` is used as the selector's radio buttons have been visually hidden for custom styling and are not clickable (`getByText` uses the `value` attribute for buttons: https://playwright.dev/docs/api/class-framelocator#frame-locator-get-by-text).
  //     const optionBtn = inputEncodingsSelector.getByText(option)
  //     await expect(optionBtn).toBeVisible()
  //     await optionBtn.click()
  //     await expect(page).toHaveURL(encodingParamTest)
  //   }
  // })

  // test("secondary input encoding selector updates query params correctly", async ({
  //   page,
  // }) => {
  //   for (const option of otherEncodingOptions) {
  //     const encodingParamTest = new RegExp(
  //       `.*${apiParamsNames.translation.input_encoding}=${inputEncodings[option]}`,
  //       "i",
  //     )
  //     const optionBtn = page.getByRole("option", {
  //       name: encodingsMsgs[option as keyof typeof encodingsMsgs],
  //     })
  //     await page.getByTestId("other-input-encoding-options").click()
  //     await expect(optionBtn).toBeVisible()
  //     await optionBtn.click()
  //     await expect(page).toHaveURL(encodingParamTest)
  //   }
  // })

  // test("primary target language selector updates query params correctly", async ({
  //   page,
  // }) => {
  //   const targetLangSelector = page.getByTestId("target-language-selector")

  //   for (const option of primaryLanguageOptions) {
  //     const encodingParamTest = new RegExp(
  //       `.*${apiParamsNames.translation.target_lang}=${option}`,
  //       "i",
  //     )

  //     if (option === primaryLanguageOptions[0]) {
  //       await expect(page).toHaveURL(encodingParamTest)
  //       continue
  //     }

  //     // see `getByText` comment for: primary input encoding selector
  //     const optionBtn = targetLangSelector.getByText(option)
  //     await expect(optionBtn).toBeVisible()
  //     await optionBtn.click()
  //     await expect(page).toHaveURL(encodingParamTest)
  //   }
  // })

  // test("secondary target language selector updates query params correctly", async ({
  //   page,
  // }) => {
  //   for (const option of otherLanguageOptions) {
  //     const encodingParamTest = new RegExp(
  //       `.*${apiParamsNames.translation.target_lang}=${option}`,
  //       "i",
  //     )
  //     const optionBtn = page.getByRole("option", {
  //       name: targetLanguagesMsgs[option as keyof typeof targetLanguagesMsgs],
  //     })
  //     await page.getByTestId("other-target-language-options").click()
  //     await expect(optionBtn).toBeVisible()
  //     await optionBtn.click()
  //     await expect(page).toHaveURL(encodingParamTest)
  //   }
  // })
})
