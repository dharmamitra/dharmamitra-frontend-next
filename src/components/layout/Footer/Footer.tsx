import { Box } from "@mui/material"

import customTheming from "@/utils/theme/config"

import Collaboration from "./Collaboration"
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
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Mission isLocalized={isLocalized} />
          </Box>
        </Box>

        <Collaboration isLocalized={isLocalized} />
      </Box>
    </Box>
  )
}
