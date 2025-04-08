import { parseAsStringLiteral, useQueryState } from "nuqs"

import { defaultModelType, modelTypes } from "@/utils/api/global/params"
import { translationParamsNames } from "@/utils/api/translation/params"

const {
  translation: { model },
} = translationParamsNames

export function useTranslationModelParam() {
  return useQueryState(model, {
    ...parseAsStringLiteral(modelTypes).withDefault(defaultModelType),
  })
}
