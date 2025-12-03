"use client"

import { useTranslations } from "next-intl"
import { IconButton } from "@mui/material"
import Box from "@mui/material/Box"

import { appBarHeight } from "../../AppBar/AppBarFrame"

import SidebarCollapsIcon from "./SidebarCollapsIcon"
import SidebarExpandIcon from "./SidebarExpandIcon"

type Props = {
  isExpanded: boolean
  onToggle: () => void
}

export default function SidebarToggle({ isExpanded, onToggle }: Props) {
  const t = useTranslations("navigation")

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        px: 1,
        minHeight: appBarHeight,
      }}
    >
      <IconButton
        onClick={onToggle}
        aria-label={t("sidebarToggleLabel")}
        sx={{ color: "text.secondary" }}
      >
        {isExpanded ? <SidebarCollapsIcon /> : <SidebarExpandIcon />}
      </IconButton>
    </Box>
  )
}
