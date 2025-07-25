import { ExceptionMessageKey, getValidI18nExceptionKey } from "../validators"

export const localAPIEndpoints = {
  translation: "/next/api/translation-stream",
  "mitra-translation": "/next/api/mitra-translation-stream",
  // TODO: strip out endpoint when migration tested
  // "explanation-primary": "/next/api/search-summary-stream",
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

const exceptionChecks = {
  warning: new RegExp(String.raw`(^.*?)(⚠️.*)$`),
  error: new RegExp(String.raw`(^.*?)(↯.*)$`),
}

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

export const parseStream = (stream: string | undefined) => {
  if (!stream) return initialParsedStream

  const checkedStream = Object.entries(exceptionChecks).reduce<ParsedStream>((acc, [, pattern]) => {
    const exceptionCheck = stream.match(pattern)
    const [, streamWihException, exception] = exceptionCheck ?? ["", "", ""]

    return {
      ...acc,
      content: streamWihException || acc.content || stream,
      exceptionI18nKey: getValidI18nExceptionKey(exception || acc.exceptionI18nKey),
    }
  }, initialParsedStream)

  return {
    ...checkedStream,
    parsedContent: getParagraphsFromString(checkedStream.content),
  }
}
