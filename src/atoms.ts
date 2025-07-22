import { NodeApi, TreeApi } from "react-arborist"
import { atom } from "jotai"

import { DbSourceTreeNode } from "@/components/features/paramSettings/DbSourceFilter/types"

/**
 * SOURCE DATA TREE
 */

export const activeDbSourceTreeAtom = atom<TreeApi<DbSourceTreeNode> | null | undefined>(null)
export const activeDbSourceTreeBreadcrumbsAtom = atom<NodeApi<DbSourceTreeNode>[]>([])

/**
 * SEARCH INPUT
 */

export const searchInputAtom = atom<string>("")
