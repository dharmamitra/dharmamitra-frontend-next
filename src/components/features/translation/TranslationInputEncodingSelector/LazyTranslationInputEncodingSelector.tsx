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
import useFocusHighlight from "@/hooks/useFocusHighlight"
import useInputWithLocalStorage from "@/hooks/useInputWithLocalStorage"
import { useResponsiveOptions } from "@/hooks/useResponsiveOptions"
import { apiParamsNames, inputEncodings } from "@/utils/api/params"

import RadioOption from "../common/RadioOption"

export default function TranslationInputEncodingSelector() {
  const t = useTranslations("translation")

  const { input, handleInputChange, isHydrated } = useInputWithLocalStorage({
    paramName: apiParamsNames.translation.input_encoding,
    defaultValue: inputEncodings[0],
  })

  const primaryOptionsSelectorId = "primary-encoding-options"
  useFocusHighlight({
    targetId: primaryOptionsSelectorId,
    styledTargetId: primaryOptionsSelectorId,
    focusInset: "0 4px",
  })
  const secondaryOptionsSelectorId = "secondary-encoding-options"
  useFocusHighlight({
    targetId: secondaryOptionsSelectorId,
    styledTargetId: secondaryOptionsSelectorId + "-wrapper",
    focusInset: "8px -4px 8px -8px",
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
        id={primaryOptionsSelectorId}
        aria-label={t("primaryEncodingsAriaLabel")}
        value={input ? input : inputEncodings[0]}
        onChange={(e) => handleInputChange(e.target.value)}
        row
        sx={{
          ...flatRadioGroupStyles,
        }}
        className={styles.customFocusVisible}
      >
        {primaryEncodingOptions.map((encoding) => (
          <RadioOption
            key={encoding + "-primary-encoding-option"}
            id={encoding + "-primary-encoding-option"}
            i18nKey="encodings"
            option={encoding}
            isSelected={isHydrated && input === encoding}
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
          data-testid="other-input-encoding-options"
          value={isPrimaryValueSelected ? "" : input}
          onChange={(e) => handleInputChange(e.target.value)}
          inputProps={{
            "aria-label": t("otherEncodingsAriaLabel"),
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
      </div>
    </>
  )
}
