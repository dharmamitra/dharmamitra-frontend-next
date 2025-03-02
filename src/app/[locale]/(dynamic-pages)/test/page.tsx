"use client"

import React from "react"
import Head from "next/head"
import { useChat } from "@ai-sdk/react"
import { Button } from "@mui/material"
import Box from "@mui/material/Box"

import ExceptionText from "@/components/ExceptionText"
import LoadingDots from "@/components/LoadingDots"
import { MemoizedMarkdown } from "@/components/memoized-markdown"
import appConfig from "@/config"
import { useInputSentenceParam } from "@/hooks/params"

export default function Page() {
  const [input_sentence, setInputSentence] = useInputSentenceParam()

  const { messages, status, error, handleSubmit, setMessages } = useChat({
    id: "test-stream",
    api: appConfig.basePath + "/next/api/test-stream",
    streamProtocol: "text",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      input_sentence,
    },
  })

  const handleClick = () => {
    setMessages([])
    handleSubmit(undefined, {
      allowEmptySubmit: true,
    })
  }

  return (
    <div>
      <Head>
        <title>Sentry Onboarding</title>
        <meta name="description" content="Test page" />
      </Head>

      <main
        style={{
          marginInline: "2rem",
          marginBlock: "70px",
          border: "1px solid gainsboro",
          paddingInline: "1rem",
          maxWidth: "1000px",
        }}
      >
        <h1>Translatior</h1>
        <div>
          <textarea
            style={{
              display: "block",
              marginBottom: "1rem",
              width: "100%",
              fontSize: "1.12rem",
              fontFamily: "inherit",
            }}
            value={input_sentence}
            onChange={(e) => setInputSentence(e.target.value)}
            placeholder="Enter text to translate"
            rows={6}
          />

          <Button type="button" variant="contained" onClick={handleClick}>
            Translate
          </Button>
        </div>

        <Box pt={2} maxWidth="1000px" minHeight="4rem">
          <div>
            {status === "submitted" && <LoadingDots />}
            {error && <ExceptionText type="error" message={error.message} />}
          </div>

          {messages.map((message) => (
            <React.Fragment key={message.id}>
              {message.role === "assistant" ? (
                <div>
                  <MemoizedMarkdown id={message.id} content={message.content} />
                </div>
              ) : null}
            </React.Fragment>
          ))}
        </Box>
      </main>
    </div>
  )
}
