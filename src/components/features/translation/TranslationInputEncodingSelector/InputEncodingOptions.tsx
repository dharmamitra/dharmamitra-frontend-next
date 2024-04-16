"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { MenuItem, RadioGroup, Select } from "@mui/material"

import {
  OtherOptionsButtonIcon,
  OtherOptionsInputStyles,
  selectedOptionsStyles,
} from "@/components/styled"
import useInputWithLocalStorage from "@/hooks/useInputWithLocalStorage"
import { useResponsiveOptions } from "@/hooks/useResponsiveOptions"
import { apiParamsNames, inputEncodings } from "@/utils/api/params"

import RadioOption from "../RadioOption"

export default function TranslationInputEncodingSelector() {
  const t = useTranslations("translation")

  const { input, handleInputChange, isHydrated } = useInputWithLocalStorage({
    paramName: apiParamsNames.translation.input_encoding,
    defaultValue: inputEncodings[0],
  })

  const [primaryEncodingOptions, otherEncodingOptions] =
    useResponsiveOptions(inputEncodings)

  const isPrimaryValueSelected = React.useMemo<boolean>(
    () => primaryEncodingOptions.includes(input),
    [input, primaryEncodingOptions],
  )

  React.useEffect(() => {
    if (input === "") {
      handleInputChange(inputEncodings[0])
    }
  }, [input, handleInputChange])

  return (
    <>
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
        value={isPrimaryValueSelected ? "" : input}
        onChange={(e) => handleInputChange(e.target.value)}
        inputProps={{
          "aria-label": t("otherEncodingsAriaLabel"),
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
    </>
  )
}
