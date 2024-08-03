import { Schema as SearchSchema } from "@/utils/api/search/types"
import { exhaustiveStringTuple } from "@/utils/typescript"

export const getValidDefaultValue = <T>(value: T) => {
  if (value === undefined) {
    throw new Error("a default param value is undefined")
  }
  return value
}

type RelevanceTypes = SearchSchema["SummaryRespone"]["relevance"]
type Relevance = RelevanceTypes & keyof Messages["search"]["relevanceTypes"]
const relevanceTypes: Relevance[] = exhaustiveStringTuple<RelevanceTypes>()(
  "low",
  "medium",
  "high",
)

export const getValidRelevance = (relevance: string) => {
  if (!relevanceTypes.some((value) => value === relevance)) {
    throw new Error(`Invalid relevance value: ${relevance}`)
  }

  return relevance as Relevance
}
