import { Box } from "@mui/material"

import Blurb from "./Blurb"
import LogoBlock from "./LogoBlock"
import { Socials } from "./Socials"

import customTheming from "@/utils/theme/config"

export default function Footer({ isLocalized = true }: { isLocalized?: boolean }) {
  return (
    <Box
      sx={{
        width: "100%",
        pt: 6,
        // allows space for floating feedback button
        pb: { xs: 10, xl: 6 },
        // px alaigned with NavigationBar
        px: { xs: 3, md: 4 },
        bgcolor: customTheming.palette.soft,
      }}
      component="footer"
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: { xs: "center", lg: "space-between" },
          alignItems: "center",
          gap: { xs: 2, lg: 3 },
        }}
      >
        <Box>
          <LogoBlock isLocalized={isLocalized} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: { xs: "center", lg: "flex-end" },
            alignSelf: "stretch",
            gap: 3,
          }}
        >
          <Blurb isLocalized={isLocalized} />
          <Socials sx={{ alignSelf: { xs: "center", lg: "flex-end" } }} />
        </Box>
      </Box>
    </Box>
  )
}
