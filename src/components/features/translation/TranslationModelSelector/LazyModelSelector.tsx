"use client"

import React from "react"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useQuery } from "@tanstack/react-query"

import { DMFetchApi } from "@/api"
import ExceptionText from "@/components/ExceptionText"
import useTranslationEndpointParams from "@/hooks/translation/useTranslationEndpointParams"

const excludedModels = /(NO)/

export default function LazyModelSelector() {
  const { data, isError, error } = useQuery({
    queryKey: DMFetchApi.translationModels.makeQueryKey(),
    queryFn: () => {
      return DMFetchApi.translationModels.call()
    },
  })
  const models = React.useMemo(() => {
    if (!data) return []

    return data?.filter((model) => model && !excludedModels.test(model))
  }, [data])

  const { translationModel, setTranslationModel } =
    useTranslationEndpointParams()

  const isGrid = useMediaQuery("(max-width: 810px)")

  if (isError) {
    return (
      <ExceptionText message={`Problem loading models: ${error?.message}`} />
    )
  }

  return (
    <ToggleButtonGroup
      color="secondary"
      sx={{
        ...(isGrid
          ? {
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
            }
          : {}),
      }}
      size="small"
      value={translationModel}
      exclusive
      onChange={(event, value) => value && setTranslationModel(value)}
      aria-label="Model"
    >
      {models?.map((model) => (
        <ToggleButton
          key={model + "-model-option-loader"}
          value={model}
          sx={{
            ...(isGrid
              ? {
                  border: "1px solid",
                  borderLeft: "1px solid !important",
                  borderLeftColor: "rgba(0, 0, 0, 0.12) !important",
                  borderColor: "divider",
                  marginLeft: "0 !important",
                }
              : {}),
          }}
        >
          {model}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
