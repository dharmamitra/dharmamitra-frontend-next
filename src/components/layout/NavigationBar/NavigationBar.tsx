import React from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"
import { AppBar, Toolbar } from "@mui/material"

import Logo from "@/components/Logo"
import { useNavItems } from "@/hooks/useNavItems"

import LocaleSelector from "../LocaleSelector"
import DesktopNavMenu from "./DesktopNavMenu"
import MobileNavMenuLoading from "./MobileNavMenuLoading"

const MobileNavMenu = dynamic(() => import("./MobileNavMenuRenderer"), {
  loading: () => <MobileNavMenuLoading />,
  ssr: false,
})

export default function NavigationBar() {
  const navItems = useNavItems()
  const t = useTranslations("navigation")
  return (
    <>
      <AppBar
        component="nav"
        elevation={0}
        sx={{
          height: { xs: "78px", sm: "85px", md: "96px" },
          py: "0.2rem",
          backgroundColor: "common.white",
          boxShadow: "0px 4px 4px 0px #0000001A",
        }}
      >
        <Toolbar>
          <Logo />

          <MobileNavMenu
            mobileProps={{
              navItems,
              messages: {
                ariaButton: t("mobileButtonAriaLabel"),
                ariaMenu: t("mobileMenuAriaLabel"),
              },
              children: <LocaleSelector />,
            }}
          />

          <DesktopNavMenu />
        </Toolbar>
      </AppBar>
      {/* navbar offset */}
      <div style={{ width: "100%", height: 80 }} />
    </>
  )
}
