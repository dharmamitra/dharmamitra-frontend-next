// import { useTranslations } from "next-intl"

import React from "react"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { IconButton } from "@mui/material"
import Box from "@mui/material/Box"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import { primaryFilterLanguages } from "@/utils/api/params"

import OpenSubOptionsButton from "./OpenSubOptionsButton"

const tempSecondaryFilterLanguages = [
  "Tibetan-Chinese",
  "Tibetan-English",
  "Sanskrit-English",
  "Sanskrit-Tibetan",
]

const languages = {
  primary: primaryFilterLanguages,
  secondary: tempSecondaryFilterLanguages,
}

type Props = {
  isShown: boolean
  isSmallScreen: boolean
  value: string | null
  dataSource: string
  /* eslint-disable-next-line no-unused-vars */
  hangleChange: (value: string | null) => void
  isSubOptionOpen: boolean
  setShowSubOption: React.Dispatch<React.SetStateAction<boolean>>
  closeFilterOptions: () => void
}

export default function LanguageFilterOptions({
  isShown,
  isSmallScreen,
  value,
  dataSource,
  hangleChange,
  isSubOptionOpen,
  setShowSubOption,
  closeFilterOptions,
}: Props) {
  if (!isShown || !(dataSource in languages)) return null

  const languagesFilters = languages[dataSource as keyof typeof languages]
  //   const t = useTranslations("search")

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <ToggleButtonGroup
        orientation={isSmallScreen ? "vertical" : "horizontal"}
        color="secondary"
        size="small"
        value={value}
        exclusive
        onChange={(event, value) => hangleChange(value)}
        aria-label="Data Source"
      >
        {languagesFilters.map((language) => (
          <ToggleButton
            key={language + "data-language-option"}
            value={language}
          >
            {/* {t(`sources.${source}`)} */}
            {language}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Box
        sx={{
          display: "flex",
          alignItems: isSmallScreen ? "flex-end" : "center",
        }}
      >
        <OpenSubOptionsButton
          isShown={!isSubOptionOpen}
          setShowSubOption={setShowSubOption}
        />

        <IconButton size="small" onClick={closeFilterOptions}>
          <HighlightOffIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
