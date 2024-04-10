"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { FormControl, MenuItem, RadioGroup, Select } from "@mui/material"

import {
  OtherOptionsButtonIcon,
  OtherOptionsInputStyles,
  selectedOptionsStyles,
  SettingBlock,
  SettingBlockLabel,
} from "@/components/styled"
import useInputWithLocalStorage from "@/hooks/useInputWithLocalStorage"
import { useResponsiveOptions } from "@/hooks/useResponsiveOptions"
import {
  apiParamsNames,
  ServedTargetLanguage,
  targetLanguages,
} from "@/utils/api/params"

import RadioOption from "./RadioOption"

export default function TranslationTargetLanguageSelector() {
  const t = useTranslations("translation")

  const { input, handleInputChange, isHydrated } = useInputWithLocalStorage({
    paramName: apiParamsNames.translation.target_lang,
    defaultValue: targetLanguages[0],
  })

  const [primaryLanguagesOptions, otherLanguagesOptions] =
    useResponsiveOptions(targetLanguages)

  const isPrimaryValueSelected = React.useMemo<boolean>(
    () => primaryLanguagesOptions.includes(input as ServedTargetLanguage),
    [input, primaryLanguagesOptions],
  )

  React.useEffect(() => {
    if (input === "") {
      handleInputChange(targetLanguages[0])
    }
  }, [input, handleInputChange])

  return (
    <SettingBlock item xs={12} md={6} placement="end" isHydrated={isHydrated}>
      <SettingBlockLabel>{t("targetLanguageSelectLabel")}</SettingBlockLabel>
      <FormControl
        data-testid="target-language-selector"
        component="fieldset"
        sx={{ flexDirection: "row" }}
      >
        <RadioGroup
          aria-label={t("primaryTargetLanguagesAriaLabel")}
          value={input}
          onChange={handleInputChange}
          row
        >
          {primaryLanguagesOptions.map((language) => (
            <RadioOption
              key={language + "-primary-target-language-option"}
              i18nKey="targetLanguages"
              option={language}
              isSelected={isHydrated && input === language}
            />
          ))}
        </RadioGroup>
        <Select
          data-testid="other-target-language-options"
          aria-label={t("otherTargetLanguagesAriaLabel")}
          value={isPrimaryValueSelected ? "" : input}
          onChange={handleInputChange}
          inputProps={{
            "aria-label": t("otherTargetLanguagesAriaLabel"),
            sx: OtherOptionsInputStyles,
          }}
          IconComponent={() => <OtherOptionsButtonIcon />}
          sx={{
            ...(isHydrated && !isPrimaryValueSelected
              ? { ...selectedOptionsStyles, color: "secondary.main" }
              : {}),
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          displayEmpty
        >
          <MenuItem disabled value="">
            {t("otherLabel")}
          </MenuItem>
          {otherLanguagesOptions.map((language) => (
            <MenuItem
              key={language + "-other-target-language-option"}
              data-testid={`${language}-target-language-option`}
              value={language}
            >
              {t(
                `targetLanguages.${language as keyof Messages["translation"]["targetLanguages"]}`,
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SettingBlock>
  )
}
