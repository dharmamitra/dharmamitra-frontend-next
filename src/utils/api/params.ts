import { DMApiTypes } from "@/api"
import { exhaustiveStringTuple } from "@/utils/typescript"

import { CommonStreamParams } from "./types"

export const inputEncodings = exhaustiveStringTuple<
  DMApiTypes.Schema["InputEncoding"]
>()("auto", "dev", "hk", "iast", "tibetan", "wylie")

export const translationModels = exhaustiveStringTuple<
  DMApiTypes.Schema["TranslationModel"]
>()("NO", "madlad", "llama3")

export const allTargetLanguages = exhaustiveStringTuple<
  DMApiTypes.Schema["TargetLanguageExperimental"]
>()(
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

export const grammarModes = exhaustiveStringTuple<
  DMApiTypes.Schema["GrammarModes"]
>()(
  "lemma",
  "lemma-morphosyntax",
  "unsandhied-lemma-morphosyntax",
  "unsandhied",
  "unsandhied-morphosyntax",
)

export const primaryFilterLanguages = exhaustiveStringTuple<
  DMApiTypes.Schema["FilterLanguage"]
>()("english", "tibetan", "sanskrit", "buddhist-chinese", "pali")

// TODO: update with new query param
export const searchDataSources: (keyof Messages["search"]["sources"])[] = [
  "primary",
  "secondary",
  "parallels",
]

export const apiParamsNames: DMApiTypes.ParamNames & CommonStreamParams = {
  commonStreamParams: {
    input_encoding: "input_encoding",
  },
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
    human_readable_tags: "human_readable_tags",
  },
}
