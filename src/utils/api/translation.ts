import type { components } from "@/lib/api/v1.d"

import apiClient from "./client"

export type TranslationRequestProps =
  components["schemas"]["Body_translation_translation__post"]

const makeTranslationQuery = async (requestBody: TranslationRequestProps) => {
  const { data } = await apiClient.POST("/translation/", {
    body: requestBody,
  })
  return data
}

export default makeTranslationQuery
