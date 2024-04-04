import type { components } from "@/lib/api/v1.d"
import { exhaustiveStringTuple } from "@/utils/typescript"

import { type SearchRequestProps } from "./search"
import { type TranslationRequestProps } from "./translation"

export type InputEncoding = components["schemas"]["InputEncoding"]
export type ModelName = components["schemas"]["ModelName"]
export type TargetLanguage = components["schemas"]["TargetLanguage"]
export type APIParamsNames = {
  search: Record<keyof SearchRequestProps, keyof SearchRequestProps>
  translation: Record<
    keyof TranslationRequestProps,
    keyof TranslationRequestProps
  >
}

export type InputEncodingParamMap = Record<string, InputEncoding>

export const inputEncodings: InputEncodingParamMap = {
  auto: "auto",
  dev: "dev",
  roman: "auto",
  hk: "hk",
  velthuis: "velthuis",
  itrans: "itrans",
  tibetan: "auto",
  wylie: "wylie",
} as const

export const modelNames = exhaustiveStringTuple<ModelName>()(
  "NO",
  "ANALYZE",
  "GPT4TRANSLATE",
)

export type ServedTargetLanguage = Exclude<TargetLanguage, "pali">
export const targetLanguages = exhaustiveStringTuple<ServedTargetLanguage>()(
  "english",
  "sanskrit",
  "tibetan",
  "chinese",
  "korean",
  "japanese",
)

export const apiParamsNames: APIParamsNames = {
  search: {
    search_input: "search_input",
  },
  translation: {
    input_sentence: "input_sentence",
    input_encoding: "input_encoding",
    level_of_explanation: "level_of_explanation",
    target_lang: "target_lang",
    model: "model",
  },
}
