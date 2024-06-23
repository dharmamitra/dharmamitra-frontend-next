import React from "react"
import { useTranslations } from "next-intl"

import {
  CustomFormControlLabel,
  VisuallyHiddenRadio,
} from "@/components/styled"
import {
  allTargetLanguages,
  InputEncoding,
  inputEncodings,
  TargetLanguage,
} from "@/utils/api/params"

const getI18nKey = (option: InputEncoding | TargetLanguage) => {
  if (inputEncodings.includes(option as InputEncoding))
    return "commonStreamParams.encodings"
  if (allTargetLanguages.includes(option as TargetLanguage))
    return "translation.targetLanguages"

  throw new Error("Invalid InputEncoding or TargetLanguage option")
}

export default function RadioOption({
  id,
  option,
  isSelected,
}: {
  id: string
  option: InputEncoding | TargetLanguage
  isSelected: boolean
}) {
  const t = useTranslations(getI18nKey(option))

  return (
    <CustomFormControlLabel
      id={`styled-${id}`}
      value={option}
      control={<VisuallyHiddenRadio id={id} data-testid={id} />}
      label={t(option)}
      checked={isSelected}
    />
  )
}
