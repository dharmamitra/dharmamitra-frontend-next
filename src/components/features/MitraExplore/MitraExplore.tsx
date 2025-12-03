"use client"

import { useTranslations } from "next-intl"
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export default function MitraExplore() {
  const t = useTranslations("explore")

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        gap: 2,
        color: "text.secondary",
      }}
    >
      <ExploreOutlinedIcon sx={{ fontSize: 64, opacity: 0.5 }} />
      <Typography variant="h5" component="h1">
        {t("title")}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {t("comingSoon")}
      </Typography>
    </Box>
  )
}
