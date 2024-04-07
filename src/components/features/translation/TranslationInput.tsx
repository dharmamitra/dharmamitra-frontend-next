"use client"

import { useTranslations } from "next-intl"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import IconButton from "@mui/material/IconButton"
import OutlinedInput from "@mui/material/OutlinedInput"
import Tooltip from "@mui/material/Tooltip"
import { useSetAtom } from "jotai"

import { triggerTranslationQueryAtom } from "@/atoms"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { apiParamsNames } from "@/utils/api/params"
import customTheming from "@/utils/theme/config"

export default function TranslationInput() {
  const t = useTranslations("translation")
  const { input, handleInputChange } = useInputWithUrlParam(
    apiParamsNames.translation.input_sentence,
  )
  const setTriggerTranslationQuery = useSetAtom(triggerTranslationQueryAtom)

  const rows = 16

  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        position: "relative",
        minHeight: `${rows * 2}rem`,
      }}
    >
      <OutlinedInput
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
          overflow: "clip",
          borderTopRightRadius: "none",
          borderBottomRightRadius: "none",
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          borderRadius: customTheming.shape.inputRadius,
          fontSize: customTheming.typography.reader?.fontSize,
        }}
        placeholder={t("placeholder")}
        inputProps={{
          "data-testid": "translation-input",
          "aria-label": t("inputAriaLabel"),
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
          bottom: "1rem",
          right: "1rem",
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
    </Grid>
  )
}
