import * as React from "react"
import { useTranslations } from "next-intl"

export const useNavItems = () => {
  const t = useTranslations("navigation")

  return React.useMemo<{ id: string; label: string; href: string }[]>(
    () => [
      {
        id: crypto.randomUUID(),
        label: "Explore",
        href: "https://buddhanexus2.kc-tbts.uni-hamburg.de/",
      },
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
    [t],
  )
}
