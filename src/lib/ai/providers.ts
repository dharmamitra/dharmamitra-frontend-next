import { createOpenAICompatible } from "@ai-sdk/openai-compatible"

/**
 * @see: https://sdk.vercel.ai/providers/openai-compatible-providers
 */

type CompletionModelIds = "gpt-3.5-turbo" | (string & {})

export const mitra = createOpenAICompatible<
  CompletionModelIds,
  CompletionModelIds,
  CompletionModelIds
>({
  name: "dharma-mitra",
  apiKey: process.env.DM_CHAT_API_KEY,
  baseURL: process.env.DM_CHAT_BASE_URL ?? "",
})
