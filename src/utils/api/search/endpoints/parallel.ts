import { SearchApiTypes } from "@/api"
import apiClients from "@/utils/api/client"

export const getSearchParallelData = async (
  body: SearchApiTypes.ParallelRequestBody,
) => {
  if (!body.search_input) {
    throw new Error("Search input string is required")
  }

  const { data } = await apiClients.Search.POST(`/parallel/`, {
    body,
  })

  return data ?? {}
}
