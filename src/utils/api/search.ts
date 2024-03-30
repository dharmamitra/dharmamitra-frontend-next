import type { components } from "@/lib/api/v1.d"

import apiClient from "./client"

export type SearchRequestProps = components["schemas"]["SearchInput"]

const makeSearchQuery = async (requestBody: SearchRequestProps) => {
  const { data } = await apiClient.POST("/search/", {
    body: requestBody,
  })

  return data
}

export default makeSearchQuery
