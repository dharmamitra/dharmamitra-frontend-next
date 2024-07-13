import * as React from "react"
import { useSearchParams } from "next/navigation"

import appConfig from "@/config"
import { defaultLocale } from "@/i18n"
import { usePathname } from "@/navigation"

function updateQueryParamsWithoutReload(newUrl: string) {
  if (typeof window !== "undefined") {
    const lang = document.documentElement.lang
    const path =
      appConfig.basePath + (lang === defaultLocale ? "" : "/" + lang) + newUrl
    window.history.pushState({ path }, "", path)
  }
}

const useParams = () => {
  const pathname = usePathname().replace(/\/$/, "")
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
    ({
      paramName,
      value,
      paramsString,
    }: {
      paramName: string
      value: string | null
      paramsString: string
    }) => {
      const currentParams = new URLSearchParams(paramsString)
      if (value) {
        currentParams.set(paramName, value)
      } else {
        currentParams.delete(paramName)
      }

      return currentParams.toString()
    },
    [],
  )

  const updateParams = React.useCallback(
    (queryString: string) => {
      updateQueryParamsWithoutReload(pathname + "?" + queryString)
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
