"use client"

import React from "react"
import { useChat } from "@ai-sdk/react"
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

export default function MitraTranslator() {
  const {
    featureFlags: { hasTranslateExtendedOptions },
  } = useAppConfig()

  const [input_sentence, setInputSentenceParam] = useInputSentenceParam()
  const [input_encoding] = useInputEncodingParamWithLocalStorage()
  const [target_lang] = useTargetLangParamWithLocalStorage()
  const [model] = useTranslationModelParam()

  // Ref for file input to be shared between components
  // Use a more specific type that matches what TranslatorInput expects
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

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
  const chatHelpers = useChat(chatPropsWithId)

  const outputBoxRef = React.useRef<HTMLDivElement>(null)

  const [completedQueryIds, setCompletedQueryIds] = React.useState<Set<string>>(new Set())
  // State to track if file upload is in progress
  const [isFileUploadPending, setIsFileUploadPending] = React.useState(false)

  // Function to trigger file browse dialog
  const handleFileButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <>
      <TranslationUsageDialog />
      <TranslatorKeyboardControls
        input={input_sentence}
        sendMessage={chatHelpers.sendMessage}
        stop={chatHelpers.stop}
        status={chatHelpers.status}
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
            sendMessage={chatHelpers.sendMessage}
            stop={chatHelpers.stop}
            status={chatHelpers.status}
            messages={chatHelpers.messages}
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
            chatPropsWithId={chatPropsWithId}
            messages={chatHelpers.messages}
            status={chatHelpers.status}
            error={chatHelpers.error}
          />
        }
      />
    </>
  )
}
