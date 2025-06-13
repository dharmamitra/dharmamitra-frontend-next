"use client"

import React from "react"
import { useLocale, useTranslations } from "next-intl"
import LanguageIcon from "@mui/icons-material/Language"
import {
  FormControl,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material"

import { Link, routing, usePathname } from "@/i18n/routing"

export default function LocaleSelector() {
  const t = useTranslations("localeSwitcher")

  const pathname = usePathname()

  const activeLocale = useLocale()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
      <Menu
        id="locale-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {routing.locales.map((locale) => (
          <Link
            key={locale + "-locale-switcher-link"}
            href={{ pathname }}
            locale={locale}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <MenuItem
              key={locale + "-locale-switcher-link"}
              value={locale}
              selected={locale === activeLocale}
            >
              <Typography
                variant="body2"
                sx={{ textTransform: "uppercase" }}
                lineHeight={1.5}
              >
                {t("locale", {
                  locale: locale.replace(/-/g, "_"),
                })}
              </Typography>
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </FormControl>
  )
}
