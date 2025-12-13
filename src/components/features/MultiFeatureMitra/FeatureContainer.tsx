import React from "react"
import Box from "@mui/material/Box"
import { SxProps } from "@mui/material/styles"

interface FeatureContainerProps {
  children: React.ReactNode
  id: string
  sx?: SxProps
}

export default function FeatureContainer(props: FeatureContainerProps) {
  const { children, id, sx } = props

  return (
    <Box id={id} sx={{ maxWidth: "960px", mx: "auto", mt: { md: 6 }, ...sx }}>
      {children}
    </Box>
  )
}
