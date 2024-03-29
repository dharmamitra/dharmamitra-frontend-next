import apiClient from "./client"
import { SearchRequestProps } from "./types"

const makeSearchQuery = async ({ searchInput }: SearchRequestProps) => {
  const { data } = await apiClient.POST("/search/", {
    body: {
      search_input: searchInput,
    },
  })

  return data
}

export default makeSearchQuery
