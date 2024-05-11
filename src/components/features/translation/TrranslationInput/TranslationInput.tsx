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
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import useResponsiveContentRows from "@/hooks/useResponsiveContentRows"
import { apiParamsNames } from "@/utils/api/params"
import { translationInputLimit } from "@/utils/ui"

import BoxBottomElementsRow from "../BoxBottomElementsRow"

export default function TranslationInput() {
  const t = useTranslations()
  const { input, handleInputChange } = useInputWithUrlParam(
    apiParamsNames.translation.input_sentence,
  )
  const limitReached = React.useMemo(
    () => input.length >= translationInputLimit,
    [input],
  )
  const setTriggerTranslationQuery = useSetAtom(triggerTranslationQueryAtom)

  const rows = useResponsiveContentRows()
  const theme = useTheme()

  return (
    <>
      <OutlinedInput
        sx={{
          width: "100%",
          height: "100%",
          overflow: "clip",
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
            // TODO: fix quick and dirty `reader` theme font-size hack!
            height: {
              xs: `calc(${rows} * 1.56rem) !important`,
              sm: `calc(${rows} * 1.4rem) !important`,
              md: `calc(${rows} * 1.58rem) !important`,
            },
            fontSize: {
              xs: "1.15rem !important",
              sm: `1.25rem !important`,
              md: `1.35rem !important`,
            },
            lineHeight: `1.5 !important`,
          },
        }}
        rows={rows}
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
            limit={translationInputLimit}
            limitReached={limitReached}
          />
          <Tooltip
            title={
              <span>
                {t("translation.translate")} (Ctrl +
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
