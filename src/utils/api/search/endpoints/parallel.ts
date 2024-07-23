import { SearchApiTypes } from "@/api"
import apiClients, { defaultTimeout } from "@/utils/api/client"

export const getSearchParallelData = async (
  body: SearchApiTypes.ParallelRequestBody,
) => {
  if (!body.search_input) {
    throw new Error("Search input string is required")
  }

  const { data, error } = await apiClients.Search.POST(`/parallel/`, {
    body,
    signal: AbortSignal.timeout(defaultTimeout),
  })

  if (error) {
    throw new Error(JSON.stringify(error))
  }

  if (!data) return

  return data?.results ? data.results : []
}
