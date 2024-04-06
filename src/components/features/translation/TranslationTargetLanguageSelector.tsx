"use client"

import React from "react"
import { useTranslations } from "next-intl"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {
  FormControl,
  MenuItem,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material"
import Grid from "@mui/material/Grid"

import { selectedOptionsStyles } from "@/components/styled"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import {
  apiParamsNames,
  ServedTargetLanguage,
  targetLanguages,
} from "@/utils/api/params"
import customTheming from "@/utils/theme/config"
import { getSettingPriotiryGroups } from "@/utils/ui"

import RadioOption from "./RadioOption"

const [primaryLanguagesOptions, otherLanguagesOptions] =
  getSettingPriotiryGroups({
    setting: targetLanguages,
    noOfPrimaryItems: 3,
  })

export default function TranslationTargetLanguageSelector() {
  const { input, handleInputChange } = useInputWithUrlParam(
    apiParamsNames.translation.target_lang,
  )
  const t = useTranslations("translation")

  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        height: 74,
        px: 2,
        borderLeft: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
        borderTopRightRadius: customTheming.shape.inputRadius,
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: "-16px",
          left: "50%",
          transform: "translateX(-50%)",
          px: 2,
          color: "text.secondary",
          backgroundColor: "background.default",
        }}
      >
        {t("targetLanguageSelectLabel")}
      </Typography>
      <FormControl
        data-testid="target-language-selector"
        component="fieldset"
        sx={{ flexDirection: "row" }}
      >
        <RadioGroup
          aria-label={t("primaryTargetLanguagesAriaLabel")}
          value={input === "" ? targetLanguages[0] : input}
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
            sx: { px: "0 !important" },
          }}
          IconComponent={() => (
            <KeyboardArrowDownIcon
              sx={{ pl: 1, fontSize: "2rem", color: "gray" }}
            />
          )}
          sx={{
            ...(!primaryLanguagesOptions.includes(input as ServedTargetLanguage)
              ? { ...selectedOptionsStyles, color: "primary.main" }
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
    </Grid>
  )
}
