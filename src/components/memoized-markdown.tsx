import React, { memo, useMemo } from "react"
import ReactMarkdown from "react-markdown"
import { Link, Typography } from "@mui/material"
import { marked } from "marked"

/**
 * @see: https://sdk.vercel.ai/cookbook/next/markdown-chatbot-with-memoization
 * react-markdown used for lightweight, synchronous markdown parsing.
 */

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown)
  return tokens.map((token) => token.raw)
}

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return (
      <ReactMarkdown
        components={{
          h2: ({ node, ...props }) => (
            <Typography
              component="h2"
              fontWeight={500}
              sx={{ mt: 2, mb: 0.5, fontSize: "1.5rem !important" }}
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <Typography variant="h3" fontWeight={500} my={2} {...props} />
          ),
          h4: ({ node, ...props }) => (
            <Typography variant="h4" fontWeight={500} my={2} {...props} />
          ),
          h5: ({ node, ...props }) => (
            <Typography variant="h5" fontWeight={500} my={2} {...props} />
          ),
          // TODO: Hardcoded color value need to be extracted from theme
          p: ({ node, ...props }) => <Typography sx={{ color: "#222", mb: 2 }} {...props} />,
          strong: ({ node, ...props }) => (
            <Typography component="strong" fontWeight={500} color="primary" {...props} />
          ),
          a: ({ node, href, ...props }) => (
            <Link href={href} target="_blank" rel="noopener noreferrer" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    )
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false
    return true
  },
)

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock"

export const MemoizedMarkdown = memo(({ content, id }: { content: string; id: string }) => {
  const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content])

  return blocks.map((block, index) => (
    <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
  ))
})

MemoizedMarkdown.displayName = "MemoizedMarkdown"
