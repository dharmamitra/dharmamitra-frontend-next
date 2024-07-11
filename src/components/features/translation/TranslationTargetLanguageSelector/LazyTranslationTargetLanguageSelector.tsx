"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { MenuItem, RadioGroup, Select } from "@mui/material"

import { TranslationApiTypes } from "@/api"
import styles from "@/components/customFocusVisible.module.css"
import {
  flatRadioGroupStyles,
  SecondaryOptionsButtonIcon,
  secondaryOptionsInputStyles,
  selectedOptionsStyles,
} from "@/components/styled"
import useAppConfig from "@/hooks/useAppConfig"
import useFocusHighlight from "@/hooks/useFocusHighlight"
import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import { useResponsiveOptions } from "@/hooks/useResponsiveOptions"
import { getOptionI18nKeyPath, getValidDefaultValue } from "@/utils"
import { translationParamsNames } from "@/utils/api/translation/params"

import RadioOption from "../common/RadioOption"

export default function LazyTranslationTargetLanguageSelector() {
  const { targetLanguages: servedTargetLanguages } =
    useAppConfig().customParamOptions
  const t = useTranslations()

  const { value, handleValueChange, isHydrated } =
    useParamValueWithLocalStorage({
      paramName: translationParamsNames.translation.target_lang,
      defaultValue: getValidDefaultValue(servedTargetLanguages[0]),
    })

  const primaryOptionsSelectorId = "primary-target-language-options"
  useFocusHighlight({
    targetId: primaryOptionsSelectorId,
    styledTargetId: primaryOptionsSelectorId,
    focusInset: "0 4px",
  })
  const secondaryOptionsSelectorId = "secondary-target-language-options"
  useFocusHighlight({
    targetId: secondaryOptionsSelectorId,
    styledTargetId: secondaryOptionsSelectorId + "-wrapper",
    focusInset: "8px -4px 8px -8px",
  })

  const [primaryLanguagesOptions, secondaryLanguagesOptions] =
    useResponsiveOptions(servedTargetLanguages)

  const isPrimaryValueSelected = React.useMemo<boolean>(
    () =>
      primaryLanguagesOptions.includes(
        value as TranslationApiTypes.Schema["TargetLanguage"],
      ),
    [value, primaryLanguagesOptions],
  )

  React.useEffect(() => {
    if (value === "") {
      handleValueChange(servedTargetLanguages[0]!)
    }
  }, [value, handleValueChange, servedTargetLanguages])

  return (
    <>
      <RadioGroup
        id={primaryOptionsSelectorId}
        aria-label={t("translation.primaryTargetLanguagesAriaLabel")}
        value={value}
        onChange={handleValueChange}
        row
        sx={{ ...flatRadioGroupStyles }}
        className={styles.customFocusVisible}
      >
        {primaryLanguagesOptions.map((language) => (
          <RadioOption
            key={language + "-primary-target-language-option"}
            id={language + "-primary-target-language-option"}
            option={language}
            label={t(getOptionI18nKeyPath(language))}
            isSelected={isHydrated && value === language}
          />
        ))}
      </RadioGroup>

      <div
        id={secondaryOptionsSelectorId + "-wrapper"}
        className={styles.customFocusVisible}
        style={{ position: "relative" }}
      >
        <Select
          id={secondaryOptionsSelectorId}
          data-testid="secondary-target-language-options"
          aria-label={t("translation.secondaryTargetLanguagesAriaLabel")}
          value={isPrimaryValueSelected ? "" : value}
          onChange={handleValueChange}
          inputProps={{
            "aria-label": t("translation.secondaryTargetLanguagesAriaLabel"),
            sx: secondaryOptionsInputStyles,
          }}
          IconComponent={() => <SecondaryOptionsButtonIcon />}
          sx={{
            ...secondaryOptionsInputStyles,
            ...(isHydrated && !isPrimaryValueSelected
              ? { ...selectedOptionsStyles, color: "secondary.main" }
              : {}),
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          //
          displayEmpty
        >
          <MenuItem disabled value="" className={styles.test}>
            {t("generic.other")}
          </MenuItem>
          {secondaryLanguagesOptions.map((language) => (
            <MenuItem
              key={language + "-secondary-target-language-option"}
              data-testid={`${language}-target-language-option`}
              value={language}
            >
              {t(
                `translation.targetLanguages.${language as keyof Messages["translation"]["targetLanguages"]}`,
              )}
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  )
}
