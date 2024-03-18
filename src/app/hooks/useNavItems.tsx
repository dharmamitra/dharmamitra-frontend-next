import * as React from "react"
import { useTranslations } from "next-intl"

import type { AppPathnames } from "@/config"

export const useNavItems = () => {
  const t = useTranslations("navigation")

  return React.useMemo<{ id: string; label: string; href: AppPathnames }[]>(
    () => [
      {
        id: crypto.randomUUID(),
        label: t("about"),
        href: "/about",
      },
      {
        id: crypto.randomUUID(),
        label: t("team"),
        href: "/team",
      },
    ],
    [],
  )
}
