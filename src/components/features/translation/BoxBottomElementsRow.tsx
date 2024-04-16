import React from "react"
import { Box, SxProps } from "@mui/material"

export default function BoxBottomElementsRow({
  children,
  testId,
  sx,
}: {
  children: React.ReactNode
  testId?: string
  sx?: SxProps
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 1,
        bottom: { xs: "0.25rem", md: "0.75rem" },
        right: { xs: "0.25rem", md: "0.75rem" },
        left: { xs: "0.25rem", md: "0.75rem" },
        display: "flex",
        alignItems: "center",
        gap: 2,
        ...sx,
      }}
      data-testid={testId}
    >
      {children}
    </Box>
  )
}
