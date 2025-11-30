import { useQueryState } from "nuqs"

import { parseAsMultiLineString } from "./parsers"

import { searchParamsNames } from "@/utils/api/search/params"

const {
  api: { search_input },
} = searchParamsNames

export function useSearchInputParam() {
  return useQueryState(search_input, {
    ...parseAsMultiLineString.withDefault(""),
  })
}
