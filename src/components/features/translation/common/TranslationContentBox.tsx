import React from "react"
import { Grid, SxProps } from "@mui/material"

export default function TranslationContentBox({
  children,
  testId,
  sx,
  isLoader = false,
}: {
  children: React.ReactNode
  testId?: string
  sx?: SxProps
  isLoader?: boolean
}) {
  return (
    <Grid
      item
      xs={12}
      md={isLoader ? 12 : 6}
      sx={{
        position: "relative",
        minHeight: {
          xs: `${10 * 1.9}rem`,
          sm: `${8 * 1.9}rem`,
          md: `${14 * 1.9}rem`,
        },
        background: "#fff",
        ...sx,
      }}
      data-testid={testId}
    >
      {children}
    </Grid>
  )
}
