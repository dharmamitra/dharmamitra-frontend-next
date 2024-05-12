import { useTranslations } from "next-intl"

import {
  CustomFormControlLabel,
  VisuallyHiddenRadio,
} from "@/components/styled"

export default function RadioOptionButtonGroup({
  i18nKey,
  option,
  isSelected,
}: {
  i18nKey: "models" | "grammar"
  option: string
  isSelected: boolean
}) {
  const t = useTranslations(`translation.${i18nKey}`)

  return (
    <CustomFormControlLabel
      value={option}
      control={
        <VisuallyHiddenRadio
          id={`${option}-input-encoding-option`}
          data-testid={`${option}-input-encoding-option`}
        />
      }
      // TODO: remove casting on enpoint update
      label={t(option as keyof Messages["translation"][typeof i18nKey])}
      checked={isSelected}
    />
  )
}
