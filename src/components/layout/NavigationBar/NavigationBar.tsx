"use client"

import React from "react"
import dynamic from "next/dynamic"
import { useTranslations } from "next-intl"

import { useNavItems } from "@/hooks/useNavItems"

import AppBar from "./AppBar"
import DesktopNavMenu from "./DesktopNavMenu"
import MobileNavMenuLoading from "./LazyMobileNavMenu"
import LocaleSelector from "./LocaleSelector"

const MobileNavMenu = dynamic(() => import("./MobileNavMenuRenderer"), {
  loading: () => <MobileNavMenuLoading />,
  ssr: false,
})

export default function NavigationBar() {
  const navItems = useNavItems()
  const t = useTranslations("navigation")
  return (
    <AppBar>
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
    </AppBar>
  )
}
