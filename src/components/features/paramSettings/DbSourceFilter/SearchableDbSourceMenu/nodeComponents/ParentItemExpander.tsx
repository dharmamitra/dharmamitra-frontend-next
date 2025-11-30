import React from "react"
import { NodeApi } from "react-arborist"
import { Chip, Typography } from "@mui/material"

import { SourceTypeIcon } from "./SourceTypeIcon"
import { RowBox } from "./styledComponents"

import {
  DbSourceTreeNode,
  DbSourceTreeNodeDataType as NodeType,
} from "@/components/features/paramSettings/DbSourceFilter/types"

export function ParentItemExpander({ node }: { node: NodeApi<DbSourceTreeNode> }) {
  const { dataType, name, id } = node.data

  return (
    <>
      {dataType === NodeType.COLLECTION && (
        <SourceTypeIcon dataType={dataType} fontSize="inherit" />
      )}
      {dataType === NodeType.CATEGORY && (
        <Chip
          label={
            <RowBox sx={{ gap: "0.5rem" }}>
              <SourceTypeIcon dataType={dataType} fontSize="inherit" /> {id}
            </RowBox>
          }
          size="small"
          variant="outlined"
        />
      )}
      <Typography fontSize="inherit" whiteSpace="nowrap" marginInline="0.5rem">
        {name}
      </Typography>
    </>
  )
}
