"use client"

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {
  FormControlLabel,
  Grid,
  Radio,
  styled,
  Typography,
} from "@mui/material"

export const VisuallyHiddenRadio = styled(Radio)({
  position: "absolute",
  left: "-10000px",
  top: "auto",
  width: "1px",
  height: "1px",
  overflow: "hidden",
})

export const selectedOptionsStyles = {
  textDecoration: { md: "underline" },
  textDecorationThickness: { md: "3px" },
  textUnderlineOffset: { md: "1.2rem" },
  textDecorationColor: { md: "currentColor" },
}

export const CustomFormControlLabel = styled(FormControlLabel)(
  ({ theme, checked }) => ({
    paddingInline: theme.spacing(1),
    ".MuiFormControlLabel-label": checked && {
      color: theme.palette.secondary.main,
      [theme.breakpoints.up("md")]: {
        // matches `selectedOptionsStyles` above,
        textDecoration: "underline",
        textDecorationThickness: "3px",
        textUnderlineOffset: "1.2rem",
        textDecorationColor: "currentColor",
      },
    },
  }),
)

export const OptionBlock = styled(Grid)<{ placement: "start" | "end" }>(({
  theme,
  placement,
}) => {
  const inputRadius =
    placement === "start"
      ? {
          borderTopLeftRadius: theme.custom.shape.inputRadius,
        }
      : {
          borderTopRightRadius: theme.custom.shape.inputRadius,
        }

  return {
    position: "relative",
    display: "flex",
    height: 74,
    [theme.breakpoints.down("md")]: {
      alignItems: "start",
      paddingTop: theme.spacing(1),
      borderTopLeftRadius: theme.custom.shape.inputRadius,
      borderTopRightRadius: theme.custom.shape.inputRadius,
      ...(placement === "start" && {
        height: 80,
      }),
    },
    [theme.breakpoints.up("md")]: {
      alignItems: "flex-end",
      ...inputRadius,
      ...(placement === "end" && {
        borderLeft: `1px solid ${theme.palette.divider}`,
      }),
    },
    paddingInline: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderColor: "divider",
  }
})

export const OptionBlockLabel = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "-14px",
  left: "6px",
  paddingInline: theme.spacing(1),
  paddingBlock: "1px",
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.default,
  fontSize: "14px !important",
  borderRadius: "50px",
}))

export const OtherOptionsInputStyles = {
  position: "relative",
  zIndex: 2,
  pl: "0 !important",
  pr: 1,
}

export const OtherOptionsButtonIcon = styled(KeyboardArrowDownIcon)({
  position: "absolute",
  right: 0,
  color: "gray",
})

export const TranslationContentBox = styled(Grid)<{
  rows: number
}>(({ theme, rows }) => ({
  position: "relative",
  minHeight: `${rows * 1.9}rem`,
  background: theme.palette.background.default,
}))
