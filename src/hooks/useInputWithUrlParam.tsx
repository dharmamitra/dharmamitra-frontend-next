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
      event:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>,
    ) => {
      const newValue = event.target.value
      setInput(newValue)
      updateParams(createQueryString(paramName, newValue))
    },
    [updateParams, createQueryString, paramName],
  )

  return { input, handleInputChange }
}

export default useInputWithUrlParam
