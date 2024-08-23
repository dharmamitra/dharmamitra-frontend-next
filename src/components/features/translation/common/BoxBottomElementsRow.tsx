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
        mt: 2,
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
