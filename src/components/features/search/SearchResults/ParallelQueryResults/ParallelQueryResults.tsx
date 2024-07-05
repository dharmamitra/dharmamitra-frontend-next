import React from "react"
import { useQuery } from "@tanstack/react-query"

import { DMFetchApi, globalParams, SearchApiTypes } from "@/api"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { searchParamsNames } from "@/utils/api/search/params"

export default function ParallelQueryResults() {
  const {
    parallel: {
      search_input,
      search_type,
      input_encoding,
      filter_source_data,
      filter_source_language,
      postprocess_model,
    },
  } = searchParamsNames

  const { input: searchInput } = useInputWithUrlParam<string>(search_input)

  const { input: searchType } =
    useInputWithUrlParam<SearchApiTypes.Schema["SearchType"]>(search_type)

  const { input: inputEncoding } =
    useInputWithUrlParam<globalParams.InputEncoding>(input_encoding)

  const { input: filterSrcData } =
    useInputWithUrlParam<SearchApiTypes.Schema["FilterPrimary"]>(
      filter_source_data,
    )

  const { input: filterLanguage } = useInputWithUrlParam<
    SearchApiTypes.Schema["FilterLanguage"]
  >(filter_source_language)

  const { input: postProcessModel } =
    useInputWithUrlParam<SearchApiTypes.Schema["PostProcessModel"]>(
      postprocess_model,
    )

  const requestBody: SearchApiTypes.ParallelRequestBody = React.useMemo(
    () => ({
      search_input: searchInput,
      search_type: searchType,
      input_encoding: inputEncoding,
      filter_source_data: filterSrcData,
      filter_source_language: filterLanguage,
      postprocess_model: postProcessModel,
    }),
    [
      searchInput,
      searchType,
      inputEncoding,
      filterSrcData,
      filterLanguage,
      postProcessModel,
    ],
  )

  const { data, isLoading, isError, error } = useQuery({
    queryKey: DMFetchApi.searchParallel.makeQueryKey(requestBody),
    queryFn: () => DMFetchApi.searchParallel.call(requestBody),
  })

  const processedData = React.useMemo(() => {
    if (!data) return null
    return JSON.stringify(data)
  }, [data])

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>No data</div>
  }

  return <div>{processedData}</div>
}
