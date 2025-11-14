import { UseChatOptions } from "@ai-sdk/react"

import appConfig from "@/config"

import { ExceptionMessageKey } from "../validators"

export const LOCAL_API_ENDPOINTS = {
  "mitra-translation": "/next/api/mitra-translation-stream",
  "mitra-explore": "/next/api/mitra-explore-stream",
  "explanation-primary": "/next/api/mitra-search-summary",
  "explanation-parallel": "/next/api/awaiting-backend-update",
}

// TODO: This should be deprecated once we switch to the new stream protocol
export const markers = {
  lineBreak: "🔽",
  wordAnalaysis: "%",
  metaLineStart: "⏮️",
  metaLineEnd: "⏭️",
  warning: "⚠️", // (followed by i18n warning message key matching the pattern `\w+`)
  error: "↯", // (followed by i18n error message key matching the pattern `\w+`)
} as const

export type ParsedStream = {
  content: string
  exceptionI18nKey: ExceptionMessageKey | undefined
  parsedContent: string[]
}

export const initialParsedStream: ParsedStream = {
  content: "",
  exceptionI18nKey: undefined,
  parsedContent: [],
}

export const getParagraphsFromString = (string: string) => {
  return string
    .split(markers.lineBreak)
    .map((p) => p.trim())
    .filter(Boolean)
}

interface CreateChatPropsParams<T extends object> extends UseChatOptions {
  requestBody: T
  localEndpoint: string
  initialInput: string
}

export type ChatPropsWithId<T extends object> = UseChatOptions & { body: T }

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
