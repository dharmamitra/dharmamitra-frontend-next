import { useQuery } from "@tanstack/react-query"

import { DMFetchApi, SearchApiTypes } from "@/api"
import {
  useFilterLanguageParam,
  useFilterSourceLanguageParam,
  useFilterTargetLanguageParam,
  useInputEncodingParamWithLocalStorage,
  useSearchTypeParam,
} from "@/hooks/params"

export function usePrimarySearchQuery(search_input: string) {
  const [search_type] = useSearchTypeParam()
  const [input_encoding] = useInputEncodingParamWithLocalStorage()
  const [filter_language] = useFilterLanguageParam()

  const requestBody: SearchApiTypes.RequestBody<"/primary/"> = {
    search_input,
    search_type,
    input_encoding,
    filter_language,
    limits: { category_include: [], file_include: [] },
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

  const requestBody: SearchApiTypes.RequestBody<"/parallel/"> = {
    search_input,
    search_type,
    input_encoding,
    filter_source_language,
    filter_target_language,
    source_limits: { category_include: [], file_include: [] },
  }

  return useQuery({
    queryKey: DMFetchApi.searchParallel.makeQueryKey(requestBody),
    queryFn: () => DMFetchApi.searchParallel.call(requestBody),
    enabled: false,
  })
}
