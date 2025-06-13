"use client"

import React from "react"
import { Breakpoint } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import MobileNavMenu, { MobileNavMenuProps } from "./MobileNavMenu"

export type NavMenuProps = {
  mobileProps: MobileNavMenuProps
  desktopBreakpoint: Breakpoint
}

// This is used to make sure only the necessary JS is for the users viewport.
const MobileNavMenuRenderer = (props: NavMenuProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(
    theme.breakpoints.down(props.desktopBreakpoint),
  )

  if (isMobile) {
    return <MobileNavMenu {...props.mobileProps} />
  }

  return null
}

export default MobileNavMenuRenderer
