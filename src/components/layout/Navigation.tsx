import * as React from "react"
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"

import { useNavItems } from "@/app/hooks/useNavItems"
import LocalLink from "@/components/LocalLink"

import LocaleSelector from "./LocaleSelector"
import NavMobileMenu from "./NavMobileMenu"

export default function Navigation() {
  const navItems = useNavItems()

  return (
    <AppBar component="nav" color="transparent" elevation={1} sx={{ py: 1 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <LocalLink href="/" sx={{ textDecoration: "none" }}>
            DHARMAMITRA
          </LocalLink>
        </Typography>

        <NavMobileMenu navItems={navItems}>
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
                <Button key={id}>
                  <LocalLink href={href} sx={{ textDecoration: "none" }}>
                    {label}
                  </LocalLink>
                </Button>
              )
            })}
          </Box>
          <LocaleSelector />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
