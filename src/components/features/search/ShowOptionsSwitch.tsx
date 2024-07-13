"use client"

import React from "react"
import { useTranslations } from "next-intl"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import useMediaQuery from "@mui/material/useMediaQuery"

type ShowOptionsSwitchProps = {
  isSearchOptionsOpen: boolean
  // eslint-disable-next-line no-unused-vars
  handleToggleShowOptions: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ShowOptionsSwitch({
  isSearchOptionsOpen,
  handleToggleShowOptions,
}: ShowOptionsSwitchProps) {
  const t = useTranslations("search")
  const isSmallScreen = useMediaQuery("(max-width:750px)")

  return (
    <FormControlLabel
      control={
        <Switch
          checked={isSearchOptionsOpen}
          onChange={handleToggleShowOptions}
        />
      }
      label={t("optionsSwitchLabel")}
      labelPlacement={isSmallScreen ? "end" : "start"}
    />
  )
}
