import * as React from "react"
import { useTranslations } from "next-intl"
import { AppBar, Box, Toolbar, Typography } from "@mui/material"

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
        elevation={1}
        sx={{ py: 1, backgroundColor: "white" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <LocalLink href="/" sx={{ textDecoration: "none" }}>
              DHARMAMITRA
            </LocalLink>
          </Typography>

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
