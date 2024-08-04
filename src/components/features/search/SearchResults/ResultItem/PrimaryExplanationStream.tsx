import React from "react"
import { Box } from "@mui/material"
import Typography from "@mui/material/Typography"

import { SearchApiTypes } from "@/api"
import ConditionalExceptionText from "@/components/ExceptionText"
import LoadingDots from "@/components/LoadingDots"
import useSearchPrimaryExplanationStream from "@/hooks/search/useSearchPrimaryExplanationStream"

export type ExplanationProps = {
  isExpanded: boolean
  request: SearchApiTypes.RequestBody<"/explanation/">
}

export default function PrimaryExplanationStream({
  isExpanded,
  request,
}: ExplanationProps) {
  const { pasrsedStream, isLoading, error, exceptionI18nKey } =
    useSearchPrimaryExplanationStream({
      isExpanded,
      request,
    })

  if (isLoading)
    return (
      <Box pt={1} pb={2}>
        <LoadingDots />
      </Box>
    )

  if (error) {
    return (
      <Typography
        variant="body2"
        color="error.main"
        borderRadius={1}
        display="inline-block"
        my={1}
      >
        {error.message}
      </Typography>
    )
  }

  return (
    <>
      <Box color="grey.800">
        {pasrsedStream?.map((paragraph, index) => {
          return (
            <Typography
              key={`primary-explanation-stream-${index}`}
              sx={{
                whiteSpace: "pre-wrap",
                my: index === 0 ? 0 : 1,
              }}
            >
              {paragraph}
            </Typography>
          )
        })}
      </Box>
      <ConditionalExceptionText exceptionI18nKey={exceptionI18nKey} />
    </>
  )
}
