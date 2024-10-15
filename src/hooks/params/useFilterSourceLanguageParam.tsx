import { parseAsStringLiteral, useQueryState } from "nuqs"

import {
  defaultSearchFilterLanguage,
  searchFilterLanguages,
  searchParamsNames,
} from "@/utils/api/search/params"

const {
  parallel: { filter_source_language },
} = searchParamsNames

export function useFilterSourceLanguageParam() {
  return useQueryState(filter_source_language, {
    ...parseAsStringLiteral(searchFilterLanguages).withDefault(
      defaultSearchFilterLanguage,
    ),
    clearOnDefault: true,
  })
}
