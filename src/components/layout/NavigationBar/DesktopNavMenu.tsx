import React from "react"
import dynamic from "next/dynamic"
import LanguageIcon from "@mui/icons-material/Language"
import { Box, Breakpoint } from "@mui/material"

import { NavItemButtonsLoading } from "./NavItemButtons"

const NavItemButtons = dynamic(() => import("./NavItemButtons"), {
  loading: () => <NavItemButtonsLoading />,
})

const LocaleSelector = dynamic(() => import("./LocaleSelector"), {
  loading: () => <LanguageIcon color="action" />,
})

export default function DesktopNavMenu({
  desktopBreakpoint,
}: {
  desktopBreakpoint: Breakpoint
}) {
  return (
    <Box
      sx={{
        display: { xs: "none", [desktopBreakpoint]: "flex" },
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
