import * as React from "react"
import { useTranslations } from "next-intl"
import { Button } from "@mui/material"

import LocalLink from "@/components/LocalLink"
import appConfig from "@/config"
import { useNavItems } from "@/hooks/useNavItems"

const NEXUS_URL = appConfig.featureFlags.hasNexus
  ? process.env.NEXT_PUBLIC_DHARAMNEXUS_URL || undefined
  : undefined

const NEXUS_BUTTON_PROPS = {
  variant: "outlined",
} as const

export function NavItemButtonsLoading() {
  const navItems = useNavItems()
  const t = useTranslations()

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
      {NEXUS_URL && (
        <Button href={NEXUS_URL} {...NEXUS_BUTTON_PROPS}>
          {t("navigation.nexusLinkLabel")}
        </Button>
      )}
    </>
  )
}
export default function NavItemButtons() {
  const navItems = useNavItems()
  const t = useTranslations()

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
      {NEXUS_URL && (
        <Button href={NEXUS_URL} {...NEXUS_BUTTON_PROPS}>
          {t("navigation.nexusLinkLabel")}
        </Button>
      )}
    </>
  )
}
