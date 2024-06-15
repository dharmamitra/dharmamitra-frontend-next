"use client"

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {
  Box,
  FormControlLabel,
  Popper as MuiPopper,
  Radio,
  styled,
} from "@mui/material"
import { alpha } from "@mui/material/styles"

import customTheming from "@/utils/theme/config"

export const VisuallyHiddenRadio = styled(Radio)({
  position: "absolute",
  left: "-10000px",
  top: "auto",
  width: "1px",
  height: "1px",
  overflow: "hidden",
})

export const getFocusedBgStyles = ({
  color,
  inset = "0",
}: {
  color: string
  inset?: string
}) => ({
  "&:focus-within::before": {
    content: `' '`,
    position: "absolute",
    inset,
    borderRadius: "8px",
    transition: "all 255ms ease-in",
    backgroundColor: color,
    animation: "focus 3s ease-in-out infinite",
  },
  "@keyframes focus": {
    "0%": {
      transform: "scale(1)",
    },
    "50%": {
      transform: "scale(1.02, 1.06)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
})

export const focusBgColor = alpha(customTheming.baseColors.secondary!, 0.05)

export const flatRadioGroupStyles = {
  position: "relative",
  display: "flex",
  gap: 2,
  borderRadius: "8px",
  padding: "8px 0 8px 24px",
  marginInline: "-16px 8px",
}

export const selectedOptionsStyles = {
  textDecoration: "underline",
  textDecorationThickness: "3px",
  // offset linked to SettingBlock height
  textUnderlineOffset: "8px",
  textDecorationColor: "currentColor",
}

export const CustomFormControlLabel = styled(FormControlLabel)(
  ({ theme, checked }) => ({
    // paddingInline: theme.spacing(1),
    ".MuiFormControlLabel-label": checked && {
      color: theme.palette.secondary.main,
      ...selectedOptionsStyles,
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
