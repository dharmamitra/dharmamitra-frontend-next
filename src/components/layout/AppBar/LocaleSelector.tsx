"use client"

import React from "react"
import { useLocale, useTranslations } from "next-intl"
import LanguageIcon from "@mui/icons-material/Language"
import { FormControl, IconButton, Menu, MenuItem, Typography } from "@mui/material"

import { SupportedLocale } from "@/app/types"
import { routing, usePathname, useRouter } from "@/i18n/routing"

export default function LocaleSelector() {
  const t = useTranslations("localeSwitcher")

  const pathname = usePathname()
  const router = useRouter()
  const activeLocale = useLocale()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLocaleChange = (locale: SupportedLocale) => {
    const currentSearch = typeof window !== "undefined" ? window.location.search : ""
    const fullPath = pathname + currentSearch

    router.replace(fullPath, { locale })
    handleClose()
  }

  return (
    <FormControl>
      <IconButton
        aria-label={t("label")}
        aria-controls="locale-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          pr: 0,
        }}
      >
        <LanguageIcon color="action" />
      </IconButton>
      <Menu id="locale-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        {routing.locales.map((locale) => (
          <MenuItem
            key={locale + "-locale-switcher-link"}
            value={locale}
            selected={locale === activeLocale}
            onClick={() => handleLocaleChange(locale)}
          >
            <Typography variant="body2" sx={{ textTransform: "uppercase" }} lineHeight={1.5}>
              {t("locale", {
                locale: locale.replace(/-/g, "_"),
              })}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </FormControl>
  )
}
