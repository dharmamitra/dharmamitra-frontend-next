import React from "react"
import { useTranslations } from "next-intl"
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"
import { FormLabel, IconButton } from "@mui/material"

import { SelectionHeadBox } from "@/features/paramSettings/DbSourceFilter/styledComponents"
import type { DbSourceFilterUISetting } from "@/features/paramSettings/DbSourceFilter/types"
import { sourceFilterParamHooks } from "@/hooks/params/sourceFilterParams"

type SelectionHeadProps = {
  filterName: DbSourceFilterUISetting
  selectionIds: string[]
}

const SelectionHead = ({ filterName, selectionIds }: SelectionHeadProps) => {
  const t = useTranslations()

  const filterParamHook = sourceFilterParamHooks[filterName]
  const [, setFilterParam] = filterParamHook()

  const handleClearSources = React.useCallback(async () => {
    await setFilterParam(null)
  }, [setFilterParam])

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
