"use client"

import React, { ReactNode } from "react"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import DesktopLocaleSwitcher from "./DesktopLocaleSwitcher"
import MobileLocaleSwitcher from "./MobileLocaleSwitcher"

export type LocaleSwitcherProps = {
  children: ReactNode
  defaultValue: string
  label: string
}

// This is used to make sure only the necessary JS is for the users viewport.
const ResponsiveLocaleSwitcher = (props: LocaleSwitcherProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  if (isMobile) {
    return <MobileLocaleSwitcher {...props} />
  }

  return <DesktopLocaleSwitcher {...props} />
}

export default ResponsiveLocaleSwitcher
