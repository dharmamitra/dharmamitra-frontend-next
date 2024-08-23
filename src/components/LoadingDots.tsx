"use client"

import { useTranslations } from "next-intl"
import { styled, SxProps } from "@mui/material"
import Box from "@mui/material/Box"
import { alpha } from "@mui/material/styles"

const Dots = styled(Box)(({ theme }) => ({
  "@keyframes rolling": {
    "0%": {
      boxShadow: `12px 0 ${alpha(theme.palette.secondary.main, 0.7)}, -12px 0 ${alpha(theme.palette.secondary.main, 0.5)}`,
      background: `${alpha(theme.palette.secondary.main, 0.7)}`,
    },
    "33%": {
      boxShadow: `12px 0 ${alpha(theme.palette.secondary.main, 0.7)}, -12px 0 ${alpha(theme.palette.secondary.main, 0.5)}`,
      background: `${alpha(theme.palette.secondary.main, 0.5)}`,
    },
    "66%": {
      boxShadow: `12px 0 ${alpha(theme.palette.secondary.main, 0.5)},-12px 0 ${alpha(theme.palette.secondary.main, 0.7)}`,
      background: `${alpha(theme.palette.secondary.main, 0.5)}`,
    },
    "100%": {
      boxShadow: `12px 0 ${alpha(theme.palette.secondary.main, 0.5)},-12px 0 ${alpha(theme.palette.secondary.main, 0.7)}`,
      background: `${alpha(theme.palette.secondary.main, 0.7)}`,
    },
  },
  position: "absolute",
  top: 0,
  left: "12px",
  width: "8px",
  aspectRatio: 1,
  borderRadius: "50%",
  animation: "rolling 1s infinite linear alternate",
}))

export default function LoadingDots({ sx }: { sx?: SxProps }) {
  const t = useTranslations("generic")
  return (
    <Box position="relative" aria-label={t("loading")}>
      <Dots sx={sx} />
    </Box>
  )
}
