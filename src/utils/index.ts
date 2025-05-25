import { inputEncodings } from "@/utils/api/global/params"
import { InputEncoding } from "@/utils/api/global/types"
import {
  allTargetLanguages,
  TargetLanguage,
} from "@/utils/api/translation/params"

export { awaitedTryCatch, tryCatch } from "@/utils/try-catch"

export const getSettingPriotiryGroups = <T>(params: {
  setting: T[]
  noOfPrimaryItems: number
}): [T[], T[]] => {
  const { setting, noOfPrimaryItems } = params
  return [setting.slice(0, noOfPrimaryItems), setting.slice(noOfPrimaryItems)]
}

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

export const formatDate = ({
  date,
  locale,
  options,
}: {
  date: string
  locale: string
  options?: Intl.DateTimeFormatOptions
}) =>
  new Intl.DateTimeFormat(locale === "en" ? "en-GB" : locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  }).format(new Date(date))

export const saveAsTxtFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link) // Required for Firefox
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
