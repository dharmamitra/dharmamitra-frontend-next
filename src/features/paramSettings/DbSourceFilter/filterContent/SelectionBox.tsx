import React from "react"
import { useTranslations } from "next-intl"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { Button, Chip, IconButton } from "@mui/material"

import {
  InputOutlineBox,
  MultiSelectionBox,
  SelectionChipsBox,
} from "@/features/paramSettings/DbSourceFilter/styledComponents"
import {
  useIncludeCategoriesParam,
  useIncludeCollectionsParam,
  useIncludeFilesParam,
} from "@/hooks/params/sourceFiltersParams"

const CHIP_GAP = 6
const MAX_CHIP_ROW_WIDTH = 253
const MAX_TRUNCATED_ROWS = 1

type DbSourceFilterInputProps = {
  popperId: string | undefined
  // eslint-disable-next-line no-unused-vars
  handleClick: (event: React.MouseEvent<HTMLElement>) => void
  open: boolean
  selectionIds: string[]
}

/* simulates "Autocomplete" style input box */
const DbSourceFilterInput = ({
  popperId,
  handleClick,
  open,
  selectionIds,
}: DbSourceFilterInputProps) => {
  const t = useTranslations()

  const [, setIncludeCollectionsParam] = useIncludeCollectionsParam()
  const [, setIncludeCategoriesParam] = useIncludeCategoriesParam()
  const [, setIncludeFilesParam] = useIncludeFilesParam()

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
      setIncludeCollectionsParam(
        (prev) => prev?.filter((item) => item !== id) ?? null,
      )
      setIncludeCategoriesParam(
        (prev) => prev?.filter((item) => item !== id) ?? null,
      )
      setIncludeFilesParam(
        (prev) => prev?.filter((item) => item !== id) ?? null,
      )
    },
    [
      setIncludeCollectionsParam,
      setIncludeCategoriesParam,
      setIncludeFilesParam,
    ],
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
              transform: open ? "rotate(180deg)" : undefined,
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
