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

  React.useEffect(() => {
    if (input === "") {
      handleInputChange(encodingKeys[0]!)
    }
  }, [input, handleInputChange])

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
        borderBottom: "1px solid",
        borderColor: "divider",
        borderTopRightRadius: customTheming.shape.inputRadius,
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: "-12px",
          left: "4px",
          px: 1,
          color: "text.secondary",
          backgroundColor: "background.default",
          fontSize: "body2.fontSize",
        }}
      >
        {t("encodingSelectLabel")}
      </Typography>
      <FormControl
        data-testid="input-encoding-selector"
        component="fieldset"
        sx={{ flexDirection: "row" }}
      >
        <RadioGroup
          aria-label={t("primaryEncodingsAriaLabel")}
          value={input ? input : encodingKeys[0]}
          onChange={(e) =>
            handleInputChange(
              inputEncodings[e.target.value as keyof typeof inputEncodings]!,
            )
          }
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
          onChange={(e) =>
            handleInputChange(
              inputEncodings[e.target.value as keyof typeof inputEncodings]!,
            )
          }
          inputProps={{
            "aria-label": t("otherEncodingsAriaLabel"),
            sx: { pl: "0 !important", pr: 1 },
          }}
          IconComponent={() => (
            <KeyboardArrowDownIcon
              sx={{
                position: "absolute",
                zIndex: "-1",
                right: 0,
                color: "gray",
              }}
            />
          )}
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
    </Grid>
  )
}
