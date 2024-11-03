import { parseAsJson, useQueryState, UseQueryStateReturn } from "nuqs"
import { z } from "zod"

import { DbSourceFilterUISetting } from "@/features/paramSettings/DbSourceFilter/types"
import { SourceFilterProps } from "@/utils/api/search/types"

//TODO: can be drawn from API values?
const soureFiltersSchema = z
  .object({
    include_collections: z.array(z.string()).optional(),
    include_categories: z.array(z.string()).optional(),
    include_files: z.array(z.string()).optional(),
  })
  .optional()

const tempParamsNames = {
  source_filters: "source_filters",
  input_source_filters: "input_source_filters",
}

export const useSourceFiltersParam = () => {
  return useQueryState(tempParamsNames.source_filters, {
    ...parseAsJson(soureFiltersSchema.parse),
  })
}

export const useInputSourceFiltersParam = () => {
  return useQueryState(tempParamsNames.input_source_filters, {
    ...parseAsJson(soureFiltersSchema.parse),
  })
}

export const sourceFilterParamHooks: Record<
  DbSourceFilterUISetting,
  () => UseQueryStateReturn<SourceFilterProps, undefined>
> = {
  source_filters: useSourceFiltersParam,
  input_source_filters: useInputSourceFiltersParam,
}
