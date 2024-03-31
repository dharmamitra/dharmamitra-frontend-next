import React from "react"

import useParams from "@/hooks/useParams"

function useInputWithUrlParam(paramName: string, defaultValue: string = "") {
  const { getSearchParam, createQueryString, updateParams } = useParams()
  const [input, setInput] = React.useState<string>(
    getSearchParam(paramName) ?? defaultValue,
  )

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.target.value
      setInput(newValue)
      updateParams(createQueryString(paramName, newValue))
    },
    [updateParams, createQueryString, paramName],
  )

  return { input, handleInputChange }
}

export default useInputWithUrlParam
