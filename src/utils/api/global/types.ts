import { SearchApiTypes, TranslationApiTypes } from "@/api"
import { Messages } from "@/app/types"
import { CommonProperties } from "@/utils/api/helpers"
import type { IsIdentical } from "@/utils/typescript"

export type APIInputEncoding =
  IsIdentical<
    TranslationApiTypes.Schema["InputEncoding"],
    SearchApiTypes.Schema["InputEncoding"]
  > extends true
    ? TranslationApiTypes.Schema["InputEncoding"]
    : never

export type InputEncoding = APIInputEncoding & keyof Messages["globalParams"]["encodings"]

export type View = "search" | "translation" | "ocr"

// "gpt-3.5-turbo" can't be used as an i18n key (decimal point forbidden)
export type ModelType = SearchApiTypes.Schema["ModelType"] &
  keyof Messages["globalParams"]["modelType"]

export type APIGlobalParams = CommonProperties<
  [
    SearchApiTypes.RequestBody<"/primary/">,
    SearchApiTypes.RequestBody<"/secondary/">,
    SearchApiTypes.RequestBody<"/parallel/">,
    TranslationApiTypes.RequestBody<"/translation/">,
    TranslationApiTypes.RequestBody<"/tagging/">,
  ]
>

export type GlobalParamNames = {
  api: { [K in keyof APIGlobalParams]: K }
  local: {
    view: "view"
  }
}
