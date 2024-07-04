import {
  allTargetLanguages,
  TargetLanguage,
  TranslationInputEncoding,
  translationInputEncodings,
} from "@/utils/api/translation/params"

export const linkAttrs = {
  color: "secondary",
  target: "_blank",
  rel: "noopener noreferrer",
}

export const localStorageKeys = {
  view: "view-tab",
  searchMode: "advanced-search-mode",
}

export const getSettingPriotiryGroups = <T>(params: {
  setting: T[]
  noOfPrimaryItems: number
}): [T[], T[]] => {
  const { setting, noOfPrimaryItems } = params
  return [setting.slice(0, noOfPrimaryItems), setting.slice(noOfPrimaryItems)]
}

export const getValidDefaultValue = <T>(value: T) => {
  if (value === undefined) {
    throw new Error("default input encoding is undefined")
  }
  return value
}

type OptionI18nKeyPath =
  | `commonStreamParams.encodings.${keyof Messages["commonStreamParams"]["encodings"]}`
  | `translation.targetLanguages.${keyof Messages["translation"]["targetLanguages"]}`

export const getOptionI18nKeyPath = (
  option: TranslationInputEncoding | TargetLanguage | undefined,
) => {
  if (translationInputEncodings.includes(option as TranslationInputEncoding))
    return `commonStreamParams.encodings.${option}` as OptionI18nKeyPath
  if (allTargetLanguages.includes(option as TargetLanguage))
    return `translation.targetLanguages.${option}` as OptionI18nKeyPath

  throw new Error("Invalid TranslationInputEncoding, or TargetLanguage option")
}
