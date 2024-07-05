import React from "react"
import { useTranslations } from "next-intl"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { useSetAtom } from "jotai"

import { triggerSearchQueryAtom } from "@/atoms"
import { tooltipEnterStyles } from "@/components/styled"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { searchParamsNames } from "@/utils/api/search/params"

export default function SearchStartStopButton() {
  const { input } = useInputWithUrlParam<string>(
    searchParamsNames.common.search_input,
  )
  const t = useTranslations()

  const setTriggerSearchQuery = useSetAtom(triggerSearchQueryAtom)

  return (
    <>
      <Tooltip
        title={
          <span>
            {`${t("search.search")}`} (Ctrl +
            <span style={tooltipEnterStyles}>↵</span>)
          </span>
        }
        placement="top"
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [-24, 0],
                },
              },
            ],
          },
        }}
      >
        <span>
          <IconButton
            aria-label={t("search.search")}
            color="secondary"
            onClick={() => setTriggerSearchQuery(true)}
            disabled={!input.match(/\S+/g)?.length}
          >
            <PlayCircleIcon />
          </IconButton>
        </span>
      </Tooltip>
    </>
  )
}
