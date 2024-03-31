"use client"

import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useQuery } from "@tanstack/react-query"
import { useAtomValue } from "jotai"

import { DM_API, type TranslationRequestProps } from "@/api"
import { triggerTranslationQueryAtom } from "@/atoms"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"

export default function TranslationResults() {
  const { input } = useInputWithUrlParam("input_sentence")
  const triggerTranslationQuery = useAtomValue(triggerTranslationQueryAtom)

  const params: TranslationRequestProps = {
    input_sentence: input,
    input_encoding: "auto",
    level_of_explanation: 0,
    target_lang: "english",
    model: "NO",
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: DM_API.translation.makeQueryKey(params),
    queryFn: () => DM_API.translation.call(params),
    enabled: triggerTranslationQuery,
  })

  return (
    <Box sx={{ mt: 3 }}>
      {isLoading ? (
        <Typography component="p" variant="h5" sx={{ mt: 6 }}>
          Loading...
        </Typography>
      ) : null}
      {isError ? (
        <Typography component="p" variant="h5" sx={{ mt: 6 }}>
          Error
        </Typography>
      ) : null}
      {data ? (
        <>
          <Typography component="h3" variant="h5" sx={{ mt: 6 }}>
            Results:
          </Typography>
          <Typography sx={{ mt: 2 }}>{data.map((part) => part)}</Typography>
        </>
      ) : null}
    </Box>
  )
}
