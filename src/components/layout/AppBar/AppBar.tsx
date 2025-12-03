"use client"

import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { Breakpoint } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

import AppBarFrame from "./AppBarFrame"
import DesktopNavMenu from "./DesktopNavMenu"
import MobileNavMenuLoading from "./MobileNavMenuLoading"

import { useNavItems } from "@/hooks/useNavItems"

const DESKTOP_BREAKPOINT: Breakpoint = "md"

const MobileNavMenu = dynamic(() => import("./MobileNavMenu"), {
  loading: () => <MobileNavMenuLoading />,
  ssr: false,
})

// TODO: Refactor mobile handling to merge with feature menu
export default function AppBar() {
  const navItems = useNavItems()
  const t = useTranslations("navigation")
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down(DESKTOP_BREAKPOINT))

  return (
    <AppBarFrame>
      {isMobile ? (
        <MobileNavMenu
          navItems={navItems}
          messages={{
            ariaButton: t("mobileButtonAriaLabel"),
            ariaMenu: t("mobileMenuAriaLabel"),
          }}
        />
      ) : (
        <DesktopNavMenu desktopBreakpoint={DESKTOP_BREAKPOINT} navItems={navItems} />
      )}
    </AppBarFrame>
  )
}
