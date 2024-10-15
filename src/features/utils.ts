import { UseChatOptions } from "ai/react"

import appConfig from "@/config"

interface CreateChatPropsParams<T extends object> extends UseChatOptions {
  requestBody: T
  localEndpoint: string
  initialInput: string
}

export function createChatProps<T extends object>({
  id,
  localEndpoint,
  requestBody,
  initialInput,
}: CreateChatPropsParams<T>): UseChatOptions {
  return {
    id,
    api: appConfig.basePath + localEndpoint,
    streamProtocol: "text",
    headers: {
      "Content-Type": "application/json",
    },
    initialInput,
    body: requestBody,
  }
}
