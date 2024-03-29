import makeSearchQuery from "./search"
import makeTranslationQuery from "./translation"
import { SearchRequestProps, TranslationRequestProps } from "./types"

const DM_API = {
  search: {
    makeQueryKey: ({ searchInput, queryParams }: SearchRequestProps) => [
      "search",
      searchInput,
      queryParams,
    ],
    call: makeSearchQuery,
  },
  translation: {
    makeQueryKey: ({ inputSentence, queryParams }: TranslationRequestProps) => [
      "translation",
      inputSentence,
      queryParams,
    ],
    call: makeTranslationQuery,
  },
}

export default DM_API
