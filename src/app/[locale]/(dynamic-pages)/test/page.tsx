"use client"

import React from "react"
import Head from "next/head"
import { useChat } from "@ai-sdk/react"
import Box from "@mui/material/Box"

import { streamUtils, TranslationApiTypes } from "@/api"
import ExceptionText from "@/components/ExceptionText"
import { createTranslationRequestBody } from "@/components/features/MitraTranslator/utils"
import { createChatProps } from "@/components/features/utils"
import LoadingDots from "@/components/LoadingDots"
import { MemoizedMarkdown, PlainContent } from "@/components/memoized-markdown"
import StartStopStreamButton from "@/components/StartStopStreamButton"
import {
  useInputEncodingParamWithLocalStorage,
  useTargetLangParamWithLocalStorage,
} from "@/hooks/params"

export default function Page() {
  const input_sentence = "Tattha katamaṁ rūpaṁ oḷārikaṁ"
  const model =
    "GEMINI-MARKUP-RAG" as TranslationApiTypes.RequestBody<"/translation/">["model"] // "default"
  const [input_encoding] = useInputEncodingParamWithLocalStorage()
  const [target_lang] = useTargetLangParamWithLocalStorage()

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

  const { messages, status, error } = useChat(chatPropsWithId)

  return (
    <div>
      <Head>
        <title>Sentry Onboarding</title>
        <meta name="description" content="Test page" />
      </Head>

      <main
        style={{
          marginInline: "2rem",
          marginTop: "70px",
          border: "1px solid gainsboro",
          padding: "1rem",
        }}
      >
        <StartStopStreamButton
          chatPropsWithId={chatPropsWithId}
          input={input_sentence}
        />

        {status === "submitted" && <LoadingDots />}
        {error && <ExceptionText type="error" message={error.message} />}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "31% 31% 31%",
            gap: 4,
            wordBreak: "break-word",
          }}
        >
          <Box>
            <h2>Stringified Messages</h2>
            <div className="prose space-y-2">{JSON.stringify(messages[1])}</div>
          </Box>

          <Box>
            <h2>Memoized Markdown Blocks</h2>
            {messages.map((message, index) => (
              <div key={message.id}>
                <div className="prose space-y-2">
                  <MemoizedMarkdown
                    id={index.toString()}
                    content={message.content}
                    role={message.role}
                  />
                </div>
              </div>
            ))}
          </Box>

          <Box>
            <h2>Markdown</h2>
            {messages.map((message, index) => (
              <PlainContent
                key={message.id}
                id={index.toString()}
                content={message.content}
                role={message.role}
              />
            ))}
          </Box>
        </Box>
      </main>
    </div>
  )
}
