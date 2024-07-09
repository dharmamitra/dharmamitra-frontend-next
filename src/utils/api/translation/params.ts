import { TranslationApiTypes } from "@/api"
import { exhaustiveStringTuple } from "@/utils/typescript"

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

export type TargetLanguage =
  TranslationApiTypes.Schema["TargetLanguageExperimental"] &
    keyof Messages["translation"]["targetLanguages"]
export const allTargetLanguages: TargetLanguage[] = exhaustiveStringTuple<
  TranslationApiTypes.Schema["TargetLanguageExperimental"]
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

export const translationParamsNames: TranslationApiTypes.TranslationParamNames =
  {
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
