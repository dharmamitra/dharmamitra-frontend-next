import * as React from "react"
import { useLocale, useTranslations } from "next-intl"

import appConfig from "@/config"

export const useNavItems = () => {
  const t = useTranslations()
  const locale = useLocale()

  return React.useMemo<{ id: string; label: string; href: string }[]>(
    () =>
      appConfig.subPages.map((page) => ({
        id: `${locale}-${page}-nav-item`,
        label: t(`pages.nav.${page}`),
        href: `/${page}`,
      })),
    [t, locale],
  )
}
