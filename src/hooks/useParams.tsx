import * as React from "react"
import { useSearchParams } from "next/navigation"

import { usePathname, useRouter } from "@/navigation"

const useParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getSearchParam = React.useCallback(
    (name: string) => {
      return searchParams.get(name)
    },
    [searchParams],
  )

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const updateParams = React.useCallback(
    (queryString: string) => {
      router.push(pathname + "?" + queryString)
    },
    [router, pathname],
  )

  return {
    getSearchParam,
    createQueryString,
    updateParams,
  }
}

export default useParams
