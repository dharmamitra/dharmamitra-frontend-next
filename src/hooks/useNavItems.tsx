import * as React from "react"
import { useLocale, useTranslations } from "next-intl"

import appConfig from "@/config"
import { docsSiteUrl, nexusUrl } from "@/utils/constants"

const hasNexus = appConfig.featureFlags.hasNexus

export type NavItems = {
  internal: { id: string; label: string; href: string }[]
  external: { id: string; label: string; href: string }[]
}

export const useNavItems = () => {
  const t = useTranslations()
  const locale = useLocale()

  return React.useMemo<NavItems>(
    () => ({
      internal: appConfig.subPages.map((page) => ({
        id: `${locale}-${page}-nav-item`,
        label: t(`pages.nav.${page}`),
        href: `/${page}`,
      })),
      external: [
        ...(hasNexus
          ? [
              {
                id: `${locale}-nexus-nav-item`,
                label: t("navigation.nexusLinkLabel"),
                href: nexusUrl,
              },
            ]
          : []),
        {
          id: `${locale}-docs-nav-item`,
          label: t("navigation.docsLinkLabel"),
          href: docsSiteUrl,
        },
      ],
    }),
    [t, locale],
  )
}
