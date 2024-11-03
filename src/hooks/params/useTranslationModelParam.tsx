import { parseAsStringLiteral, useQueryState } from "nuqs"

import { useTranslationModelsData } from "@/hooks/translation/useTranslationModelsData"
import {
  defaultTranslationModel,
  translationParamsNames,
} from "@/utils/api/translation/params"

const {
  translation: { model },
} = translationParamsNames

export function useTranslationModelParam() {
  const { models } = useTranslationModelsData()
  return useQueryState(model, {
    ...parseAsStringLiteral(models).withDefault(defaultTranslationModel),
  })
}
