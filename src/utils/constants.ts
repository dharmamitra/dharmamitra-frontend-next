import { SourceLanguage } from "@/utils/api/search/types"

export const linkAttrs = {
  color: "secondary",
  target: "_blank",
  rel: "noopener noreferrer",
}

export const localStorageKeys = {
  storageVersionId: "storage-id",
  translationUsageAccepted: "translation-usage-accepted",
  searchUsageAccepted: "search-usage-accepted",
  showSearchControls: "show-search-options",
  showParallelTranslations: "show-parallel-translations",
  showSummary: "show-search-result-summary",
} as const

export const cookieKeys = {
  extensionBannerClosed: "extension-banner-closed",
} as const

export const smMediaQuery = "(max-width: 500px)"

export const sourceLangColors: Record<SourceLanguage, string> = {
  zh: "#7C4786",
  pa: "#A25009",
  sa: "#2C284C",
  bo: "#66160E",
}

export const chromeExtensionUrl =
  "https://chromewebstore.google.com/detail/dharmamitra-language-tool/jlmleoklbpdehnokplffodjomekoiadl?hl=en-GB&utm_source=ext_sidebar"

export const firefoxExtensionUrl =
  "https://addons.mozilla.org/firefox/addon/dharmamitra-language-tools/"

export const nexusUrl = "https://dharmamitra.org/nexus"

export const docsSiteUrl = "https://dharmamitra.github.io/dharmamitra-guides/"
