import { useTranslations } from "next-intl"

import {
  CustomFormControlLabel,
  VisuallyHiddenRadio,
} from "@/components/styled"

export default function RadioOption({
  i18nKey,
  option,
  input,
}: {
  i18nKey: "encodings" | "targetLanguages"
  option: string
  input: string
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
      checked={input === option}
    />
  )
}
