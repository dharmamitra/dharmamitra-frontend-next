"use client"

import React from "react"
import Box from "@mui/material/Box"

import TranslationModelSelector from "@/features/uiSettings/TranslationModelSelector"
import {
  useInputEncodingParam,
  useInputSentenceParam,
  useTargetLangParam,
  useTranslationModelParam,
} from "@/hooks/params"
import useAppConfig from "@/hooks/useAppConfig"

import TranslatorInputControls from "./controls/TranslatorInputControls"
import TranslatorKeyboardControls from "./controls/TranslatorKeyboardControls"
import TranslatorOutputControls from "./controls/TranslatorOutputControls"
import TranslationOutput from "./TranslationOutput"
import TranslationTagging from "./TranslationTagging"
import TranslationUsageDialog from "./TranslationUsageDialog"
import TranslatorInput from "./TranslatorInput"
import TranslatorLayout from "./TranslatorLayout"
import { createChatProps, createTranslationRequestBody } from "./utils"

export default function MitraTranslator() {
  const {
    featureFlags: { hasTranslateExtendedOptions },
    basePath,
  } = useAppConfig()

  const [inputSentenceParam, setInputSentenceParam] = useInputSentenceParam()
  const [inputEncodingparam] = useInputEncodingParam()
  const [targetLanguageparam] = useTargetLangParam()
  const [translationModelParam] = useTranslationModelParam()

  const chatPropsWithId = React.useMemo(() => {
    const requestBody = createTranslationRequestBody({
      input_sentence: inputSentenceParam,
      input_encoding: inputEncodingparam,
      target_lang: targetLanguageparam,
      model: translationModelParam,
    })

    const chatProps = createChatProps(basePath, requestBody)

    return { ...chatProps, id: JSON.stringify(requestBody) }
  }, [
    basePath,
    inputSentenceParam,
    inputEncodingparam,
    targetLanguageparam,
    translationModelParam,
  ])

  const outputBoxRef = React.useRef<HTMLDivElement>(null)

  return (
    <>
      <TranslationUsageDialog />
      <TranslatorKeyboardControls
        chatPropsWithId={chatPropsWithId}
        isInput={Boolean(inputSentenceParam)}
      />

      <TranslatorLayout
        inputControls={
          <TranslatorInputControls
            chatPropsWithId={chatPropsWithId}
            input={inputSentenceParam}
            setInput={setInputSentenceParam}
          />
        }
        outputContoles={<TranslatorOutputControls contentRef={outputBoxRef} />}
        inputBlock={
          <TranslatorInput
            input={inputSentenceParam}
            setInput={setInputSentenceParam}
          />
        }
        outputBlock={
          <TranslationOutput
            ref={outputBoxRef}
            chatPropsWithId={chatPropsWithId}
            input={inputSentenceParam}
          />
        }
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: 4,
          rowGap: 2,
          mt: 3,
        }}
      >
        <TranslationModelSelector isRendered={hasTranslateExtendedOptions} />

        <TranslationTagging />
      </Box>
    </>
  )
}
