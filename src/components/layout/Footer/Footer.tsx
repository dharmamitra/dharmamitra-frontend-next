import { Box } from "@mui/material"

import customTheming from "@/utils/theme/config"

import Logo from "./Logo"
import Mission from "./Mission"

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
          flexWrap: "wrap",
          justifyContent: { md: "center" },
          alignItems: "center",
          gap: { xs: 2, md: 6 },
        }}
      >
        <Logo isLocalized={isLocalized} />
        <Mission isLocalized={isLocalized} />
      </Box>
    </Box>
  )
}
