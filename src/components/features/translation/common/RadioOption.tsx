import React from "react"

import {
  CustomFormControlLabel,
  VisuallyHiddenRadio,
} from "@/components/styled"
import { InputEncoding } from "@/utils/api/global/params"
import { TargetLanguage } from "@/utils/api/translation/params"

export default function RadioOption({
  id,
  option,
  isSelected,
  label,
}: {
  id: string
  option: InputEncoding | TargetLanguage
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
