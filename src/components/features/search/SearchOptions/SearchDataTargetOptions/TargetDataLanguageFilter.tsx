import React from "react"
import { useTranslations } from "next-intl"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { IconButton } from "@mui/material"
import Box from "@mui/material/Box"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

import {
  DataTargetLanguage,
  primaryDataTargetLanguages,
  SearchDataTarget,
  tempSecondaryDataTargetLanguages,
} from "@/utils/api/params"

import OpenSubOptionsButton from "./OpenSubOptionsButton"

const getOptions = (searchTarget: SearchDataTarget) => {
  switch (searchTarget) {
    case "primary":
      return {
        options: primaryDataTargetLanguages,
        i18nKey: "search.primaryLanguages" as const,
      }
    case "secondary":
      return {
        options: tempSecondaryDataTargetLanguages,
        i18nKey: "search.secondaryLanguages" as const,
      }
    default:
      return {}
  }
}

type TargetDataLanguageFilterProps = {
  isSmallScreen: boolean
  value: DataTargetLanguage | null
  searchTarget: SearchDataTarget
  /* eslint-disable-next-line no-unused-vars */
  hangleChange: (value: string | null) => void
  isSubOptionOpen: boolean
  setShowSubOption: React.Dispatch<React.SetStateAction<boolean>>
  closeFilterOptions: () => void
}

type LanguageSelectorProps = Omit<
  TargetDataLanguageFilterProps,
  "searchTarget"
> & {
  options: DataTargetLanguage[]
  i18nKey: "search.primaryLanguages" | "search.secondaryLanguages"
}

const LanguageSelector = ({
  isSmallScreen,
  value,
  hangleChange,
  isSubOptionOpen,
  setShowSubOption,
  closeFilterOptions,
  options,
  i18nKey,
}: LanguageSelectorProps) => {
  const t = useTranslations(i18nKey)

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
            {t(`${language}`)}
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

export default function TargetDataLanguageFilter({
  searchTarget,
  ...rest
}: TargetDataLanguageFilterProps) {
  const { options, i18nKey } = getOptions(searchTarget)

  if (!options) return null

  return <LanguageSelector {...rest} options={options} i18nKey={i18nKey} />
}
