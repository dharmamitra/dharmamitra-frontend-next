"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { FormControl, MenuItem, RadioGroup, Select } from "@mui/material"

import {
  OptionBlock,
  OptionBlockLabel,
  OtherOptionsButtonIcon,
  OtherOptionsInputStyles,
  selectedOptionsStyles,
} from "@/components/styled"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { useResponsiveOptions } from "@/hooks/useResponsiveOptions"
import {
  apiParamsNames,
  ServedTargetLanguage,
  targetLanguages,
} from "@/utils/api/params"

import RadioOption from "./RadioOption"

export default function TranslationTargetLanguageSelector() {
  const { input, handleInputChange } = useInputWithUrlParam(
    apiParamsNames.translation.target_lang,
  )
  const [primaryLanguagesOptions, otherLanguagesOptions] =
    useResponsiveOptions(targetLanguages)

  const t = useTranslations("translation")

  React.useEffect(() => {
    if (input === "") {
      handleInputChange(targetLanguages[0])
    }
  }, [input, handleInputChange])

  return (
    <OptionBlock item xs={12} md={6} placement="end">
      <OptionBlockLabel>{t("targetLanguageSelectLabel")}</OptionBlockLabel>
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
              input={input}
            />
          ))}
        </RadioGroup>
        <Select
          data-testid="other-target-language-options"
          aria-label={t("otherTargetLanguagesAriaLabel")}
          value={
            primaryLanguagesOptions.includes(input as ServedTargetLanguage)
              ? ""
              : input
          }
          onChange={handleInputChange}
          inputProps={{
            "aria-label": t("otherTargetLanguagesAriaLabel"),
            sx: OtherOptionsInputStyles,
          }}
          IconComponent={() => <OtherOptionsButtonIcon />}
          sx={{
            ...(!primaryLanguagesOptions.includes(input as ServedTargetLanguage)
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
    </OptionBlock>
  )
}
