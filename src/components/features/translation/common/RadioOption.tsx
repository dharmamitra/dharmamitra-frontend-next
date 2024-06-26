import React from "react"

import {
  CustomFormControlLabel,
  VisuallyHiddenRadio,
} from "@/components/styled"
import { InputEncoding, TargetLanguage } from "@/utils/api/params"

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
