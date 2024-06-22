import React from "react"
import { useTranslations } from "next-intl"
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
  primary: { list: primaryFilterLanguages, i18nKey: "search.primaryLanguages" },
  secondary: {
    list: tempSecondaryFilterLanguages,
    i18nKey: "search.secondaryLanguages",
  },
} as const

type I18nKey =
  | typeof languages.primary.i18nKey
  | typeof languages.secondary.i18nKey

type Language = keyof Messages["search"][I18nKey extends `search.${infer K}`
  ? K
  : never]

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

  const optionSet = languages[dataSource as keyof typeof languages]
  const options = optionSet.list
  const t = useTranslations(optionSet.i18nKey)

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
        {options.map((language) => (
          <ToggleButton
            key={language + "data-language-option"}
            value={language}
          >
            {t(`${language as Language}`)}
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
