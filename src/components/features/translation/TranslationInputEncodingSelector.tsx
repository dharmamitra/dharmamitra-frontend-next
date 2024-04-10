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
import { apiParamsNames, inputEncodings } from "@/utils/api/params"

import RadioOption from "./RadioOption"

export default function TranslationInputEncodingSelector() {
  const { input, handleInputChange, isHydrated } = useInputWithLocalStorage({
    paramName: apiParamsNames.translation.input_encoding,
    defaultValue: inputEncodings[0],
  })

  const [primaryEncodingOptions, otherEncodingOptions] =
    useResponsiveOptions(inputEncodings)

  const t = useTranslations("translation")

  React.useEffect(() => {
    if (input === "") {
      handleInputChange(inputEncodings[0])
    }
  }, [input, handleInputChange])

  return (
    <SettingBlock item xs={12} md={6} placement="start">
      <SettingBlockLabel>{t("encodingSelectLabel")}</SettingBlockLabel>
      <FormControl
        data-testid="input-encoding-selector"
        component="fieldset"
        sx={{
          flexDirection: "row",
          ...(!isHydrated && {
            opacity: "0.6",
            pointerEvents: "none",
          }),
          transition: "opacity 1s ease-out",
        }}
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
              isSelected={isHydrated && input === encoding}
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
            ...(isHydrated && !primaryEncodingOptions.includes(input)
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
    </SettingBlock>
  )
}
