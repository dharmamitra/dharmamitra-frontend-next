import React, { memo } from "react"
import { Box } from "@mui/material"

import DbSourceMenuPopper from "./filterContent/DbSourceMenuPopper"
import SelectionBox from "./filterContent/SelectionBox"
import SelectionHead from "./filterContent/SelectionHead"

import {
  useIncludeCategoriesParam,
  useIncludeCollectionsParam,
  useIncludeFilesParam,
} from "@/hooks/params"
import { SourceLanguage } from "@/utils/api/search/types"

export const INPUT_WIDTH = 340

const DbSourceFilter = ({ sourceLanguage }: { sourceLanguage: SourceLanguage }) => {
  const [includeCollectionsParam] = useIncludeCollectionsParam()
  const [includeCategoriesParam] = useIncludeCategoriesParam()
  const [includeFilesParam] = useIncludeFilesParam()

  const allSelectionIds = React.useMemo(
    () =>
      [includeCollectionsParam, includeCategoriesParam, includeFilesParam].flatMap((value) => {
        if (!value) return []
        return value
      }),
    [includeCollectionsParam, includeCategoriesParam, includeFilesParam],
  )

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget.parentElement)
  }

  const isPopperOpen = Boolean(anchorEl)
  const popperId = isPopperOpen ? `source-filter-popper` : undefined
  const handleClosePopper = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ mb: 2, width: INPUT_WIDTH }}>
      <SelectionHead selectionIds={allSelectionIds} />
      <SelectionBox
        selectionIds={allSelectionIds}
        popperId={popperId}
        handleClick={handleClick}
        open={isPopperOpen}
      />
      <DbSourceMenuPopper
        popperId={popperId}
        open={isPopperOpen}
        anchorEl={anchorEl}
        handleClose={handleClosePopper}
        sourceLanguage={sourceLanguage}
        selectionIds={allSelectionIds}
      />
    </Box>
  )
}

export default memo(DbSourceFilter)

/**
 * CALL CHAIN:
 * DbSourceMenuPopper
 * SearchableDbSourceMenu
 * DbSourceFilterSelectorTree
 * DbSourceFilterTreeNode
 *
 */
