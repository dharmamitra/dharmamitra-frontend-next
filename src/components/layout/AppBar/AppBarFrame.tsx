import React from "react"
import { AppBar as MuiAppBar, Box, Toolbar } from "@mui/material"

import Logo from "@/components/Logo"
import SponsorLogo from "@/components/SponsorLogo"

export const appBarHeight = {
  xs: "57px",
  sm: "57px",
  md: "64px",
}

export default function AppBarFrame({
  children,
  isLocalized = true,
}: {
  children?: React.ReactNode
  isLocalized?: boolean
}) {
  return (
    <>
      <MuiAppBar
        component="nav"
        elevation={0}
        position="relative"
        sx={{ height: appBarHeight, backgroundColor: "common.white" }}
      >
        <Toolbar sx={{ display: "block" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              py: 1,
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Logo isLocalized={isLocalized} />
              <SponsorLogo />
            </Box>

            {children}
          </Box>
        </Toolbar>
      </MuiAppBar>
    </>
  )
}
