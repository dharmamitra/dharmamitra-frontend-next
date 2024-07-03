import { TranslationApiTypes } from "@/api"
import { exhaustiveStringTuple } from "@/utils/typescript"

export type InputEncoding = TranslationApiTypes.Schema["InputEncoding"] &
  keyof Messages["commonStreamParams"]["encodings"]
export const inputEncodings: InputEncoding[] = exhaustiveStringTuple<
  TranslationApiTypes.Schema["InputEncoding"]
>()("auto", "dev", "hk", "iast", "tibetan", "wylie")

export type TranslationModel = TranslationApiTypes.Schema["TranslationModel"] &
  keyof Messages["translation"]["models"]
export const translationModels: TranslationModel[] = exhaustiveStringTuple<
  TranslationApiTypes.Schema["TranslationModel"]
>()("", "NO", "madlad", "llama3", "llama3-fgs")

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
