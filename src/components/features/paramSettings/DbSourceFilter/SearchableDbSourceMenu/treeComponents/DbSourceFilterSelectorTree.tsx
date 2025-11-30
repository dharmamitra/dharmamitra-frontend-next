import { memo } from "react"
import { Tree } from "react-arborist"
import { useSetAtom } from "jotai"

import { handleTreeChange, isSearchMatch } from "../utils"

import { activeDbSourceTreeAtom, activeDbSourceTreeBreadcrumbsAtom } from "@/atoms"
import { DbSourceFilterTreeNode } from "@/components/features/paramSettings/DbSourceFilter/SearchableDbSourceMenu/nodeComponents/DbSourceFilterTreeNode"
import type {
  DbSourceFilterSelectorTreeProps,
  DbSourceTreeBaseProps,
} from "@/components/features/paramSettings/DbSourceFilter/types"

export const DbSourceFilterSelectorTree = memo(function DbSourceFilterSelectorTree({
  data,
  height,
  width,
  searchTerm,
  selectionIds,
}: DbSourceTreeBaseProps & DbSourceFilterSelectorTreeProps) {
  const setActiveTree = useSetAtom(activeDbSourceTreeAtom)
  const setBreadcrumbs = useSetAtom(activeDbSourceTreeBreadcrumbsAtom)

  return (
    <Tree
      key={`db-source-filter-tree`}
      ref={(activeTree) => {
        handleTreeChange({ activeTree, setActiveTree, setBreadcrumbs })
      }}
      searchTerm={searchTerm}
      searchMatch={(node, term) => isSearchMatch(node.data.searchField, term)}
      initialData={data}
      openByDefault={false}
      rowHeight={46}
      disableDrag={true}
      disableDrop={true}
      dndRootElement={null}
      disableEdit={true}
      disableMultiSelection={false}
      padding={12}
      height={height}
      width={width}
      indent={16}
    >
      {(props) => <DbSourceFilterTreeNode {...props} selectionIds={selectionIds} />}
    </Tree>
  )
})
