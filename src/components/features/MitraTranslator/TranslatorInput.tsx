"use client"

import React from "react"
import { useTranslations } from "next-intl"
import OutlinedInput from "@mui/material/OutlinedInput"

import { TargetLanguage } from "@/utils/api/translation/params"

type TranslationInputFieldProps = {
  input: string
  targetLang: TargetLanguage

  setInput: (event: string) => void
}

const TranslatorInput = ({
  input,
  setInput,
  targetLang,
}: TranslationInputFieldProps) => {
  const t = useTranslations("translation")

  const placeholder =
    targetLang === "english-explained"
      ? t("placeholders.englishExplained")
      : t("placeholders.default")

  return (
    <OutlinedInput
      sx={{
        p: 0,
        pt: 1.5,
        display: "grid",
        minHeight: "100%",
        width: "100%",
        alignItems: "flex-start",
        borderTopRightRadius: "none",
        borderBottomRightRadius: "none",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
      placeholder={placeholder}
      inputProps={{
        "data-testid": "translation-input",
        "aria-label": t("inputAriaLabel"),
        sx: {
          height: "calc(fit-content) !important",
        },
      }}
      multiline
      value={input}
      onChange={(event) => setInput(event.target.value)}
    />
  )
}

export default TranslatorInput
