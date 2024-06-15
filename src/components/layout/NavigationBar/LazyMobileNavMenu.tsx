import React from "react"
import { useTranslations } from "next-intl"
import LanguageIcon from "@mui/icons-material/Language"
import MenuIcon from "@mui/icons-material/Menu"
import { Box, IconButton } from "@mui/material"

export default function MobileNavMenuLoading() {
  const t = useTranslations("navigation")
  return (
    <Box sx={{ display: { sm: "none" } }}>
      <IconButton
        color="primary"
        aria-label={t("mobileMenuAriaLabel")}
        edge="start"
        sx={{ ml: 1 }}
      >
        <MenuIcon />
      </IconButton>
      <IconButton color="primary" aria-label={t("mobileButtonAriaLabel")}>
        <LanguageIcon />
      </IconButton>
    </Box>
  )
}
