import { parseAsJson, useQueryState } from "nuqs"
import { z } from "zod"

import { searchParamsNames } from "@/utils/api/search/params"
import { AllSearchParams } from "@/utils/api/search/types"

const soureFiltersSchema: z.ZodType<AllSearchParams["source_filters"]> = z
  .object({
    include_collections: z.array(z.string()).nullable(),
    include_categories: z.array(z.string()).nullable(),
    include_files: z.array(z.string()).nullable(),
  })
  .nullable()
  .optional()

export const useSourceFiltersParam = () => {
  return useQueryState(searchParamsNames.api.source_filters, {
    ...parseAsJson(soureFiltersSchema.parse),
  })
}
