import React from "react"
import { useQuery } from "@tanstack/react-query"

import { DMFetchApi } from "@/api"
import type { ParsedCategoryMenuItem } from "@/utils/api/search/endpoints/menus/category"
import type { ParsedTextFileMenuItem } from "@/utils/api/search/endpoints/menus/files"

export const useSourceTextMenus = (
  params: { language: string } | undefined,
) => {
  const { data: textsData, isLoading: isLoadingTexts } = useQuery({
    queryKey: DMFetchApi.tempMenuSourceTexts.makeQueryKey(
      JSON.stringify(params),
    ),
    // TODO: update with language when backend supports it & add error handling
    queryFn: () => DMFetchApi.tempMenuSourceTexts.call({ language: "pli" }),
    enabled: !!params,
  })

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: DMFetchApi.tempMenuSourceCategories.makeQueryKey(
      JSON.stringify(params),
    ),
    // TODO: update with language when backend supports it & add error handling
    queryFn: () =>
      DMFetchApi.tempMenuSourceCategories.call({ language: "pli" }),
    enabled: !!params,
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
