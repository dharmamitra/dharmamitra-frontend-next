import React from "react"
import { useSearchParams } from "next/navigation"
import { SelectChangeEvent } from "@mui/material"

function getSearchParam({
  searchParams,
  paramName,
}: {
  searchParams: URLSearchParams
  paramName: string
}) {
  return searchParams.get(paramName)
}

function useParamValueWithLocalStorage({
  paramName,
  defaultValue = "",
}: {
  paramName: string
  defaultValue: string | undefined
}) {
  const searchParams = useSearchParams()
  const paramValue = React.useMemo(
    () => getSearchParam({ searchParams, paramName }),
    [searchParams, paramName],
  )

  const [value, setValue] = React.useState(() => {
    return paramValue ?? defaultValue
  })
  const [isHydrated, setIsHydrated] = React.useState(Boolean(paramValue))

  // Effect for initializing from localStorage
  React.useEffect(() => {
    const storedValue = localStorage.getItem(paramName)
    if (storedValue) {
      setValue(storedValue)
    }
    setIsHydrated(true)
  }, [paramName])

  // Effect for updates after initialization
  React.useEffect(() => {
    if (isHydrated) {
      const url = new URL(window.location.href)

      if (value) {
        url.searchParams.set(paramName, value)
        localStorage.setItem(paramName, value)
      } else {
        url.searchParams.delete(paramName)
        localStorage.setItem(paramName, "")
      }

      window.history.pushState(null, "", url.toString())
    }
  }, [value, paramName, isHydrated])

  const handleValueChange = React.useCallback(
    (
      value:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>
        | string
        | null,
    ) => {
      if (value === null) return
      const newValue = typeof value === "string" ? value : value.target.value
      setValue(newValue)
    },
    [],
  )

  return { value, handleValueChange, isHydrated }
}

export default useParamValueWithLocalStorage
