"use client"

import { useTranslations } from "next-intl"
import SendIcon from "@mui/icons-material/Send"
import { Box, Button } from "@mui/material"

type DeepResearchPromptProps = {
  isRendered: boolean
  onDeepResearchClick: () => void
}

export default function DeepResearchPromptWrapper({
  isRendered,
  onDeepResearchClick,
}: DeepResearchPromptProps) {
  if (!isRendered) return null

  return <DeepResearchPrompt onDeepResearchClick={onDeepResearchClick} />
}

function DeepResearchPrompt({
  onDeepResearchClick,
}: Pick<DeepResearchPromptProps, "onDeepResearchClick">) {
  const t = useTranslations("translation")

  return (
    <Box
      sx={{
        pt: 3.5,
        opacity: 0,
        animation: "fadeIn 0.5s ease-in-out 0.7s forwards",
        "@keyframes fadeIn": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      }}
    >
      <Button
        variant="outlined"
        color="secondary"
        endIcon={<SendIcon />}
        onClick={onDeepResearchClick}
      >
        {t("deepResearchPrompt")}
      </Button>
    </Box>
  )
}
