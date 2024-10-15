import { parseAsStringLiteral, useQueryState } from "nuqs"

import {
  defaultSearchFilterLanguage,
  searchFilterLanguages,
  searchParamsNames,
} from "@/utils/api/search/params"

const {
  parallel: { filter_target_language },
} = searchParamsNames

export function useFilterTargetLanguageParam() {
  return useQueryState(filter_target_language, {
    ...parseAsStringLiteral(searchFilterLanguages).withDefault(
      defaultSearchFilterLanguage,
    ),
    clearOnDefault: true,
  })
}
