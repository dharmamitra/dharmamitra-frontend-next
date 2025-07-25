import { TranslationApiTypes } from "@/api"
import apiClients from "@/utils/api/client"

/**
 * The `endpoints/tagging` getter throws a custom error with a `duration` property.
 *
 */
export type TimedError = Error & { queryDuration: number; response: Response }

export const getTaggingData = async (body: TranslationApiTypes.RequestBody<"/tagging/">) => {
  const queryStart = performance.now()

  const { data, error, response } = await apiClients.Translation.POST(`/tagging/`, {
    body,
  })

  const queryDuration = performance.now() - queryStart

  if (error) {
    throw { ...error, queryDuration, response }
  }

  // This is to remove the possible "unsuccessful analysis" response type which is part of the 200 return model.
  if (typeof data === "object" && "detail" in data) {
    return { sentences: undefined }
  }

  return { sentences: data }
}
