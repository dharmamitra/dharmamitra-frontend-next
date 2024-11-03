import { NodeApi, TreeApi } from "react-arborist"
import { atom } from "jotai"

import {
  DbSourceTreeNode,
  InputSourceFilterUISetting,
  SourceFilterUISetting,
} from "@/features/paramSettings/DbSourceFilter/types"

/**
 * SOURCE DATA TREE
 */

export const isDbSourceBrowserDrawerOpenAtom = atom(false)
export const activeDbSourceTreeAtom = atom<
  TreeApi<DbSourceTreeNode> | null | undefined
>(null)
export const activeDbSourceTreeBreadcrumbsAtom = atom<
  NodeApi<DbSourceTreeNode>[]
>([])
export const focusedDbSourceTreeNodeAtom = atom<
  NodeApi<DbSourceTreeNode> | null | undefined
>(null)

// export const dbSourceFiltersSelectedIdsAtom = atom<DbSourceFiltersSelectedIds>({
//   exclude_sources: [],
//   include_sources: [],
// })

export const selectedSourceFilterIdsAtom = atom<SourceFilterUISetting>({
  include_sources: [],
})

export const selectedInputSourceFilterIdsAtom =
  atom<InputSourceFilterUISetting>({
    include_input_sources: [],
  })
