import React from "react"

import {
  CustomFormControlLabel,
  VisuallyHiddenRadio,
} from "@/components/styled"
import {
  TargetLanguage,
  TranslationInputEncoding,
} from "@/utils/api/translation/params"

export default function RadioOption({
  id,
  option,
  isSelected,
  label,
}: {
  id: string
  option: TranslationInputEncoding | TargetLanguage
  isSelected: boolean
  label: string
}) {
  return (
    <CustomFormControlLabel
      id={`styled-${id}`}
      value={option}
      control={<VisuallyHiddenRadio id={id} data-testid={id} />}
      label={label}
      checked={isSelected}
    />
  )
}
