import { inputEncodings } from "@/utils/api/global/params"
import { InputEncoding } from "@/utils/api/global/types"
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

// eslint-disable-next-line no-unused-vars
export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  callback: F,
  waitFor: number,
) {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => callback(...args), waitFor)
  }
}

type OptionI18nKeyPath =
  | `globalParams.encodings.${keyof Messages["globalParams"]["encodings"]}`
  | `translation.targetLanguages.${keyof Messages["translation"]["targetLanguages"]}`

export const getOptionI18nKeyPath = (
  option: InputEncoding | TargetLanguage | undefined,
) => {
  if (inputEncodings.includes(option as InputEncoding))
    return `globalParams.encodings.${option}` as OptionI18nKeyPath
  if (allTargetLanguages.includes(option as TargetLanguage))
    return `translation.targetLanguages.${option}` as OptionI18nKeyPath

  throw new Error("Invalid InputEncoding, or TargetLanguage option")
}
