"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { MenuItem, RadioGroup, Select } from "@mui/material"

import { DMApiTypes } from "@/api"
import {
  OtherOptionsButtonIcon,
  OtherOptionsInputStyles,
  selectedOptionsStyles,
} from "@/components/styled"
import useAppConfig from "@/hooks/useAppConfig"
import useInputWithLocalStorage from "@/hooks/useInputWithLocalStorage"
import { useResponsiveOptions } from "@/hooks/useResponsiveOptions"
import { apiParamsNames } from "@/utils/api/params"

import RadioOption from "../common/RadioOption"

export default function TranslationTargetLanguageSelector() {
  const { targetLanguages: servedTargetLanguages } = useAppConfig().paramOptions
  const t = useTranslations("translation")

  const { input, handleInputChange, isHydrated } = useInputWithLocalStorage({
    paramName: apiParamsNames.translation.target_lang,
    defaultValue: servedTargetLanguages[0]!,
  })

  const [primaryLanguagesOptions, otherLanguagesOptions] = useResponsiveOptions(
    servedTargetLanguages,
  )

  const isPrimaryValueSelected = React.useMemo<boolean>(
    () =>
      primaryLanguagesOptions.includes(
        input as DMApiTypes.Schema["TargetLanguage"],
      ),
    [input, primaryLanguagesOptions],
  )

  React.useEffect(() => {
    if (input === "") {
      handleInputChange(servedTargetLanguages[0]!)
    }
  }, [input, handleInputChange, servedTargetLanguages])

  return (
    <>
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
    </>
  )
}
