"use client"

import React, { ComponentType } from "react"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { SvgIconProps } from "@mui/material"
import Box from "@mui/material/Box"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Tooltip from "@mui/material/Tooltip"

import { MitraFeature, SIDEBAR_TRANSITION_DURATION } from "./constants"

import { Link } from "@/i18n/routing"

type Props = {
  route: MitraFeature
  icon: ComponentType<SvgIconProps>
  labelKey: MitraFeature
  isExpanded: boolean
}

export default function SidebarNavItem({ route, icon: Icon, labelKey, isExpanded }: Props) {
  const t = useTranslations("features")
  const pathname = usePathname()

  // Check if current path matches this route (accounts for locale prefix)
  const isActive = pathname.includes(`/${route}`)
  const label = t(labelKey)

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        component={Link}
        href={`/${route}`}
        selected={isActive}
        sx={{
          borderRadius: 1,
          "&.Mui-selected": {
            bgcolor: "action.selected",
            "&:hover": {
              bgcolor: "action.selected",
            },
          },
        }}
      >
        <Box
          sx={{
            minHeight: 36,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            borderRadius: 1,
          }}
        >
          <ButtonContent isExpanded={isExpanded} isActive={isActive} label={label}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isExpanded ? 2 : "auto",
                justifyContent: "center",
                color: isActive ? "primary.main" : "text.secondary",
                transition: `margin ${SIDEBAR_TRANSITION_DURATION}ms ease`,
              }}
            >
              <Icon />
            </ListItemIcon>
          </ButtonContent>
        </Box>
      </ListItemButton>
    </ListItem>
  )
}

type ButtonContentProps = {
  children: React.ReactNode
  isActive: boolean
  isExpanded: boolean
  label: string
}

function ButtonContent({ children, isActive, isExpanded, label }: ButtonContentProps) {
  if (isExpanded) {
    return (
      <>
        {children}
        <ListItemText
          primary={label}
          sx={{
            opacity: isExpanded ? 1 : 0,
            width: isExpanded ? "auto" : 0,
            overflow: "hidden",
            whiteSpace: "nowrap",
            transition: `opacity ${SIDEBAR_TRANSITION_DURATION}ms ease, width ${SIDEBAR_TRANSITION_DURATION}ms ease`,
            "& .MuiTypography-root": {
              fontWeight: isActive ? 500 : 400,
            },
          }}
        />
      </>
    )
  }

  return (
    <Tooltip title={label} placement="right">
      <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
        {children}
      </Box>
    </Tooltip>
  )
}
