import * as React from "react"
import { Box, SxProps } from "@mui/material"

export default function Section({
  children,
  sx,
}: {
  children: React.ReactNode
  sx?: SxProps
}) {
  return (
    <Box component="section" sx={{ mb: { xs: 4, md: 6 }, ...sx }}>
      {children}
    </Box>
  )
}
