import React from "react"
import { useTranslations } from "next-intl"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import { FormLabel, IconButton } from "@mui/material"

import { SelectionHeadBox } from "@/components/features/paramSettings/DbSourceFilter/styledComponents"
import { useResetSourceFilters } from "@/hooks/params"

type SelectionHeadProps = {
  selectionIds: string[]
}

const SelectionHead = ({ selectionIds }: SelectionHeadProps) => {
  const t = useTranslations()

  const resetSourceFilters = useResetSourceFilters()

  return (
    <SelectionHeadBox>
      <FormLabel>{t(`search.sourceFilter.labels.include`)}</FormLabel>

      {selectionIds.length > 0 ? (
        <IconButton aria-label="clear" onClick={() => resetSourceFilters()}>
          <CancelOutlinedIcon fontSize="small" />
        </IconButton>
      ) : null}
    </SelectionHeadBox>
  )
}

export default SelectionHead
