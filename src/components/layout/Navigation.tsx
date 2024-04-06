import * as React from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { AppBar, Box, Toolbar } from "@mui/material"

import LocalLink from "@/components/LocalLink"
import { useNavItems } from "@/hooks/useNavItems"

import LocaleSelector from "./LocaleSelector"
import NavMobileMenu from "./NavMobileMenu"

export default function Navigation() {
  const navItems = useNavItems()
  const t = useTranslations("navigation")
  return (
    <>
      <AppBar
        component="nav"
        elevation={0}
        sx={{ py: "0.2rem", backgroundColor: "white" }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <LocalLink href="/" sx={{ textDecoration: "none" }}>
              <Image src="/dm-logo-flat.png" alt="Dharmamitra" width={240} />
            </LocalLink>
          </Box>

          <NavMobileMenu
            navItems={navItems}
            messages={{
              ariaButton: t("mobileButtonAriaLabel"),
              ariaMenu: t("mobileMenuAriaLabel"),
            }}
          >
            <LocaleSelector />
          </NavMobileMenu>

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              {navItems.map((item) => {
                const { id, label, href } = item
                return (
                  <LocalLink key={id} href={href} variant="text-button">
                    {label}
                  </LocalLink>
                )
              })}
            </Box>
            <LocaleSelector />
          </Box>
        </Toolbar>
      </AppBar>
      {/* navbar offset */}
      <div style={{ width: "100%", height: 80 }} />
    </>
  )
}
