"use server"

import { SearchApiTypes } from "@/api"
import apiClients, { defaultTimeout } from "@/utils/api/client"

type RelevanceType = "low" | "medium" | "high"
type Relevance = RelevanceType & keyof Messages["search"]["relevanceTypes"]

const relevanceTypes: Relevance[] = ["low", "medium", "high"]

const getValidRelevance = (relevance: string) => {
  if (!relevanceTypes.some((value) => value === relevance)) {
    throw new Error(`Invalid relevance value: ${relevance}`)
  }

  return relevance as Relevance
}

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
