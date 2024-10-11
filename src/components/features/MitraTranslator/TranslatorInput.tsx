"use client"

import React from "react"
import { useTranslations } from "next-intl"
import OutlinedInput from "@mui/material/OutlinedInput"

type TranslationInputFieldProps = {
  input: string
  // eslint-disable-next-line no-unused-vars
  setInput: (event: string) => void
}

const TranslatorInput = ({ input, setInput }: TranslationInputFieldProps) => {
  const t = useTranslations()

  return (
    <OutlinedInput
      sx={{
        p: 0,
        pt: 1.5,
        display: "grid",
        minHeight: "100%",
        width: "100%",
        height: "100%",
        alignItems: "flex-start",
        borderTopRightRadius: "none",
        borderBottomRightRadius: "none",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
      placeholder={t("translation.placeholder")}
      inputProps={{
        "data-testid": "translation-input",
        "aria-label": t("translation.inputAriaLabel"),
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
