import React from "react"
import { useQuery } from "@tanstack/react-query"
import { DMFetchApi } from "@/api"
import type { ParsedCategoryMenuItem } from "@/utils/api/endpoints/menus/category"
import type { ParsedTextFileMenuItem } from "@/utils/api/endpoints/menus/files"

export const useDbMenus = ({ sourceLanguage }: { sourceLanguage: string }) => {
  const { data: textsData, isLoading: isLoadingTexts } = useQuery({
    queryKey: DMFetchApi.tempMenuSourceTexts.makeQueryKey(sourceLanguage),
    queryFn: () =>
      DMFetchApi.tempMenuSourceTexts.call({ language: sourceLanguage }),
  })

  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: DMFetchApi.tempMenuSourceCategories.makeQueryKey(sourceLanguage),
    queryFn: () =>
      DMFetchApi.tempMenuSourceCategories.call({ language: sourceLanguage }),
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
