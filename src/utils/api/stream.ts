export const paths = {
  translation: "/next/api/translation-stream",
  search: "/next/api/search-stream",
}

export const markers = {
  lineBreak: "🔽",
  metaLineStart: "⏮️",
  metaLineEnd: "⏭️",
  warning: "⚠️", // (followed by i18n warning message key matching the pattern `\w+`)
  error: "↯", // (followed by i18n error message key matching the pattern `\w+`)
} as const
