import { SourceLanguage } from "@/utils/api/search/types"

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

export type DbSourceFilterSelectorTreeProps = {
  sourceLanguage: SourceLanguage
  selectionIds: string[]
}
