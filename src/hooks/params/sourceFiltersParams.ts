import React from "react"
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs"

import { Schema } from "@/utils/api/search/types"

export const useIncludeCollectionsParam = () => {
  return useQueryState("include_collections", {
    ...parseAsArrayOf(parseAsString),
  })
}

export const useIncludeCategoriesParam = () => {
  return useQueryState("include_categories", {
    ...parseAsArrayOf(parseAsString),
  })
}

export const useIncludeFilesParam = () => {
  return useQueryState("include_files", {
    ...parseAsArrayOf(parseAsString),
  })
}

export const useSourceFiltersValue = () => {
  const [includeCollectionsParam] = useIncludeCollectionsParam()
  const [includeCategoriesParam] = useIncludeCategoriesParam()
  const [includeFilesParam] = useIncludeFilesParam()

  const sourceFilters: Schema["SourceFilters"] = {
    include_collections: includeCollectionsParam,
    include_categories: includeCategoriesParam,
    include_files: includeFilesParam,
  }

  return sourceFilters
}

export const useResetSourceFilters = () => {
  const [, setIncludeCollectionsParam] = useIncludeCollectionsParam()
  const [, setIncludeCategoriesParam] = useIncludeCategoriesParam()
  const [, setIncludeFilesParam] = useIncludeFilesParam()

  return React.useCallback(() => {
    setIncludeCollectionsParam(null)
    setIncludeCategoriesParam(null)
    setIncludeFilesParam(null)
  }, [
    setIncludeCollectionsParam,
    setIncludeCategoriesParam,
    setIncludeFilesParam,
  ])
}
