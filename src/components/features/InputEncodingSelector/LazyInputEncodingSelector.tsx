"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { MenuItem, RadioGroup, Select } from "@mui/material"

import { globalParams } from "@/api"
import styles from "@/components/customFocusVisible.module.css"
import {
  flatRadioGroupStyles,
  SecondaryOptionsButtonIcon,
  secondaryOptionsInputStyles,
  selectedOptionsStyles,
} from "@/components/styled"
import useFocusHighlight from "@/hooks/useFocusHighlight"
import useGlobalParams from "@/hooks/useGlobalParams"
import { useResponsiveOptions } from "@/hooks/useResponsiveOptions"
import { getOptionI18nKeyPath } from "@/utils/ui"

import RadioOption from "../translation/common/RadioOption"

export default function LazyInputEncodingSelector() {
  const t = useTranslations()

  const { inputEncoding, updateInputEncoding } = useGlobalParams()

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

  const [primaryEncodingOptions, otherEncodingOptions] = useResponsiveOptions(
    globalParams.inputEncodings,
  )

  const isPrimaryValueSelected = React.useMemo<boolean>(
    () =>
      primaryEncodingOptions.includes(
        inputEncoding as globalParams.InputEncoding,
      ),
    [inputEncoding, primaryEncodingOptions],
  )

  return (
    <>
      <RadioGroup
        id={primaryOptionsSelectorId}
        aria-label={t("globalParams.primaryEncodingsAriaLabel")}
        value={inputEncoding}
        onChange={(e) => updateInputEncoding(e.target.value)}
        row
        sx={{ ...flatRadioGroupStyles }}
        className={styles.customFocusVisible}
      >
        {primaryEncodingOptions.map((encoding) => (
          <RadioOption
            key={encoding + "-primary-encoding-option"}
            id={encoding + "-primary-encoding-option"}
            option={encoding}
            label={t(getOptionI18nKeyPath(encoding))}
            isSelected={inputEncoding === encoding}
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
          value={isPrimaryValueSelected ? "" : inputEncoding}
          onChange={(e) => updateInputEncoding(e.target.value)}
          inputProps={{
            "aria-label": t("globalParams.secondaryEncodingsAriaLabel"),
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
          <MenuItem disabled value="">
            {t("generic.other")}
          </MenuItem>
          {otherEncodingOptions.map((encoding) => (
            <MenuItem
              key={encoding + "-other-encoding-option"}
              data-testid={`${encoding}-input-encoding-option`}
              value={encoding}
            >
              {t(`globalParams.encodings.${encoding}`)}
            </MenuItem>
          ))}
        </Select>
      </div>
    </>
  )
}
