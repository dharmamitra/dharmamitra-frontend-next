import React, { memo, useMemo } from "react"
import ReactMarkdown from "react-markdown"
import { marked } from "marked"

// import {
//   initialParsedStream,
//   markers,
//   ParsedStream,
//   parseStream,
// } from "@/utils/api/stream"

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown)
  return tokens.map((token) => token.raw)
}

function parseContent(content: string, id: string, role: string) {
  //   console.log({ content, id, role })

  if (role !== "assistant") return ""

  const messageParts = content.split("'")
  const messageContent = messageParts.filter((part) => !part.includes("event:"))

  return messageContent.join("").trim()
}

const MemoizedMarkdownBlock = memo(
  ({ content, id, role }: { content: string; id: string; role: string }) => {
    return <ReactMarkdown>{parseContent(content, id, role)}</ReactMarkdown>
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false
    return true
  },
)

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock"

export const MemoizedMarkdown = memo(
  ({ content, id, role }: { content: string; id: string; role: string }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content])

    return blocks.map((block, index) => (
      <MemoizedMarkdownBlock
        content={block}
        key={`${id}-block_${index}`}
        id={id}
        role={role}
      />
    ))
  },
)

MemoizedMarkdown.displayName = "MemoizedMarkdown"

export const PlainContent = memo(
  ({ content, id, role }: { content: string; id: string; role: string }) => {
    const parsedContent = useMemo(
      () => parseContent(content, id, role),
      [content, id, role],
    )

    return <ReactMarkdown>{parsedContent}</ReactMarkdown>
  },
)

PlainContent.displayName = "PlainContent"
