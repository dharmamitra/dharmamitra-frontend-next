import * as React from "react"
import { useTranslations } from "next-intl"

import appConfig from "@/config"

export const useNavItems = () => {
  const t = useTranslations()

  return React.useMemo<{ id: string; label: string; href: string }[]>(
    () =>
      appConfig.subPages.map((page) => ({
        id: crypto.randomUUID(),
        label: t(`pages.${page}`),
        href: `/${page}`,
      })),
    [t],
  )
}
