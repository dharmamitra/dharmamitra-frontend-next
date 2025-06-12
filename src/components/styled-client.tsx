"use client"

import React from "react"
import { Box, Popper as MuiPopper, styled } from "@mui/material"
import { alpha } from "@mui/material/styles"
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip"

import customTheming from "@/utils/theme/config"

/**
 * CLIENT_ONLY COMMON COMPONENT STYLES
 *
 */

const secondaryShade = customTheming.baseColors?.secondary?.main

export const focusBgColor = alpha(secondaryShade!, 0.1)
export const focusBgColorDark = alpha(secondaryShade!, 0.25)

/**
 * STYLED COMPONENTS
 *
 */

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
