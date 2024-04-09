"use client"

import { useTranslations } from "next-intl"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import OutlinedInput from "@mui/material/OutlinedInput"
import { useTheme } from "@mui/material/styles"
import Tooltip from "@mui/material/Tooltip"
import { useSetAtom } from "jotai"

import { triggerTranslationQueryAtom } from "@/atoms"
import { TranslationContentBox } from "@/components/styled"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import useResponsiveContentRows from "@/hooks/useResponsiveContentRows"
import { apiParamsNames } from "@/utils/api/params"

export default function TranslationInput() {
  const t = useTranslations("translation")
  const { input, handleInputChange } = useInputWithUrlParam(
    apiParamsNames.translation.input_sentence,
  )
  const setTriggerTranslationQuery = useSetAtom(triggerTranslationQueryAtom)

  const rows = useResponsiveContentRows()
  const theme = useTheme()

  return (
    <TranslationContentBox
      item
      xs={12}
      md={6}
      rows={rows}
      sx={{
        borderBottomLeftRadius: { md: theme.custom.shape.inputRadius },
      }}
    >
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
        placeholder={t("placeholder")}
        inputProps={{
          "data-testid": "translation-input",
          "aria-label": t("inputAriaLabel"),
          sx: {
            // TODO: fix quick and dirty `reader` theme font-size hack!
            fontSize: {
              xs: "1.15rem !important",
              sm: `1.25rem !important`,
              md: `1.35rem !important`,
            },
          },
        }}
        rows={rows}
        multiline
        value={input}
        onChange={handleInputChange}
        onKeyUp={(event) => {
          if (event.key === "Enter" && event.ctrlKey && input.length > 0) {
            setTriggerTranslationQuery(true)
          }
        }}
      />
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          bottom: { xs: "0.25rem", md: "0.75rem" },
          right: { xs: "0.25rem", md: "0.75rem" },
        }}
      >
        <Tooltip title={`${t("translate")} (Ctrl + Enter)`} placement="top">
          <IconButton
            aria-label={t("translate")}
            color="secondary"
            onClick={() => {
              setTriggerTranslationQuery(true)
            }}
          >
            <KeyboardDoubleArrowRightIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </TranslationContentBox>
  )
}
