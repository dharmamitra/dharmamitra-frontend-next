"use client"

import { useTranslations } from "next-intl"
import { IconButton } from "@mui/material"
import Box from "@mui/material/Box"

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
      }}
    >
      <IconButton
        onClick={onToggle}
        aria-label={t("sidebarToggleLabel")}
        sx={{ p: 1.25, color: "text.secondary" }}
      >
        {isExpanded ? <SidebarCollapsIcon /> : <SidebarExpandIcon />}
      </IconButton>
    </Box>
  )
}
