"use server"

import { SearchApiTypes } from "@/api"
import apiClients, { defaultTimeout } from "@/utils/api/client"

const parseAPIResponse = (response: SearchApiTypes.Response<"/explanation-parallel/">) => {
  return {
    relevance: response.relevance,
    summary: response.summary.split(/\n+/g),
  }
}

export const getSearchParallelExplanation = async (
  body: SearchApiTypes.RequestBody<"/explanation-parallel/">,
) => {
  const { data, error } = await apiClients.Search.POST("/explanation-parallel/", {
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
