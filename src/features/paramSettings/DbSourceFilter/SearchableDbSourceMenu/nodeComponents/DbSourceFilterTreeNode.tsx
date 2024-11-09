import React from "react"
import type { NodeApi, NodeRendererProps } from "react-arborist"
import { Box, Checkbox, Tooltip, Typography } from "@mui/material"

import {
  type DbSourceTreeNode,
  DbSourceTreeNodeDataType as NodeType,
} from "@/features/paramSettings/DbSourceFilter/types"
import { updateSourceFilterPropParam } from "@/features/paramSettings/DbSourceFilter/utils"
import {
  useIncludeCategoriesParam,
  useIncludeCollectionsParam,
  useIncludeFilesParam,
} from "@/hooks/params"

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
  selectionIds: string[]
} & NodeRendererProps<DbSourceTreeNode>

export function DbSourceFilterTreeNode({
  node,
  style,
  selectionIds,
}: DbSourceFilterTreeNodeProps) {
  const { name, id, dataType } = node.data

  const [, setIncludeCollectionsParam] = useIncludeCollectionsParam()
  const [, setIncludeCategoriesParam] = useIncludeCategoriesParam()
  const [, setIncludeFilesParam] = useIncludeFilesParam()

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
      const { dataType, id } = item

      if (dataType === NodeType.COLLECTION) {
        setIncludeCollectionsParam((prev) =>
          updateSourceFilterPropParam({
            prevValue: prev,
            id,
            action,
          }),
        )
        return
      }

      if (dataType === NodeType.CATEGORY) {
        setIncludeCategoriesParam((prev) =>
          updateSourceFilterPropParam({
            prevValue: prev,
            id,
            action,
          }),
        )
        return
      }

      if (dataType === NodeType.TEXT) {
        setIncludeFilesParam((prev) =>
          updateSourceFilterPropParam({
            prevValue: prev,
            id,
            action,
          }),
        )
      }
    },
    [
      setIncludeCollectionsParam,
      setIncludeCategoriesParam,
      setIncludeFilesParam,
    ],
  )

  return (
    <NodeBox
      key={id}
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
