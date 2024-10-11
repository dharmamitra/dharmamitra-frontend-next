import React from "react"
import { Box, SxProps, Typography } from "@mui/material"

export default function LabelledSetting({
  label,
  labelSx,
  children,
}: {
  label: string
  labelSx?: SxProps
  children: React.ReactNode
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        flexWrap: "nowrap",
        alignItems: "start",
        justifyContent: "center",
        m: 0,
        pl: 0,
      }}
    >
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: "14px !important",
          mb: 1,
          ml: 0.5,
          ...labelSx,
        }}
      >
        {label}:
      </Typography>
      {children}
    </Box>
  )
}
