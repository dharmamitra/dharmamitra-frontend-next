import { SearchApiTypes } from "@/api"
import apiClients from "@/utils/api/client"

export const getSearchPrimaryData = async (
  body: SearchApiTypes.PrimaryRequestBody,
) => {
  if (!body.search_input) {
    throw new Error("Search input string is required")
  }

  const { data, error } = await apiClients.Search.POST(`/primary/`, {
    body,
  })

  if (error) {
    throw new Error(JSON.stringify(error))
  }

  if (!data) return

  return data?.results ? data.results : []
}
