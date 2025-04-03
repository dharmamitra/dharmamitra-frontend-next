"use client"

import React from "react"
// import { useTranslations } from "next-intl"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import useMediaQuery from "@mui/material/useMediaQuery"

// type DevanagariToIASTSwitchProps = {
//   isSearchControlsOpen: boolean

//   handleToggleDevanagariToIAST: (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => void
// }

export default function DevanagariToIASTSwitch() {
  // const t = useTranslations("search")
  const isSmallScreen = useMediaQuery("(max-width:750px)")
  const [isChecked, setIsChecked] = React.useState(false)

  const handleToggleDevanagariToIAST = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsChecked(event.target.checked)
    },
    [setIsChecked],
  )
  return (
    <FormControlLabel
      control={
        <Switch
          color="secondary"
          checked={isChecked}
          onChange={handleToggleDevanagariToIAST}
        />
      }
      sx={{ ml: 0 }}
      // label={t("optionsSwitchLabel")}
      label="Devanagari to IAST"
      labelPlacement={isSmallScreen ? "end" : "start"}
    />
  )
}
