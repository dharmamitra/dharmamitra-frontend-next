"use client"

import React from "react"
import Grid from "@mui/material/Grid"
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
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        position: "relative",
        backgroundColor: "grey.100",
        overflow: "clip",
        p: 2,
        borderTopRightRadius: (theme) => theme.custom.shape.inputRadius,
        borderBottomRightRadius: (theme) => theme.custom.shape.inputRadius,
      }}
      data-testid="translation-results"
    >
      {isLoading ? (
        <Typography component="p" variant="h5">
          Loading...
        </Typography>
      ) : null}
      {isError ? (
        <Typography component="p" variant="h5">
          Error
        </Typography>
      ) : null}
      {data ? <Typography>{data.map((part) => part)}</Typography> : null}
    </Grid>
  )
}
