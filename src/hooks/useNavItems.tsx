import * as React from "react"
import { useTranslations } from "next-intl"

import appConfig from "@/config"

export const useNavItems = () => {
  const t = useTranslations("pages")

  return React.useMemo<{ id: string; label: string; href: string }[]>(
    () => [
      // {
      //   id: crypto.randomUUID(),
      //   label: "Explore",
      //   href: "https://buddhanexus2.kc-tbts.uni-hamburg.de/",
      // },
      ...appConfig.subPages.map((page) => ({
        id: crypto.randomUUID(),
        label: t(page),
        href: `/${page}`,
      })),
    ],
    [t],
  )
}
