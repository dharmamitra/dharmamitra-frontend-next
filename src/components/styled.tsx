"use client"

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {
  Box,
  FormControlLabel,
  Grid,
  Popper as MuiPopper,
  Radio,
  styled,
} from "@mui/material"

export const Section = styled(Box)(({ theme }) => ({
  marginBlock: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    marginBlock: theme.spacing(4),
  },
}))

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
  textUnderlineOffset: { md: "18px" },
  textDecorationColor: { md: "currentColor" },
}

export const CustomFormControlLabel = styled(FormControlLabel)(
  ({ theme, checked }) => ({
    paddingInline: theme.spacing(1),
    ".MuiFormControlLabel-label": checked && {
      color: theme.palette.secondary.main,
      [theme.breakpoints.up("md")]: Object.entries(
        selectedOptionsStyles,
      ).reduce(
        (styles, [key, value]) => ({
          ...styles,
          [key]: value.md,
        }),
        {},
      ),
    },
  }),
)

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

export const BoxBottomElementsRow = styled(Box)<{
  spread?: "flex-end" | "space-between"
}>(({ theme, spread }) => ({
  position: "absolute",
  zIndex: 1,
  bottom: "0.25rem",
  right: "0.25rem",
  left: "0.25rem",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  ...(spread && { justifyContent: spread }),
  [theme.breakpoints.up("md")]: {
    bottom: "0.75rem",
    right: "0.75rem",
    left: "0.75rem",
  },
}))

export const Popper = styled(MuiPopper)(({ theme }) => ({
  zIndex: theme.zIndex.tooltip,
  height: "32px",
}))

export const PopperMsgBox = styled(Box)(({ theme }) => ({
  borderRadius: 8,
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}))
