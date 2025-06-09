import { Box, Typography } from "@mui/material"

import customTheming from "@/utils/theme/config"

import LogoBlock from "./LogoBlock"
import Statements from "./Statements"

export default function Footer({
  isLocalized = true,
}: {
  isLocalized?: boolean
}) {
  return (
    <Box
      sx={{
        width: "100%",
        py: 6,
        // px alaigned with NavigationBar
        px: { xs: 3, md: 4 },
        bgcolor: customTheming.palette.soft,
      }}
      component="footer"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, lg: 3 },
        }}
      >
        <LogoBlock isLocalized={isLocalized} />

        <Statements isLocalized={isLocalized} />
      </Box>
    </Box>
  )
}
