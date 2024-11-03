import { parseAsStringLiteral, useQueryState } from "nuqs"

import {
  defaultSearchFilterLanguage,
  searchFilterLanguages,
  searchParamsNames,
} from "@/utils/api/search/params"

const {
  primary: { filter_language },
} = searchParamsNames

export function useFilterLanguageParam() {
  return useQueryState(filter_language, {
    ...parseAsStringLiteral(searchFilterLanguages).withDefault(
      defaultSearchFilterLanguage,
    ),
  })
}
