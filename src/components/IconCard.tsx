import type { JSX } from "react"
import * as React from "react"
import { Box, Typography } from "@mui/material"

import customTheming from "@/utils/theme/config"

type IconCardProps = {
  icon: JSX.Element
  title: string
  description: string
}

const IconHeader = ({ icon }: { icon: JSX.Element }) => (
  <Box
    sx={{
      position: "relative",
      height: "64px",
      width: "100%",
      bgcolor: customTheming.palette.soft,
    }}
  >
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        bottom: "0",
        transform: "translate(-50%, 50%)",
        p: "1px",
        borderRadius: "6px",
        background: `linear-gradient(${customTheming.baseColors?.secondary?.main} 0%, ${customTheming.palette.soft} 40%, white 50%)`,
      }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: "6px",
          bgcolor: "background.paper",
        }}
      >
        {icon}
      </Box>
    </Box>
  </Box>
)

export default function IconCard({ icon, title, description }: IconCardProps) {
  return (
    <Box
      sx={{
        flex: 1,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "8px",
        minWidth: "330px",
      }}
    >
      <IconHeader icon={icon} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 5.5,
          gap: 1,
        }}
      >
        <Typography variant="h3" color="secondary" fontWeight={600}>
          {title}
        </Typography>
        <Typography color="text.secondary" textAlign="center" sx={{ fontSize: "14px !important" }}>
          {description}
        </Typography>
      </Box>
    </Box>
  )
}
