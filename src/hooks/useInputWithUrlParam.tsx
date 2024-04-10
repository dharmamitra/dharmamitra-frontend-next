import React from "react"
import { SelectChangeEvent } from "@mui/material"

import useParams from "@/hooks/useParams"

function useInputWithUrlParam(paramName: string, defaultValue: string = "") {
  const { getSearchParam, createQueryString, updateParams } = useParams()
  const [input, setInput] = React.useState<string>(
    getSearchParam(paramName) ?? defaultValue,
  )

  React.useEffect(() => {
    setInput(getSearchParam(paramName) ?? defaultValue)
  }, [getSearchParam, paramName, defaultValue])

  const handleInputChange = React.useCallback(
    (
      input:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>
        | string,
      limit?: number,
    ) => {
      let newValue = typeof input === "string" ? input : input.target.value

      if (limit && newValue.length > limit) {
        newValue = newValue.slice(0, limit)
      }

      setInput(newValue)
      updateParams(createQueryString(paramName, newValue))
    },
    [updateParams, createQueryString, paramName],
  )

  return { input, handleInputChange }
}

export default useInputWithUrlParam
