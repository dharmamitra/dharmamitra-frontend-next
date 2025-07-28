import { UseChatOptions } from "@ai-sdk/react"

import { TranslationRequestBodyV2 } from "@/components/features/MitraTranslator/utils"
import appConfig from "@/config"

interface CreateChatPropsParams<T extends object> extends UseChatOptions {
  requestBody: T
  localEndpoint: string
  initialInput: string
}

export type ChatPropsWithId<T extends object> = UseChatOptions & { body: T }
export type TranslationChatPropsWithId = ChatPropsWithId<TranslationRequestBodyV2>

export function createChatProps<T extends object>({
  id,
  localEndpoint,
  requestBody,
  initialInput,
}: CreateChatPropsParams<T>): ChatPropsWithId<T> {
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
