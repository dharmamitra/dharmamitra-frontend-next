import { Box, Grid2 as Grid } from "@mui/material"

import useAppConfig from "@/hooks/useAppConfig"
import customTheming from "@/utils/theme/config"

import Contact from "./Contact"
import Logo from "./Logo"
import Mission from "./Mission"

export default function Footer({
  isLocalized = true,
}: {
  isLocalized?: boolean
}) {
  const { isClient } = useAppConfig()

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
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Logo isLocalized={isLocalized} />
        </Grid>

        {isClient ? (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} />
        ) : (
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Mission isLocalized={isLocalized} />
          </Grid>
        )}

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Contact isLocalized={isLocalized} />
        </Grid>
      </Grid>
    </Box>
  )
}
