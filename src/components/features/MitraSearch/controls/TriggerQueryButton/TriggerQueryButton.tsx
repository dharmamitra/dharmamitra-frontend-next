import { useTranslations } from "next-intl"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import IconButton from "@mui/material/IconButton"

import TriggerTooltip from "./TriggerTooltip"

import { usePrimarySearchQuery } from "@/hooks/search/queries"

type TriggerQueryButtonProps = {
  input: string
}

export default function TriggerQueryButton({ input }: TriggerQueryButtonProps) {
  const t = useTranslations()
  const { refetch } = usePrimarySearchQuery(input)

  return (
    <TriggerTooltip>
      <IconButton
        aria-label={t("search.search")}
        color="secondary"
        onClick={() => refetch()}
        disabled={!input.match(/\S+/g)?.length}
      >
        <PlayCircleIcon />
      </IconButton>
    </TriggerTooltip>
  )
}
