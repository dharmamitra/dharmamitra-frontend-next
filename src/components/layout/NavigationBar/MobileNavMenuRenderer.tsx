"use client"

import React from "react"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import MobileNavMenu, { MobileNavMenuProps } from "./MobileNavMenu"

export type NavMenuProps = {
  mobileProps: MobileNavMenuProps
}

// This is used to make sure only the necessary JS is for the users viewport.
const MobileNavMenuRenderer = (props: NavMenuProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  if (isMobile) {
    return <MobileNavMenu {...props.mobileProps} />
  }

  return null
}

export default MobileNavMenuRenderer
