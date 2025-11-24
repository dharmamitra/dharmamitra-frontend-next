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
import { useInputEncodingParamWithLocalStorage } from "@/hooks/params"
import { useResponsiveOptions } from "@/hooks/responsiveLayout"
import useFocusHighlight from "@/hooks/useFocusHighlight"
import { getOptionI18nKeyPath } from "@/utils"
import { defaultInputEncoding, inputEncodings } from "@/utils/api/global/params"
import { InputEncoding } from "@/utils/api/global/types"

export default function InputEncodingSelector({ isRendered = true }: { isRendered?: boolean }) {
  if (!isRendered) return null

  return <Selector />
}

function Selector() {
  const t = useTranslations()

  const [inputEncoding, setInputEncoding] = useInputEncodingParamWithLocalStorage()

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

  const [primaryEncodingOptions, otherEncodingOptions] = useResponsiveOptions(inputEncodings)

  const isPrimaryValueSelected = React.useMemo<boolean>(
    () => primaryEncodingOptions.includes(inputEncoding as InputEncoding),
    [inputEncoding, primaryEncodingOptions],
  )

  return (
    <Tooltip
      title={t("globalParams.encodingSelectLabel")}
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
          aria-label={t("globalParams.primaryEncodingsAriaLabel")}
          value={inputEncoding ?? defaultInputEncoding}
          onChange={(e) => setInputEncoding(e.target.value)}
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
            value={isPrimaryValueSelected || !inputEncoding ? "" : inputEncoding}
            onChange={(e) => setInputEncoding(e.target.value)}
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
      </Box>
    </Tooltip>
  )
}
