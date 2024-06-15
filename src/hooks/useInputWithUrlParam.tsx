import React from "react"
import { SelectChangeEvent } from "@mui/material"

import useParams from "@/hooks/useParams"

function useInputWithUrlParam<T>(paramName: string, defaultValue: string = "") {
  const { getSearchParam, createQueryString, updateParams } = useParams()
  const [currentInput, setCurrentInput] = React.useState(
    getSearchParam(paramName) ?? defaultValue,
  )

  React.useEffect(() => {
    setCurrentInput(getSearchParam(paramName) ?? defaultValue)
  }, [getSearchParam, paramName, defaultValue])

  const handleInputChange = React.useCallback(
    (
      input:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>
        | string,
    ) => {
      const newValue = typeof input === "string" ? input : input.target.value

      setCurrentInput(newValue)
      updateParams(createQueryString(paramName, newValue))
    },
    [updateParams, createQueryString, paramName],
  )

  return { input: currentInput as T, handleInputChange }
}

export default useInputWithUrlParam
