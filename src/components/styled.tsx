"use client"

import React from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import {
  Box,
  FormControlLabel,
  Popper as MuiPopper,
  Radio,
  styled,
} from "@mui/material"
import { alpha } from "@mui/material/styles"
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip"

import customTheming from "@/utils/theme/config"

/**
 * COMMON COMPONENT STYLES ONLY
 *
 */

export const tabsStyles = {
  borderRadius: "50px",
  backgroundColor: "#eeeeee",
  "& button": {
    minHeight: "48px",
    maxHeight: "48px",
    margin: "8px",
    borderRadius: "50px",
    border: "3px solid transparent",
    transition:
      "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
  },
  minWidth: "210px",
  width: "fit-content",
  marginInline: "auto",
  "& button.Mui-selected": {
    backgroundColor: "#fff",
    boxShadow: "0px 4px 4px 0px #0000001C",
    transition:
      "box-shadow 0.3s ease-in-out, background-color 0.1s ease-in-out",
    color: customTheming.baseColors.secondary,
  },
  "*": {
    animation: "none !important",
  },
}

export const tooltipEnterStyles = {
  fontSize: "1.1rem",
  lineHeight: 0.75,
  paddingBottom: "0.1rem",
  verticalAlign: "middle",
}

export const VisuallyHiddenRadio = styled(Radio)({
  position: "absolute",
  left: "-10000px",
  top: "auto",
  width: "1px",
  height: "1px",
  overflow: "hidden",
})

export const focusBgColor = alpha(customTheming.baseColors.secondary!, 0.1)
export const focusBgColorDark = alpha(customTheming.baseColors.secondary!, 0.25)
export const warningBgFactory = 0.1

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

export const secondaryOptionsInputStyles = {
  position: "relative",
  zIndex: 2,
  pl: "0 !important",
  pr: 1,
}

/**
 * STYLED COMPONENTS
 *
 */

export const CustomFormControlLabel = styled(FormControlLabel)(
  ({ theme, checked }) => ({
    // paddingInline: theme.spacing(1),
    ".MuiFormControlLabel-label": checked && {
      color: theme.palette.secondary.main,
      ...selectedOptionsStyles,
    },
  }),
)

export const SecondaryOptionsButtonIcon = styled(KeyboardArrowDownIcon)({
  position: "absolute",
  right: 0,
  color: "gray",
})

export const Popper = styled(MuiPopper)(({ theme }) => ({
  zIndex: theme.zIndex.tooltip,
  height: "2rem",
}))

export const PopperMsgBox = styled(Box)(({ theme }) => ({
  borderRadius: 8,
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
}))

export const PopperWithRef = styled(
  React.forwardRef<HTMLDivElement, TooltipProps>(function PopperWithRef(
    { className, PopperProps, ...props },
    ref,
  ) {
    return (
      <Tooltip
        {...props}
        classes={{ popper: className }}
        PopperProps={{
          ...PopperProps,
          ref,
        }}
      />
    )
  }),
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: "30rem",
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.grey[500]}`,
    padding: "1rem",
    borderRadius: "0.5rem",
    boxShadow: theme.shadows[2],
  },
}))
