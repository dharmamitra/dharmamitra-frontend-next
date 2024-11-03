/* eslint-disable no-unused-vars */

import { SourceLanguage } from "@/utils/api/search/types"

export type SourceFilterUISetting = {
  include_sources: string[]
}

export type InputSourceFilterUISetting = {
  include_input_sources: string[]
}

export enum DbSourceTreeNodeDataType {
  TEXT = "text",
  CATEGORY = "category",
  COLLECTION = "collection",
}

export type DbSourceTreeNode = {
  id: string
  name: string
  dataType: DbSourceTreeNodeDataType
  children?: DbSourceTreeNode[]
  fileName?: string
  searchField: string
}

export type DbSourceTreeLeafNode = Omit<DbSourceTreeNode, "fileName"> & {
  fileName: string
}

export type DbSourceTreeBaseProps = {
  data: DbSourceTreeNode[]
  height: number
  width: number
  searchTerm?: string
}

// TODO: see src/utils/api/search/types.ts - it may be better to pull these values directly fron the API following update
export enum DbSourceFilterUISetting {
  SOURCE_FILTERS = "source_filters",
  INPUT_SOURCE_FILTERS = "input_source_filters",
}

export type DbSourceFilterSelectorTreeProps = {
  filterName: DbSourceFilterUISetting
  sourceLanguage: SourceLanguage
  selectionIds: string[]
}
