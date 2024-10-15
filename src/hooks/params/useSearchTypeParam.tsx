import { parseAsStringLiteral, useQueryState } from "nuqs"

import {
  defaultSearchType,
  searchParamsNames,
  searchTypes,
} from "@/utils/api/search/params"

const {
  common: { search_type },
} = searchParamsNames

export function useSearchTypeParam() {
  return useQueryState(search_type, {
    ...parseAsStringLiteral(searchTypes).withDefault(defaultSearchType),
    clearOnDefault: true,
  })
}
