import { SourceLanguage } from "@/utils/api/search/types"

export const linkAttrs = {
  color: "secondary",
  target: "_blank",
  rel: "noopener noreferrer",
}

export const localStorageKeys = {
  storageVersionId: "storage-id",
  translationUsageAccepted: "translation-usage-accepted",
  showSearchControls: "show-search-options",
  showParallelTranslations: "show-parallel-translations",
  showSummary: "show-search-result-summary",
} as const

export const smMediaQuery = "(max-width: 500px)"

export const sourceLangColors: Record<SourceLanguage, string> = {
  zh: "#7C4786",
  pa: "#A25009",
  sa: "#2C284C",
  bo: "#66160E",
}

export const exampleSearchQueries = [
  "Ven. Ānanda's care for the Buddha",
  "Faith leading to happiness",
  "Similes for nirvana",
  "The Buddha’s compassion",
  "Definition of peace",
  "The purpose of giving",
  "consciousness and the sense bases",
  "Overcoming dullness",
  "Householders living well",
  "heart’s release through rejoicing",
  "living in harmony",
  "death and dying",
  "bright and dark results of karma",
  "the factors of stream-entry",
  "The purpose of ordination",
]
