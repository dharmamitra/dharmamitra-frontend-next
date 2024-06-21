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
import useParamValueWithLocalStorage from "@/hooks/useParamValueWithLocalStorage"
import { useResponsiveOptions } from "@/hooks/useResponsiveOptions"
import { apiParamsNames, inputEncodings } from "@/utils/api/params"

import RadioOption from "../translation/common/RadioOption"

export default function TranslationInputEncodingSelector() {
  const t = useTranslations()

  const { value, handleValueChange, isHydrated } =
    useParamValueWithLocalStorage({
      paramName: apiParamsNames.commonStreamParams.input_encoding,
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
    () => primaryEncodingOptions.includes(value),
    [value, primaryEncodingOptions],
  )

  React.useEffect(() => {
    if (value === "") {
      handleValueChange(inputEncodings[0])
    }
  }, [value, handleValueChange])

  return (
    <>
      <RadioGroup
        id={primaryOptionsSelectorId}
        aria-label={t("commonStreamParams.primaryEncodingsAriaLabel")}
        value={value ? value : inputEncodings[0]}
        onChange={(e) => handleValueChange(e.target.value)}
        row
        sx={{ ...flatRadioGroupStyles }}
        className={styles.customFocusVisible}
      >
        {primaryEncodingOptions.map((encoding) => (
          <RadioOption
            key={encoding + "-primary-encoding-option"}
            id={encoding + "-primary-encoding-option"}
            i18nKey="commonStreamParams.encodings"
            option={encoding}
            isSelected={isHydrated && value === encoding}
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
          value={isPrimaryValueSelected ? "" : value}
          onChange={(e) => handleValueChange(e.target.value)}
          inputProps={{
            "aria-label": t("commonStreamParams.secondaryEncodingsAriaLabel"),
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
            {t("generic.other")}
          </MenuItem>
          {otherEncodingOptions.map((encoding) => (
            <MenuItem
              key={encoding + "-other-encoding-option"}
              data-testid={`${encoding}-input-encoding-option`}
              value={encoding}
            >
              {t(
                `commonStreamParams.encodings.${encoding as keyof Messages["commonStreamParams"]["encodings"]}`,
              )}
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  )
}
