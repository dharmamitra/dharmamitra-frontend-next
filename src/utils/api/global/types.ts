import { SearchApiTypes, TranslationApiTypes } from "@/api"
import { CommonProperties } from "@/utils/api/helpers"
import type { IsIdentical } from "@/utils/typescript"

export type APIInputEncoding =
  IsIdentical<
    TranslationApiTypes.Schema["InputEncoding"],
    SearchApiTypes.Schema["InputEncoding"]
  > extends true
    ? TranslationApiTypes.Schema["InputEncoding"]
    : never

export type InputEncoding = APIInputEncoding &
  keyof Messages["globalParams"]["encodings"]

export type View = "search" | "translation"

export type APIGlobalParams = CommonProperties<
  [
    SearchApiTypes.PrimaryRequestBody,
    SearchApiTypes.ParallelRequestBody,
    SearchApiTypes.SecondaryRequestBody,
    TranslationApiTypes.TranslationRequestBody,
    TranslationApiTypes.TaggingRequestBody,
  ]
>

export type GlobalParamNames = {
  api: { [K in keyof APIGlobalParams]: K }
  local: {
    view: "view"
  }
}
