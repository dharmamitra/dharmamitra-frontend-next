import * as React from "react"
import { useTranslations } from "next-intl"

import appConfig from "@/config"

const NEXUS_URL = process.env.NEXT_PUBLIC_DHARAMNEXUS_URL ?? "/"

export const useNavItems = () => {
  const t = useTranslations()

  return React.useMemo<{ id: string; label: string; href: string }[]>(
    () => [
      ...(appConfig.env !== "pub"
        ? [
            {
              id: crypto.randomUUID(),
              label: t(`navigation.nexusLinkLabel`),
              href: NEXUS_URL,
            },
          ]
        : []),
      ...appConfig.subPages.map((page) => ({
        id: crypto.randomUUID(),
        label: t(`pages.${page}`),
        href: `/${page}`,
      })),
    ],
    [t],
  )
}
