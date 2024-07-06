import { SearchApiTypes } from "@/api"
import apiClients from "@/utils/api/client"
import { parseAPIRequestBody } from "@/utils/api/helpers"

export const getSearchParallelData = async (
  body: SearchApiTypes.ParallelRequestBody,
) => {
  if (!body.search_input) {
    throw new Error("Search input string is required")
  }

  const { data } = await apiClients.Search.POST(`/parallel/`, {
    body: parseAPIRequestBody(body),
  })

  if (!data) {
    return data
  }

  return data?.results ? data.results : []
}
