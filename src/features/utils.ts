import { UseChatOptions } from "ai/react"

import { TranslationApiTypes } from "@/api"

type CreateChatPropsParams = {
  basePath: string
  requestBody: TranslationApiTypes.RequestBody<"/translation/">
  localEndpoint: string
  initialInput: string
}

export function createChatProps({
  basePath,
  localEndpoint,
  requestBody,
  initialInput,
}: CreateChatPropsParams): UseChatOptions {
  return {
    api: basePath + localEndpoint,
    streamProtocol: "text",
    headers: {
      "Content-Type": "application/json",
    },
    initialInput,
    body: requestBody,
  }
}
