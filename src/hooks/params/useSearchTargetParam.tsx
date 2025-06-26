import { parseAsStringLiteral, useQueryState } from "nuqs"

import { allSearchDefaultParams, searchParamsNames, searchTargets } from "@/utils/api/search/params"

const {
  local: { search_target },
} = searchParamsNames

export function useSearchTargetParam() {
  return useQueryState(search_target, {
    ...parseAsStringLiteral(searchTargets).withDefault(allSearchDefaultParams.search_target),
  })
}
