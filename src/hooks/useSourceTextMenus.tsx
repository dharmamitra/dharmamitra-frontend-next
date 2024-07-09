import React from "react"
import { useQuery } from "@tanstack/react-query"

import { DMFetchApi } from "@/api"
import type { ParsedCategoryMenuItem } from "@/utils/api/search/endpoints/menus/category"
import type { ParsedTextFileMenuItem } from "@/utils/api/search/endpoints/menus/files"
import { SearchFilterLanguage } from "@/utils/api/search/params"

export type UseSourceTextMenusProps = {
  language: SearchFilterLanguage
}

const isEnabled = (params: UseSourceTextMenusProps) => {
  if (Object.keys(params).length === 0) return false
  if (!params.language) return false
  if (params.language === "all") return false
  return true
}

export const useSourceTextMenus = (params: UseSourceTextMenusProps) => {
  const { data: textsData, isLoading: isLoadingTexts } = useQuery({
    queryKey: DMFetchApi.tempMenuSourceTexts.makeQueryKey(
      JSON.stringify(params),
    ),
    // TODO: error handling
    queryFn: () => DMFetchApi.tempMenuSourceTexts.call(params),
    enabled: isEnabled(params),
  })

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: DMFetchApi.tempMenuSourceCategories.makeQueryKey(
      JSON.stringify(params),
    ),
    // TODO: error handling
    queryFn: () => DMFetchApi.tempMenuSourceCategories.call(params),
    enabled: isEnabled(params),
  })

  const texts = React.useMemo(() => {
    return (
      textsData?.reduce(
        (
          map: Map<string, ParsedTextFileMenuItem>,
          text: ParsedTextFileMenuItem,
        ) => {
          map.set(text.id, {
            ...text,
          })
          return map
        },
        new Map(),
      ) ?? new Map<string, ParsedTextFileMenuItem>()
    )
  }, [textsData])
  const categories = categoriesData ?? new Map<string, ParsedCategoryMenuItem>()

  return {
    texts,
    categories,
    isLoadingTexts,
    isLoadingCategories,
  }
}
