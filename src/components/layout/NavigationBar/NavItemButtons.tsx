import * as React from "react"
import { Button } from "@mui/material"

import LocalLink from "@/components/LocalLink"
import { useNavItems } from "@/hooks/useNavItems"

export function NavItemButtonsLoading() {
  const navItems = useNavItems()
  return (
    <>
      {navItems.map((item) => {
        const { id, label, href } = item
        return (
          <Button key={id} href={href} variant="text" disabled>
            {label}
          </Button>
        )
      })}
    </>
  )
}
export default function NavItemButtons() {
  const navItems = useNavItems()
  return (
    <>
      {navItems.map((item) => {
        const { id, label, href } = item
        return (
          <LocalLink
            key={id}
            href={href}
            variant="button"
            buttonVariant="text"
            sx={{ color: "text.primary" }}
          >
            {label}
          </LocalLink>
        )
      })}
    </>
  )
}
