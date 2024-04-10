"use client"

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  styled,
  Typography,
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
  textUnderlineOffset: { md: "1.2rem" },
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

export const SettingBlock = styled(Grid)<{
  placement: "start" | "end"
  isHydrated?: boolean
}>(({ theme, placement, isHydrated = true }) => {
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
    ...(!isHydrated && {
      opacity: "0.7",
      cursor: "wait",
      "& label": {
        cursor: "wait !important",
      },
    }),
    transition: "opacity 1s ease-out",
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

export const SettingBlockLabel = styled(Typography)(({ theme }) => ({
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
