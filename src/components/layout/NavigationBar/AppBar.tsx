import React from "react"
import { AppBar as MuiAppBar, Box, Toolbar } from "@mui/material"

import Logo from "@/components/Logo"
import SponsorLogo from "@/components/SponsorLogo"

const appBarHeight = {
  xs: "60px",
  sm: "70px",
  md: "80px",
}

export default function AppBar({
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
        sx={{
          height: appBarHeight,
          py: "0.2rem",
          backgroundColor: "common.white",
          boxShadow: "0px 4px 4px 0px #0000001A",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Logo isLocalized={isLocalized} />
            <SponsorLogo />
          </Box>

          {children}
        </Toolbar>
      </MuiAppBar>
      {/* navbar offset */}
      <Box sx={{ width: "100%", height: appBarHeight }} />
    </>
  )
}
