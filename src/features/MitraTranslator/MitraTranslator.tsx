"use client"

import React from "react"
import Box from "@mui/material/Box"

import { streamUtils } from "@/api"
import TranslationModelSelector from "@/features/paramSettings/TranslationModelSelector"
import { createChatProps } from "@/features/utils"
import {
  useInputEncodingParamWithLocalStorage,
  useInputSentenceParam,
  useTargetLangParamWithLocalStorage,
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
import { createTranslationRequestBody } from "./utils"

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

    const chatProps = createChatProps({
      localEndpoint: streamUtils.paths.translation,
      requestBody,
      initialInput: input_sentence,
    })

    return { ...chatProps, id: JSON.stringify(requestBody) }
  }, [input_sentence, input_encoding, target_lang, model])

  const outputBoxRef = React.useRef<HTMLDivElement>(null)

  return (
    <>
      <TranslationUsageDialog />
      <TranslatorKeyboardControls
        chatPropsWithId={chatPropsWithId}
        isInput={Boolean(input_sentence)}
      />

      <TranslatorLayout
        inputControls={
          <TranslatorInputControls
            chatPropsWithId={chatPropsWithId}
            input={input_sentence}
            setInput={setInputSentenceParam}
          />
        }
        outputContoles={<TranslatorOutputControls contentRef={outputBoxRef} />}
        inputBlock={
          <TranslatorInput
            input={input_sentence}
            setInput={setInputSentenceParam}
            targetLang={target_lang}
          />
        }
        outputBlock={
          <TranslationOutput
            ref={outputBoxRef}
            chatPropsWithId={chatPropsWithId}
            input={input_sentence}
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
