import * as React from "react"
import { Box, Typography } from "@mui/material"

export default function OCRResultContainer({
  children,
  hasTitleGutter = true,
}: {
  children: React.ReactNode
  hasTitleGutter?: boolean
}) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom={hasTitleGutter}>
        Result:
      </Typography>
      {children}
    </Box>
  )
}
