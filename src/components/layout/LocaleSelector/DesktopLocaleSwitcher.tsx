"use client"

import React, { useTransition } from "react"
import { useSearchParams } from "next/navigation"
import LanguageIcon from "@mui/icons-material/Language"
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material"
import { visuallyHidden } from "@mui/utils"

import { usePathname, useRouter } from "@/i18n/routing"

import { LocaleSwitcherProps } from "./ResponseiveLocaleSwitcher"

export default function DesktopLocaleSwitcher({
  children,
  defaultValue,
  label,
}: LocaleSwitcherProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useSearchParams()
  const searchParams = new URLSearchParams(params)

  const [value, setValue] = React.useState(defaultValue)

  function onSelectChange(event: SelectChangeEvent<string>) {
    const nextLocale = event.target.value
    setValue(nextLocale)
    startTransition(() => {
      router.replace(`${pathname}?${searchParams.toString()}`, {
        locale: nextLocale as SupportedLocale,
      })
    })
  }

  return (
    <FormControl>
      <InputLabel id="locale-selector-label" sx={visuallyHidden}>
        {label}
      </InputLabel>
      <Select
        labelId="locale-selector-label"
        id="locale-selector"
        value={value}
        disabled={isPending}
        onChange={onSelectChange}
        IconComponent={LanguageIcon}
        inputProps={{
          sx: {
            mr: 2,
            py: 1,
          },
        }}
      >
        {children}
      </Select>
    </FormControl>
  )
}
