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

export default function TranslationInputEncodingSelector() {
  const { input, handleInputChange } = useInputWithUrlParam(
    apiParamsNames.translation.input_encoding,
  )

  // TODO: generate elsewhere to avoid generating on every render
  const encodingKeys = Object.keys(inputEncodings)
  const [priorityEncodings, otherEncodings] = [
    encodingKeys.slice(0, 3),
    encodingKeys.slice(3),
  ]

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
      <FormControl component="fieldset" sx={{ flexDirection: "row" }}>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          value={input === "" ? encodingKeys[0] : input}
          onChange={handleInputChange}
        >
          {priorityEncodings.map((encoding) => (
            <CustomFormControlLabel
              key={encoding + "priority-target-encoding"}
              value={encoding}
              control={<VisuallyHiddenRadio />}
              label={encoding}
              checked={input === encoding}
            />
          ))}
        </RadioGroup>
        <Select
          value={input}
          onChange={handleInputChange}
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
        >
          <MenuItem disabled value="">
            Other
          </MenuItem>
          {otherEncodings.map((encoding) => (
            <MenuItem key={encoding + "other-target-encoding"} value={encoding}>
              {encoding}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
}
