import React from "react"
import { AppBar as MuiAppBar, Toolbar } from "@mui/material"

import Logo from "@/components/Logo"

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
          height: { xs: "78px", sm: "85px", md: "96px" },
          py: "0.2rem",
          backgroundColor: "common.white",
          boxShadow: "0px 4px 4px 0px #0000001A",
        }}
      >
        <Toolbar>
          <Logo isLocalized={isLocalized} />

          {children}
        </Toolbar>
      </MuiAppBar>
      {/* navbar offset */}
      <div style={{ width: "100%", height: 80 }} />
    </>
  )
}
