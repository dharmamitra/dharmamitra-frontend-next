import { createOpenAICompatible } from "@ai-sdk/openai-compatible"

import { ModelType } from "@/utils/api/global/types"

const ENDPOINTS = {
  mitraTranslate: "/chat-translate/v1/",
  mitraSearchSummary: "/chat-summary/v1/",
}

/**
 * @see: https://sdk.vercel.ai/providers/openai-compatible-providers
 */

type DefaultModelId = "gpt-3.5-turbo" | (string & {})

type MitraModelId = ModelType | (string & {})
type MitraChatModelId = MitraModelId
type MitraCompletionModelId = MitraModelId
type MitraEmbeddingModelId = MitraModelId
type _ImgModelId = DefaultModelId

export const mitraTranslate = createOpenAICompatible<
  MitraCompletionModelId,
  MitraChatModelId,
  MitraEmbeddingModelId,
  _ImgModelId
>({
  name: "mitra-translate",
  apiKey: process.env.DM_CHAT_API_KEY,
  baseURL: process.env.DM_CHAT_STREAM_BASE_URL + ENDPOINTS.mitraTranslate,
})

export const mitraSearchSummary = createOpenAICompatible<
  MitraCompletionModelId,
  MitraChatModelId,
  MitraEmbeddingModelId,
  _ImgModelId
>({
  name: "mitra-search-summary",
  apiKey: process.env.DM_CHAT_API_KEY,
  baseURL: process.env.DM_CHAT_STREAM_BASE_URL + ENDPOINTS.mitraSearchSummary,
})

export const mitraTest = createOpenAICompatible<
  DefaultModelId,
  DefaultModelId,
  DefaultModelId,
  DefaultModelId
>({
  name: "mitra-test",
  apiKey: process.env.DM_CHAT_API_KEY,
  baseURL: process.env.DM_CHAT_TEST_BASE_URL ?? "",
})
