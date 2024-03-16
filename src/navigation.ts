import { createLocalizedPathnamesNavigation } from "next-intl/navigation"

import { localePrefix, pathnames, supportedLocales } from "@/config"

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales: supportedLocales,
    localePrefix,
    pathnames,
  })
