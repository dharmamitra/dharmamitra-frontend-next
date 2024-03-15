import { createLocalizedPathnamesNavigation } from "next-intl/navigation"

import { supportedLocales, localePrefix, pathnames } from "@/config"

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales: supportedLocales,
    localePrefix,
    pathnames,
  })
