import * as React from "react"
import { useSearchParams } from "next/navigation"

import { defaultLocale } from "@/i18n"
import { usePathname } from "@/navigation"

function updateQueryParamsWithoutReloading(newUrl: string) {
  if (typeof window !== "undefined") {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
    const lang = document.documentElement.lang
    const path = basePath + (lang === defaultLocale ? "" : "/" + lang) + newUrl
    window.history.replaceState({ path }, "", path)
  }
}

const useParams = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getSearchParam = React.useCallback(
    (paramName: string) => {
      return searchParams.get(paramName)
    },
    [searchParams],
  )

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = React.useCallback(
    (paramName: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(paramName, value)

      return params.toString()
    },
    [searchParams],
  )

  const updateParams = React.useCallback(
    (queryString: string) => {
      updateQueryParamsWithoutReloading(pathname + "?" + queryString)
    },
    [pathname],
  )

  return {
    getSearchParam,
    createQueryString,
    updateParams,
  }
}

export default useParams
