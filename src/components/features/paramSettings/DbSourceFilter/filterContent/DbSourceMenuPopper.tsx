import React from "react"
import { Box, ClickAwayListener, Popper } from "@mui/material"

import { INPUT_WIDTH } from "@/components/features/paramSettings/DbSourceFilter/DbSourceFilter"
import { SearchableDbSourceMenu } from "@/components/features/paramSettings/DbSourceFilter/SearchableDbSourceMenu"
import { SourceLanguage } from "@/utils/api/search/types"

type DbSourceMenuPopperProps = {
  popperId: string | undefined
  open: boolean
  anchorEl: null | HTMLElement
  handleClose: () => void
  sourceLanguage: SourceLanguage
  selectionIds: string[]
}

const MAX_HEIGHT = 400

const DbSourceMenuPopper = ({
  popperId,
  open,
  anchorEl,
  handleClose,
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
