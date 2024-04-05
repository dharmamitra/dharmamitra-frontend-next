"use client"

import React from "react"
import { FormControl, MenuItem, RadioGroup, Select } from "@mui/material"
import Grid from "@mui/material/Grid"

import {
  CustomFormControlLabel,
  VisuallyHiddenRadio,
} from "@/components/styled"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { apiParamsNames, targetLanguages } from "@/utils/api/params"
import customTheming from "@/utils/theme/config"

export default function TranslationTargetLanguageSelector() {
  const { input, handleInputChange } = useInputWithUrlParam(
    apiParamsNames.translation.target_lang,
  )

  // TODO: generate elsewhere to avoid generating on every render
  const [primaryLanguages, otherLanguages] = [
    targetLanguages.slice(0, 3),
    targetLanguages.slice(3),
  ]

  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        px: 2,
        borderLeft: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
        borderTopRightRadius: customTheming.shape.inputRadius,
      }}
    >
      <FormControl component="fieldset" sx={{ flexDirection: "row" }}>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          value={input === "" ? targetLanguages[0] : input}
          onChange={handleInputChange}
        >
          {primaryLanguages.map((language) => (
            <CustomFormControlLabel
              key={language + "primary-target-language"}
              value={language}
              control={<VisuallyHiddenRadio />}
              label={language}
              checked={input === language}
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
          {otherLanguages.map((language) => (
            <MenuItem key={language + "other-target-language"} value={language}>
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
}
