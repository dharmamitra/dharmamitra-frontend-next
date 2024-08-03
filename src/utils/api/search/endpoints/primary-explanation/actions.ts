"use server"

import { SearchApiTypes } from "@/api"
import apiClients, { defaultTimeout } from "@/utils/api/client"
import { getValidRelevance } from "@/utils/validators"

const parseAPIResponse = (
  response: SearchApiTypes.Response<"/explanation/">,
) => {
  return {
    relevance: getValidRelevance(response.relevance),
    summary: response.summary.split(/\n+/g),
  }
}

export const getSearchPrimaryExplanation = async (
  body: SearchApiTypes.RequestBody<"/explanation/">,
) => {
  const { data, error } = await apiClients.Search.POST("/explanation/", {
    headers: {
      "X-Key": process.env.DM_API_KEY ?? "",
    },
    body,
    signal: AbortSignal.timeout(defaultTimeout),
  })

  if (error) {
    throw new Error(JSON.stringify(error))
  }

  return parseAPIResponse(data)
}
