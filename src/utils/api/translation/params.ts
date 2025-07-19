import { defaultInputEncoding, globalParamsNames } from "@/utils/api/global/params"
import { exhaustiveStringTuple } from "@/utils/typescript"

import { Schema, TranslationParamNames } from "./types"

export type TargetLanguage = Schema["TargetLanguageExperimental"] &
  keyof Messages["translation"]["targetLanguages"]
export const allTargetLanguages: TargetLanguage[] = exhaustiveStringTuple<
  Schema["TargetLanguageExperimental"]
>()(
  "english",
  "english-explained",
  "english-deep-research",
  "tibetan",
  "sanskrit",
  "sanskrit-dev",
  "buddhist-chinese",
  "korean",
  "german",
  "russian",
  "french",
  "italian",
  "spanish",
  "portuguese",
  "dutch",
  "hindi",
  "japanese",
  "pali",
  "sanskrit-knn",
  "modern-chinese",
)

export type StableTargetLanguage = Schema["TargetLanguage"] &
  keyof Messages["translation"]["targetLanguages"]

export const stableTargetLanguages: StableTargetLanguage[] = exhaustiveStringTuple<
  Schema["TargetLanguage"]
>()(
  "english",
  "english-explained",
  "tibetan",
  "sanskrit",
  "sanskrit-dev",
  "buddhist-chinese",
  "modern-chinese",
  "russian",
  "korean",
  "japanese",
  "german",
  "french",
  "italian",
  "hindi",
  "spanish",
)

export const defaultTargetLanguage: TargetLanguage = "english"

// Map locales to their default target languages
export const getDefaultTargetLanguageForLocale = (locale: string): TargetLanguage => {
  const localeToTargetLanguage: Record<string, TargetLanguage> = {
    en: "english",
    hi: "hindi",
    ja: "japanese",
    "zh-Hans": "modern-chinese",
    "zh-Hant": "modern-chinese",
    ko: "korean",
    bo: "tibetan",
    de: "german",
  }
  
  return localeToTargetLanguage[locale] || "english"
}

export const defaultTranslationModel: Extract<Schema["TranslationModel"], "default"> = "default"

export const translationParamsNames: TranslationParamNames = {
  // common across all apis (translation & search)
  global: globalParamsNames,
  // common across translation api endpoints
  common: {
    input_sentence: "input_sentence",
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

export const allTranslationDefaultParams = {
  input_encoding: defaultInputEncoding,
  target_lang: defaultTargetLanguage,
  model: defaultTranslationModel,
  do_grammar_explanation: false,
  human_readable_tags: true,
  mode: "unsandhied-lemma-morphosyntax",
} as const
