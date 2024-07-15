"use client"

import React from "react"
import { useTranslations } from "next-intl"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useTheme } from "@mui/material/styles"

import ClearButton from "@/components/ClearButton"
import useTranslationCommonParams from "@/hooks/translation/useTranslationCommonParams"

import BoxBottomElementsRow from "../common/BoxBottomElementsRow"
import StartStopButton from "../TranslationStartStopButton"

export default function TranslationInputField() {
  const t = useTranslations()

  const { translationInput, setTranslationInput } = useTranslationCommonParams()
  const theme = useTheme()

  return (
    <>
      <OutlinedInput
        sx={{
          width: "100%",
          height: "100%",
          alignItems: "flex-start",
          borderTopRightRadius: "none",
          borderBottomRightRadius: "none",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          borderRadius: theme.custom.shape.inputRadius,
        }}
        placeholder={t("translation.placeholder")}
        inputProps={{
          "data-testid": "translation-input",
          "aria-label": t("translation.inputAriaLabel"),
          sx: {
            height: "calc(fit-content) !important",
            mb: "2.5rem !important",
          },
        }}
        multiline
        value={translationInput}
        onChange={(e) => setTranslationInput(e)}
      />

      <BoxBottomElementsRow sx={{ justifyContent: "space-between" }}>
        <ClearButton
          value={translationInput}
          handleValueChange={setTranslationInput}
        />

        <StartStopButton />
      </BoxBottomElementsRow>
    </>
  )
}
