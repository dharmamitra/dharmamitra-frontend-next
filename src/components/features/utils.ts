import { DefaultChatTransport, UIMessage } from "ai"

import { TranslationRequestBodyV2 } from "@/components/features/MitraTranslator/utils"
import appConfig from "@/config"

interface CreateChatPropsParams<T extends object> {
  id?: string
  requestBody: T
  localEndpoint: string
}

export interface ChatPropsWithId<T extends object> {
  id: string
  transport: DefaultChatTransport<UIMessage>
  body: T
}

export type TranslationChatPropsWithId = ChatPropsWithId<TranslationRequestBodyV2>

export function createChatProps<T extends object>({
  id,
  localEndpoint,
  requestBody,
}: CreateChatPropsParams<T>): ChatPropsWithId<T> {
  const chatId = id ?? JSON.stringify(requestBody)

  return {
    id: chatId,
    transport: new DefaultChatTransport({
      api: appConfig.basePath + localEndpoint,
      headers: {
        "Content-Type": "application/json",
      },
      prepareSendMessagesRequest: ({ messages }) => {
        // Send our custom request body along with the last message text
        const lastMessage = messages[messages.length - 1]
        const inputText = lastMessage?.parts
          ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
          .map((p) => p.text)
          .join("")

        return {
          body: {
            ...requestBody,
            // Include messages for routes that need them (e.g., search summary)
            messages,
            // Override input_sentence with the actual message text if present
            ...(inputText && { input_sentence: inputText }),
          },
        }
      },
    }),
    body: requestBody,
  }
}

/**
 * Extract text content from a UIMessage's parts array.
 * In AI SDK v5, messages use `parts` instead of `content`.
 */
export function getMessageText(message: UIMessage) {
  return message.parts
    .filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("")
}
