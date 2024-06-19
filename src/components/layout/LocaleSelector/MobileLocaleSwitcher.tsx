"use client"

import React, { useState } from "react"
import { useSearchParams } from "next/navigation"
import LanguageIcon from "@mui/icons-material/Language"
import { FormControl, IconButton, Menu, MenuItem } from "@mui/material"

import { usePathname, useRouter } from "@/navigation"

import { LocaleSwitcherProps } from "./ResponseiveLocaleSwitcher"

export default function MobileLocaleSwitcher({
  children,
  defaultValue,
  label,
}: LocaleSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const searchParams = new URLSearchParams(params)

  const [value, setValue] = useState(defaultValue)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onSelectChange = (nextLocale: string) => {
    setValue(nextLocale)
    router.replace(`${pathname}?${searchParams.toString()}`, {
      locale: nextLocale as SupportedLocale,
    })
    handleClose()
  }

  return (
    <FormControl>
      <IconButton
        aria-label={label}
        aria-controls="locale-menu"
        aria-haspopup="true"
        onClick={handleClick}
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
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null
          const childValue = child.props.value
          return (
            <MenuItem
              key={childValue}
              selected={childValue === value}
              onClick={() => onSelectChange(childValue)}
            >
              {child.props.children}
            </MenuItem>
          )
        })}
      </Menu>
    </FormControl>
  )
}
