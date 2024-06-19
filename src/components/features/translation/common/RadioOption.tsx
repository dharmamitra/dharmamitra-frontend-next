import React from "react"
import { useTranslations } from "next-intl"

import {
  CustomFormControlLabel,
  VisuallyHiddenRadio,
} from "@/components/styled"

export default function RadioOption({
  id,
  i18nKey,
  option,
  isSelected,
}: {
  id: string
  i18nKey: "encodings" | "targetLanguages"
  option: string
  isSelected: boolean
}) {
  const t = useTranslations(`translation.${i18nKey}`)

  return (
    <CustomFormControlLabel
      id={`styled-${id}`}
      value={option}
      control={<VisuallyHiddenRadio id={id} data-testid={id} />}
      // TODO: remove casting on enpoint update
      label={t(option as keyof Messages["translation"][typeof i18nKey])}
      checked={isSelected}
    />
  )
}
