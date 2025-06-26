import { parseAsStringLiteral, useQueryState } from "nuqs"

import {
  defaultSourceLanguage,
  searchFilterLanguages,
  searchParamsNames,
} from "@/utils/api/search/params"

const {
  api: { filter_target_language },
} = searchParamsNames

export function useFilterTargetLanguageParam() {
  return useQueryState(filter_target_language, {
    ...parseAsStringLiteral(searchFilterLanguages).withDefault(defaultSourceLanguage),
  })
}
