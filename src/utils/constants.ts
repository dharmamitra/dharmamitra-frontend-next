import { SourceLanguage } from "@/utils/api/search/types"

export const linkAttrs = {
  color: "secondary",
  target: "_blank",
  rel: "noopener noreferrer",
}

export const localStorageKeys = {
  view: "view-tab",
  showSearchOptions: "show-search-options",
}

export const smMediaQuery = "(max-width: 500px)"

export const sourceLangColors: Record<SourceLanguage, string> = {
  chn: "#7C4786",
  pli: "#A25009",
  skt: "#2C284C",
  tib: "#66160E",
}
