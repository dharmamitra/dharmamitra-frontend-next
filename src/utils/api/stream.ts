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

export const warningPattern = new RegExp(
  String.raw`(^.*?)(${markers.warning}.*)$`,
)

export const errorPattern = new RegExp(String.raw`(^.*?)(${markers.error}.*)$`)

type ErrorMessageKey = keyof Messages["generic"]["error"]

export const pasrseStreamContent = (string: string, regExp: RegExp) => {
  const exceptionCheck = string.match(regExp)
  const [, content, exception] = exceptionCheck ?? ["", "", ""]
  let exceptionI18nKey: ErrorMessageKey | undefined

  if (exception) {
    // cast without type checking because next-intl error handling will catch invalid keys.
    exceptionI18nKey = exception.replace(/[\W]/g, "") as ErrorMessageKey
  }

  return { content, exceptionI18nKey }
}
