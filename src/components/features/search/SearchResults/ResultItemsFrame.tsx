import React from "react"
import Grid from "@mui/material/Grid"

export default function ResultItemsFrame({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Grid
      container
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "8px",
        mb: 3,
      }}
    >
      {children}
    </Grid>
  )
}
