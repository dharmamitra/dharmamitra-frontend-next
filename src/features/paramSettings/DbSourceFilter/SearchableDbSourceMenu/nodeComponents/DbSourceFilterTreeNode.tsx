import React from "react"
import type { NodeApi, NodeRendererProps } from "react-arborist"
import { Box, Checkbox, Tooltip, Typography } from "@mui/material"

import {
  type DbSourceTreeNode,
  DbSourceTreeNodeDataType as NodeType,
} from "@/features/paramSettings/DbSourceFilter/types"
import { DbSourceFilterUISetting } from "@/features/paramSettings/DbSourceFilter/types"
import { updateSourceFilterProp } from "@/features/paramSettings/DbSourceFilter/utils"
import { sourceFilterParamHooks } from "@/hooks/params/sourceFilterParams"

import { ExpanderArrow } from "./ExpanderArrow"
import { SourceTypeIcon } from "./SourceTypeIcon"
import {
  NodeBox,
  NodeLabelsBox,
  RowBox,
  TextNameTypography,
} from "./styledComponents"
import styles from "./TextItemLink.module.css"

const CHARACTER_WIDTH = 6.5
const INDENTATION_WIDTH = 90
const DEFAULT_NODE_WIDTH = 300

type HandleFilterNodeClickProps = {
  node: NodeApi<DbSourceTreeNode>
  event: React.MouseEvent<HTMLElement>
}

const handleClick = ({ node, event }: HandleFilterNodeClickProps) => {
  if (node.isLeaf) return

  const isCheckboxClick = event.nativeEvent.target instanceof HTMLInputElement

  if (isCheckboxClick) return

  node.toggle()
}

type DbSourceFilterTreeNodeProps = {
  filterName: DbSourceFilterUISetting
  selectionIds: string[]
} & NodeRendererProps<DbSourceTreeNode>

export function DbSourceFilterTreeNode({
  node,
  style,
  filterName,
  selectionIds,
}: DbSourceFilterTreeNodeProps) {
  const { name, id, dataType } = node.data

  const filterParamHook = sourceFilterParamHooks[filterName]
  const [, setFilterParam] = filterParamHook()

  let elementWidth = DEFAULT_NODE_WIDTH
  const nameWidth = name.length * CHARACTER_WIDTH

  if (typeof node.tree.props.width === "number") {
    elementWidth = node.tree.props.width - INDENTATION_WIDTH
  }

  const handleFilterParamUpdate = React.useCallback(
    async ({
      action,
      item,
    }: {
      action: "add" | "remove"
      item: DbSourceTreeNode
    }) => {
      const { id, dataType } = item

      setFilterParam((prev) => {
        let include_files = prev?.include_files
        let include_categories = prev?.include_categories
        let include_collections = prev?.include_collections

        if (dataType === NodeType.TEXT) {
          include_files = updateSourceFilterProp({
            prevValue: prev?.include_files,
            id,
            action,
          })
        }

        if (dataType === NodeType.CATEGORY) {
          include_categories = updateSourceFilterProp({
            prevValue: prev?.include_categories,
            id,
            action,
          })
        }

        if (dataType === NodeType.COLLECTION) {
          include_collections = updateSourceFilterProp({
            prevValue: prev?.include_collections,
            id,
            action,
          })
        }

        const updatedValue = {
          ...(include_files && { include_files }),
          ...(include_categories && { include_categories }),
          ...(include_collections && { include_collections }),
        }

        return Object.keys(updatedValue).length > 0 ? updatedValue : null
      })
    },
    [setFilterParam],
  )

  return (
    <NodeBox
      key={`${id}-${filterName}`}
      style={style}
      sx={{
        ml: dataType === NodeType.TEXT ? 1.1 : undefined,
      }}
      role="option"
      isSelected={node.isSelected}
      onClick={(event) => handleClick({ node, event })}
    >
      <ExpanderArrow node={node} mr={0} />

      <Checkbox
        size="small"
        checked={selectionIds.some((item) => item === id)}
        onChange={async (event) => {
          await handleFilterParamUpdate({
            action: event.target.checked ? "add" : "remove",
            item: node.data,
          })
        }}
      />

      <NodeLabelsBox>
        <Tooltip
          title={<Typography>{name}</Typography>}
          PopperProps={{ disablePortal: true }}
          disableHoverListener={nameWidth < elementWidth}
          enterDelay={300}
        >
          <Box className={styles.textName} sx={{ px: 0.5, lineHeight: 1.1 }}>
            <RowBox>
              <SourceTypeIcon
                dataType={dataType}
                sx={{
                  my: 0.5,
                  mr: 0.5,
                  fontSize: "0.85rem",
                  color: "grey.500",
                }}
              />
              <Typography variant="body2" component="span">
                {id}
              </Typography>
            </RowBox>

            <TextNameTypography variant="body2" sx={{ maxWidth: elementWidth }}>
              {name}
            </TextNameTypography>
          </Box>
        </Tooltip>
      </NodeLabelsBox>
    </NodeBox>
  )
}
