import { SearchApiTypes, TranslationApiTypes } from "@/api"
import type { IsIdentical } from "@/utils/typescript"
import { exhaustiveStringTuple } from "@/utils/typescript"

type APIInputEncoding =
  IsIdentical<
    TranslationApiTypes.Schema["InputEncoding"],
    SearchApiTypes.Schema["InputEncoding"]
  > extends true
    ? TranslationApiTypes.Schema["InputEncoding"]
    : never

export type InputEncoding = APIInputEncoding &
  keyof Messages["globalParams"]["encodings"]

export const inputEncodings: InputEncoding[] =
  exhaustiveStringTuple<APIInputEncoding>()(
    "auto",
    "dev",
    "hk",
    "iast",
    "tibetan",
    "wylie",
  )

export const globalParamsNames = {
  input_encoding: "input_encoding",
} as const
