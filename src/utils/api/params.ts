import { exhaustiveStringTuple } from "@/utils/typescript"

import {
  APIParamNames,
  InputEncoding,
  TargetLanguage,
  TranslationModel,
} from "./types"

export const inputEncodings = exhaustiveStringTuple<InputEncoding>()(
  "auto",
  "dev",
  "hk",
  "iast",
  "tibetan",
  "wylie",
)

export const translationModels = exhaustiveStringTuple<TranslationModel>()(
  "NO",
  "none",
  "madlad",
  "llama3",
)

export const allTargetLanguages = exhaustiveStringTuple<TargetLanguage>()(
  "english",
  "tibetan",
  "sanskrit",
  "sanskrit-dev",
  "sanskrit-knn",
  "modern-chinese",
  "buddhist-chinese",
  "japanese",
  "korean",
  "pali",
)

export const apiParamsNames: APIParamNames = {
  search: {
    filter_language: "filter_language",
    filter_primary: "filter_primary",
    filter_secondary: "filter_secondary",
    input_encoding: "input_encoding",
    postprocess_model: "postprocess_model",
    search_input: "search_input",
    search_target: "search_target",
    search_type: "search_type",
  },
  translation: {
    input_sentence: "input_sentence",
    input_encoding: "input_encoding",
    do_grammar_explanation: "do_grammar_explanation",
    target_lang: "target_lang",
    model: "model",
  },
  tagging: {
    input_sentence: "input_sentence",
    input_encoding: "input_encoding",
    mode: "mode",
  },
}
