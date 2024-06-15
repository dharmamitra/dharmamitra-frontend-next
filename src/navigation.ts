import { createSharedPathnamesNavigation } from "next-intl/navigation"

import { localePrefix, supportedLocales } from "@/i18n"

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({
    locales: supportedLocales,
    localePrefix,
  })
