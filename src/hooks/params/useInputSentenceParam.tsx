import { useQueryState } from "nuqs"

import { translationParamsNames } from "@/utils/api/translation/params"

import { parseAsMultiLineString } from "./parsers"

const {
  common: { input_sentence },
} = translationParamsNames

export function useInputSentenceParam() {
  return useQueryState(input_sentence, {
    ...parseAsMultiLineString.withDefault(""),
  })
}
