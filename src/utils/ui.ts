import { globalParams } from "@/api"
import {
  allTargetLanguages,
  TargetLanguage,
} from "@/utils/api/translation/params"

export const getSettingPriotiryGroups = <T>(params: {
  setting: T[]
  noOfPrimaryItems: number
}): [T[], T[]] => {
  const { setting, noOfPrimaryItems } = params
  return [setting.slice(0, noOfPrimaryItems), setting.slice(noOfPrimaryItems)]
}

export const getValidDefaultValue = <T>(value: T) => {
  if (value === undefined) {
    throw new Error("a default param value is undefined")
  }
  return value
}

type OptionI18nKeyPath =
  | `globalParams.encodings.${keyof Messages["globalParams"]["encodings"]}`
  | `translation.targetLanguages.${keyof Messages["translation"]["targetLanguages"]}`

export const getOptionI18nKeyPath = (
  option: globalParams.InputEncoding | TargetLanguage | undefined,
) => {
  if (
    globalParams.inputEncodings.includes(option as globalParams.InputEncoding)
  )
    return `globalParams.encodings.${option}` as OptionI18nKeyPath
  if (allTargetLanguages.includes(option as TargetLanguage))
    return `translation.targetLanguages.${option}` as OptionI18nKeyPath

  throw new Error("Invalid InputEncoding, or TargetLanguage option")
}
