import React from "react"
import { useTranslations } from "next-intl"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import { FormLabel, IconButton } from "@mui/material"

import { SelectionHeadBox } from "@/features/paramSettings/DbSourceFilter/styledComponents"
import { useSourceFiltersParam } from "@/hooks/params"

type SelectionHeadProps = {
  selectionIds: string[]
}

const SelectionHead = ({ selectionIds }: SelectionHeadProps) => {
  const t = useTranslations()

  const [, setSourceFilterParam] = useSourceFiltersParam()

  const handleClearSources = React.useCallback(async () => {
    await setSourceFilterParam(null)
  }, [setSourceFilterParam])

  return (
    <SelectionHeadBox>
      <FormLabel>{t(`search.sourceFilter.labels.include`)}</FormLabel>

      {selectionIds.length > 0 ? (
        <IconButton aria-label="clear" onClick={handleClearSources}>
          <CancelOutlinedIcon fontSize="small" />
        </IconButton>
      ) : null}
    </SelectionHeadBox>
  )
}

export default SelectionHead
