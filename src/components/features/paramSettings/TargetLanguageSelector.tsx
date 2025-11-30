"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { Box, MenuItem, RadioGroup, Select, Tooltip } from "@mui/material"

import RadioOption from "../../RadioOption"

import styles from "@/components/customFocusVisible.module.css"
import {
  flatRadioGroupStyles,
  SecondaryOptionsButtonIcon,
  secondaryOptionsInputStyles,
  selectedOptionsStyles,
} from "@/components/styled-ssr-safe"
import { useTargetLangParamWithLocalStorage } from "@/hooks/params"
import { useResponsiveOptions } from "@/hooks/responsiveLayout"
import useAppConfig from "@/hooks/useAppConfig"
import useFocusHighlight from "@/hooks/useFocusHighlight"
import { getOptionI18nKeyPath } from "@/utils"

export default function TargetLanguageSelector() {
  const t = useTranslations()

  const { targetLanguages: servedTargetLanguages } = useAppConfig().customParamOptions
  const [targetLanguageParam, setTargetLanguageParam] = useTargetLangParamWithLocalStorage()

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
    () => primaryLanguagesOptions.includes(targetLanguageParam),
    [targetLanguageParam, primaryLanguagesOptions],
  )

  return (
    <Tooltip
      title={t("translation.targetLanguageSelectLabel")}
      placement="top-start"
      enterDelay={1000}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -24],
              },
            },
          ],
        },
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          px: 1,
        }}
      >
        <RadioGroup
          id={primaryOptionsSelectorId}
          aria-label={t("translation.primaryTargetLanguagesAriaLabel")}
          value={targetLanguageParam}
          onChange={(event) => setTargetLanguageParam(event.target.value)}
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
              isSelected={targetLanguageParam === language}
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
            value={isPrimaryValueSelected || !targetLanguageParam ? "" : targetLanguageParam}
            onChange={(event) => setTargetLanguageParam(event.target.value)}
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
      </Box>
    </Tooltip>
  )
}
