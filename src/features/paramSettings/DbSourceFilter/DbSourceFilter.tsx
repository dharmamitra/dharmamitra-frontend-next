import React, { memo } from "react"
import { Box } from "@mui/material"

import { DbSourceFilterUISetting } from "@/features/paramSettings/DbSourceFilter/types"
import { sourceFilterParamHooks } from "@/hooks/params/sourceFilterParams"
import { SourceLanguage } from "@/utils/api/search/types"

import DbSourceMenuPopper from "./filterContent/DbSourceMenuPopper"
import SelectionBox from "./filterContent/SelectionBox"
import SelectionHead from "./filterContent/SelectionHead"

export const INPUT_WIDTH = 340

const DbSourceFilter = ({
  filterName,
  sourceLanguage,
}: {
  filterName: DbSourceFilterUISetting
  sourceLanguage: SourceLanguage
}) => {
  const filterParamHook = sourceFilterParamHooks[filterName]

  const [filterParam] = filterParamHook()

  const allSelectionIds = React.useMemo(
    () => Object.entries(filterParam ?? {}).flatMap(([, value]) => value),
    [filterParam],
  )

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget.parentElement)
  }

  const isPopperOpen = Boolean(anchorEl)
  const popperId = isPopperOpen
    ? `${filterName}-source-filter-popper`
    : undefined
  const handleClosePopper = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ mb: 2, width: INPUT_WIDTH }} key={filterName}>
      <SelectionHead filterName={filterName} selectionIds={allSelectionIds} />
      <SelectionBox
        filterName={filterName}
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
        filterName={filterName}
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
