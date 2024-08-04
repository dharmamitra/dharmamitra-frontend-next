import { cleanSSEData } from "../transformers"
import { ErrorMessageKey, getValidI18nExceptionKey } from "../validators"

export const paths = {
  translation: "/next/api/translation-stream",
  "search-summary": "/next/api/search-summary-stream",
}

export const markers = {
  lineBreak: "🔽",
  metaLineStart: "⏮️",
  metaLineEnd: "⏭️",
  warning: "⚠️", // (followed by i18n warning message key matching the pattern `\w+`)
  error: "↯", // (followed by i18n error message key matching the pattern `\w+`)
} as const

const checks = {
  warning: new RegExp(String.raw`(^.*?)(⚠️.*)$`),
  error: new RegExp(String.raw`(^.*?)(↯.*)$`),
}

// TODO: REPLACE WITH pasrseStream below
export const warningPattern = new RegExp(
  String.raw`(^.*?)(${markers.warning}.*)$`,
)
export const errorPattern = new RegExp(String.raw`(^.*?)(${markers.error}.*)$`)
export const pasrseStreamContent = (string: string, regExp: RegExp) => {
  const cleanedStream = cleanSSEData(string)

  const exceptionCheck = string.match(regExp)
  const [, streamWihException, exception] = exceptionCheck ?? ["", "", ""]

  return {
    content: streamWihException || cleanedStream,
    exceptionI18nKey: getValidI18nExceptionKey(exception),
  }
}

type ParsedStream = {
  content: string
  exceptionI18nKey: ErrorMessageKey | undefined
  pasrsedStream: string[]
}

const initialParsedStream: ParsedStream = {
  content: "",
  exceptionI18nKey: undefined,
  pasrsedStream: [],
}

export const pasrseStream = (string: string | undefined) => {
  if (!string) return initialParsedStream

  const cleanedStream = cleanSSEData(string)

  const checkedStream = Object.entries(checks).reduce<ParsedStream>(
    (acc, [, pattern]) => {
      const exceptionCheck = string.match(pattern)
      const [, streamWihException, exception] = exceptionCheck ?? ["", "", ""]

      return {
        ...acc,
        content: streamWihException || acc.content || cleanedStream,
        exceptionI18nKey: getValidI18nExceptionKey(
          exception || acc.exceptionI18nKey,
        ),
      }
    },
    initialParsedStream,
  )

  return {
    ...checkedStream,
    pasrsedStream: checkedStream.content
      .split(markers.lineBreak)
      .map((p) => p.trim())
      .filter(Boolean),
  }
}
