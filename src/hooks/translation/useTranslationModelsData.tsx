import React from "react"
import { useQuery } from "@tanstack/react-query"

import { DMFetchApi } from "@/api"

const excludedModels = /(NO)/

// TODO: remove once BE model handling is confirmed
export function useTranslationModelsData() {
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

  return { models, isError, error }
}
