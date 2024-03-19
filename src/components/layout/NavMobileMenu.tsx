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

import { useNavItems } from "@/app/hooks/useNavItems"
import LocalLink from "@/components/LocalLink"

const drawerWidth = 240

export default function NavMobileMenu({
  navItems,
  messages,
  children,
}: {
  navItems: ReturnType<typeof useNavItems>
  children: React.ReactNode
  messages: {
    ariaButton: string
    ariaMenu: string
  }
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ p: 1 }}>
      <Typography variant="h5" component="div">
        DHARMAMITRA
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => {
          const { id, label, href } = item
          return (
            <ListItem key={id.concat("mobile")} disablePadding>
              <ListItemButton>
                <LocalLink href={href} sx={{ textDecoration: "none" }}>
                  <ListItemText primary={label} />
                </LocalLink>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: { sm: "none" } }}>
      <Box>
        {children}
        <IconButton
          color="inherit"
          aria-label={messages.ariaButton}
          edge="start"
          sx={{ ml: 1 }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
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
            display: { xs: "block", sm: "none" },
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
