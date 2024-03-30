import makeSearchQuery, { type SearchRequestProps } from "./search"
import makeTranslationQuery, {
  type TranslationRequestProps,
} from "./translation"

const DM_API = {
  search: {
    makeQueryKey: (requestBody: SearchRequestProps) => [
      "search",
      JSON.stringify(requestBody),
    ],
    call: makeSearchQuery,
  },
  translation: {
    makeQueryKey: (requestBody: TranslationRequestProps) => [
      "translation",
      JSON.stringify(requestBody),
    ],
    call: makeTranslationQuery,
  },
}

export { DM_API, SearchRequestProps, TranslationRequestProps }
