"use client"

import React from "react"
import Box from "@mui/material/Box"

import TranslatorInputControls from "./controls/TranslatorInputControls"
import TranslatorKeyboardControls from "./controls/TranslatorKeyboardControls"
import TranslatorOutputControls from "./controls/TranslatorOutputControls"
import TranslationOutput from "./TranslationOutput"
import TranslationTagging from "./TranslationTagging"
import TranslationUsageDialog from "./TranslationUsageDialog"
import TranslatorInput from "./TranslatorInput"
import TranslatorLayout from "./TranslatorLayout"
import { createTranslationRequestBody } from "./utils"

import { streamUtils } from "@/api"
import { ACCEPTED_FILE_TYPES_UI_STRING } from "@/components/features/MitraOCR/utils"
import TranslationModelSelector from "@/components/features/paramSettings/TranslationModelSelector"
import { createChatProps } from "@/components/features/utils"
import {
  useInputEncodingParamWithLocalStorage,
  useInputSentenceParam,
  useTargetLangParamWithLocalStorage,
  useTranslationModelParam,
} from "@/hooks/params"
import useAppConfig from "@/hooks/useAppConfig"
import { hasCachedChat, useCachedChat } from "@/hooks/useCachedChat"

export default function MitraTranslator() {
  const {
    featureFlags: { hasTranslateExtendedOptions },
  } = useAppConfig()

  const [input_sentence, setInputSentenceParam] = useInputSentenceParam()
  const [input_encoding] = useInputEncodingParamWithLocalStorage()
  const [target_lang] = useTargetLangParamWithLocalStorage()
  const [model] = useTranslationModelParam()

  const chatPropsWithId = React.useMemo(() => {
    const requestBody = createTranslationRequestBody({
      input_sentence,
      input_encoding,
      target_lang,
      model,
    })

    return createChatProps({
      localEndpoint: streamUtils.localAPIEndpoints["mitra-translation"],
      requestBody,
    })
  }, [input_sentence, input_encoding, target_lang, model])

  // Single useChat instance shared across all child components
  const { status, sendMessage, stop, messages, error, isCacheLoaded } =
    useCachedChat(chatPropsWithId)

  const [completedQueryIds, setCompletedQueryIds] = React.useState<Set<string>>(new Set())
  const [isFileUploadPending, setIsFileUploadPending] = React.useState(false)

  const shouldSkipInitAutoTriggerRef = React.useRef(false)
  const handleAutoTriggerOnFirstMount = React.useEffectEvent(() => {
    // Silent fail preferred in the following conditons rather than
    // excessive useEffect triggeres - this is a non-critical feature
    if (!input_sentence?.match(/\S+/g)?.length) return
    if (status !== "ready") return
    if (hasCachedChat(chatPropsWithId.id)) {
      shouldSkipInitAutoTriggerRef.current = true
      return
    }

    shouldSkipInitAutoTriggerRef.current = true
    sendMessage({ text: input_sentence })
  })

  React.useEffect(() => {
    if (shouldSkipInitAutoTriggerRef.current) return
    if (!isCacheLoaded) return
    handleAutoTriggerOnFirstMount()
  }, [isCacheLoaded])

  // Deep Research Prompt trigger logic is created here
  // to allow the creation of a new translation query
  const [isPendingDeepResearch, setIsPendingDeepResearch] = React.useState(false)
  const [, setTargetLang] = useTargetLangParamWithLocalStorage()

  const handleDeepResearchPromptClick = function () {
    setTargetLang("english-deep-research")
    setIsPendingDeepResearch(true)
  }

  const handleDeepResearchProptTrigger = React.useEffectEvent(() => {
    setIsPendingDeepResearch(false)
    sendMessage({ text: input_sentence })
  })

  React.useEffect(() => {
    // The primary conditions for triggering DeepResearchPrompt
    // are set in the component's isRendered prop
    if (isPendingDeepResearch) {
      handleDeepResearchProptTrigger()
    }
  }, [isPendingDeepResearch])

  const outputBoxRef = React.useRef<HTMLDivElement>(null)

  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <TranslationUsageDialog />
      <TranslatorKeyboardControls
        input={input_sentence}
        sendMessage={sendMessage}
        stop={stop}
        status={status}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: 4,
          rowGap: 2,
          mb: 3,
          minHeight: 40,
        }}
      >
        <TranslationModelSelector isRendered={hasTranslateExtendedOptions} />

        <TranslationTagging />
      </Box>

      <TranslatorLayout
        inputControls={
          <TranslatorInputControls
            queryId={chatPropsWithId.id}
            input={input_sentence}
            setInput={setInputSentenceParam}
            isTriggerDisabled={!input_sentence.match(/\S+/g)?.length}
            completedQueryIds={completedQueryIds}
            setCompletedQueryIds={setCompletedQueryIds}
            onFileButtonClick={handleFileButtonClick}
            fileUploadDisabled={isFileUploadPending}
            acceptedFileTypes={ACCEPTED_FILE_TYPES_UI_STRING}
            sendMessage={sendMessage}
            stop={stop}
            status={status}
            messages={messages}
          />
        }
        outputContoles={<TranslatorOutputControls contentRef={outputBoxRef} />}
        inputBlock={
          <TranslatorInput
            input={input_sentence}
            setInput={setInputSentenceParam}
            fileInputRef={fileInputRef}
            onFileUploadStateChange={setIsFileUploadPending}
          />
        }
        outputBlock={
          <TranslationOutput
            ref={outputBoxRef}
            id={chatPropsWithId.id}
            targetLang={target_lang}
            input={input_sentence}
            messages={messages}
            status={status}
            error={error}
            onDeepResearchClick={handleDeepResearchPromptClick}
          />
        }
      />
    </>
  )
}
