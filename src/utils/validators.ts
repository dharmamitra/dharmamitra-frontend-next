import { Messages } from "@/app/types"
import * as searchParams from "@/utils/api/search/params"
import { Schema as SearchSchema } from "@/utils/api/search/types"
import { exhaustiveStringTuple } from "@/utils/typescript"

const {
  searchTypes,
  defaultSearchType,
  searchFilterLanguages,
  defaultSourceLanguage,
  searchTargets,
  defaultSearchTarget,
} = searchParams

export const getValidDefaultValue = <T>(value: T) => {
  if (value === undefined) {
    throw new Error("a default param value is undefined")
  }
  return value
}

export const getValidSearchTarget = (searchTarget: string | null) => {
  if (!searchTargets.some((value) => value === searchTarget)) {
    return defaultSearchTarget
  }
  return searchTarget as searchParams.SearchTarget
}

export const getValidSearchType = (searchType: string | null) => {
  if (!searchTypes.some((value) => value === searchType)) {
    return defaultSearchType
  }
  return searchType as searchParams.SearchType
}

type RelevanceTypes = SearchSchema["SummaryRespone"]["relevance"]
type Relevance = RelevanceTypes & keyof Messages["search"]["relevanceTypes"]
const relevanceTypes: Relevance[] = exhaustiveStringTuple<RelevanceTypes>()("low", "medium", "high")

export const getValidRelevance = (relevance: string) => {
  if (!relevanceTypes.some((value) => value === relevance)) {
    throw new Error(`Invalid relevance value: ${relevance}`)
  }

  return relevance as Relevance
}

export type ExceptionMessageKey = keyof Messages["generic"]["exception"]
const exceptionMessages = exhaustiveStringTuple<ExceptionMessageKey>()(
  "default",
  "timeout",
  "inputLengthError",
  "inputLengthWarning",
  "experimentalLanguageWarning",
  "fileFailure",
  "invalidFileType",
  "invalidFileSize",
  "maxSearchResultsWarning",
)

export const getValidI18nExceptionKey = (key: string | undefined) => {
  if (!key) return undefined

  const sanitizedKey = key.replace(/[\W]/g, "")
  if (exceptionMessages.some((key) => key === sanitizedKey)) {
    return sanitizedKey as ExceptionMessageKey
  }
}

export const isValidSourceLanguage = (
  language: unknown,
): language is SearchSchema["FilterLanguage"] =>
  Object.values(searchFilterLanguages).some((item) => item === language)

export const getValidSourceLanguage = (language: unknown) => {
  return isValidSourceLanguage(language) ? language : defaultSourceLanguage
}
