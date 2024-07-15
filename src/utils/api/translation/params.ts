import { defaultInputEncoding } from "@/utils/api/global/params"
import { exhaustiveStringTuple } from "@/utils/typescript"

import {
  Schema,
  TranslationParamDefaults,
  TranslationParamNames,
} from "./types"

type TEMPORARYLabTestingModels =
  | ""
  | "NO"
  | "madlad"
  | "madlad2"
  | "llama3"
  | "llama3-fgs"

// export type TranslationModel = TranslationApiTypes.Schema["TranslationModel"] &
//   keyof Messages["translation"]["models"]
export type TranslationModel = TEMPORARYLabTestingModels &
  keyof Messages["translation"]["models"]
export const translationModels: TranslationModel[] =
  exhaustiveStringTuple<TEMPORARYLabTestingModels>()(
    "",
    "NO",
    "madlad",
    "madlad2",
    "llama3",
    "llama3-fgs",
  )

export const defaultTranslationModel: TranslationModel = "llama3"

export type TargetLanguage = Schema["TargetLanguageExperimental"] &
  keyof Messages["translation"]["targetLanguages"]
export const allTargetLanguages: TargetLanguage[] = exhaustiveStringTuple<
  Schema["TargetLanguageExperimental"]
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
export const defaultTargetLanguage: TargetLanguage = "english"

export const translationParamsNames: TranslationParamNames = {
  common: {
    input_sentence: "input_sentence",
    input_encoding: "input_encoding",
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

export const allTranslationDefaultParams: TranslationParamDefaults = {
  input_encoding: defaultInputEncoding,
  target_lang: defaultTargetLanguage,
  model: defaultTranslationModel,
  do_grammar_explanation: false,
  human_readable_tags: true,
  mode: "unsandhied-lemma-morphosyntax",
}
