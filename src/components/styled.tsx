"use client"

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {
  Box,
  FormControlLabel,
  Popper as MuiPopper,
  Radio,
  styled,
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
  textDecoration: "underline",
  textDecorationThickness: "3px",
  // offset linked to SettingBlock height
  textUnderlineOffset: "8px",
  textDecorationColor: "currentColor",
}

export const CustomFormControlLabel = styled(FormControlLabel)(
  ({ theme, checked }) => ({
    paddingInline: theme.spacing(1),
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
