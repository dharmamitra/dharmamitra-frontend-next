import React from "react"
import { useTranslations } from "next-intl"
import { Box } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useQuery } from "@tanstack/react-query"

import { DMFetchApi, SearchApiTypes } from "@/api"
import LoadingDots from "@/components/LoadingDots"

export type ExplanationProps = {
  isExpanded: boolean
  request: SearchApiTypes.RequestBody<"/explanation-parallel/">
}

export default function PrimaryExplanation({
  isExpanded,
  request,
}: ExplanationProps) {
  const t = useTranslations()

  const { data, isLoading, error } = useQuery({
    queryKey: DMFetchApi.searchParallelExplanation.makeQueryKey(request),
    queryFn: () => {
      return DMFetchApi.searchParallelExplanation.call(request)
    },
    enabled: isExpanded,
    retry: false,
  })

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

  if (isLoading)
    return (
      <Box pt={1} pb={2}>
        <LoadingDots />
      </Box>
    )

  if (!data) return null

  const { relevance, summary } = data

  return (
    <Box color="grey.800">
      <Box display="inline-flex items-center" mb={0.25}>
        <Typography
          fontSize="1.1rem !important"
          component="span"
          color="grey.500"
          fontWeight={600}
        >
          {t("search.relevance")}:{" "}
        </Typography>

        <Typography
          component="span"
          mb={1}
          textTransform="uppercase"
          fontSize="0.95rem !important"
          sx={{
            borderRadius: 1,
            border: "1px solid",
            borderColor: "grey.300",
            px: 1,
            py: 0.15,
            ml: 0.5,
          }}
        >
          {t(`search.relevanceTypes.${relevance}`)}
        </Typography>
      </Box>

      {summary.map((summary, index) => (
        <Typography
          key={`explanation-summary-${index}`}
          lineHeight={1.35}
          mb={1}
          whiteSpace="pre-wrap"
        >
          {summary}
        </Typography>
      ))}
    </Box>
  )
}
