import React from "react"
import dynamic from "next/dynamic"
import LanguageIcon from "@mui/icons-material/Language"
import { Box } from "@mui/material"

import { NavItemButtonsLoading } from "./NavItemButtons"

const NavItemButtons = dynamic(() => import("./NavItemButtons"), {
  loading: () => <NavItemButtonsLoading />,
})

const LocaleSelector = dynamic(() => import("./LocaleSelector"), {
  loading: () => <LanguageIcon color="action" />,
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
