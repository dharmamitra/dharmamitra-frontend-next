import { parseAsStringLiteral, useQueryState } from "nuqs"

import {
  defaultSourceLanguage,
  searchFilterLanguages,
  searchParamsNames,
} from "@/utils/api/search/params"

const {
  api: { filter_source_language },
} = searchParamsNames

export function useFilterSourceLanguageParam() {
  return useQueryState(filter_source_language, {
    ...parseAsStringLiteral(searchFilterLanguages).withDefault(defaultSourceLanguage),
  })
}
