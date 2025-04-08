import { SearchApiTypes } from "@/utils/api"
import { exhaustiveStringTuple } from "@/utils/typescript"

import {
  APIInputEncoding,
  GlobalParamNames,
  InputEncoding,
  View,
} from "./types"

export const inputEncodings: InputEncoding[] =
  exhaustiveStringTuple<APIInputEncoding>()(
    "auto",
    "dev",
    "hk",
    "iast",
    "tibetan",
    "wylie",
  )
export const defaultInputEncoding: InputEncoding = "auto"

export const views: View[] = exhaustiveStringTuple<View>()(
  "search",
  "translation",
  "ocr",
)
export const defaultView: View = "search"

// "gpt-3.5-turbo" can't be used as an i18n key (decimal point forbidden)
export type ModelType = SearchApiTypes.Schema["ModelType"] &
  keyof Messages["globalParams"]["modelType"]

export const modelTypes: ModelType[] = exhaustiveStringTuple<
  keyof Messages["globalParams"]["modelType"]
>()("default", "mitra-base", "mitra-pro")
export const defaultModelType = "default" as const

export const globalParamsNames: GlobalParamNames = {
  api: { input_encoding: "input_encoding" },
  local: { view: "view" },
}
