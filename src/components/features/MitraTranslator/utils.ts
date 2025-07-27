import { TranslationApiTypes } from "@/api"
import { ModelType } from "@/utils/api/global/types"
import { allTranslationDefaultParams } from "@/utils/api/translation/params"

const { input_encoding, target_lang, model, do_grammar_explanation, human_readable_tags, mode } =
  allTranslationDefaultParams

export type TranslationRequestBodyV2 = Omit<
  TranslationApiTypes.RequestBody<"/translation/">,
  "model"
> & {
  model: ModelType
}

export const defaultTranslationRequestBody: TranslationRequestBodyV2 = {
  input_sentence: "",
  input_encoding,
  target_lang,
  do_grammar_explanation,
  model,
}

type CreateTranslationRequestBody = Partial<TranslationRequestBodyV2>
export function createTranslationRequestBody(params: CreateTranslationRequestBody) {
  return { ...defaultTranslationRequestBody, ...params }
}

export const defaultTaggingnRequestBody: TranslationApiTypes.RequestBody<"/tagging/"> = {
  input_sentence: "",
  input_encoding,
  human_readable_tags,
  mode,
}

type CreateTaggingnRequestBody = Partial<TranslationApiTypes.RequestBody<"/tagging/">>
export function createTaggingRequestBody(params: CreateTaggingnRequestBody) {
  return { ...defaultTaggingnRequestBody, ...params }
}

export const MAX_FILE_INPUT_SIZE_MB = 12

export const MAX_FILE_INPUT_SIZE = MAX_FILE_INPUT_SIZE_MB * 1024 * 1024

export const MAX_INPUT_CHARACTERS = 18000

export const MAX_INPUT_PAGE_EQUIVALENT = 10
