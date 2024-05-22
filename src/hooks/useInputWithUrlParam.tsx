import React from "react"
import { SelectChangeEvent } from "@mui/material"

import useParams from "@/hooks/useParams"

function useInputWithUrlParam(paramName: string, defaultValue: string = "") {
  const { getSearchParam, createQueryString, updateParams } = useParams()
  const [currentInput, setCurrentInput] = React.useState<string>(
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
      characterLimit?: number,
    ) => {
      let newValue = typeof input === "string" ? input : input.target.value

      if (characterLimit && newValue.length > characterLimit) {
        newValue = newValue.slice(0, characterLimit)
      }

      setCurrentInput(newValue)
      updateParams(createQueryString(paramName, newValue))
    },
    [updateParams, createQueryString, paramName],
  )

  return { input: currentInput, handleInputChange }
}

export default useInputWithUrlParam
