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
import { apiParamsNames, inputEncodings } from "@/utils/api/params"

import RadioOption from "./RadioOption"

export default function TranslationInputEncodingSelector() {
  const { input, handleInputChange } = useInputWithUrlParam(
    apiParamsNames.translation.input_encoding,
  )

  const [primaryEncodingOptions, otherEncodingOptions] =
    useResponsiveOptions(inputEncodings)

  const t = useTranslations("translation")

  React.useEffect(() => {
    if (input === "") {
      handleInputChange(inputEncodings[0]!)
    }
  }, [input, handleInputChange])

  return (
    <OptionBlock item xs={12} md={6} placement="start">
      <OptionBlockLabel>{t("encodingSelectLabel")}</OptionBlockLabel>
      <FormControl
        data-testid="input-encoding-selector"
        component="fieldset"
        sx={{ flexDirection: "row" }}
      >
        <RadioGroup
          aria-label={t("primaryEncodingsAriaLabel")}
          value={input ? input : inputEncodings[0]}
          onChange={(e) => handleInputChange(e.target.value)}
          row
        >
          {primaryEncodingOptions.map((encoding) => (
            <RadioOption
              key={encoding + "-primary-encoding-option"}
              i18nKey="encodings"
              option={encoding}
              input={input}
            />
          ))}
        </RadioGroup>
        <Select
          data-testid="other-input-encoding-options"
          value={primaryEncodingOptions.includes(input) ? "" : input}
          onChange={(e) => handleInputChange(e.target.value)}
          inputProps={{
            "aria-label": t("otherEncodingsAriaLabel"),
            sx: OtherOptionsInputStyles,
          }}
          IconComponent={() => <OtherOptionsButtonIcon />}
          sx={{
            ...(!primaryEncodingOptions.includes(input)
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
          {otherEncodingOptions.map((encoding) => (
            <MenuItem
              key={encoding + "-other-encoding-option"}
              data-testid={`${encoding}-input-encoding-option`}
              value={encoding}
            >
              {t(
                `encodings.${encoding as keyof Messages["translation"]["encodings"]}`,
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </OptionBlock>
  )
}
