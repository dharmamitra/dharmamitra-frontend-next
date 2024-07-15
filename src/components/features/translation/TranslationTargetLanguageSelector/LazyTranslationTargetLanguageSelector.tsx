"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { MenuItem, RadioGroup, Select } from "@mui/material"

import styles from "@/components/customFocusVisible.module.css"
import {
  flatRadioGroupStyles,
  SecondaryOptionsButtonIcon,
  secondaryOptionsInputStyles,
  selectedOptionsStyles,
} from "@/components/styled"
import useTranslationEndpointParams from "@/hooks/translation/useTranslationEndpointParams"
import useAppConfig from "@/hooks/useAppConfig"
import useFocusHighlight from "@/hooks/useFocusHighlight"
import { useResponsiveOptions } from "@/hooks/useResponsiveOptions"
import { getOptionI18nKeyPath } from "@/utils"

import RadioOption from "../common/RadioOption"

export default function LazyTranslationTargetLanguageSelector() {
  const t = useTranslations()

  const { targetLanguages: servedTargetLanguages } =
    useAppConfig().customParamOptions
  const { targetLanguage, setTargetLanguage } = useTranslationEndpointParams()

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
    () => primaryLanguagesOptions.includes(targetLanguage),
    [targetLanguage, primaryLanguagesOptions],
  )

  return (
    <>
      <RadioGroup
        id={primaryOptionsSelectorId}
        aria-label={t("translation.primaryTargetLanguagesAriaLabel")}
        value={targetLanguage}
        onChange={setTargetLanguage}
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
            isSelected={targetLanguage === language}
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
          value={
            isPrimaryValueSelected || !targetLanguage ? "" : targetLanguage
          }
          onChange={setTargetLanguage}
          inputProps={{
            "aria-label": t("translation.secondaryTargetLanguagesAriaLabel"),
            sx: secondaryOptionsInputStyles,
          }}
          IconComponent={() => <SecondaryOptionsButtonIcon />}
          sx={{
            ...secondaryOptionsInputStyles,
            ...(!isPrimaryValueSelected
              ? { ...selectedOptionsStyles, color: "secondary.main" }
              : {}),
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
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
              {t(`translation.targetLanguages.${language}`)}
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  )
}
