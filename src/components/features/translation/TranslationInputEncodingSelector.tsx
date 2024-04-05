"use client"

import React from "react"
import { FormControl, MenuItem, RadioGroup, Select } from "@mui/material"
import Grid from "@mui/material/Grid"

import {
  CustomFormControlLabel,
  VisuallyHiddenRadio,
} from "@/components/styled"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { apiParamsNames, inputEncodings } from "@/utils/api/params"
import customTheming from "@/utils/theme/config"
import {
  encodingKeys,
  otherEncodingOptions,
  primaryEncodingOptions,
} from "@/utils/ui"

export default function TranslationInputEncodingSelector() {
  const { input, handleInputChange } = useInputWithUrlParam(
    apiParamsNames.translation.input_encoding,
  )

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
        component="fieldset"
        sx={{ flexDirection: "row" }}
        data-testid="input-encoding-selector"
      >
        <RadioGroup
          row
          aria-label="position"
          name="position"
          value={input === "" ? encodingKeys[0] : input}
          onChange={(e) =>
            handleInputChange(
              inputEncodings[e.target.value as keyof typeof inputEncodings]!,
            )
          }
        >
          {primaryEncodingOptions.map((option) => (
            <CustomFormControlLabel
              key={option + "-primary-encoding-option"}
              value={option}
              control={
                <VisuallyHiddenRadio
                  id={`${option}-input-encoding-option`}
                  data-testid={`${option}-input-encoding-option`}
                />
              }
              label={option}
              checked={input === option}
            />
          ))}
        </RadioGroup>
        <Select
          value={primaryEncodingOptions.includes(input) ? "" : input}
          onChange={(e) =>
            handleInputChange(
              inputEncodings[e.target.value as keyof typeof inputEncodings]!,
            )
          }
          displayEmpty
          inputProps={{ "aria-label": "More options" }}
          sx={{
            width: "min-content",
            backgroundColor: "background.paper",
            overflow: "clip",

            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            borderRadius: customTheming.shape.inputRadius,
          }}
          data-testid={`other-input-encoding-options`}
        >
          <MenuItem disabled value="">
            Other Encodings
          </MenuItem>
          {otherEncodingOptions.map((option) => (
            <MenuItem
              key={option + "-other-encoding-encoding"}
              value={option}
              data-testid={`${option}-input-encoding-option`}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
}
