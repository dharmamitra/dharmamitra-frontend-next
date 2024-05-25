"use client"

import React from "react"
import { useTranslations } from "next-intl"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useTheme } from "@mui/material/styles"
import Tooltip from "@mui/material/Tooltip"
import { useSetAtom } from "jotai"

import { triggerTranslationQueryAtom } from "@/atoms"
import CharacterCount from "@/components/CharacterCount"
import useAppConfig from "@/hooks/useAppConfig"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { apiParamsNames } from "@/utils/api/params"

import BoxBottomElementsRow from "../common/BoxBottomElementsRow"

export default function TranslationInputField() {
  const { translationInputLimit } = useAppConfig()
  const t = useTranslations()
  const { input, handleInputChange } = useInputWithUrlParam<string>(
    apiParamsNames.translation.input_sentence,
  )
  const characterLimitReached = React.useMemo(
    () => input.length >= translationInputLimit,
    [input, translationInputLimit],
  )
  const setTriggerTranslationQuery = useSetAtom(triggerTranslationQueryAtom)

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
        onChange={(e) => handleInputChange(e, translationInputLimit)}
        onKeyUp={(event) => {
          if (event.key === "Enter" && event.ctrlKey && input.length > 0) {
            setTriggerTranslationQuery(true)
          }
        }}
      />
      <BoxBottomElementsRow sx={{ justifyContent: "space-between" }}>
        <Tooltip title={t("generic.clear")} placement="top">
          <IconButton
            aria-label={t("generic.clear")}
            color="secondary"
            onClick={() => {
              handleInputChange("", translationInputLimit)
            }}
          >
            <HighlightOffIcon />
          </IconButton>
        </Tooltip>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 0.7,
          }}
        >
          <CharacterCount
            charcaters={input.length}
            characterLimit={translationInputLimit}
            characterLimitReached={characterLimitReached}
          />
          <Tooltip
            title={
              <span>
                {`${t("translation.translate")}`} (Ctrl +
                <span
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: 0.75,
                    paddingBottom: "0.1rem",
                    verticalAlign: "middle",
                  }}
                >
                  ↵
                </span>
                )
              </span>
            }
            placement="top"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [-24, 0],
                    },
                  },
                ],
              },
            }}
          >
            <IconButton
              aria-label={t("translation.translate")}
              color="secondary"
              onClick={() => {
                setTriggerTranslationQuery(true)
              }}
            >
              <KeyboardDoubleArrowRightIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </BoxBottomElementsRow>
    </>
  )
}
