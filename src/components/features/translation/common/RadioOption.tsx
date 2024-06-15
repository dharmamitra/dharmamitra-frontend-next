import { useTranslations } from "next-intl"

import {
  CustomFormControlLabel,
  VisuallyHiddenRadio,
} from "@/components/styled"

export default function RadioOption({
  i18nKey,
  option,
  isSelected,
}: {
  i18nKey: "encodings" | "targetLanguages"
  option: string
  isSelected: boolean
}) {
  const t = useTranslations(`translation.${i18nKey}`)

  return (
    <CustomFormControlLabel
      value={option}
      control={
        <VisuallyHiddenRadio
          id={`${option}-${i18nKey}-option`}
          data-testid={`${option}-${i18nKey}-option`}
        />
      }
      // TODO: remove casting on enpoint update
      label={t(option as keyof Messages["translation"][typeof i18nKey])}
      checked={isSelected}
    />
  )
}
