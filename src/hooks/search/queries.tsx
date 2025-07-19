import { useQuery } from "@tanstack/react-query"

import { DMFetchApi, SearchApiTypes } from "@/api"
import {
  useFilterSourceLanguageParam,
  useFilterTargetLanguageParam,
  useInputEncodingParamWithLocalStorage,
  useSearchTypeParam,
  useSourceFiltersValue,
} from "@/hooks/params"

export function usePrimarySearchQuery(search_input: string) {
  const [search_type] = useSearchTypeParam()
  const [input_encoding] = useInputEncodingParamWithLocalStorage()
  const [filter_source_language] = useFilterSourceLanguageParam()
  const [filter_target_language] = useFilterTargetLanguageParam()
  const source_filters = useSourceFiltersValue()

  const requestBody: SearchApiTypes.RequestBody<"/primary/"> = {
    search_input,
    search_type,
    input_encoding,
    filter_source_language,
    filter_target_language,
    source_filters,
    do_ranking: true,
    max_depth: 50,
  }

  return useQuery({
    queryKey: DMFetchApi.searchPrimary.makeQueryKey(requestBody),
    queryFn: () => DMFetchApi.searchPrimary.call(requestBody),
    enabled: false,
  })
}

export function useParallelSearchQuery(search_input: string) {
  const [search_type] = useSearchTypeParam()
  const [input_encoding] = useInputEncodingParamWithLocalStorage()
  const [filter_source_language] = useFilterSourceLanguageParam()
  const [filter_target_language] = useFilterTargetLanguageParam()
  const source_filters = useSourceFiltersValue()

  const requestBody: SearchApiTypes.RequestBody<"/parallel/"> = {
    search_input,
    search_type,
    input_encoding,
    filter_source_language,
    filter_target_language,
    source_filters,
    do_ranking: true,
    max_depth: 50,
  }

  return useQuery({
    queryKey: DMFetchApi.searchParallel.makeQueryKey(requestBody),
    queryFn: () => DMFetchApi.searchParallel.call(requestBody),
    enabled: false,
  })
}
