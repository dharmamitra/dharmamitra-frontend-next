"use client"

import React from "react"
import { useTranslations } from "next-intl"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import IconButton from "@mui/material/IconButton"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useTheme } from "@mui/material/styles"
import Tooltip from "@mui/material/Tooltip"

import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { translationParamsNames } from "@/utils/api/translation/params"

import BoxBottomElementsRow from "../common/BoxBottomElementsRow"
import StartStopButton from "../TranslationStartStopButton"

export default function TranslationInputField() {
  const t = useTranslations()
  const { input, handleValueChange } = useInputWithUrlParam<string>(
    translationParamsNames.translation.input_sentence,
  )

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
        value={input}
        onChange={(e) => handleValueChange(e)}
      />

      <BoxBottomElementsRow sx={{ justifyContent: "space-between" }}>
        <Tooltip title={t("generic.clear")} placement="top">
          <IconButton
            aria-label={t("generic.clear")}
            color="secondary"
            onClick={() => {
              handleValueChange("")
            }}
          >
            <HighlightOffIcon />
          </IconButton>
        </Tooltip>

        <StartStopButton />
      </BoxBottomElementsRow>
    </>
  )
}
