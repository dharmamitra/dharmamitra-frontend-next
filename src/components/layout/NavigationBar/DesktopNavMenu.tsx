import React from "react"
import dynamic from "next/dynamic"
import { Box } from "@mui/material"

import DesktopLocaleSwitcherLoading from "@/components/layout/LocaleSelector/DesktopLocaleSwitcherLoading"

import { NavItemButtonsLoading } from "./NavItemButtons"

const NavItemButtons = dynamic(() => import("./NavItemButtons"), {
  loading: () => <NavItemButtonsLoading />,
})

const LocaleSelector = dynamic(() => import("../LocaleSelector"), {
  loading: () => <DesktopLocaleSwitcherLoading />,
})

export default function DesktopNavMenu() {
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <NavItemButtons />
      </Box>
      <LocaleSelector />
    </Box>
  )
}
