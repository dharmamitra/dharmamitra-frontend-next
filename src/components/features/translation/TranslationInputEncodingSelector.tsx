"use client"

import React from "react"
import { useTranslations } from "next-intl"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { FormControl, MenuItem, RadioGroup, Select } from "@mui/material"
import Grid from "@mui/material/Grid"

import { selectedOptionsStyles } from "@/components/styled"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { apiParamsNames, inputEncodings } from "@/utils/api/params"
import customTheming from "@/utils/theme/config"
import {
  encodingKeys,
  otherEncodingOptions,
  primaryEncodingOptions,
} from "@/utils/ui"

import RadioOption from "./RadioOption"

export default function TranslationInputEncodingSelector() {
  const { input, handleInputChange } = useInputWithUrlParam(
    apiParamsNames.translation.input_encoding,
  )
  const t = useTranslations("translation")
  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        px: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        borderTopLeftRadius: customTheming.shape.inputRadius,
      }}
    >
      <FormControl
        data-testid="input-encoding-selector"
        component="fieldset"
        sx={{ flexDirection: "row" }}
      >
        <RadioGroup
          name="primary-encodings"
          aria-label={t("primaryEncodingsAriaLabel")}
          value={input ? input : encodingKeys[0]}
          onChange={(e) =>
            handleInputChange(
              inputEncodings[e.target.value as keyof typeof inputEncodings]!,
            )
          }
          row
        >
          {primaryEncodingOptions.map((option) => (
            <RadioOption
              key={option + "-primary-encoding-option"}
              i18nKey="encodings"
              option={option}
              input={input}
            />
          ))}
        </RadioGroup>
        <Select
          data-testid={`other-input-encoding-options`}
          value={primaryEncodingOptions.includes(input) ? "" : input}
          onChange={(e) =>
            handleInputChange(
              inputEncodings[e.target.value as keyof typeof inputEncodings]!,
            )
          }
          inputProps={{
            "aria-label": t("otherEncodingsAriaLabel"),
            sx: { px: "0 !important" },
          }}
          IconComponent={() => (
            <KeyboardArrowDownIcon
              sx={{ pl: 1, fontSize: "2rem", color: "gray" }}
            />
          )}
          sx={{
            ...(!primaryEncodingOptions.includes(input)
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
          {otherEncodingOptions.map((option) => (
            <MenuItem
              key={option + "-other-encoding-encoding"}
              data-testid={`${option}-input-encoding-option`}
              value={option}
            >
              {t(
                `encodings.${option as keyof Messages["translation"]["encodings"]}`,
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
}
