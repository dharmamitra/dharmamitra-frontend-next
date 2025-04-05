"use client"

import React from "react"
import Box from "@mui/material/Box"
// import { useTranslations } from "next-intl"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import useMediaQuery from "@mui/material/useMediaQuery"

type TransliterationSwitchsProps = {
  devanagariToIASTState: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ]
  tibetanToWylieState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export default function TransliterationSwitchs({
  devanagariToIASTState,
  tibetanToWylieState,
}: TransliterationSwitchsProps) {
  // const t = useTranslations("search")
  const isSmallScreen = useMediaQuery("(max-width:750px)")
  const [isDevanagariToIASTState, setIsDevanagariToIASTState] =
    devanagariToIASTState
  const [isTibetanToWylieState, setIsTibetanToWylieState] = tibetanToWylieState

  const handleToggleDevanagariToIAST = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsDevanagariToIASTState(event.target.checked)
    },
    [setIsDevanagariToIASTState],
  )

  const handleToggleTibetanToWylie = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsTibetanToWylieState(event.target.checked)
    },
    [setIsTibetanToWylieState],
  )

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
        pb: 1,
      }}
    >
      <FormControlLabel
        control={
          <Switch
            color="secondary"
            checked={isDevanagariToIASTState}
            onChange={handleToggleDevanagariToIAST}
          />
        }
        sx={{ ml: 0 }}
        // label={t("optionsSwitchLabel")}
        label="Devanagari to IAST"
        labelPlacement={isSmallScreen ? "end" : "start"}
      />
      <FormControlLabel
        control={
          <Switch
            color="secondary"
            checked={isTibetanToWylieState}
            onChange={handleToggleTibetanToWylie}
          />
        }
        sx={{ ml: 0 }}
        // label={t("optionsSwitchLabel")}
        label="Tibetan to Wylie"
        labelPlacement={isSmallScreen ? "end" : "start"}
      />
    </Box>
  )
}
