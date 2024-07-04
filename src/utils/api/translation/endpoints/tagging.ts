import { TranslationApiTypes } from "@/api"

import apiClients from "../../client"

/**
 * The `endpoints/tagging` getter throws a custom error with a `duration` property.
 *
 */
export type TimedError = Error & { queryDuration: number; response: Response }

export const getTaggingData = async (
  body: TranslationApiTypes.TaggingRequestBody,
) => {
  const queryStart = performance.now()

  const { data, error, response } = await apiClients.Translation.POST(
    `/tagging/`,
    {
      body,
    },
  )

  const queryDuration = performance.now() - queryStart

  if (error) {
    throw { ...error, queryDuration, response }
  }

  // TODO: This is to remove the possible "unsuccessful analysis" response type which is currently given as a 200 return model option. This should be a 400 return model.
  if (typeof data === "object" && "detail" in data) {
    return { sentences: undefined }
  }

  return { sentences: data }
}
