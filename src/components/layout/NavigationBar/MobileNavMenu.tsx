"use client"

import * as React from "react"
import MenuIcon from "@mui/icons-material/Menu"
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material"

import LocalLink from "@/components/LocalLink"
import Logo from "@/components/Logo"
import { useNavItems } from "@/hooks/useNavItems"

const drawerWidth = 240

export type MobileNavMenuProps = {
  navItems: ReturnType<typeof useNavItems>
  children: React.ReactNode
  messages: {
    ariaButton: string
    ariaMenu: string
  }
}

export default function MobileNavMenu({
  // navItems & locale selector passed as a child to avoid the need for i18n provider
  navItems,
  messages,
  children,
}: MobileNavMenuProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ p: 1 }}>
      <Typography variant="h5" component="div">
        <Logo />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => {
          const { id, label, href } = item
          return (
            <ListItem key={id + "-mobile-menu-item"} disablePadding color="text.primary">
              <ListItemButton color="inherit">
                <LocalLink href={href} sx={{ textDecoration: "none", color: "text.primary" }}>
                  <ListItemText>{label}</ListItemText>
                </LocalLink>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <Box>
      <Box>
        <IconButton
          aria-label={messages.ariaButton}
          edge="start"
          sx={{ ml: 1 }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        {children}
      </Box>
      <nav aria-label={messages.ariaMenu}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            // Better open performance on mobile.
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}
