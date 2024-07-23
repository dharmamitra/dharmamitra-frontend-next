"use client"

import React from "react"
import { useTranslations } from "next-intl"
import { SxProps } from "@mui/material/styles"
import Typography from "@mui/material/Typography"

import Warning from "@/components/Warning"
import {
  markers,
  pasrseStreamContent,
  warningPattern,
} from "@/utils/api/stream"

export const FormatedStream = ({
  stream,
  componentId,
  sx,
}: {
  stream: string
  componentId: string
  sx?: SxProps
}) => {
  const t = useTranslations()
  const paragraphs = stream?.split(markers.lineBreak).filter((p) => p)

  return paragraphs.map((paragraph, index) => {
    const { content, exceptionI18nKey } = pasrseStreamContent(
      paragraph,
      warningPattern,
    )

    if (exceptionI18nKey) {
      return (
        <React.Fragment
          key={`formated-${componentId}-stream-exception-${index}`}
        >
          {content ? (
            <Typography
              component="p"
              sx={{
                whiteSpace: "pre-wrap",
                my: index === 0 ? 0 : 1,
                ...sx,
              }}
            >
              {content.trim()}
            </Typography>
          ) : null}
          <Warning message={t(`generic.error.${exceptionI18nKey}`)} />
        </React.Fragment>
      )
    }

    return (
      <Typography
        key={`formated-${componentId}-stream-${index}`}
        component="p"
        sx={{
          whiteSpace: "pre-wrap",
          my: index === 0 ? 0 : 1,
          ...sx,
        }}
      >
        {paragraph.trim()}
      </Typography>
    )
  })
}

export default FormatedStream
