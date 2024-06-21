import React from "react"
import { useTranslations } from "next-intl"

import {
  CustomFormControlLabel,
  VisuallyHiddenRadio,
} from "@/components/styled"
import { CustomSelectOption } from "@/utils/api/types"

export default function RadioOption({
  id,
  i18nKey,
  option,
  isSelected,
}: {
  id: string
  i18nKey: "commonStreamParams.encodings" | "translation.targetLanguages"
  option: string
  isSelected: boolean
}) {
  const t = useTranslations(i18nKey)

  return (
    <CustomFormControlLabel
      id={`styled-${id}`}
      value={option}
      control={<VisuallyHiddenRadio id={id} data-testid={id} />}
      label={t(option as CustomSelectOption)}
      checked={isSelected}
    />
  )
}
