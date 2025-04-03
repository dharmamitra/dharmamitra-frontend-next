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

export const globalParamsNames: GlobalParamNames = {
  api: { input_encoding: "input_encoding" },
  local: { view: "view" },
}
