import {
  defaultTargetLanguage,
  TargetLanguage,
} from "@/utils/api/translation/params"

export const isTargetLanguage = (
  language: unknown,
  availableLanguages: TargetLanguage[],
): language is TargetLanguage =>
  Object.values(availableLanguages).some((item) => item === language)

export const getValidTargetLanguage = (
  language: unknown,
  availableLanguages: TargetLanguage[],
) => {
  return isTargetLanguage(language, availableLanguages)
    ? language
    : defaultTargetLanguage
}
