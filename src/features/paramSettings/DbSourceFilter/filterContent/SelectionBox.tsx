import React from "react"
import { useTranslations } from "next-intl"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { Button, Chip, IconButton } from "@mui/material"

import {
  InputOutlineBox,
  MultiSelectionBox,
  SelectionChipsBox,
} from "@/features/paramSettings/DbSourceFilter/styledComponents"
import type { DbSourceFilterUISetting } from "@/features/paramSettings/DbSourceFilter/types"
import { sourceFilterParamHooks } from "@/hooks/params/sourceFilterParams"

const CHIP_GAP = 6
const MAX_CHIP_ROW_WIDTH = 253
const MAX_TRUNCATED_ROWS = 1

type DbSourceFilterInputProps = {
  filterName: DbSourceFilterUISetting
  popperId: string | undefined
  // eslint-disable-next-line no-unused-vars
  handleClick: (event: React.MouseEvent<HTMLElement>) => void
  open: boolean
  selectionIds: string[]
}

/* simulates "Autocomplete" style input box */
const DbSourceFilterInput = ({
  filterName,
  popperId,
  handleClick,
  open,
  selectionIds,
}: DbSourceFilterInputProps) => {
  const t = useTranslations()

  const filterParamHook = sourceFilterParamHooks[filterName]
  const [, setFilterParam] = filterParamHook()

  const [isExpanded, setIsExpanded] = React.useState(false)
  const [showButton, setShowButton] = React.useState(false)
  const selectionBoxRef = React.useRef<HTMLElement>(null)

  const toggleExpand = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded)
  }

  // Prevents the selection box from getting too big, but allows full visibility on expanssion.
  const calculateChipVisibility = React.useCallback(() => {
    const selectionBox = selectionBoxRef.current
    if (selectionBox) {
      let rowWidth = 0
      let rowCount = 1

      Array.from(selectionBox.children).forEach((child) => {
        if (child.nodeType === 1 && child instanceof HTMLElement) {
          const width = child.offsetWidth
          rowWidth += width + CHIP_GAP

          if (rowWidth > MAX_CHIP_ROW_WIDTH) {
            rowWidth = width
            rowCount += 1
          }
        }
      })

      setShowButton(rowCount > MAX_TRUNCATED_ROWS)
    }
  }, [selectionBoxRef])

  React.useEffect(() => {
    const currentRef = selectionBoxRef.current
    const observer = new ResizeObserver(calculateChipVisibility)

    if (currentRef) {
      observer.observe(currentRef)
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [calculateChipVisibility])

  React.useEffect(() => {
    calculateChipVisibility()
  }, [selectionIds, calculateChipVisibility])

  const handleClearSourcesById = React.useCallback(
    async (id: string) => {
      setFilterParam((prev) => {
        const { include_categories, include_collections, include_files } =
          prev ?? {}

        return {
          include_categories: include_categories?.filter((item) => item !== id),
          include_collections: include_collections?.filter(
            (item) => item !== id,
          ),
          include_files: include_files?.filter((item) => item !== id),
        }
      })
    },
    [setFilterParam],
  )

  return (
    <InputOutlineBox>
      <MultiSelectionBox role="combobox" onClick={handleClick}>
        <SelectionChipsBox
          ref={selectionBoxRef}
          isExpanded={isExpanded}
          maxRows={MAX_TRUNCATED_ROWS}
        >
          {selectionIds.map((id, i) => (
            <Chip
              key={id + i}
              label={id}
              onDelete={() => handleClearSourcesById(id)}
            />
          ))}
        </SelectionChipsBox>

        <IconButton
          aria-describedby={popperId}
          type="button"
          onClick={handleClick}
        >
          <ArrowDropDownIcon
            sx={{
              traacnsform: open ? "rotate(180deg)" : undefined,
              transition: "transform 200ms",
            }}
          />
        </IconButton>
      </MultiSelectionBox>

      {showButton && (
        <Button sx={{ mt: 1 }} onClick={toggleExpand}>
          {isExpanded
            ? t("generic.showLess")
            : t("generic.showAll", { count: selectionIds.length })}
        </Button>
      )}
    </InputOutlineBox>
  )
}

export default DbSourceFilterInput
