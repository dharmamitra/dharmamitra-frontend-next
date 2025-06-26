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

  const {
    messages: messagesTest,
    status: statusTest,
    error: errorTest,
    handleSubmit: handleSubmitTest,
    setMessages: setMessagesTest,
  } = useChat({
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

  const handleTestSubmit = () => {
    setMessagesTest([])
    handleSubmitTest(undefined, {
      allowEmptySubmit: true,
    })
  }

  const {
    messages: messagesMitra,
    status: statusMitra,
    error: errorMitra,
    handleSubmit: handleSubmitMitra,
    setMessages: setMessagesMitra,
  } = useChat({
    id: "mitra-stream",
    api: appConfig.basePath + "/next/api/mitra-translation-stream",
    streamProtocol: "text",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      input_sentence,
      target_language: "english-explained",
    },
  })

  const handleMitraSubmit = () => {
    setMessagesMitra([])
    handleSubmitMitra(undefined, {
      allowEmptySubmit: true,
    })
  }

  return (
    <div>
      <Head>
        <title>Mitra RnD testing</title>
        <meta name="description" content="Test page" />
      </Head>

      <main
        style={{
          marginInline: "2rem",
          marginBlock: "70px",
          border: "1px solid gainsboro",
          paddingInline: "1rem",
          maxWidth: "1600px",
        }}
      >
        <h1>Translators</h1>

        <textarea
          style={{
            display: "block",
            marginBottom: "1rem",
            width: "clamp(320px, 680px, 100%)",
            fontSize: "1.12rem",
            fontFamily: "inherit",
          }}
          value={input_sentence}
          onChange={(e) => setInputSentence(e.target.value)}
          placeholder="Enter text to translate"
          rows={6}
        />

        <Box display="flex" gap={4}>
          <Box flex={1}>
            <h2 style={{ marginBottom: "0.5rem" }}>Mitra Test</h2>
            <code>/api-search/v1/</code>

            <div style={{ marginTop: "1rem" }}>
              <Button type="button" variant="contained" onClick={handleTestSubmit}>
                Translate
              </Button>
            </div>

            <Box pt={2} maxWidth="1000px" minHeight="4rem">
              <div>
                {statusTest === "submitted" && <LoadingDots />}
                {errorTest && <ExceptionText type="error" message={errorTest.message} />}
              </div>

              {messagesTest.map((message) => (
                <React.Fragment key={message.id}>
                  {message.role === "assistant" ? (
                    <div>
                      <MemoizedMarkdown id={message.id} content={message.content} />
                    </div>
                  ) : null}
                </React.Fragment>
              ))}
            </Box>
          </Box>

          <Box flex={1}>
            <h2 style={{ marginBottom: "0.5rem" }}>Mitra</h2>
            <code>/api-search/chat-translate/v1/</code>

            <div style={{ marginTop: "1rem" }}>
              <Button type="button" variant="contained" onClick={handleMitraSubmit}>
                Translate
              </Button>
            </div>

            <Box pt={2} maxWidth="1000px" minHeight="4rem">
              <div>
                {statusMitra === "submitted" && <LoadingDots />}
                {errorMitra && <ExceptionText type="error" message={errorMitra.message} />}
              </div>

              {messagesMitra.map((message) => (
                <React.Fragment key={message.id}>
                  {message.role === "assistant" ? (
                    <div>
                      <MemoizedMarkdown id={message.id} content={message.content} />
                    </div>
                  ) : null}
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Box>
      </main>
    </div>
  )
}
