import { MetadataRoute } from "next"

import { defaultLocale, pathnames, supportedLocales } from "@/config"

const baseUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_BASE_PATH}`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = Object.values(pathnames)
    .map((pathname) => {
      return Object.values(supportedLocales).map((locale) => {
        return {
          url: `${baseUrl}/${locale === defaultLocale ? "" : locale}${pathname}`
            .replace(/\/{2,}/g, "/")
            .replace(/\/$/, ""),
        }
      })
    })
    .flat()

  return pages
}
