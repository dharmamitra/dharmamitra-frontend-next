import { UseChatOptions } from "ai/react"

import { streamUtils, TranslationApiTypes } from "@/api"
import { allTranslationDefaultParams } from "@/utils/api/translation/params"

const {
  input_encoding,
  target_lang,
  model,
  do_grammar_explanation,
  human_readable_tags,
  mode,
} = allTranslationDefaultParams

export const defaultTranslationRequestBody: TranslationApiTypes.RequestBody<"/translation/"> =
  {
    input_sentence: "",
    input_encoding,
    do_grammar_explanation,
    target_lang,
    model,
  }

type CreateTranslationRequestBody = Partial<
  TranslationApiTypes.RequestBody<"/translation/">
>
export function createTranslationRequestBody(
  params: CreateTranslationRequestBody,
) {
  return { ...defaultTranslationRequestBody, ...params }
}

export const defaultTaggingnRequestBody: TranslationApiTypes.RequestBody<"/tagging/"> =
  {
    input_sentence: "",
    input_encoding,
    human_readable_tags,
    mode,
  }

type CreateTaggingnRequestBody = Partial<
  TranslationApiTypes.RequestBody<"/tagging/">
>
export function createTaggingRequestBody(params: CreateTaggingnRequestBody) {
  return { ...defaultTaggingnRequestBody, ...params }
}

export function createChatProps(
  basePath: string,
  requestBody: TranslationApiTypes.RequestBody<"/translation/">,
): UseChatOptions {
  return {
    api: basePath + streamUtils.paths.translation,
    streamProtocol: "text",
    headers: {
      "Content-Type": "application/json",
    },
    initialInput: requestBody.input_sentence,
    body: requestBody,
  }
}
