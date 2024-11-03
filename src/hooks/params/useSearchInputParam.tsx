import { useQueryState } from "nuqs"

import { searchParamsNames } from "@/utils/api/search/params"

import { parseAsMultiLineString } from "./parsers"

const {
  common: { search_input },
} = searchParamsNames

export function useSearchInputParam() {
  return useQueryState(search_input, {
    ...parseAsMultiLineString.withDefault(""),
  })
}
