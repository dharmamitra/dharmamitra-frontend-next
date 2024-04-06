"use client"

import { FormControlLabel, Radio, styled } from "@mui/material"

export const VisuallyHiddenRadio = styled(Radio)({
  position: "absolute",
  left: "-10000px",
  top: "auto",
  width: "1px",
  height: "1px",
  overflow: "hidden",
})

export const selectedOptionsStyles = {
  textDecoration: "underline",
  textDecorationThickness: "3px",
  textUnderlineOffset: "1.2rem",
}

export const CustomFormControlLabel = styled(FormControlLabel)(
  ({ theme, checked }) => ({
    paddingInline: theme.spacing(1),
    ".MuiFormControlLabel-label": checked && {
      ...selectedOptionsStyles,
      color: theme.palette.primary.main,
    },
  }),
)
