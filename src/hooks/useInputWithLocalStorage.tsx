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

function useInputWithLocalStorage({
  paramName,
  defaultValue = "",
}: {
  paramName: string
  defaultValue: string
}) {
  const searchParams = useSearchParams()
  const paramValue = React.useMemo(
    () => getSearchParam({ searchParams, paramName }),
    [searchParams],
  )

  const [input, setInput] = React.useState(() => {
    return paramValue ?? defaultValue
  })
  const [isHydrated, setIsHydrated] = React.useState(Boolean(paramValue))

  // Effect for initializing from localStorage
  React.useEffect(() => {
    const storedValue = localStorage.getItem(paramName)
    if (storedValue) {
      setInput(storedValue)
    }
    setIsHydrated(true)
  }, [paramName])

  // Effect for updates after initialization
  React.useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(paramName, input)
      const url = new URL(window.location.href)
      url.searchParams.set(paramName, input)
      window.history.replaceState(null, "", url.toString())
    }
  }, [input, paramName, isHydrated])

  const handleInputChange = React.useCallback(
    (
      input:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>
        | string,
    ) => {
      const newValue = typeof input === "string" ? input : input.target.value
      setInput(newValue)
    },
    [],
  )

  return { input, handleInputChange, isHydrated }
}

export default useInputWithLocalStorage
