import { DMApiTypes } from "@/api"
import { exhaustiveStringTuple } from "@/utils/typescript"

import { CommonStreamParams } from "./types"

export type InputEncoding = DMApiTypes.Schema["InputEncoding"] &
  keyof Messages["commonStreamParams"]["encodings"]
export const inputEncodings: InputEncoding[] = exhaustiveStringTuple<
  DMApiTypes.Schema["InputEncoding"]
>()("auto", "dev", "hk", "iast", "tibetan", "wylie")

export type TranslationModel = DMApiTypes.Schema["TranslationModel"] &
  keyof Messages["translation"]["models"]
export const translationModels: TranslationModel[] = exhaustiveStringTuple<
  DMApiTypes.Schema["TranslationModel"]
>()("NO", "madlad", "llama3")

export type TargetLanguage = DMApiTypes.Schema["TargetLanguageExperimental"] &
  keyof Messages["translation"]["targetLanguages"]
export const allTargetLanguages: TargetLanguage[] = exhaustiveStringTuple<
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

export type SearchDataTarget = DMApiTypes.Schema["SearchTarget"] &
  keyof Messages["search"]["targets"]
export const searchDataTargets: SearchDataTarget[] = exhaustiveStringTuple<
  DMApiTypes.Schema["SearchTarget"]
>()("parallel_data", "primary", "secondary")

export const disabledSearchDataTargets = ["primary", "secondary"]

// TODO: update with new query param
export type PrimaryDataTargetLanguage =
  keyof Messages["search"]["primaryLanguages"]
export const primaryDataTargetLanguages: PrimaryDataTargetLanguage[] = [
  "san",
  "tib",
  "chn",
  "pli",
]

export type ParallelDataTargetLanguage =
  keyof Messages["search"]["parallelLanguages"]
export const tempParallelDataTargetLanguages: ParallelDataTargetLanguage[] = [
  "tib-chn",
  "tib-eng",
  "san-eng",
  "san-tib",
]

export type DataTargetLanguage =
  | PrimaryDataTargetLanguage
  | ParallelDataTargetLanguage

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
