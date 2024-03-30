import type { components } from "@/lib/api/v1.d"

import { extractSSEContent } from "../transformers"

const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/translation/`

export type TranslationRequestProps =
  components["schemas"]["Body_translation_translation__post"]

const makeTranslationQuery = async (
  requestBody: TranslationRequestProps,
): Promise<string[]> => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })

  const reader = response.body?.getReader()
  const decoder = new TextDecoder("utf-8")

  const data = []

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { value, done } = (await reader?.read()) ?? {}
    if (done) break
    data.push(extractSSEContent(decoder.decode(value)))
  }

  return data ?? []
}

export default makeTranslationQuery
