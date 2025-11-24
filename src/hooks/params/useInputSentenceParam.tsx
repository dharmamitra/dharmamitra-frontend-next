import { useQueryState } from "nuqs"

import { parseAsMultiLineString } from "./parsers"

import { translationParamsNames } from "@/utils/api/translation/params"

const {
  common: { input_sentence },
} = translationParamsNames

export function useInputSentenceParam() {
  return useQueryState(input_sentence, {
    ...parseAsMultiLineString.withDefault(""),
  })
}
