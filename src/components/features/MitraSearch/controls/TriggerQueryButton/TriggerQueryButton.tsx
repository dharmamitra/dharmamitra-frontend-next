import React from "react"
import { useTranslations } from "next-intl"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import IconButton from "@mui/material/IconButton"

import { useSearchTargetParam } from "@/hooks/params"
import { useParallelSearchQuery, usePrimarySearchQuery } from "@/hooks/search/queries"

import TriggerTooltip from "./TriggerTooltip"

type TriggerQueryButtonProps = {
  input: string
}

export default function TriggerQueryButton({ input }: TriggerQueryButtonProps) {
  const [searchTarget] = useSearchTargetParam()

  switch (searchTarget) {
    case "primary":
      return (
        <TriggerTooltip>
          <PrimarySearchTrigger input={input} />
        </TriggerTooltip>
      )
    case "parallel":
      return (
        <TriggerTooltip>
          <ParallelSearchTrigger input={input} />
        </TriggerTooltip>
      )
    default:
      return null
  }
}

function PrimarySearchTrigger({ input }: TriggerQueryButtonProps) {
  const t = useTranslations()
  const { refetch } = usePrimarySearchQuery(input)

  return (
    <IconButton
      aria-label={t("search.search")}
      color="secondary"
      onClick={() => refetch()}
      disabled={!input.match(/\S+/g)?.length}
    >
      <PlayCircleIcon />
    </IconButton>
  )
}

function ParallelSearchTrigger({ input }: TriggerQueryButtonProps) {
  const t = useTranslations()
  const { refetch } = useParallelSearchQuery(input)

  return (
    <IconButton
      aria-label={t("search.search")}
      color="secondary"
      onClick={() => refetch()}
      disabled={!input.match(/\S+/g)?.length}
    >
      <PlayCircleIcon />
    </IconButton>
  )
}
