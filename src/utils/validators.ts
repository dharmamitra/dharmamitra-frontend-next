export const getValidDefaultValue = <T>(value: T) => {
  if (value === undefined) {
    throw new Error("a default param value is undefined")
  }
  return value
}

type RelevanceType = "low" | "medium" | "high"
type Relevance = RelevanceType & keyof Messages["search"]["relevanceTypes"]
const relevanceTypes: Relevance[] = ["low", "medium", "high"]

export const getValidRelevance = (relevance: string) => {
  if (!relevanceTypes.some((value) => value === relevance)) {
    throw new Error(`Invalid relevance value: ${relevance}`)
  }

  return relevance as Relevance
}
