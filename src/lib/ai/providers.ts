import { createOpenAICompatible } from "@ai-sdk/openai-compatible"

import { ModelType } from "@/utils/api/global/params"

/**
 * @see: https://sdk.vercel.ai/providers/openai-compatible-providers
 */

type TestModelId = "gpt-3.5-turbo" | (string & {})

type MitraModelId = ModelType | (string & {})
type MitraChatModelId = MitraModelId
type MitraCompletionModelId = MitraModelId
type MitraEmbeddingModelId = MitraModelId
type _ImgModelId = TestModelId

export const mitra = createOpenAICompatible<
  MitraCompletionModelId,
  MitraChatModelId,
  MitraEmbeddingModelId,
  _ImgModelId
>({
  name: "mitra",
  apiKey: process.env.DM_CHAT_API_KEY,
  baseURL: process.env.DM_CHAT_BASE_URL ?? "",
})

export const mitraTest = createOpenAICompatible<TestModelId, TestModelId, TestModelId, TestModelId>(
  {
    name: "mitra-test",
    apiKey: process.env.DM_CHAT_API_KEY,
    baseURL: process.env.DM_CHAT_TEST_BASE_URL ?? "",
  },
)
