import React from "react"
import { ClickAwayListener } from "@mui/base/ClickAwayListener"
import { Box, Popper } from "@mui/material"

import { INPUT_WIDTH } from "@/features/paramSettings/DbSourceFilter/DbSourceFilter"
import { SearchableDbSourceMenu } from "@/features/paramSettings/DbSourceFilter/SearchableDbSourceMenu"
import { DbSourceFilterUISetting } from "@/features/paramSettings/DbSourceFilter/types"
import { SourceLanguage } from "@/utils/api/search/types"

type DbSourceMenuPopperProps = {
  popperId: string | undefined
  open: boolean
  anchorEl: null | HTMLElement
  handleClose: () => void
  filterName: DbSourceFilterUISetting
  sourceLanguage: SourceLanguage
  selectionIds: string[]
}

const MAX_HEIGHT = 400

const DbSourceMenuPopper = ({
  popperId,
  open,
  anchorEl,
  handleClose,
  filterName,
  sourceLanguage,
  selectionIds,
}: DbSourceMenuPopperProps) => {
  return (
    <Popper
      key={popperId}
      id={popperId}
      open={open}
      anchorEl={anchorEl}
      sx={{
        zIndex: 1200,
        maxHeight: "424px",
        width: "100%",
        maxWidth: "340px",
        overflow: "clip",
        boxShadow: 3,
        borderRadius: 1,
        bgcolor: "background.paper",
      }}
      placement="top-start"
    >
      <ClickAwayListener onClickAway={handleClose}>
        <Box
          sx={{
            p: 1,
            minHeight: 400,
            width: "100%",
          }}
        >
          <SearchableDbSourceMenu
            filterName={filterName}
            parentHeight={MAX_HEIGHT}
            parentWidth={INPUT_WIDTH}
            padding={0}
            sourceLanguage={sourceLanguage}
            selectionIds={selectionIds}
          />
        </Box>
      </ClickAwayListener>
    </Popper>
  )
}

export default DbSourceMenuPopper
