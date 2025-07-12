import React from "react"
import dynamic from "next/dynamic"
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward"
import LanguageIcon from "@mui/icons-material/Language"
import { Box, Breakpoint, Button } from "@mui/material"

import LocalLink from "@/components/LocalLink"
import { NavItems } from "@/hooks/useNavItems"

const LocaleSelector = dynamic(() => import("./LocaleSelector"), {
  loading: () => <LanguageIcon color="action" />,
})

type DesktopNavMenuProps = {
  desktopBreakpoint: Breakpoint
  navItems: NavItems
}

export default function DesktopNavMenu({ desktopBreakpoint, navItems }: DesktopNavMenuProps) {
  return (
    <Box
      sx={{
        display: { xs: "none", [desktopBreakpoint]: "flex" },
        alignItems: "center",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        {navItems.external.map((item) => {
          const { id, label, href } = item
          return (
            <Button
              key={id}
              href={href}
              variant="text"
              size="small"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<ArrowOutwardIcon />}
            >
              {label}
            </Button>
          )
        })}
        {navItems.internal.map((item) => {
          const { id, label, href } = item
          return (
            <LocalLink
              key={id}
              href={href}
              variant="button"
              buttonVariant="text"
              sx={{ color: "text.primary", fontSize: "0.928rem" }}
            >
              {label}
            </LocalLink>
          )
        })}
      </Box>
      <LocaleSelector />
    </Box>
  )
}
