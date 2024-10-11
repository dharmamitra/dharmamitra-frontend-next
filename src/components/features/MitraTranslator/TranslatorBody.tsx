"use client"

import React from "react"
import { UseChatOptions } from "ai/react"
import { createParser, useQueryState } from "nuqs"

import { streamUtils, TranslationApiTypes } from "@/api"
import { useInputEncoding } from "@/hooks/params"
import useAppConfig from "@/hooks/useAppConfig"

import TranslationKeyboardControls from "./TramslatorKeyboardControls"
import TranslationOutput from "./TranslationOutput"
import TranslatorInput from "./TranslatorInput"
import TranslatorInputControls from "./TranslatorInputControls"
import TranslatorLayout from "./TranslatorLayout"
import TranslatorOutputControls from "./TranslatorOutputControls"

const parseAsMultiLineString = createParser({
  parse(queryValue) {
    return queryValue.replace(/\\n/g, "\n")
  },
  serialize(value) {
    return value.replace(/\n/g, "\\n")
  },
})

export default function TranslatorBody() {
  const { basePath } = useAppConfig()

  const [inputSentenceParam, setInputSentenceParam] = useQueryState(
    "input_sentence",
    parseAsMultiLineString.withDefault(""),
  )
  const [inputEncoding] = useInputEncoding()

  const chatPropsWithId = React.useMemo(() => {
    const requestBody: TranslationApiTypes.RequestBody<"/translation/"> = {
      input_sentence: inputSentenceParam ?? "",
      input_encoding: inputEncoding,
      do_grammar_explanation: true,
      target_lang: "english",
      model: "gemma2" as const,
    }

    const chatProps: UseChatOptions = {
      api: basePath + streamUtils.paths.translation,
      streamProtocol: "text",
      headers: {
        "Content-Type": "application/json",
      },
      initialInput: inputSentenceParam,
      body: requestBody,
    }

    return { ...chatProps, id: JSON.stringify(requestBody) }
  }, [basePath, inputSentenceParam, inputEncoding])

  const outputBoxRef = React.useRef<HTMLDivElement>(null)

  return (
    <>
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
      <TranslationKeyboardControls
        chatPropsWithId={chatPropsWithId}
        isInput={Boolean(inputSentenceParam)}
      />
    </>
  )
}
