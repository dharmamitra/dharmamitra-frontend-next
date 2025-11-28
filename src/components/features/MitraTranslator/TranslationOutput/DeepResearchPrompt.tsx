"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { useChat } from "@ai-sdk/react"
import SendIcon from "@mui/icons-material/Send"
import { Box, Button } from "@mui/material"

import { streamUtils } from "@/api"
import { createChatProps, TranslationChatPropsWithId } from "@/components/features/utils"
import { useTargetLangParamWithLocalStorage } from "@/hooks/params"

type DeepResearchPromptProps = {
  isRendered: boolean
  chatPropsWithId: TranslationChatPropsWithId
}

function DeepResearchPromptComponent({
  chatPropsWithId,
}: Omit<DeepResearchPromptProps, "isRendered">) {
  const updatedChatPropsWithId = React.useMemo(() => {
    return createChatProps({
      localEndpoint: streamUtils.localAPIEndpoints["mitra-translation"],
      requestBody: { ...chatPropsWithId.body, target_lang: "english-deep-research" },
    })
  }, [chatPropsWithId])

  const [, setTargetLang] = useTargetLangParamWithLocalStorage()

  const { sendMessage } = useChat(updatedChatPropsWithId)
  const t = useTranslations("translation")

  const handleClick = () => {
    setTargetLang("english-deep-research")
    sendMessage({ text: chatPropsWithId.body.input_sentence })
  }

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
      <Button variant="outlined" color="secondary" endIcon={<SendIcon />} onClick={handleClick}>
        {t("deepResearchPrompt")}
      </Button>
    </Box>
  )
}

function DeepResearchPrompt({ isRendered, chatPropsWithId }: DeepResearchPromptProps) {
  if (!isRendered || !chatPropsWithId) return null

  return <DeepResearchPromptComponent chatPropsWithId={chatPropsWithId} />
}

export default DeepResearchPrompt
